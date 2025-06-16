# Google OAuth Integration Setup Guide

This application now includes Google OAuth authentication with SuperAdmin-controlled invite system. Here's how to set it up for production:

## 🔧 Google Cloud Console Setup

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the **Google Identity** service

### 2. Configure OAuth Consent Screen

1. Go to **APIs & Services** → **OAuth consent screen**
2. Choose **External** (for public users) or **Internal** (for organization only)
3. Fill in required information:
   - **App name**: Your Company Name
   - **User support email**: Your support email
   - **Logo**: Upload your company logo
   - **App domain**: Your website domain
   - **Authorized domains**: Add your domain (e.g., `yourcompany.com`)
   - **Developer contact email**: Your contact email

### 3. Create OAuth 2.0 Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth 2.0 Client IDs**
3. Choose **Web application**
4. Configure:

   - **Name**: Your App Name
   - **Authorized JavaScript origins**:
     - `http://localhost:3000` (for development)
     - `https://yourdomain.com` (for production)
   - **Authorized redirect URIs**:
     - `http://localhost:3000` (for development)
     - `https://yourdomain.com` (for production)

5. Copy the **Client ID** (you'll need this for environment variables)

## ⚙️ Environment Configuration

### Update Environment Variables

Add your Google Client ID to your environment files:

```bash
# .env
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com

# Also update company information
VITE_COMPANY_NAME=Your Company Name
VITE_COMPANY_EMAIL=contact@yourcompany.com
```

### Production Environment

For production, ensure you have:

```bash
# Production .env
VITE_GOOGLE_CLIENT_ID=1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com
VITE_SUPERADMIN_EMAIL=admin@yourcompany.com
VITE_SUPERADMIN_PASSWORD=your_very_secure_password
VITE_COMPANY_NAME=Your Company Name
VITE_COMPANY_EMAIL=contact@yourcompany.com
```

## 🎯 How the Invite System Works

### SuperAdmin Workflow

1. **Access Invite Manager**:

   - Login as SuperAdmin
   - Navigate to Dashboard → Invite Manager
   - Or go directly to `/superadmin/invites`

2. **Send Invitations**:

   - Click "Send Invite"
   - Enter user email (required)
   - Fill optional fields: name, department, role
   - Add welcome message
   - Click "Send Invitation"

3. **Manage Invites**:
   - View all pending invitations
   - Copy invite links to share manually
   - Revoke invites if needed
   - Monitor registered users

### User Registration Workflow

1. **Receive Invite**:

   - User receives invite link: `https://yoursite.com/?invite=abc123...`
   - Or email with invitation details

2. **Access Platform**:

   - User clicks invite link
   - Platform validates invitation
   - Shows invitation details and welcome message

3. **Google Authentication**:

   - User clicks "Sign up with Google"
   - Google OAuth popup appears
   - User authenticates with Google account
   - Email must match invitation email

4. **Account Creation**:
   - Platform creates user account
   - Links Google profile to invitation
   - Marks invitation as "accepted"
   - User is logged in and redirected to dashboard

### Access Control

- ❌ **No Invite**: Users see "Access Restricted" message
- ✅ **Valid Invite**: Users can register via Google OAuth
- ⏰ **Expired Invite**: Shows "Invalid or expired invite"
- 🚫 **Revoked Invite**: Shows "Invalid or expired invite"

## 🔒 Security Features

### Invite Security

- **Unique Codes**: Each invite has a unique, random code
- **Email Validation**: User's Google email must match invite email
- **Expiration**: Invites expire after 7 days
- **Single Use**: Once accepted, invite cannot be reused
- **Revocation**: SuperAdmin can revoke pending invites

### User Authentication

- **Google OAuth**: Secure authentication via Google
- **Session Management**: Server-side session tokens
- **Role-Based Access**: User, Admin, SuperAdmin roles
- **Email Verification**: Google handles email verification

## 📊 Database Schema

The system creates these tables automatically:

### user_invites

- Stores invitation details
- Tracks status (pending/accepted/expired/revoked)
- Links to user registration

### registered_users

- User profiles from Google OAuth
- Links to original invitation
- Stores preferences and settings

### user_sessions

- Session token management
- Security tracking (IP, user agent)
- Automatic cleanup of expired sessions

## 🚀 Deployment Steps

### 1. Configure Google OAuth

```bash
# Set up Google Cloud project
# Get OAuth 2.0 Client ID
# Configure authorized domains
```

### 2. Update Environment

```bash
# Update .env with Google Client ID
# Set SuperAdmin credentials
# Configure company information
```

### 3. Database Setup

```bash
# Tables are created automatically
# No manual database setup required
# Ensure proper MySQL permissions
```

### 4. Test the Flow

```bash
# 1. Login as SuperAdmin
# 2. Send test invitation
# 3. Test registration with invite link
# 4. Verify user appears in registered users
```

## 🎨 Customization Options

### Invitation Email Template

Customize the invitation experience by modifying:

- Welcome message in invitation form
- Company branding in environment variables
- Invitation validation messages

### User Interface

The authentication section appears on the homepage when:

- User is not authenticated, OR
- URL contains an invite code (`?invite=abc123`)

### Access Control Messages

Customize messages in:

- `src/components/GoogleLoginButton.tsx`
- `src/pages/DynamicHomepage.tsx`

## 🔧 API Endpoints

### Invite Management

- `GET /api/superadmin/invite-manager.php` - List invites
- `POST /api/superadmin/invite-manager.php` - Create invite
- `PUT /api/superadmin/invite-manager.php` - Revoke invite
- `GET /api/superadmin/invite-manager.php?action=validate&invite_code=...` - Validate invite
- `GET /api/superadmin/invite-manager.php?action=users` - List registered users

### Authentication Flow

1. Frontend validates invite code
2. User authenticates with Google
3. Backend verifies Google token
4. Creates user account if invite is valid
5. Returns session token for authentication

## 🆘 Troubleshooting

### Common Issues

1. **Google Client ID Error**:

   - Verify Client ID is correctly set in `.env`
   - Check authorized domains in Google Cloud Console
   - Ensure HTTPS in production

2. **Invite Validation Fails**:

   - Check database connection
   - Verify invite code is not expired
   - Ensure API endpoints are accessible

3. **Email Mismatch**:

   - User's Google email must exactly match invite email
   - Case-sensitive comparison
   - Check for typos in invitation email

4. **Database Errors**:
   - Verify MySQL connection settings
   - Check database permissions
   - Ensure tables are created correctly

### Debug Mode

Enable debug logging by checking browser console for:

- Google OAuth initialization
- Invite validation responses
- Authentication flow progress

## 📱 Mobile Support

The Google OAuth integration is fully mobile-responsive:

- Touch-optimized buttons
- Mobile-friendly Google sign-in popup
- Responsive invite validation messages
- Mobile navigation support

## 🎯 Production Checklist

- [ ] Google Cloud project configured
- [ ] OAuth consent screen approved
- [ ] Client ID added to environment variables
- [ ] Authorized domains configured
- [ ] SuperAdmin credentials secured
- [ ] Database tables created and accessible
- [ ] API endpoints tested
- [ ] Invite flow tested end-to-end
- [ ] Email validation working
- [ ] Session management functioning
- [ ] Mobile experience verified

The Google OAuth integration with invite system is now ready for production use! 🚀
