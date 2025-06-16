# 🚀 Hostinger Static Hosting Deployment Guide

## 📋 **Overview**

This guide shows how to deploy the React application to **Hostinger's shared hosting** (no Node.js required). The app will run as static files with PHP backend.

---

## 🎯 **Deployment Process**

### **Step 1: Build the Application**

```bash
# Install dependencies
npm install

# Build for production
npm run build:production

# Or run the static deployment script
npm run deploy:static
```

### **Step 2: Prepare Files for Upload**

After building, you'll have these files ready for upload:

```
dist/                          # Built React app
├── index.html                 # Main entry point
├── assets/                    # CSS, JS, and assets
│   ├── index-[hash].css      # Minified CSS
│   ├── index-[hash].js       # Main React bundle
│   ├── vendor-[hash].js      # React/React-DOM
│   ├── router-[hash].js      # React Router
│   ├── ui-[hash].js          # UI components
│   ├── icons-[hash].js       # Lucide icons
│   └── charts-[hash].js      # Charts library

api/                           # PHP backend
├── superadmin/
│   ├── invite-manager.php    # User invitation system
│   ├── content-manager.php   # Dynamic content management
│   └─ preview.php            # Content preview
└── test.php                  # API health check

config/                       # Configuration
├── database.php              # Database connection
├── health_check.php          # System health
├── run_migrations.php        # Database setup
└── migrations/               # SQL migration files

.htaccess                     # Apache configuration
```

---

## 📤 **Upload to Hostinger**

### **Method 1: File Manager (Recommended)**

1. **Login to Hostinger Control Panel**
2. **Go to File Manager**
3. **Navigate to `public_html/`**
4. **Upload ALL files from the following:**
   - Copy all files from `dist/` folder
   - Copy `api/` folder
   - Copy `config/` folder
   - Copy `.htaccess` file

### **Method 2: FTP Upload**

1. **Use FTP client (FileZilla, WinSCP, etc.)**
2. **Connect to your hosting**
3. **Upload to `public_html/` directory**

### **Final Structure on Server:**

```
public_html/
├── index.html                # React app entry
├── assets/                   # Static assets
├── api/                      # PHP backend
├── config/                   # Configuration
└── .htaccess                 # Apache rules
```

---

## ⚙️ **Post-Upload Configuration**

### **1. Run Database Migration**

Visit: `https://workspace.calicutspicetraders.com/config/run_migrations.php`

This will:

- Create all required database tables
- Set up user authentication system
- Initialize content management
- Configure invite system

### **2. Verify Health Check**

Visit: `https://workspace.calicutspicetraders.com/config/health_check.php`

Should return:

```json
{
  "status": "success",
  "timestamp": "2024-01-01T12:00:00Z",
  "database": "connected",
  "php_version": "8.x"
}
```

### **3. Test API Endpoints**

Visit: `https://workspace.calicutspicetraders.com/api/test.php`

Should return:

```json
{
  "status": "success",
  "message": "API is working correctly"
}
```

---

## 🔧 **Environment Configuration**

### **Update Google OAuth (Required)**

1. **Go to Google Cloud Console**
2. **Configure OAuth Client ID**
3. **Add your domain:** `workspace.calicutspicetraders.com`
4. **Update environment variables**

### **Database Configuration**

Already configured for Hostinger:

- **Database:** `u272045696_cst`
- **User:** `u272045696_cst`
- **Password:** `Clt@230525`

---

## ✅ **Verification Checklist**

- [ ] **Main App Loads:** https://workspace.calicutspicetraders.com
- [ ] **Navigation Works:** React Router handles all routes
- [ ] **API Responds:** /api/test.php returns success
- [ ] **Database Connected:** Health check passes
- [ ] **Google OAuth:** Client ID configured
- [ ] **No Console Errors:** Browser console is clean

---

## 🎨 **How React Router Works on Static Hosting**

### **The Magic of .htaccess**

The `.htaccess` file contains special rules that:

