# 🔐 Complete Login Guide - Calicut Spice Traders Workspace

## How to Log Into the Platform

### 📋 **Quick Answer**

- **Existing Users**: Visit any page → Login screen appears → Click "Sign in with Google"
- **New Users**: Need invitation code from admin → Use Google OAuth
- **SuperAdmins**: Use `/superadmin/login` with email/password

---

## 👥 **For Regular Users & Admins**

### **🔄 Returning Users (Already Have Access)**

1. **Go to the platform** (any URL like `/admin`, `/shipments`, etc.)
2. **Login page appears automatically** (modern shipping container design)
3. **Look for "Sign in with Google" button** (always visible now)
4. **Click the Google button** → Opens Google OAuth popup
5. **Choose your Google account** → Automatically logged in
6. **Redirected to dashboard** → Full access to all features

**Note**: You don't need an invitation code if you're already approved!

### **🆕 New Users (First Time Access)**

#### **With Invitation Code**:

1. **Admin sends you a link** like: `platform.com/login?invite=ABC123`
2. **Click the invitation link** → Opens special welcome page
3. **See personalized welcome** with your role/department
4. **Click "Sign up with Google"** → Complete Google OAuth
5. **Account automatically created** → Full platform access

#### **Without Invitation Code**:

1. **Visit the platform** → See login page
2. **Try "Sign in with Google"** → May work if pre-approved
3. **If access denied** → Contact admin using the contact button
4. **Admin sends invitation** → Follow invitation process above

---

## 👑 **For SuperAdmins (System Administrators)**

### **Different Login System**:

1. **Go to main login page** (`/login`)
2. **Click "Administrator Login"** at the bottom
3. **Redirected to** `/superadmin/login`
4. **Enter email and password** (not Google OAuth)
5. **Click "Sign In"** → Access SuperAdmin dashboard

**SuperAdmin Features**:

- Manage all user invitations
- System configuration
- Content management
- Full platform administration

---

## 🔧 **Invitation System (For Admins)**

### **How Admins Invite New Users**:

1. **Log into SuperAdmin** (`/superadmin/login`)
2. **Go to "Invite Manager"** → Create new invitation
3. **Fill user details**: Name, email, role, department
4. **Send invitation link** → User receives special URL
5. **User clicks link** → Completes registration with Google

### **Invitation Link Format**:

```
https://yourplatform.com/login?invite=UNIQUE_CODE_123
```

---

## 🛡️ **Security & Access Control**

### **Who Can Access What**:

- ✅ **Invited Users**: Full workspace access after Google OAuth
- ✅ **Admin Users**: Same as users + admin privileges
- ✅ **SuperAdmins**: System administration via separate login
- ❌ **Non-invited**: Cannot access platform (secure)

### **How Access is Verified**:

1. **Google OAuth**: Verifies identity with Google
2. **Database Check**: Confirms user is in approved list
3. **Role Assignment**: Determines permissions level
4. **Session Management**: Maintains secure login state

---

## 📱 **Login on Different Devices**

### **Desktop/Laptop**:

- Full-featured login page with shipping imagery
- Large Google OAuth button
- Easy navigation and clear messaging

### **Mobile/Tablet**:

- Responsive design adapts automatically
- Touch-friendly Google login button
- Optimized layout for small screens

### **All Devices**:

- Same security and functionality
- Session persists across devices
- Logout works on all platforms

---

## 🔄 **What Happens After Login**

### **First Login (New Users)**:

1. **Account setup** → Profile information saved
2. **Dashboard access** → See main workspace
3. **Feature discovery** → Access all tools
4. **Settings available** → Customize preferences

### **Return Login (Existing Users)**:

1. **Immediate access** → Straight to dashboard
2. **Previous session** → Picks up where left off
3. **All data available** → Projects, documents, etc.
4. **Notifications** → See any updates

---

## ❓ **Troubleshooting Common Issues**

### **"Access Denied" Error**:

- **Solution**: Contact admin for invitation
- **Check**: Are you using the right Google account?
- **Verify**: Did admin approve your email address?

### **Google Login Not Working**:

- **Try**: Different browser or incognito mode
- **Check**: Pop-up blockers disabled
- **Ensure**: Google account is accessible

### **Invitation Link Expired**:

- **Contact**: Admin to resend invitation
- **Check**: Link format is correct
- **Verify**: Invitation code is valid

### **Can't Find Login Page**:

- **Visit**: Any protected route (redirects to login)
- **Direct**: Go to `/login` manually
- **SuperAdmin**: Use `/superadmin/login` for admins

---

## 🎯 **Quick Reference**

| User Type        | Login URL            | Method         | Requirements          |
| ---------------- | -------------------- | -------------- | --------------------- |
| **Regular User** | `/login` or any page | Google OAuth   | Admin invitation      |
| **Admin User**   | `/login` or any page | Google OAuth   | Admin privileges      |
| **SuperAdmin**   | `/superadmin/login`  | Email/Password | System admin account  |
| **New User**     | `/login?invite=CODE` | Google OAuth   | Valid invitation link |

---

## 📞 **Need Help?**

- **Technical Issues**: Contact your system administrator
- **Access Requests**: Use "Contact Administrator" button on login page
- **Account Problems**: Email admin directly
- **Platform Questions**: Check platform documentation

**Admin Email**: admin@calicutspicetraders.com

---

**🎉 The platform is designed to be intuitive and secure - most users can log in with just one click of the Google button!**
