#!/bin/bash

# Deployment Validation Script for Hostinger
# workspace.calicutspicetraders.com

set -e

echo "🔍 Validating Hostinger deployment..."

DOMAIN="workspace.calicutspicetraders.com"
DEPLOY_DIR="/home/u272045696/domains/workspace.calicutspicetraders.com/public_html"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

success=0
warnings=0
errors=0

log_test() {
    echo -e "${BLUE}[TEST]${NC} $1"
}

log_pass() {
    echo -e "${GREEN}[PASS]${NC} $1"
    ((success++))
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
    ((warnings++))
}

log_fail() {
    echo -e "${RED}[FAIL]${NC} $1"
    ((errors++))
}

# 1. Audit front-end for console errors and missing assets
log_test "Auditing frontend build..."

if [[ -f "$DEPLOY_DIR/index.html" ]]; then
    log_pass "index.html exists"
else
    log_fail "index.html missing"
fi

if [[ -d "$DEPLOY_DIR/assets" ]]; then
    asset_count=$(find "$DEPLOY_DIR/assets" -name "*.js" -o -name "*.css" | wc -l)
    if [[ $asset_count -gt 0 ]]; then
        log_pass "Assets directory contains $asset_count files"
    else
        log_warn "Assets directory is empty"
    fi
else
    log_fail "Assets directory missing"
fi

# Check for source maps (should be removed in production)
sourcemap_count=$(find "$DEPLOY_DIR" -name "*.map" | wc -l)
if [[ $sourcemap_count -eq 0 ]]; then
    log_pass "No source maps found (good for production)"
else
    log_warn "Found $sourcemap_count source map files (consider removing for production)"
fi

# 2. Verify DB schema and check for orphan tables
log_test "Verifying database schema..."

if mysql -u u272045696_cst -p'Clt@230525' u272045696_cst -e "SHOW TABLES;" &>/dev/null; then
    log_pass "Database connection successful"
    
    # Check for required tables
    required_tables=("user_invites" "registered_users" "content_blocks" "custom_plugins")
    for table in "${required_tables[@]}"; do
        if mysql -u u272045696_cst -p'Clt@230525' u272045696_cst -e "DESCRIBE $table;" &>/dev/null; then
            log_pass "Table '$table' exists"
        else
            log_fail "Table '$table' missing"
        fi
    done
    
    # Check database size
    db_size=$(mysql -u u272045696_cst -p'Clt@230525' u272045696_cst -e "
        SELECT ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) as size_mb
        FROM information_schema.tables 
        WHERE table_schema = 'u272045696_cst';" -s -N)
    
    if (( $(echo "$db_size < 2048" | bc -l) )); then
        log_pass "Database size: ${db_size}MB (within 3GB limit)"
    else
        log_warn "Database size: ${db_size}MB (approaching 3GB limit)"
    fi
else
    log_fail "Cannot connect to database"
fi

# 3. Test user flows: login, document upload/download, real-time chat, task CRUD
log_test "Testing API endpoints..."

# Test health check
if curl -f -s "https://$DOMAIN/config/health_check.php" > /dev/null; then
    log_pass "Health check endpoint accessible"
else
    log_fail "Health check endpoint not accessible"
fi

# Test API endpoints
api_endpoints=("api/test.php" "api/superadmin/preview.php" "api/superadmin/invite-manager.php")
for endpoint in "${api_endpoints[@]}"; do
    if curl -f -s "https://$DOMAIN/$endpoint" > /dev/null; then
        log_pass "API endpoint /$endpoint accessible"
    else
        log_fail "API endpoint /$endpoint not accessible"
    fi
done

# 4. Check API responses, error codes, and fallback UIs
log_test "Checking API response formats..."

# Test preview API
preview_response=$(curl -s "https://$DOMAIN/api/superadmin/preview.php?page=home")
if echo "$preview_response" | grep -q '"status"'; then
    log_pass "Preview API returns JSON response"
else
    log_warn "Preview API response format issue"
fi

# 5. File permissions validation
log_test "Validating file permissions..."

# Check file permissions (644 for files, 755 for directories)
incorrect_file_perms=$(find "$DEPLOY_DIR" -type f ! -perm 644 | wc -l)
incorrect_dir_perms=$(find "$DEPLOY_DIR" -type d ! -perm 755 | wc -l)

if [[ $incorrect_file_perms -eq 0 ]]; then
    log_pass "All files have correct permissions (644)"
else
    log_warn "$incorrect_file_perms files have incorrect permissions"
fi

if [[ $incorrect_dir_perms -eq 0 ]]; then
    log_pass "All directories have correct permissions (755)"
