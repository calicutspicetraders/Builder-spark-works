#!/bin/bash

# 🚀 Calicut Spice Traders Workspace - Hostinger Deployment Script
# This script prepares your application for deployment to Hostinger

echo "🌶️  Calicut Spice Traders Workspace Deployment"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_step() {
    echo -e "\n${BLUE}=== $1 ===${NC}"
}

# Check if Node.js is installed
print_step "Checking Prerequisites"
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

print_status "Node.js version: $(node --version)"
print_status "npm version: $(npm --version)"

# Install dependencies
print_step "Installing Dependencies"
print_status "Running npm install..."
npm install

if [ $? -ne 0 ]; then
    print_error "Failed to install dependencies"
    exit 1
fi

print_status "Dependencies installed successfully!"

# Run type checking
print_step "Type Checking"
print_status "Running TypeScript type check..."
npm run typecheck

if [ $? -ne 0 ]; then
    print_warning "Type checking found issues, but continuing with build..."
fi

# Build the application
print_step "Building Application"
print_status "Creating production build..."
npm run build

if [ $? -ne 0 ]; then
    print_error "Build failed"
    exit 1
fi

print_status "Build completed successfully!"

# Create deployment package
print_step "Preparing Deployment Package"
DEPLOY_DIR="hostinger-deployment"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
PACKAGE_NAME="workspace-deployment-${TIMESTAMP}"

# Remove existing deployment directory
if [ -d "$DEPLOY_DIR" ]; then
    rm -rf "$DEPLOY_DIR"
fi

# Create deployment directory
mkdir -p "$DEPLOY_DIR"

# Copy build files
print_status "Copying build files..."
cp -r dist/* "$DEPLOY_DIR/"

# Create .htaccess file
print_status "Creating .htaccess configuration..."
cat > "$DEPLOY_DIR/.htaccess" << 'EOL'
# Calicut Spice Traders Workspace - Apache Configuration

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache settings
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>

# Handle client-side routing (React Router)
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>

# Force HTTPS
<IfModule mod_rewrite.c>
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Prevent access to sensitive files
<Files ".env">
    Order allow,deny
    Deny from all
</Files>

<Files "*.config.js">
    Order allow,deny
    Deny from all
</Files>
EOL

# Create robots.txt if it doesn't exist
if [ ! -f "$DEPLOY_DIR/robots.txt" ]; then
    print_status "Creating robots.txt..."
    cat > "$DEPLOY_DIR/robots.txt" << 'EOL'
User-agent: *
Allow: /

Sitemap: https://workspace.calicutspicetraders.com/sitemap.xml
EOL
fi

# Create a simple sitemap.xml
print_status "Creating sitemap.xml..."
cat > "$DEPLOY_DIR/sitemap.xml" << 'EOL'
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://workspace.calicutspicetraders.com/</loc>
    <lastmod>2024-12-22</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://workspace.calicutspicetraders.com/admin</loc>
    <lastmod>2024-12-22</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://workspace.calicutspicetraders.com/analytics</loc>
    <lastmod>2024-12-22</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://workspace.calicutspicetraders.com/communication</loc>
    <lastmod>2024-12-22</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://workspace.calicutspicetraders.com/documents</loc>
    <lastmod>2024-12-22</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://workspace.calicutspicetraders.com/crm</loc>
    <lastmod>2024-12-22</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
EOL

# Create ZIP package for easy upload
print_step "Creating Deployment Package"
if command -v zip &> /dev/null; then
    print_status "Creating ZIP package..."
    cd "$DEPLOY_DIR"
    zip -r "../${PACKAGE_NAME}.zip" .
    cd ..
    print_status "Deployment package created: ${PACKAGE_NAME}.zip"
else
    print_warning "ZIP command not found. You'll need to manually compress the hostinger-deployment folder."
fi

# Generate file size report
print_step "Deployment Summary"
TOTAL_SIZE=$(du -sh "$DEPLOY_DIR" | cut -f1)
FILE_COUNT=$(find "$DEPLOY_DIR" -type f | wc -l)

print_status "Deployment directory: $DEPLOY_DIR"
print_status "Total files: $FILE_COUNT"
print_status "Total size: $TOTAL_SIZE"

echo ""
echo "📁 Files ready for upload:"
echo "   • All files in the '$DEPLOY_DIR' directory"
if [ -f "${PACKAGE_NAME}.zip" ]; then
    echo "   • Or use the ZIP package: ${PACKAGE_NAME}.zip"
fi

echo ""
echo "🚀 Next Steps:"
echo "   1. Login to your Hostinger control panel"
echo "   2. Navigate to File Manager"
echo "   3. Go to public_html/workspace/ (create if needed)"
echo "   4. Upload all files from '$DEPLOY_DIR' directory"
echo "   5. Set up subdomain: workspace.calicutspicetraders.com"
echo "   6. Enable SSL certificate"
echo "   7. Test the deployment"

echo ""
echo "���� For detailed instructions, see: DEPLOYMENT-HOSTINGER.md"

echo ""
print_status "Deployment preparation completed successfully! 🎉"

# Optional: Open deployment guide
if command -v xdg-open &> /dev/null; then
    read -p "Would you like to open the deployment guide? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        xdg-open "DEPLOYMENT-HOSTINGER.md" 2>/dev/null
    fi
elif command -v open &> /dev/null; then
    read -p "Would you like to open the deployment guide? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        open "DEPLOYMENT-HOSTINGER.md" 2>/dev/null
    fi
fi

exit 0
