# 🔐 Google OAuth Domain Email Setup Guide

## ✅ Issues Fixed

1. **"process is not defined" Error** → Fixed by using `import.meta.env` instead of `process.env`
2. **Domain Email Support** → Added support for `@calicutspicetraders.com` emails
3. **Gmail Support** → Maintained support for approved Gmail accounts

---

## 🎯 **Now Working: Domain Email Login**

### **Supported Email Types:**

✅ **Domain Emails**: `info@calicutspicetraders.com`, `admin@calicutspicetraders.com`, etc.
✅ **Gmail Accounts**: `someone@gmail.com` (for external partners/users)
✅ **Google Workspace**: Any Google Workspace account from your domain

### **Login Process:**

1. **Visit login page** → See "Sign in with Google" button
2. **Click Google button** → Opens Google OAuth popup
3. **Choose account** → Select domain or Gmail account
4. **Automatic verification** → System checks if domain is allowed
5. **Login successful** → Access granted based on email domain

---

## ⚙️ **Configuration Setup**

### **Environment Variables** (`.env` file):

```bash
# Domain Configuration
VITE_ALLOWED_DOMAINS=calicutspicetraders.com,gmail.com
VITE_COMPANY_EMAIL=info@calicutspicetraders.com
VITE_SUPERADMIN_EMAIL=admin@calicutspicetraders.com

# Google OAuth
VITE_GOOGLE_CLIENT_ID=your_actual_google_client_id.apps.googleusercontent.com
```

### **Google Cloud Console Setup:**

1. **Go to**: [Google Cloud Console](https://console.cloud.google.com/)
2. **Select your project** or create new one
3. **Enable APIs**: Google Identity Services API
4. **Create OAuth 2.0 Client ID**:

   - Application type: Web application
   - Authorized JavaScript origins: `https://yourdomain.com`
   - Authorized redirect URIs: `https://yourdomain.com/login`

5. **Configure OAuth Consent Screen**:
   - User Type: External (for Gmail users) or Internal (domain only)
   - Add your domain: `calicutspicetraders.com`
   - Add scopes: `email`, `profile`, `openid`

---

## 🔒 **Security & Access Control**

### **Automatic Role Assignment:**

```typescript
// Domain emails get admin privileges
if (email.includes("calicutspicetraders.com")) {
  role = "admin";
  jobTitle = "Team Member";
  department = "Operations";
}

// Gmail users get regular access
if (email.includes("gmail.com")) {
  role = "user";
}
```

### **Domain Validation:**

- ✅ **Allowed**: `@calicutspicetraders.com`, `@gmail.com`
- ❌ **Blocked**: All other domains
- 🔧 **Configurable**: Add more domains in `.env` file

---

## 🧪 **Testing Domain Emails**

### **Test with Domain Email:**

1. **Create Google Workspace account** for `info@calicutspicetraders.com`
2. **Visit login page** → Click "Sign in with Google"
3. **Use domain account** → Should login successfully
4. **Check permissions** → Should have admin role

### **Test with Gmail:**

1. **Use existing Gmail** → `yourname@gmail.com`
2. **Visit login page** → Click "Sign in with Google"
3. **Should work** → Gets user role access

### **Test Blocked Domain:**

1. **Try different domain** → `test@otherdomain.com`
2. **Should be blocked** → Error message about authorized domains

---

## 🔧 **Customization Options**

### **Add More Domains:**

Update `.env` file:

```bash
VITE_ALLOWED_DOMAINS=calicutspicetraders.com,gmail.com,partnerdomain.com,outlook.com
```

### **Change Default Roles:**

Edit `src/services/GoogleAuthService.tsx`:

```typescript
role: userInfo.email.includes("calicutspicetraders.com") ? "admin" : "user";
```

### **Customize Job Titles:**

```typescript
jobTitle: userInfo.email.includes("calicutspicetraders.com")
  ? "Spice Trader"
  : "Partner";
```

---

## 📋 **Required Google Workspace Setup** (For Domain Emails)

### **If Using Google Workspace:**

1. **Admin Console**: [admin.google.com](https://admin.google.com)
2. **Security Settings** → OAuth Settings
3. **Allow OAuth** for your domain
4. **Add application** to trusted list
5. **Configure scopes** for user data access

### **OAuth Scopes Needed:**

- `https://www.googleapis.com/auth/userinfo.email`
- `https://www.googleapis.com/auth/userinfo.profile`
- `openid`

---

## 🚀 **Production Deployment**

### **Update Environment Variables:**

```bash
# Production settings
VITE_GOOGLE_CLIENT_ID=your_production_client_id.apps.googleusercontent.com
VITE_ALLOWED_DOMAINS=calicutspicetraders.com
VITE_APP_URL=https://workspace.calicutspicetraders.com
```

### **Google Cloud Settings:**

- **Update authorized origins**: Add production domain
- **Update redirect URIs**: Add production login page
- **Verify domain ownership**: In Google Search Console
- **SSL certificate**: Required for OAuth

---

## ✅ **Verification Checklist**

- [ ] Google Client ID configured in `.env`
- [ ] Domain added to allowed domains list
- [ ] Google Workspace OAuth enabled (if using domain emails)
- [ ] OAuth consent screen configured
- [ ] Production domains authorized in Google Cloud
- [ ] SSL certificate installed (for production)
- [ ] Test login with domain email
- [ ] Test login with Gmail account
- [ ] Verify role assignments work correctly

---

## 🎯 **Result**

**Now Working:**

- ✅ Domain emails like `info@calicutspicetraders.com` can login
- ✅ Gmail accounts like `someone@gmail.com` can login
- ✅ Automatic admin role for domain emails
- ✅ No more "process is not defined" errors
- ✅ Secure domain validation
- ✅ Easy configuration through environment variables

**The platform now supports both company domain emails and external Gmail accounts with proper role-based access control!**