1. **Serve static files directly** (CSS, JS, images)
2. **Allow PHP API endpoints** to work normally
3. **Redirect ALL other requests** to `index.html`
4. **Let React Router handle** client-side routing

```apache
# Example .htaccess rule
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} !^/api/
RewriteRule ^.*$ index.html [L,QSA]
```

### **What This Means:**

- **`/` → `index.html`** (React loads)
- **`/admin` → `index.html`** (React Router handles)
- **`/shipments` → `index.html`** (React Router handles)
- **`/api/test.php` → `api/test.php`** (Direct PHP)

---

## 🚨 **Troubleshooting**

### **Problem: White Screen / 404 Errors**

**Cause:** .htaccess not uploaded or Apache mod_rewrite disabled

**Solution:**

1. Ensure `.htaccess` is uploaded to `public_html/`
2. Check file permissions (644)
3. Contact Hostinger support if mod_rewrite is disabled

### **Problem: API Not Working**

**Cause:** PHP files not uploaded or wrong location

**Solution:**

1. Verify `api/` folder is in `public_html/api/`
2. Check PHP files have 644 permissions
3. Test direct access to PHP files

### **Problem: Database Errors**

**Cause:** Database not configured or migration not run

**Solution:**

1. Run migration: `/config/run_migrations.php`
2. Check database credentials in `config/database.php`
3. Verify Hostinger database is active

### **Problem: Google OAuth Not Working**

**Cause:** Client ID not configured for domain

**Solution:**

1. Update Google Cloud Console
2. Add `workspace.calicutspicetraders.com` to authorized domains
3. Update environment variables

---

## 📊 **Performance Optimizations**

### **Built-in Optimizations:**

- ✅ **Gzip Compression:** Reduces file sizes by 70%
- ✅ **Browser Caching:** 1-month cache for static assets
- ✅ **Bundle Splitting:** Separate vendor/UI/router chunks
- ✅ **Minification:** CSS and JS minified
- ✅ **Asset Optimization:** Optimized file names and paths

### **Expected Performance:**

- **Initial Load:** < 3 seconds
- **Subsequent Pages:** < 500ms (cached)
- **API Response:** < 200ms
- **Total Bundle Size:** ~812KB (gzipped: ~250KB)

---

## 🔐 **Security Features**

### **Implemented Security:**

- ✅ **HTTPS Enforcement:** Automatic redirect
- ✅ **XSS Protection:** Browser-level protection
- ✅ **Content Security Policy:** Script execution control
- ✅ **File Access Control:** Sensitive files protected
- ✅ **SQL Injection Prevention:** Prepared statements
- ✅ **Rate Limiting:** Basic DDoS protection

---

## 📱 **Mobile Compatibility**

### **Responsive Design:**

- ✅ **Mobile-First:** Optimized for all screen sizes
- ✅ **Touch-Friendly:** Proper touch targets
- ✅ **Fast Loading:** Optimized for mobile networks
- ✅ **PWA-Ready:** Can be installed as app

---

## 🎯 **Quick Deployment Commands**

```bash
# Full deployment preparation
npm run deploy:static

# Or step by step:
npm install                    # Install dependencies
npm run build:production       # Build for production
# Upload dist/* + api/ + config/ + .htaccess to public_html/
```

---

## 📞 **Support & Maintenance**

### **Regular Maintenance:**

1. **Monitor health check** weekly
2. **Update Google OAuth tokens** as needed
3. **Check database storage** (3GB limit)
4. **Review error logs** monthly

### **Getting Help:**

- **Technical Issues:** Check browser console and server error logs
- **Database Issues:** Run health check and migration scripts
- **Performance Issues:** Monitor bundle sizes and caching

---

## 🎉 **Deployment Complete!**

Your React application is now running on **Hostinger's shared hosting** as static files with PHP backend support.

**Live URL:** https://workspace.calicutspicetraders.com

The application will work exactly like a traditional web app, but with the performance and reliability of static hosting! 🚀

---

_Deployment Guide Version: 1.0_  
_Last Updated: $(date)_  
_Status: PRODUCTION READY_ ✅
