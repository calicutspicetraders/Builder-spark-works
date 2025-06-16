# 🚀 Hostinger Deployment Guide for Calicut Spice Traders Workspace

This guide provides step-by-step instructions to deploy your modern workspace application on Hostinger hosting service.

## 📋 Prerequisites

- Hostinger Premium hosting account
- Access to File Manager or FTP
- Your subdomain: `workspace.calicutspicetraders.com`
- Node.js knowledge (for local builds)

## 🔧 Deployment Options

### Option 1: Static Build Deployment (Recommended)

#### Step 1: Build the Application Locally

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Build the production version:**

   ```bash
   npm run build
   ```

3. **Test the build locally:**
   ```bash
   npm run preview
   ```

#### Step 2: Upload to Hostinger

1. **Access Hostinger File Manager:**

   - Login to your Hostinger control panel
   - Navigate to "File Manager"
   - Go to `public_html/workspace/` (create this folder if it doesn't exist)

2. **Upload build files:**

   - Upload all contents from the `dist/` folder to `public_html/workspace/`
   - Ensure `index.html` is in the root of the workspace folder

3. **Configure subdomain:**
   - In Hostinger control panel, go to "Subdomains"
   - Create subdomain: `workspace.calicutspicetraders.com`
   - Point it to `/public_html/workspace/`

### Option 2: Direct File Upload (Alternative)

If you prefer to work directly with source files:

1. **Upload source files:**

   ```
   public_html/workspace/
   ├── index.html
   ├── assets/
   │   ├── css/
   │   └── js/
   └── public/
   ```

2. **Ensure proper file structure:**
   - Main HTML file should be `index.html`
   - CSS and JS files in `assets/` folder
   - Images and other assets in `public/` folder

## 🌐 Hostinger Configuration

### 1. Create .htaccess file

Create a `.htaccess` file in your `public_html/workspace/` directory:

```apache
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

# Handle client-side routing
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"
</IfModule>
```

### 2. SSL Certificate Setup

1. **Enable SSL in Hostinger:**

   - Go to "SSL" section in control panel
   - Enable SSL for your subdomain
   - Choose "Free SSL" or upload custom certificate

2. **Force HTTPS redirect:**
   Add to your `.htaccess`:
   ```apache
   # Force HTTPS
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

## 📁 File Structure on Hostinger

Your final structure should look like:

```
public_html/workspace/
├── index.html                 # Main application file
├── .htaccess                 # Apache configuration
├── assets/
│   ├── index-[hash].js       # Main JS bundle
│   ├── index-[hash].css      # Main CSS bundle
│   └── ...
├── public/
│   ├── robots.txt
│   ├── placeholder.svg
│   └── ...
└── favicon.ico
```

## 🔗 Domain & DNS Configuration

### Setting up the Subdomain

1. **In Hostinger Control Panel:**

   - Navigate to "Domains" → "Subdomains"
   - Click "Create Subdomain"
   - Enter: `workspace`
   - Domain: `calicutspicetraders.com`
   - Document Root: `/public_html/workspace`

2. **DNS Propagation:**
   - Changes may take 24-48 hours to propagate globally
   - Use tools like `nslookup` or online DNS checkers to verify

## 🛠️ Database Setup (Optional)

If you plan to add backend functionality later:

1. **Create MySQL Database:**

   - Go to "Databases" → "MySQL Databases"
   - Create database: `u272045696_workspace`
   - Create user with appropriate permissions

2. **Database Configuration:**
   ```php
   <?php
   $host = 'localhost';
   $dbname = 'u272045696_workspace';
   $username = 'u272045696_user';
   $password = 'your_password';
   ?>
   ```

## 📊 Performance Optimization

### 1. Enable Compression

The `.htaccess` file above includes compression settings.

### 2. Image Optimization

- Compress images before upload
- Use WebP format when possible
- Implement lazy loading for large images

### 3. CDN Integration (Optional)

Consider using Cloudflare (free tier) for:

- Better performance
- Additional security
- Analytics

## 🔍 Testing & Verification

### 1. Functionality Tests

After deployment, test:

- [ ] Homepage loads correctly
- [ ] Navigation works on all pages
- [ ] Video call functionality (camera/microphone access)
- [ ] Document generator works
- [ ] Chat interface functions properly
- [ ] All buttons are responsive
- [ ] Mobile responsiveness

### 2. Performance Tests

Use tools like:

- Google PageSpeed Insights
- GTmetrix
- Pingdom

### 3. Browser Compatibility

Test on:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🚨 Common Issues & Solutions

### Issue 1: 404 Errors on Page Refresh

**Solution:** Ensure `.htaccess` rewrite rules are properly configured.

### Issue 2: Assets Not Loading

**Solution:** Check file paths and ensure proper upload of `assets/` folder.

### Issue 3: HTTPS Mixed Content

**Solution:** Ensure all resources are loaded over HTTPS.

### Issue 4: Video Call Not Working

**Solution:**

- HTTPS is required for camera/microphone access
- Check browser permissions
- Verify SSL certificate is properly installed

## 📱 Mobile Optimization

### Responsive Design Verification

- Test on various screen sizes
- Ensure touch targets are adequate (44px minimum)
- Verify mobile navigation works properly

### Performance on Mobile

- Optimize images for mobile
- Minimize JavaScript bundle size
- Use appropriate viewport meta tag

## 🔐 Security Considerations

### 1. File Permissions

Set appropriate file permissions:

- Folders: 755
- Files: 644
- Sensitive files: 600

### 2. Security Headers

The `.htaccess` includes security headers. Additional recommendations:

- Regular backups
- Keep software updated
- Monitor for unauthorized access

## 📈 Analytics & Monitoring

### Setup Google Analytics (Optional)

Add to your `index.html`:

```html
<!-- Google Analytics -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "GA_MEASUREMENT_ID");
</script>
```

## 🎯 Post-Deployment Checklist

- [ ] Subdomain accessible via HTTPS
- [ ] All pages load correctly
- [ ] Navigation between pages works
- [ ] Video call functionality tested
- [ ] Document generation works
- [ ] Chat interface functional
- [ ] Mobile responsiveness verified
- [ ] Performance optimization applied
- [ ] Security headers configured
- [ ] Analytics setup (if desired)
- [ ] Backup strategy in place

## 🆘 Support & Maintenance

### Regular Maintenance Tasks

1. **Weekly:**

   - Check website functionality
   - Monitor performance metrics

2. **Monthly:**

   - Update dependencies (if using dynamic features)
   - Review security logs
   - Backup files

3. **Quarterly:**
   - Performance optimization review
   - Security audit
   - User experience improvements

### Hostinger Support

- 24/7 Live Chat support
- Knowledge base: help.hostinger.com
- Community forum
- Email support

---

## 🎉 Deployment Complete!

Your Calicut Spice Traders workspace is now live at:
**https://workspace.calicutspicetraders.com**

The application includes:

- ✅ Modern glassmorphism design
- ✅ Fully functional video calling
- ✅ AI-powered document generation
- ✅ Real-time communication hub
- ✅ Responsive mobile design
- ✅ All mock data removed
- ✅ Production-ready codebase

For any issues or questions, refer to this guide or contact your development team.

---

_Last updated: December 2024_
_Version: 1.0.0_
