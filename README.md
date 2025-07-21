# Volume Pricing Tool

A sleek and modern volume pricing tool for e-commerce stores that allows customers to select bulk quantities and see dynamic pricing based on volume discounts.

## Features

### Customer Interface
- **Product Selection**: Dropdown menu to select different products
- **Quantity Slider**: Interactive slider to select quantity (1-500 units)
- **Quantity Input**: Manual input with +/- buttons for precise control
- **Dynamic Pricing**: Real-time price updates based on selected quantity
- **Bulk Pricing Display**: Shows all available pricing tiers for the selected product
- **Total Calculation**: Automatically calculates total price based on quantity and tier pricing

### Admin Interface
- **Product Management**: Add, remove, and configure products
- **Pricing Tiers**: Set up custom volume pricing rules for each product
- **Base Price Configuration**: Set the default price for each product
- **Real-time Preview**: See how pricing tiers will appear to customers
- **Export Functionality**: Export pricing data for integration with other systems

## Design

The tool features a sleek, modern design with:
- **Color Scheme**: Light off-white backgrounds with dark muted purple/grey text
- **Accent Colors**: Warm brown/bronze for buttons and highlights
- **Typography**: Clean, readable fonts with proper hierarchy
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Smooth Animations**: Subtle hover effects and transitions

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone or download the project files
2. Navigate to the project directory:
   ```bash
   cd volumepricing
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## Usage

### Customer View
1. Select a product from the dropdown menu
2. Use the slider or +/- buttons to adjust quantity
3. View the dynamic pricing updates in real-time
4. See all available bulk pricing options below
5. Click "Add to Cart" when ready to purchase

### Admin Panel
1. Click "Admin Panel" to switch to configuration mode
2. Select a product from the dropdown to configure
3. Set the base price for the product
4. Add pricing tiers with minimum/maximum quantities and prices
5. Preview how the pricing will appear to customers
6. Save your configuration

## Pricing Structure

The tool supports flexible pricing tiers:

- **Tier 1**: 1-49 units at $9.99 each
- **Tier 2**: 50-99 units at $5.00 each  
- **Tier 3**: 100-199 units at $2.50 each
- **Tier 4**: 200+ units at $1.99 each

Each product can have its own unique pricing structure.

## Integration

This tool is designed to be easily integrated into existing e-commerce platforms:

- **Standalone Component**: Can be embedded into any website
- **API Ready**: Pricing data can be exported for backend integration
- **Customizable**: Colors, fonts, and styling can be modified to match your brand
- **Responsive**: Works on all device sizes

## Customization

### Colors
Modify the CSS variables in `src/styles/index.css`:
```css
:root {
  --background-color: #fafafa;
  --text-color: #4a4a4a;
  --accent-color: #8b7355;
  --button-color: #a67c52;
  /* ... other variables */
}
```

### Styling
- Edit component-specific styles in their respective CSS files
- Modify the overall layout in `src/styles/App.css`
- Update global styles in `src/styles/index.css`

## File Structure

```
volumepricing/
├── src/
│   ├── components/
│   │   ├── VolumePricingTool.jsx
│   │   ├── VolumePricingTool.css
│   │   ├── AdminPanel.jsx
│   │   └── AdminPanel.css
│   ├── styles/
│   │   ├── index.css
│   │   └── App.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the ISC License.

## Support

For questions or support, please refer to the documentation or create an issue in the project repository. 