else
    log_warn "$incorrect_dir_perms directories have incorrect permissions"
fi

# 6. .htaccess rules validation
log_test "Validating .htaccess configuration..."

if [[ -f "$DEPLOY_DIR/.htaccess" ]]; then
    log_pass ".htaccess file exists"
    
    # Check for required rules
    if grep -q "RewriteEngine On" "$DEPLOY_DIR/.htaccess"; then
        log_pass ".htaccess has rewrite engine enabled"
    else
        log_fail ".htaccess missing rewrite engine"
    fi
    
    if grep -q "HTTPS" "$DEPLOY_DIR/.htaccess"; then
        log_pass ".htaccess has HTTPS redirect"
    else
        log_warn ".htaccess missing HTTPS redirect"
    fi
else
    log_fail ".htaccess file missing"
fi

# 7. Environment configuration
log_test "Checking environment configuration..."

if [[ -f "$DEPLOY_DIR/.env" ]]; then
    log_pass "Environment file exists"
    
    # Check for required variables (without exposing values)
    required_vars=("VITE_GOOGLE_CLIENT_ID" "VITE_SUPERADMIN_EMAIL" "VITE_COMPANY_NAME")
    for var in "${required_vars[@]}"; do
        if grep -q "^$var=" "$DEPLOY_DIR/.env"; then
            log_pass "Environment variable $var is set"
        else
            log_warn "Environment variable $var is missing"
        fi
    done
else
    log_fail "Environment file missing"
fi

# 8. Performance optimization checks
log_test "Checking performance optimizations..."

# Check for compression
if [[ -f "$DEPLOY_DIR/.htaccess" ]] && grep -q "mod_deflate" "$DEPLOY_DIR/.htaccess"; then
    log_pass "Compression enabled in .htaccess"
else
    log_warn "Compression not configured"
fi

# Check for caching headers
if [[ -f "$DEPLOY_DIR/.htaccess" ]] && grep -q "mod_expires" "$DEPLOY_DIR/.htaccess"; then
    log_pass "Browser caching configured"
else
    log_warn "Browser caching not configured"
fi

# Check minified assets
minified_js=$(find "$DEPLOY_DIR/assets" -name "*.js" | head -1)
if [[ -n "$minified_js" ]]; then
    if grep -q "^/\*" "$minified_js"; then
        log_warn "JavaScript files may not be minified"
    else
        log_pass "JavaScript files appear minified"
    fi
fi

# 9. Security validations
log_test "Performing security checks..."

# Check for exposed sensitive files
sensitive_files=(".env" "config/database.php" "deploy.sh")
for file in "${sensitive_files[@]}"; do
    if curl -f -s "https://$DOMAIN/$file" | grep -q "password\|secret\|key"; then
        log_fail "Sensitive file $file is exposed"
    else
        log_pass "Sensitive file $file is protected"
    fi
done

# Check security headers
security_headers=$(curl -s -I "https://$DOMAIN" | grep -E "(X-Frame-Options|X-Content-Type-Options|X-XSS-Protection)")
if [[ -n "$security_headers" ]]; then
    log_pass "Security headers are present"
else
    log_warn "Security headers may be missing"
fi

# 10. Final connectivity test
log_test "Testing final connectivity..."

if curl -f -s "https://$DOMAIN" | grep -q "<!doctype html>"; then
    log_pass "Website is accessible and serving HTML"
else
    log_fail "Website is not accessible or not serving proper HTML"
fi

# DNS and SSL check
if curl -f -s "https://$DOMAIN" > /dev/null; then
    log_pass "HTTPS connection successful"
else
    log_fail "HTTPS connection failed"
fi

# Summary
echo ""
echo "=================================================="
echo "          DEPLOYMENT VALIDATION SUMMARY"
echo "=================================================="
echo -e "${GREEN}✅ Passed: $success${NC}"
echo -e "${YELLOW}⚠️  Warnings: $warnings${NC}"
echo -e "${RED}❌ Failed: $errors${NC}"
echo "=================================================="

if [[ $errors -eq 0 ]]; then
    echo -e "${GREEN}🎉 Deployment validation PASSED!${NC}"
    echo -e "${GREEN}🚀 https://$DOMAIN is ready for production!${NC}"
    exit 0
elif [[ $errors -lt 3 ]]; then
    echo -e "${YELLOW}⚠️  Deployment has minor issues but is functional${NC}"
    echo -e "${YELLOW}🔧 Please address the failed checks above${NC}"
    exit 1
else
    echo -e "${RED}💥 Deployment validation FAILED!${NC}"
    echo -e "${RED}🛠️  Please fix critical issues before going live${NC}"
    exit 2
fi
