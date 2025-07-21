# Shopify Deployment Guide

## 🚀 Quick Deployment Options

### **Option 1: Add as Theme Section (Recommended)**

1. **Access Your Shopify Admin**
   - Go to your Shopify admin panel
   - Navigate to **Online Store** → **Themes**

2. **Edit Your Theme**
   - Click **Actions** → **Edit code** on your active theme
   - In the left sidebar, go to **Sections**

3. **Add the Volume Pricing Section**
   - Click **Add a new section**
   - Name it `volume-pricing-tool.liquid`
   - Copy and paste the contents of `shopify-section.liquid` into the new section
   - Click **Save**

4. **Add to Your Pages**
   - Go to **Online Store** → **Pages**
   - Create a new page or edit an existing one
   - In the page editor, click **Add section**
   - Select **Volume Pricing Tool** from the sections list
   - Click **Save**

### **Option 2: Embed as Custom Page**

1. **Upload the HTML File**
   - Go to **Online Store** → **Pages**
   - Click **Add page**
   - Set the page title (e.g., "Bulk Pricing")
   - In the content area, click **Show HTML**
   - Copy and paste the contents of `shopify-integration.html`
   - Click **Save**

### **Option 3: Add to Product Pages**

1. **Edit Product Template**
   - Go to **Online Store** → **Themes** → **Edit code**
   - Navigate to **Sections** → **product.liquid**
   - Add the volume pricing section where you want it to appear

## 🔧 Configuration Steps

### **Step 1: Set Up Product Variants**

You'll need to create product variants in Shopify for each pricing tier:

1. **Go to Products** in your Shopify admin
2. **Create or edit your products** (e.g., Custom Tote Bag, Custom Mug)
3. **Add variants** for each pricing tier:
   - **Custom Tote Bag:**
     - Variant 1: 1-49 units (Price: $9.99)
     - Variant 2: 50-99 units (Price: $5.00)
     - Variant 3: 100-199 units (Price: $2.50)
     - Variant 4: 200+ units (Price: $1.99)
   - **Custom Mug:**
     - Variant 1: 1-24 units (Price: $12.99)
     - Variant 2: 25-49 units (Price: $8.99)
     - Variant 3: 50-99 units (Price: $6.99)
     - Variant 4: 100+ units (Price: $4.99)

### **Step 2: Update Variant IDs**

1. **Get your variant IDs:**
   - Go to your product page
   - Right-click → **Inspect Element**
   - Look for variant IDs in the HTML or use Shopify's API

2. **Update the JavaScript:**
   - Edit the `getProductVariantId` function in the section file
   - Replace the placeholder IDs with your actual variant IDs

### **Step 3: Customize Pricing**

Edit the `pricingData` object in the JavaScript to match your actual pricing:

```javascript
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
  // Add more products as needed
};
```

## 🎨 Customization

### **Colors and Styling**

The tool uses CSS variables that match your design. You can customize:

```css
:root {
  --background-color: #fafafa;
  --text-color: #4a4a4a;
  --accent-color: #8b7355;
  --button-color: #a67c52;
  --border-color: #e0e0e0;
}
```

### **Add More Products**

1. **Add to the dropdown:**
   ```html
   <option value="new-product">New Product Name</option>
   ```

2. **Add to pricing data:**
   ```javascript
   'new-product': {
     name: 'New Product Name',
     basePrice: 15.99,
     tiers: [
       { min: 1, max: 24, price: 15.99 },
       { min: 25, max: 49, price: 12.99 },
       // Add more tiers
     ]
   }
   ```

3. **Add variant mapping:**
   ```javascript
   'new-product': {
     1: 123456797, // Replace with actual variant ID
     25: 123456798,
     // Add more tiers
   }
   ```

## 🔗 Integration with Shopify Cart

The tool is designed to work with Shopify's cart system. The `addToCart` function:

1. **Determines the correct variant** based on quantity
2. **Adds the item to cart** using Shopify's API
3. **Updates the cart** automatically

## 📱 Mobile Responsiveness

The tool is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🧪 Testing

1. **Test the tool** on your test store
2. **Verify pricing** updates correctly
3. **Test cart integration** with different quantities
4. **Check mobile responsiveness**

## 🚨 Troubleshooting

### **Common Issues:**

1. **Prices not updating:**
   - Check that variant IDs are correct
   - Verify pricing data matches your Shopify products

2. **Cart not working:**
   - Ensure Shopify's cart API is available
   - Check for JavaScript errors in browser console

3. **Styling issues:**
   - Check for CSS conflicts with your theme
   - Verify all CSS is properly loaded

### **Debug Mode:**

Add this to see what's happening:
```javascript
console.log('Selected product:', selectedProduct);
console.log('Quantity:', quantity);
console.log('Variant ID:', getProductVariantId(selectedProduct, quantity));
```

## 📞 Support

If you need help:
1. Check the browser console for errors
2. Verify all files are properly uploaded
3. Test with a simple configuration first
4. Contact support with specific error messages

## 🎯 Next Steps

After deployment:
1. **Test thoroughly** with different quantities
2. **Monitor sales** to see the impact
3. **Gather customer feedback**
4. **Optimize pricing** based on results
5. **Add more products** as needed

Your volume pricing tool is now ready to boost your Shopify sales! 🚀 