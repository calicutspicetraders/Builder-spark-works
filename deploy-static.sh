#!/bin/bash

# Static Hosting Deployment Script for Hostinger
# For workspace.calicutspicetraders.com

set -e  # Exit on any error

echo "🚀 Starting STATIC HOSTING deployment for workspace.calicutspicetraders.com"

# Configuration
DOMAIN="workspace.calicutspicetraders.com"
APP_NAME="Calicut Spice Traders Workspace"
LOCAL_DIST="./dist"
LOCAL_API="./api"
LOCAL_CONFIG="./config"

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Pre-deployment checks
check_requirements() {
    log_info "Checking deployment requirements..."
    
    # Check if Node.js is available for building
    if ! command -v npm &> /dev/null; then
        log_error "npm is required for building the application"
        exit 1
    fi
    
    # Check if dist directory exists (built app)
    if [[ ! -d "$LOCAL_DIST" ]]; then
        log_warning "Dist directory not found. Building application..."
        npm run build:production
    fi
    
    log_success "Requirements check passed"
}

# Build application for production
build_application() {
    log_info "Building application for static hosting..."
    
    # Copy production environment
    cp .env.production .env
    
    # Install dependencies
    log_info "Installing dependencies..."
    npm ci --production=false
    
    # Run TypeScript check
    log_info "Running TypeScript check..."
    npm run typecheck
    
    # Build the application
    log_info "Building React application..."
    npm run build
    
    # Verify build
    if [[ ! -f "$LOCAL_DIST/index.html" ]]; then
        log_error "Build failed - index.html not found"
        exit 1
    fi
    
    log_success "Application built successfully"
}

# Prepare deployment package
prepare_deployment() {
    log_info "Preparing deployment package..."
    
    # Create deployment directory
    mkdir -p deployment-package
    
    # Copy built React app
    cp -r $LOCAL_DIST/* deployment-package/
    
    # Copy API files
    cp -r $LOCAL_API deployment-package/
    
    # Copy config files
    cp -r $LOCAL_CONFIG deployment-package/
    
    # Copy .htaccess
    cp .htaccess deployment-package/
    
    # Copy additional files
    cp index.php deployment-package/ 2>/dev/null || true
    cp robots.txt deployment-package/ 2>/dev/null || true
    
    log_success "Deployment package prepared"
}

# Generate deployment instructions
generate_instructions() {
    log_info "Generating deployment instructions..."
    
    cat > HOSTINGER-UPLOAD-INSTRUCTIONS.md << EOF
# 📤 Hostinger Static Hosting Upload Instructions

## 🎯 Upload Location
**Domain:** workspace.calicutspicetraders.com
**Upload Path:** public_html/

## 📁 Files to Upload

### 1. Upload ALL files from \`deployment-package/\` to \`public_html/\`

**Required Files:**
- \`index.html\` (Main React app)
- \`assets/\` (All CSS, JS, and asset files)
- \`api/\` (PHP API endpoints)
- \`config/\` (Database and configuration)
- \`.htaccess\` (URL rewriting for SPA)

### 2. File Structure on Server:
\`\`\`
public_html/
├── index.html
├── assets/
│   ├── index-[hash].css
│   ├── index-[hash].js
│   ├── vendor-[hash].js
│   └── ...
├── api/
│   ├── superadmin/
│   │   ├── invite-manager.php
│   │   └── content-manager.php
│   └── test.php
├── config/
│   ├── database.php
│   ├── health_check.php
│   └── migrations/
├── .htaccess
└── robots.txt
\`\`\`

## 🔧 Upload Methods

### Method 1: File Manager (Recommended)
1. Login to Hostinger control panel
2. Go to File Manager
3. Navigate to \`public_html\`
4. Upload all files from \`deployment-package/\`
5. Extract if uploaded as ZIP

### Method 2: FTP
1. Use FTP client (FileZilla, etc.)
2. Connect to your hosting
3. Upload to \`public_html/\` directory

## ⚙️ Post-Upload Configuration

### 1. Database Setup
- Access: \`https://workspace.calicutspicetraders.com/config/run_migrations.php\`
- This will set up all required database tables

### 2. Verify Health Check
- Access: \`https://workspace.calicutspicetraders.com/config/health_check.php\`
- Should return JSON with "status": "success"

### 3. Test Application
- Main App: \`https://workspace.calicutspicetraders.com\`
- API Test: \`https://workspace.calicutspicetraders.com/api/test.php\`

## 🔐 Environment Configuration

Update these in your Hostinger environment:

1. **Google OAuth Client ID**
   - Update in production environment
   - Get from Google Cloud Console

2. **Database Credentials**
   - Already configured for Hostinger
   - Database: u272045696_cst

## ✅ Verification Checklist

- [ ] React app loads at main domain
- [ ] Navigation works (React Router)
- [ ] API endpoints respond
- [ ] Database connection works
- [ ] Health check passes
- [ ] No console errors

## 🚨 Troubleshooting

**Problem:** White screen/404 errors
**Solution:** Check .htaccess is uploaded and React Router rules are active

**Problem:** API not working
**Solution:** Verify PHP files uploaded to api/ directory

**Problem:** Database errors
**Solution:** Run migration script at /config/run_migrations.php

## 📞 Support
If issues persist, check:
1. File permissions (644 for files, 755 for directories)
2. .htaccess syntax
3. PHP error logs in Hostinger panel

---
**Deployment Package Generated:** $(date)
**Ready for Static Hosting Upload** ✅
EOF

    log_success "Upload instructions generated: HOSTINGER-UPLOAD-INSTRUCTIONS.md"
}

# Main deployment process
main() {
    echo ""
    echo "╔════════════════════════════════════════════════════════════╗"
    echo "║         HOSTINGER STATIC HOSTING DEPLOYMENT               ║"
    echo "║              workspace.calicutspicetraders.com             ║"
    echo "╚════════════════════════════════════════════════════════════╝"
    echo ""
    
    check_requirements
    build_application
    prepare_deployment
    generate_instructions
    
    echo ""
    echo "╔════════════════════════════════════════════════════════════╗"
    echo "║                    DEPLOYMENT READY!                      ║"
    echo "╚════════════════════════════════════════════════════════════╝"
    echo ""
    
    log_success "Static hosting deployment package prepared!"
    log_info "📁 Upload contents of 'deployment-package/' to public_html/"
    log_info "📖 See HOSTINGER-UPLOAD-INSTRUCTIONS.md for detailed steps"
    log_info "🌐 Domain: https://workspace.calicutspicetraders.com"
    
    echo ""
    echo "Next steps:"
    echo "1. Upload deployment-package/* to Hostinger public_html/"
    echo "2. Run database migration: /config/run_migrations.php"
    echo "3. Test the application: https://workspace.calicutspicetraders.com"
    echo ""
}

# Run main function
main "$@"
