import React, { useState, useEffect } from 'react'
import './VolumePricingTool.css'

const VolumePricingTool = () => {
  const [selectedProduct, setSelectedProduct] = useState('tote-bag')
  const [quantity, setQuantity] = useState(1)
  const [currentPrice, setCurrentPrice] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  // Sample pricing data - this would come from your admin configuration
  const pricingData = {
    'tote-bag': {
      name: 'Custom Tote Bag',
      basePrice: 9.99,
      tiers: [
        { min: 1, max: 49, price: 9.99 },
        { min: 50, max: 99, price: 5.00 },
        { min: 100, max: 199, price: 2.50 },
        { min: 200, max: 999, price: 1.99 }
      ]
    },
    'mug': {
      name: 'Custom Mug',
      basePrice: 12.99,
      tiers: [
        { min: 1, max: 24, price: 12.99 },
        { min: 25, max: 49, price: 8.99 },
        { min: 50, max: 99, price: 6.99 },
        { min: 100, max: 999, price: 4.99 }
      ]
    }
  }

  const currentProduct = pricingData[selectedProduct]

  // Calculate current price based on quantity
  useEffect(() => {
    const tier = currentProduct.tiers.find(t => quantity >= t.min && quantity <= t.max)
    const price = tier ? tier.price : currentProduct.basePrice
    setCurrentPrice(price)
    setTotalPrice(price * quantity)
  }, [quantity, selectedProduct, currentProduct])

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value))
  }

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value)
    setQuantity(1) // Reset quantity when product changes
  }

  return (
    <div className="volume-pricing-tool">
      <div className="product-selector">
        <label htmlFor="product-select">Select Product:</label>
        <select 
          id="product-select" 
          value={selectedProduct} 
          onChange={handleProductChange}
          className="product-dropdown"
        >
          <option value="tote-bag">Custom Tote Bag</option>
          <option value="mug">Custom Mug</option>
        </select>
      </div>

      <div className="pricing-display">
        <h2>{currentProduct.name}</h2>
        <div className="price-info">
          <span className="current-price">${currentPrice.toFixed(2)}</span>
          <span className="per-unit">per unit</span>
        </div>
        <div className="total-price">
          Total: <span className="total-amount">${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <div className="quantity-selector">
        <label htmlFor="quantity-slider">Quantity: {quantity}</label>
        <input
          type="range"
          id="quantity-slider"
          min="1"
          max="500"
          value={quantity}
          onChange={handleQuantityChange}
          className="quantity-slider"
        />
        <div className="quantity-input">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="quantity-btn"
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="quantity-number"
            min="1"
          />
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="quantity-btn"
          >
            +
          </button>
        </div>
      </div>

      <div className="pricing-tiers">
        <h3>Bulk Pricing Options</h3>
        <div className="tiers-list">
          {currentProduct.tiers.map((tier, index) => (
            <div 
              key={index} 
              className={`tier-item ${quantity >= tier.min && quantity <= tier.max ? 'active' : ''}`}
            >
              <span className="tier-range">
                {tier.min === tier.max ? tier.min : `${tier.min}-${tier.max}`} units
              </span>
              <span className="tier-price">${tier.price.toFixed(2)} each</span>
            </div>
          ))}
        </div>
      </div>

      <button className="add-to-cart-btn">
        Add {quantity} to Cart - ${totalPrice.toFixed(2)}
      </button>
    </div>
  )
}

export default VolumePricingTool 