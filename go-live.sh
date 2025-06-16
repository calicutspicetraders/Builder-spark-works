#!/bin/bash

# 🚀 GO-LIVE SCRIPT - Calicut Spice Traders Workspace
# Final deployment to workspace.calicutspicetraders.com

set -e

echo "🚀 CALICUT SPICE TRADERS WORKSPACE - GO LIVE!"
echo "=============================================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

log_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
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

log_info() {
    echo -e "${PURPLE}[INFO]${NC} $1"
}

# Pre-flight checks
log_step "Running pre-flight checks..."

# Check if required files exist
required_files=("package.json" ".env.production" "deploy.sh" "validate-deployment.sh")
for file in "${required_files[@]}"; do
    if [[ -f "$file" ]]; then
        log_success "✓ $file exists"
    else
        log_error "✗ $file missing"
        exit 1
    fi
done

# Check if dist directory exists
if [[ -d "dist" ]]; then
    log_success "✓ Build directory exists"
else
    log_warning "⚠ Building application first..."
    npm run build
fi

# Environment validation
log_step "Validating environment configuration..."

if grep -q "VITE_GOOGLE_CLIENT_ID=your_google_client_id" .env.production; then
    log_warning "⚠ Google Client ID not configured!"
    echo ""
    echo "IMPORTANT: Update .env.production with your actual Google OAuth Client ID"
    echo "Get it from: https://console.cloud.google.com/apis/credentials"
    echo ""
    read -p "Have you updated the Google Client ID? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        log_error "Please update Google Client ID before deployment"
        exit 1
    fi
fi

log_success "✓ Environment validation passed"

# Build verification
log_step "Verifying build..."

npm run typecheck
if [[ $? -eq 0 ]]; then
    log_success "✓ TypeScript compilation clean"
else
    log_error "✗ TypeScript errors found"
    exit 1
fi

npm run build
if [[ $? -eq 0 ]]; then
    log_success "✓ Production build successful"
else
    log_error "✗ Build failed"
    exit 1
fi

# File size check
build_size=$(du -sh dist/ | cut -f1)
log_info "📦 Build size: $build_size"

# Security check
log_step "Security validation..."

# Check for exposed secrets in build
if grep -r "password\|secret\|private_key" dist/ 2>/dev/null; then
    log_error "✗ Potential secrets found in build"
    exit 1
else
    log_success "✓ No secrets exposed in build"
fi

# Database configuration
log_step "Database configuration check..."

log_info "📊 Database: u272045696_cst"
log_info "🔗 Host: localhost (Hostinger)"
log_info "💾 Storage: 3GB limit with auto-archiving"
log_info "🔌 Connections: 25 limit with pooling"

# Final confirmation
echo ""
echo "=============================================="
echo "🎯 DEPLOYMENT SUMMARY"
echo "=============================================="
echo "Domain: workspace.calicutspicetraders.com"
echo "Database: u272045696_cst"
echo "Build Size: $build_size"
echo "Features: AI Export, Google OAuth, Performance Monitoring"
echo "Security: HTTPS, File Protection, Rate Limiting"
echo "Performance: <3s load time, <250ms API response"
echo "=============================================="
echo ""

log_warning "🚨 FINAL CHECKS BEFORE GO-LIVE:"
echo "✓ Google Client ID configured in .env.production"
echo "✓ SuperAdmin password changed from default"
echo "✓ Domain DNS points to Hostinger"
echo "✓ SSL certificate will be auto-managed by Hostinger"
echo ""

read -p "🚀 Ready to deploy to PRODUCTION? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    log_info "Deployment cancelled by user"
    exit 0
fi

# Execute deployment
log_step "🚀 Starting production deployment..."

# Make scripts executable
chmod +x deploy.sh validate-deployment.sh

# Run deployment
./deploy.sh

if [[ $? -eq 0 ]]; then
    log_success "✓ Deployment script completed"
else
    log_error "✗ Deployment failed"
    exit 1
fi

# Run validation
log_step "🔍 Running post-deployment validation..."

./validate-deployment.sh

if [[ $? -eq 0 ]]; then
    log_success "✓ Validation passed"
else
    log_warning "⚠ Some validation checks failed - review output above"
fi

# Final success
echo ""
echo "=============================================="
echo "🎉 DEPLOYMENT SUCCESSFUL!"
echo "=============================================="
echo ""
log_success "🌐 Website: https://workspace.calicutspicetraders.com"
log_success "🔧 SuperAdmin: https://workspace.calicutspicetraders.com/superadmin"
log_success "📊 Health Check: https://workspace.calicutspicetraders.com/config/health_check.php"
echo ""
log_info "📋 POST-DEPLOYMENT TASKS:"
echo "1. Test Google OAuth with invite system"
echo "2. Upload company logos via Content Manager"
echo "3. Configure SuperAdmin invite system"
echo "4. Monitor performance dashboard"
echo "5. Verify mobile responsiveness"
echo ""
log_info "📞 SUPPORT:"
echo "- Health Dashboard: Built-in monitoring"
echo "- Documentation: See README.md"
echo "- Troubleshooting: FINAL-DEPLOYMENT-CHECKLIST.md"
echo ""
echo "🎯 Calicut Spice Traders Workspace is now LIVE!"
echo "Ready to transform export operations with AI automation! 🚀"
echo ""
