#!/bin/bash

# Hostinger Deployment Script for Calicut Spice Traders Workspace
# Domain: workspace.calicutspicetraders.com

set -e  # Exit on any error

echo "🚀 Starting Hostinger deployment for workspace.calicutspicetraders.com"

# Configuration
DOMAIN="workspace.calicutspicetraders.com"
APP_NAME="Calicut Spice Traders Workspace"
DB_NAME="u272045696_cst"
BACKUP_DIR="/home/u272045696/backups"
DEPLOY_DIR="/home/u272045696/domains/workspace.calicutspicetraders.com/public_html"

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

# Check if running on Hostinger
check_environment() {
    log_info "Checking Hostinger environment..."
    
    if [[ ! -d "/home/u272045696" ]]; then
        log_error "Not running on Hostinger environment"
        exit 1
    fi
    
    log_success "Hostinger environment confirmed"
}

# Create backup before deployment
create_backup() {
    log_info "Creating backup..."
    
    # Create backup directory
    mkdir -p "$BACKUP_DIR/$(date +%Y%m%d_%H%M%S)"
    BACKUP_PATH="$BACKUP_DIR/$(date +%Y%m%d_%H%M%S)"
    
    # Backup database
    if command -v mysqldump &> /dev/null; then
        log_info "Backing up database: $DB_NAME"
        mysqldump -u u272045696_cst -p'Clt@230525' u272045696_cst > "$BACKUP_PATH/database_backup.sql" 2>/dev/null || log_warning "Database backup failed (may not exist yet)"
    fi
    
    # Backup current files
    if [[ -d "$DEPLOY_DIR" ]]; then
        log_info "Backing up current files..."
        tar -czf "$BACKUP_PATH/files_backup.tar.gz" -C "$DEPLOY_DIR" . 2>/dev/null || log_warning "File backup failed"
    fi
    
    log_success "Backup created at: $BACKUP_PATH"
}

# Build frontend assets
build_frontend() {
    log_info "Building frontend assets..."
    
    # Check if node_modules exists
    if [[ ! -d "node_modules" ]]; then
        log_info "Installing dependencies..."
        npm install --production
    fi
    
    # Copy production environment
    cp .env.production .env
    
    # Build for production
    log_info "Building React application..."
    npm run build
    
    # Verify build output
    if [[ ! -d "dist" ]]; then
        log_error "Build failed - dist directory not found"
        exit 1
    fi
    
    log_success "Frontend build completed"
}

# Deploy files to Hostinger
deploy_files() {
    log_info "Deploying files to Hostinger..."
    
    # Create deployment directory if it doesn't exist
    mkdir -p "$DEPLOY_DIR"
    
    # Copy built frontend files
    log_info "Copying frontend files..."
    cp -r dist/* "$DEPLOY_DIR/"
    
    # Copy API files
    log_info "Copying API files..."
    cp -r api "$DEPLOY_DIR/"
    cp -r config "$DEPLOY_DIR/"
    
    # Copy configuration files
    cp .htaccess "$DEPLOY_DIR/"
    cp .env.production "$DEPLOY_DIR/.env"
    
    # Set proper permissions
    log_info "Setting file permissions..."
    find "$DEPLOY_DIR" -type f -exec chmod 644 {} \;
    find "$DEPLOY_DIR" -type d -exec chmod 755 {} \;
    
    # Make API files executable
    chmod 755 "$DEPLOY_DIR/api"/*.php
    
    log_success "Files deployed successfully"
}

# Run database migrations
run_migrations() {
    log_info "Running database migrations..."
    
    # Check if we can connect to database
    if mysql -u u272045696_cst -p'Clt@230525' -e "USE u272045696_cst;" 2>/dev/null; then
        log_info "Database connection successful"
        
        # Run migration script
        php -f "$DEPLOY_DIR/config/run_migrations.php" 2>/dev/null || log_warning "Migration script not found or failed"
        
        log_success "Database migrations completed"
    else
        log_warning "Could not connect to database - migrations skipped"
    fi
}

# Optimize for Hostinger
optimize_for_hostinger() {
    log_info "Applying Hostinger optimizations..."
    
    # Create optimized PHP configuration
    cat > "$DEPLOY_DIR/.user.ini" << EOF
; Hostinger PHP optimizations
memory_limit = 1536M
max_execution_time = 60
upload_max_filesize = 50M
post_max_size = 50M
max_input_vars = 3000
display_errors = Off
log_errors = On
error_log = error.log
session.gc_maxlifetime = 3600
opcache.enable = 1
opcache.memory_consumption = 128
opcache.max_accelerated_files = 4000
opcache.revalidate_freq = 60
EOF
    
    # Create robots.txt for SEO
    cat > "$DEPLOY_DIR/robots.txt" << EOF
User-agent: *
Allow: /
Sitemap: https://workspace.calicutspicetraders.com/sitemap.xml
EOF
    
    # Create sitemap.xml
    cat > "$DEPLOY_DIR/sitemap.xml" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://workspace.calicutspicetraders.com/</loc>
        <lastmod>$(date +%Y-%m-%d)</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
</urlset>
EOF
    
    log_success "Hostinger optimizations applied"
}

# Health check
run_health_check() {
    log_info "Running health checks..."
    
    # Check if site is accessible
    if curl -f -s "https://$DOMAIN" > /dev/null; then
        log_success "Website is accessible"
    else
        log_warning "Website may not be accessible yet (DNS propagation needed)"
    fi
    
    # Check API endpoints
    if curl -f -s "https://$DOMAIN/api/test.php" > /dev/null; then
        log_success "API endpoints are working"
    else
        log_warning "API endpoints may not be working"
    fi
    
    # Check database connection
    if php -f "$DEPLOY_DIR/config/health_check.php" 2>/dev/null; then
        log_success "Database connection is working"
    else
        log_warning "Database connection may have issues"
    fi
}

# Cleanup old files
cleanup() {
    log_info "Cleaning up temporary files..."
    
    # Remove old backups (keep only last 5)
    if [[ -d "$BACKUP_DIR" ]]; then
        ls -1t "$BACKUP_DIR" | tail -n +6 | xargs -I {} rm -rf "$BACKUP_DIR/{}" 2>/dev/null || true
    fi
    
    # Clear any temporary files
    rm -f "$DEPLOY_DIR"/.env.* 2>/dev/null || true
    
    log_success "Cleanup completed"
}

# Generate deployment report
generate_report() {
    local deploy_time=$(date)
    local git_commit=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")
    
    cat > "$DEPLOY_DIR/deployment_info.json" << EOF
{
    "deployment_date": "$deploy_time",
    "git_commit": "$git_commit",
    "domain": "$DOMAIN",
    "app_name": "$APP_NAME",
    "database": "$DB_NAME",
    "php_version": "$(php -v | head -n1)",
    "status": "deployed"
}
EOF
    
    log_success "Deployment report generated"
}

# Main deployment process
main() {
    log_info "=========================================="
    log_info "  $APP_NAME - Hostinger Deployment"
    log_info "=========================================="
    
    check_environment
    create_backup
    build_frontend
    deploy_files
    run_migrations
    optimize_for_hostinger
    run_health_check
    cleanup
    generate_report
    
    log_success "=========================================="
    log_success "  Deployment completed successfully!"
    log_success "  Domain: https://$DOMAIN"
    log_success "  Time: $(date)"
    log_success "=========================================="
}

# Run deployment
main "$@"
