import React, { useState } from 'react'
import './AdminPanel.css'

const AdminPanel = () => {
  const [products, setProducts] = useState([
    {
      id: 'tote-bag',
      name: 'Custom Tote Bag',
      basePrice: 9.99,
      tiers: [
        { min: 1, max: 49, price: 9.99 },
        { min: 50, max: 99, price: 5.00 },
        { min: 100, max: 199, price: 2.50 },
        { min: 200, max: 999, price: 1.99 }
      ]
    },
    {
      id: 'mug',
      name: 'Custom Mug',
      basePrice: 12.99,
      tiers: [
        { min: 1, max: 24, price: 12.99 },
        { min: 25, max: 49, price: 8.99 },
        { min: 50, max: 99, price: 6.99 },
        { min: 100, max: 999, price: 4.99 }
      ]
    }
  ])

  const [selectedProduct, setSelectedProduct] = useState(0)
  const [newProduct, setNewProduct] = useState({ name: '', basePrice: '' })

  const currentProduct = products[selectedProduct]

  const updateTier = (tierIndex, field, value) => {
    const updatedProducts = [...products]
    updatedProducts[selectedProduct].tiers[tierIndex][field] = parseFloat(value) || 0
    setProducts(updatedProducts)
  }

  const addTier = () => {
    const updatedProducts = [...products]
    updatedProducts[selectedProduct].tiers.push({
      min: 1,
      max: 999,
      price: currentProduct.basePrice
    })
    setProducts(updatedProducts)
  }

  const removeTier = (tierIndex) => {
    const updatedProducts = [...products]
    updatedProducts[selectedProduct].tiers.splice(tierIndex, 1)
    setProducts(updatedProducts)
  }

  const updateProduct = (field, value) => {
    const updatedProducts = [...products]
    updatedProducts[selectedProduct][field] = field === 'basePrice' ? parseFloat(value) || 0 : value
    setProducts(updatedProducts)
  }

  const addProduct = () => {
    if (newProduct.name && newProduct.basePrice) {
      const product = {
        id: newProduct.name.toLowerCase().replace(/\s+/g, '-'),
        name: newProduct.name,
        basePrice: parseFloat(newProduct.basePrice),
        tiers: [
          { min: 1, max: 999, price: parseFloat(newProduct.basePrice) }
        ]
      }
      setProducts([...products, product])
      setNewProduct({ name: '', basePrice: '' })
    }
  }

  const removeProduct = (productIndex) => {
    const updatedProducts = products.filter((_, index) => index !== productIndex)
    setProducts(updatedProducts)
    if (selectedProduct >= updatedProducts.length) {
      setSelectedProduct(Math.max(0, updatedProducts.length - 1))
    }
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h2>Bulk Pricing Configuration</h2>
        <p>Configure volume pricing rules for your products</p>
      </div>

      <div className="admin-content">
        <div className="product-list">
          <h3>Products</h3>
          <div className="product-selector">
            <select 
              value={selectedProduct} 
              onChange={(e) => setSelectedProduct(parseInt(e.target.value))}
              className="product-dropdown"
            >
              {products.map((product, index) => (
                <option key={product.id} value={index}>
                  {product.name}
                </option>
              ))}
            </select>
            <button 
              onClick={() => removeProduct(selectedProduct)}
              className="remove-product-btn"
            >
              Remove Product
            </button>
          </div>

          <div className="add-product">
            <h4>Add New Product</h4>
            <div className="add-product-form">
              <input
                type="text"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                className="product-name-input"
              />
              <input
                type="number"
                placeholder="Base Price"
                value={newProduct.basePrice}
                onChange={(e) => setNewProduct({...newProduct, basePrice: e.target.value})}
                className="product-price-input"
                step="0.01"
                min="0"
              />
              <button onClick={addProduct} className="add-product-btn">
                Add Product
              </button>
            </div>
          </div>
        </div>

        {currentProduct && (
          <div className="pricing-config">
            <h3>Pricing Tiers for {currentProduct.name}</h3>
            
            <div className="base-price">
              <label>Base Price:</label>
              <input
                type="number"
                value={currentProduct.basePrice}
                onChange={(e) => updateProduct('basePrice', e.target.value)}
                step="0.01"
                min="0"
                className="base-price-input"
              />
            </div>

            <div className="tiers-config">
              <h4>Volume Pricing Tiers</h4>
              {currentProduct.tiers.map((tier, index) => (
                <div key={index} className="tier-config">
                  <div className="tier-inputs">
                    <div className="tier-input-group">
                      <label>Min Quantity:</label>
                      <input
                        type="number"
                        value={tier.min}
                        onChange={(e) => updateTier(index, 'min', e.target.value)}
                        min="1"
                        className="tier-input"
                      />
                    </div>
                    <div className="tier-input-group">
                      <label>Max Quantity:</label>
                      <input
                        type="number"
                        value={tier.max}
                        onChange={(e) => updateTier(index, 'max', e.target.value)}
                        min="1"
                        className="tier-input"
                      />
                    </div>
                    <div className="tier-input-group">
                      <label>Price:</label>
                      <input
                        type="number"
                        value={tier.price}
                        onChange={(e) => updateTier(index, 'price', e.target.value)}
                        step="0.01"
                        min="0"
                        className="tier-input"
                      />
                    </div>
                    <button 
                      onClick={() => removeTier(index)}
                      className="remove-tier-btn"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <button onClick={addTier} className="add-tier-btn">
                Add Pricing Tier
              </button>
            </div>

            <div className="pricing-preview">
              <h4>Pricing Preview</h4>
              <div className="preview-tiers">
                {currentProduct.tiers.map((tier, index) => (
                  <div key={index} className="preview-tier">
                    <span>{tier.min}-{tier.max} units:</span>
                    <span>${tier.price.toFixed(2)} each</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="admin-actions">
        <button className="save-btn">Save Configuration</button>
        <button className="export-btn">Export Pricing Data</button>
      </div>
    </div>
  )
}

export default AdminPanel 