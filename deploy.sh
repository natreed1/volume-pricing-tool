#!/bin/bash

# Volume Pricing Tool - Shopify App Deployment Script
echo "🚀 Volume Pricing Tool - Deployment Package Creator"
echo "=================================================="

# Create deployment directory
DEPLOY_DIR="shopify-app-deployment"
echo "📁 Creating deployment directory: $DEPLOY_DIR"
mkdir -p $DEPLOY_DIR

# Copy main app file
echo "📄 Copying main app file..."
cp shopify-app-deployment.html $DEPLOY_DIR/

# Copy React app assets
echo "📦 Copying React app assets..."
cp -r dist/assets $DEPLOY_DIR/

# Copy alternative admin interface
echo "⚙️ Copying admin interface..."
cp shopify-admin-interface.html $DEPLOY_DIR/
cp shopify-admin-app.js $DEPLOY_DIR/

# Copy theme integration files
echo "🎨 Copying theme integration files..."
cp shopify-section.liquid $DEPLOY_DIR/
cp shopify-theme-section.liquid $DEPLOY_DIR/

# Copy documentation
echo "📚 Copying documentation..."
cp DEPLOYMENT-PACKAGE.md $DEPLOY_DIR/
cp SHOPIFY-DEPLOYMENT.md $DEPLOY_DIR/
cp SHOPIFY-COMPLETE-GUIDE.md $DEPLOY_DIR/

# Create deployment info file
echo "📋 Creating deployment info..."
cat > $DEPLOY_DIR/DEPLOYMENT-INFO.txt << EOF
Volume Pricing Tool - Shopify App
================================

Deployment Package Created: $(date)
Version: 1.0.0

Files Included:
- shopify-app-deployment.html (Main app with React integration)
- assets/ (React app assets)
- shopify-admin-interface.html (Alternative admin interface)
- shopify-admin-app.js (Admin functionality)
- shopify-section.liquid (Theme section integration)
- shopify-theme-section.liquid (Alternative theme section)
- DEPLOYMENT-PACKAGE.md (Deployment guide)
- SHOPIFY-DEPLOYMENT.md (Detailed deployment instructions)
- SHOPIFY-COMPLETE-GUIDE.md (Complete setup guide)

Quick Start:
1. Upload all files to your web server
2. Create a Shopify app in your admin panel
3. Set the app URL to your hosted shopify-app-deployment.html
4. Install and configure the app

For detailed instructions, see DEPLOYMENT-PACKAGE.md
EOF

# Create a zip file for easy distribution
echo "📦 Creating deployment package..."
zip -r volume-pricing-tool-shopify-app.zip $DEPLOY_DIR/

echo ""
echo "✅ Deployment package created successfully!"
echo ""
echo "📁 Files are in: $DEPLOY_DIR/"
echo "📦 Zip package: volume-pricing-tool-shopify-app.zip"
echo ""
echo "🚀 Next steps:"
echo "1. Upload the files to your web server"
echo "2. Create a Shopify app in your admin panel"
echo "3. Set the app URL to your hosted shopify-app-deployment.html"
echo "4. Install and test the app"
echo ""
echo "📚 For detailed instructions, see DEPLOYMENT-PACKAGE.md" 