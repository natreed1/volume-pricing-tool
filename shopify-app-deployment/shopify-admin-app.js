// Shopify Admin App for Volume Pricing Configuration
class VolumePricingAdmin {
  constructor() {
    this.products = [];
    this.currentProduct = null;
    this.init();
  }

  init() {
    this.loadProducts();
    this.setupEventListeners();
    this.renderAdminInterface();
  }

  setupEventListeners() {
    // Product management
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('add-product-btn')) {
        this.addNewProduct();
      }
      if (e.target.classList.contains('remove-product-btn')) {
        this.removeProduct(e.target.dataset.productId);
      }
      if (e.target.classList.contains('add-tier-btn')) {
        this.addTierToProduct();
      }
      if (e.target.classList.contains('remove-tier-btn')) {
        this.removeTier(e.target.dataset.tierIndex);
      }
      if (e.target.classList.contains('save-config-btn')) {
        this.saveConfiguration();
      }
      if (e.target.classList.contains('export-config-btn')) {
        this.exportConfiguration();
      }
    });

    // Form inputs
    document.addEventListener('input', (e) => {
      if (e.target.classList.contains('product-input')) {
        this.updateProductField(e.target.dataset.field, e.target.value);
      }
      if (e.target.classList.contains('tier-input')) {
        this.updateTierField(e.target.dataset.tierIndex, e.target.dataset.field, e.target.value);
      }
    });
  }

  loadProducts() {
    // Load from localStorage or Shopify metafields
    const savedProducts = localStorage.getItem('volumePricingProducts');
    if (savedProducts) {
      this.products = JSON.parse(savedProducts);
    } else {
      // Default products
      this.products = [
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
      ];
    }
    
    if (this.products.length > 0) {
      this.currentProduct = this.products[0];
    }
  }

  saveProducts() {
    localStorage.setItem('volumePricingProducts', JSON.stringify(this.products));
    // In a real app, this would save to Shopify metafields or API
    this.updateCustomerTool();
  }

  addNewProduct() {
    const productName = document.getElementById('new-product-name').value;
    const basePrice = parseFloat(document.getElementById('new-product-price').value);
    
    if (!productName || !basePrice) {
      alert('Please enter both product name and base price');
      return;
    }

    const newProduct = {
      id: productName.toLowerCase().replace(/\s+/g, '-'),
      name: productName,
      basePrice: basePrice,
      tiers: [
        { min: 1, max: 999, price: basePrice }
      ]
    };

    this.products.push(newProduct);
    this.currentProduct = newProduct;
    this.saveProducts();
    this.renderAdminInterface();
    
    // Clear form
    document.getElementById('new-product-name').value = '';
    document.getElementById('new-product-price').value = '';
  }

  removeProduct(productId) {
    if (confirm('Are you sure you want to remove this product?')) {
      this.products = this.products.filter(p => p.id !== productId);
      if (this.currentProduct && this.currentProduct.id === productId) {
        this.currentProduct = this.products[0] || null;
      }
      this.saveProducts();
      this.renderAdminInterface();
    }
  }

  addTierToProduct() {
    if (!this.currentProduct) return;
    
    this.currentProduct.tiers.push({
      min: 1,
      max: 999,
      price: this.currentProduct.basePrice
    });
    
    this.saveProducts();
    this.renderTiersConfig();
  }

  removeTier(tierIndex) {
    if (!this.currentProduct) return;
    
    if (this.currentProduct.tiers.length > 1) {
      this.currentProduct.tiers.splice(parseInt(tierIndex), 1);
      this.saveProducts();
      this.renderTiersConfig();
    } else {
      alert('You must have at least one pricing tier');
    }
  }

  updateProductField(field, value) {
    if (!this.currentProduct) return;
    
    if (field === 'basePrice') {
      this.currentProduct[field] = parseFloat(value) || 0;
    } else {
      this.currentProduct[field] = value;
    }
    
    this.saveProducts();
  }

  updateTierField(tierIndex, field, value) {
    if (!this.currentProduct) return;
    
    const tier = this.currentProduct.tiers[parseInt(tierIndex)];
    if (tier) {
      if (field === 'price') {
        tier[field] = parseFloat(value) || 0;
      } else {
        tier[field] = parseInt(value) || 0;
      }
      this.saveProducts();
      this.renderPricingPreview();
    }
  }

  saveConfiguration() {
    // Save to Shopify metafields or API
    this.saveProducts();
    
    // Show success message
    const saveBtn = document.querySelector('.save-config-btn');
    const originalText = saveBtn.textContent;
    saveBtn.textContent = 'Saved!';
    saveBtn.style.backgroundColor = '#4caf50';
    
    setTimeout(() => {
      saveBtn.textContent = originalText;
      saveBtn.style.backgroundColor = '';
    }, 2000);
  }

  exportConfiguration() {
    const config = {
      products: this.products,
      exportDate: new Date().toISOString(),
      version: '1.0.0'
    };
    
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'volume-pricing-config.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  updateCustomerTool() {
    // Update the customer-facing tool with new configuration
    const customerTool = document.getElementById('volume-pricing-customer');
    if (customerTool) {
      // Update the pricing data in the customer tool
      window.pricingData = {};
      this.products.forEach(product => {
        window.pricingData[product.id] = {
          name: product.name,
          basePrice: product.basePrice,
          tiers: product.tiers
        };
      });
    }
  }

  renderAdminInterface() {
    const adminContainer = document.getElementById('volume-pricing-admin');
    if (!adminContainer) return;

    adminContainer.innerHTML = `
      <div class="admin-header">
        <h2>Volume Pricing Configuration</h2>
        <p>Configure bulk pricing rules for your products</p>
      </div>

      <div class="admin-content">
        <div class="product-list">
          <h3>Products</h3>
          <div class="product-selector">
            <select id="product-dropdown" class="product-dropdown">
              ${this.products.map(product => `
                <option value="${product.id}" ${this.currentProduct && this.currentProduct.id === product.id ? 'selected' : ''}>
                  ${product.name}
                </option>
              `).join('')}
            </select>
            ${this.currentProduct ? `
              <button class="remove-product-btn" data-product-id="${this.currentProduct.id}">
                Remove Product
              </button>
            ` : ''}
          </div>

          <div class="add-product">
            <h4>Add New Product</h4>
            <div class="add-product-form">
              <input type="text" id="new-product-name" placeholder="Product Name" class="product-name-input">
              <input type="number" id="new-product-price" placeholder="Base Price" class="product-price-input" step="0.01" min="0">
              <button class="add-product-btn">Add Product</button>
            </div>
          </div>
        </div>

        ${this.currentProduct ? this.renderProductConfig() : ''}
      </div>

      <div class="admin-actions">
        <button class="save-config-btn">Save Configuration</button>
        <button class="export-config-btn">Export Configuration</button>
      </div>
    `;

    // Setup product dropdown change listener
    const productDropdown = document.getElementById('product-dropdown');
    if (productDropdown) {
      productDropdown.addEventListener('change', (e) => {
        this.currentProduct = this.products.find(p => p.id === e.target.value);
        this.renderAdminInterface();
      });
    }
  }

  renderProductConfig() {
    return `
      <div class="pricing-config">
        <h3>Pricing Tiers for ${this.currentProduct.name}</h3>
        
        <div class="base-price">
          <label>Base Price:</label>
          <input type="number" 
                 value="${this.currentProduct.basePrice}" 
                 data-field="basePrice"
                 class="product-input base-price-input"
                 step="0.01" min="0">
        </div>

        <div class="tiers-config">
          <h4>Volume Pricing Tiers</h4>
          ${this.renderTiersConfig()}
          <button class="add-tier-btn">Add Pricing Tier</button>
        </div>

        <div class="pricing-preview">
          <h4>Pricing Preview</h4>
          ${this.renderPricingPreview()}
        </div>
      </div>
    `;
  }

  renderTiersConfig() {
    return this.currentProduct.tiers.map((tier, index) => `
      <div class="tier-config">
        <div class="tier-inputs">
          <div class="tier-input-group">
            <label>Min Quantity:</label>
            <input type="number" 
                   value="${tier.min}" 
                   data-tier-index="${index}"
                   data-field="min"
                   class="tier-input"
                   min="1">
          </div>
          <div class="tier-input-group">
            <label>Max Quantity:</label>
            <input type="number" 
                   value="${tier.max}" 
                   data-tier-index="${index}"
                   data-field="max"
                   class="tier-input"
                   min="1">
          </div>
          <div class="tier-input-group">
            <label>Price:</label>
            <input type="number" 
                   value="${tier.price}" 
                   data-tier-index="${index}"
                   data-field="price"
                   class="tier-input"
                   step="0.01" min="0">
          </div>
          <button class="remove-tier-btn" data-tier-index="${index}">Remove</button>
        </div>
      </div>
    `).join('');
  }

  renderPricingPreview() {
    return `
      <div class="preview-tiers">
        ${this.currentProduct.tiers.map(tier => `
          <div class="preview-tier">
            <span>${tier.min}-${tier.max} units:</span>
            <span>$${tier.price.toFixed(2)} each</span>
          </div>
        `).join('')}
      </div>
    `;
  }
}

// Initialize admin when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('volume-pricing-admin')) {
    new VolumePricingAdmin();
  }
}); 