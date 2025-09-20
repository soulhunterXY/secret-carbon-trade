// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract SecretCarbonTrade is SepoliaConfig {
    using FHE for *;
    
    struct CarbonOrder {
        euint32 orderId;
        euint32 quantity;
        euint32 price;
        euint8 orderType; // 0 = buy, 1 = sell
        ebool isActive;
        address trader;
        uint256 timestamp;
        string symbol; // e.g., "EUA", "CER", "VER"
    }
    
    struct CarbonPosition {
        euint32 positionId;
        euint32 quantity;
        euint32 averagePrice;
        euint32 unrealizedPnL;
        address trader;
        string symbol;
        uint256 lastUpdated;
    }
    
    struct MarketData {
        euint32 currentPrice;
        euint32 volume24h;
        euint32 openInterest;
        string symbol;
        uint256 lastUpdate;
    }
    
    mapping(uint256 => CarbonOrder) public orders;
    mapping(address => mapping(string => CarbonPosition)) public positions;
    mapping(string => MarketData) public markets;
    mapping(address => euint32) public traderReputation;
    
    uint256 public orderCounter;
    uint256 public positionCounter;
    
    address public owner;
    address public verifier;
    
    event OrderCreated(uint256 indexed orderId, address indexed trader, string symbol, uint8 orderType);
    event OrderMatched(uint256 indexed buyOrderId, uint256 indexed sellOrderId, uint32 quantity, uint32 price);
    event PositionUpdated(address indexed trader, string symbol, uint32 quantity, uint32 averagePrice);
    event MarketDataUpdated(string symbol, uint32 price, uint32 volume);
    event ReputationUpdated(address indexed trader, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function createOrder(
        string memory _symbol,
        externalEuint32 _quantity,
        externalEuint32 _price,
        externalEuint8 _orderType,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(bytes(_symbol).length > 0, "Symbol cannot be empty");
        require(msg.sender != address(0), "Invalid trader address");
        
        uint256 orderId = orderCounter++;
        
        // Convert external encrypted values to internal using FHE
        euint32 internalQuantity = FHE.fromExternal(_quantity, inputProof);
        euint32 internalPrice = FHE.fromExternal(_price, inputProof);
        euint8 internalOrderType = FHE.fromExternal(_orderType, inputProof);
        
        // Validate encrypted values are within reasonable bounds
        require(FHE.gt(internalQuantity, FHE.asEuint32(0)), "Quantity must be positive");
        require(FHE.gt(internalPrice, FHE.asEuint32(0)), "Price must be positive");
        
        orders[orderId] = CarbonOrder({
            orderId: FHE.asEuint32(orderId),
            quantity: internalQuantity,
            price: internalPrice,
            orderType: internalOrderType,
            isActive: FHE.asEbool(true),
            trader: msg.sender,
            timestamp: block.timestamp,
            symbol: _symbol
        });
        
        // Update trader reputation based on order creation
        euint32 currentReputation = traderReputation[msg.sender];
        traderReputation[msg.sender] = FHE.add(currentReputation, FHE.asEuint32(1));
        
        emit OrderCreated(orderId, msg.sender, _symbol, 0); // OrderType will be decrypted off-chain
        return orderId;
    }
    
    function matchOrders(
        uint256 buyOrderId,
        uint256 sellOrderId,
        externalEuint32 _quantity,
        bytes calldata inputProof
    ) public {
        require(orders[buyOrderId].trader != address(0), "Buy order does not exist");
        require(orders[sellOrderId].trader != address(0), "Sell order does not exist");
        require(orders[buyOrderId].isActive, "Buy order is not active");
        require(orders[sellOrderId].isActive, "Sell order is not active");
        
        euint32 matchQuantity = FHE.fromExternal(_quantity, inputProof);
        
        // Update order quantities
        orders[buyOrderId].quantity = FHE.sub(orders[buyOrderId].quantity, matchQuantity);
        orders[sellOrderId].quantity = FHE.sub(orders[sellOrderId].quantity, matchQuantity);
        
        // Deactivate orders if fully matched
        orders[buyOrderId].isActive = FHE.and(
            orders[buyOrderId].isActive,
            FHE.gt(orders[buyOrderId].quantity, FHE.asEuint32(0))
        );
        orders[sellOrderId].isActive = FHE.and(
            orders[sellOrderId].isActive,
            FHE.gt(orders[sellOrderId].quantity, FHE.asEuint32(0))
        );
        
        // Update positions
        _updatePosition(orders[buyOrderId].trader, orders[buyOrderId].symbol, matchQuantity, orders[buyOrderId].price, true);
        _updatePosition(orders[sellOrderId].trader, orders[sellOrderId].symbol, matchQuantity, orders[sellOrderId].price, false);
        
        emit OrderMatched(buyOrderId, sellOrderId, 0, 0); // Values will be decrypted off-chain
    }
    
    function _updatePosition(
        address trader,
        string memory symbol,
        euint32 quantity,
        euint32 price,
        bool isBuy
    ) internal {
        CarbonPosition storage position = positions[trader][symbol];
        
        if (position.trader == address(0)) {
            // Create new position
            position.positionId = FHE.asEuint32(0); // Will be set properly later
            position.trader = trader;
            position.symbol = symbol;
            position.lastUpdated = block.timestamp;
        }
        
        if (isBuy) {
            // Update buy position
            euint32 newQuantity = FHE.add(position.quantity, quantity);
            euint32 newAveragePrice = FHE.div(
                FHE.add(
                    FHE.mul(position.quantity, position.averagePrice),
                    FHE.mul(quantity, price)
                ),
                newQuantity
            );
            position.quantity = newQuantity;
            position.averagePrice = newAveragePrice;
        } else {
            // Update sell position
            position.quantity = FHE.sub(position.quantity, quantity);
        }
        
        position.lastUpdated = block.timestamp;
        
        emit PositionUpdated(trader, symbol, 0, 0); // Values will be decrypted off-chain
    }
    
    function updateMarketData(
        string memory symbol,
        externalEuint32 _price,
        externalEuint32 _volume,
        bytes calldata inputProof
    ) public {
        require(msg.sender == verifier, "Only verifier can update market data");
        require(bytes(symbol).length > 0, "Symbol cannot be empty");
        
        euint32 price = FHE.fromExternal(_price, inputProof);
        euint32 volume = FHE.fromExternal(_volume, inputProof);
        
        markets[symbol] = MarketData({
            currentPrice: price,
            volume24h: volume,
            openInterest: FHE.asEuint32(0), // Will be calculated separately
            symbol: symbol,
            lastUpdate: block.timestamp
        });
        
        emit MarketDataUpdated(symbol, 0, 0); // Values will be decrypted off-chain
    }
    
    function updateReputation(address trader, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(trader != address(0), "Invalid trader address");
        
        traderReputation[trader] = reputation;
        emit ReputationUpdated(trader, 0); // Value will be decrypted off-chain
    }
    
    function getOrderInfo(uint256 orderId) public view returns (
        uint8 quantity,
        uint8 price,
        uint8 orderType,
        bool isActive,
        address trader,
        uint256 timestamp,
        string memory symbol
    ) {
        CarbonOrder storage order = orders[orderId];
        return (
            0, // FHE.decrypt(order.quantity) - will be decrypted off-chain
            0, // FHE.decrypt(order.price) - will be decrypted off-chain
            0, // FHE.decrypt(order.orderType) - will be decrypted off-chain
            true, // FHE.decrypt(order.isActive) - will be decrypted off-chain
            order.trader,
            order.timestamp,
            order.symbol
        );
    }
    
    function getPositionInfo(address trader, string memory symbol) public view returns (
        uint8 quantity,
        uint8 averagePrice,
        uint8 unrealizedPnL,
        uint256 lastUpdated
    ) {
        CarbonPosition storage position = positions[trader][symbol];
        return (
            0, // FHE.decrypt(position.quantity) - will be decrypted off-chain
            0, // FHE.decrypt(position.averagePrice) - will be decrypted off-chain
            0, // FHE.decrypt(position.unrealizedPnL) - will be decrypted off-chain
            position.lastUpdated
        );
    }
    
    function getMarketData(string memory symbol) public view returns (
        uint8 currentPrice,
        uint8 volume24h,
        uint8 openInterest,
        uint256 lastUpdate
    ) {
        MarketData storage market = markets[symbol];
        return (
            0, // FHE.decrypt(market.currentPrice) - will be decrypted off-chain
            0, // FHE.decrypt(market.volume24h) - will be decrypted off-chain
            0, // FHE.decrypt(market.openInterest) - will be decrypted off-chain
            market.lastUpdate
        );
    }
    
    function getTraderReputation(address trader) public view returns (uint8) {
        return 0; // FHE.decrypt(traderReputation[trader]) - will be decrypted off-chain
    }
    
    function cancelOrder(uint256 orderId) public {
        require(orders[orderId].trader == msg.sender, "Only order creator can cancel");
        require(orders[orderId].isActive, "Order is not active");
        
        orders[orderId].isActive = FHE.asEbool(false);
    }
    
    function calculateUnrealizedPnL(
        address trader,
        string memory symbol,
        externalEuint32 currentPrice,
        bytes calldata inputProof
    ) public {
        require(positions[trader][symbol].trader != address(0), "Position does not exist");
        
        euint32 price = FHE.fromExternal(currentPrice, inputProof);
        CarbonPosition storage position = positions[trader][symbol];
        
        // Calculate PnL: (currentPrice - averagePrice) * quantity
        euint32 priceDiff = FHE.sub(price, position.averagePrice);
        position.unrealizedPnL = FHE.mul(priceDiff, position.quantity);
        
        position.lastUpdated = block.timestamp;
    }
}
