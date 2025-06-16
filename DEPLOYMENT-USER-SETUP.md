# User Data Setup Guide for Production Deployment

This application has been updated to remove all hardcoded mock data and now uses dynamic user-created data. Here's how to set it up for production:

## 🔧 Environment Configuration

### 1. Update Environment Variables

Copy the `.env.example` file to `.env` and update the following variables:

```bash
# SuperAdmin Configuration
VITE_SUPERADMIN_EMAIL=your-admin@yourcompany.com
VITE_SUPERADMIN_PASSWORD=your_secure_admin_password

# Application Configuration
VITE_APP_NAME=Your Company Name
VITE_COMPANY_NAME=Your Company Name
VITE_COMPANY_EMAIL=contact@yourcompany.com
```

### 2. Company Branding

Update these values in your environment variables:

- `VITE_APP_NAME`: Your company's display name
- `VITE_COMPANY_NAME`: Full company name
- `VITE_COMPANY_EMAIL`: Primary contact email

## 👤 User Profile Setup

### First Time Setup

When users first access the application, they'll be automatically assigned a default user profile that they can customize:

1. **Navigate to Settings** (via user menu → Settings)
2. **Update Profile Information**:
   - Full Name
   - Email Address
   - Phone Number
   - Job Title
   - Department
   - Bio

### Profile Fields Available

- **Personal Info**: Name, email, phone, job title
- **Work Info**: Department, timezone, bio
- **Preferences**: Language, currency, date/time format
- **Avatar**: Upload custom profile picture

## 🛡️ SuperAdmin Access

### Production Setup

1. **Set Secure Credentials** in environment variables:

   ```bash
   VITE_SUPERADMIN_EMAIL=admin@yourcompany.com
   VITE_SUPERADMIN_PASSWORD=your_very_secure_password
   ```

2. **Access SuperAdmin Panel**:
   - User Menu → SuperAdmin
   - Enter your configured credentials
   - Access dashboard and content management

### SuperAdmin Features Available

- **Content Management**: Customize logos, text, and media
- **Plugin System**: Add custom components and scripts
- **Database Admin**: Manage content and settings
- **System Configuration**: Advanced settings and monitoring

## 📊 Features Using Dynamic Data

### Navigation Bar

- **User Avatar**: Shows user's initials or uploaded photo
- **User Name**: Displays actual user's full name
- **Email**: Shows user's registered email
- **Online Status**: Real-time online/offline indicator

### Settings Page

- **All form fields**: Now connected to user context
- **Live updates**: Changes save to user profile immediately
- **Persistent data**: User data persists across sessions

### Content Management

- **Dynamic Content**: All content can be modified via SuperAdmin
- **Logo Management**: Upload and replace company logos
- **Text Customization**: Edit any text across the site

## 🔄 Data Migration from Mock Data

### Before Deployment

All hardcoded mock data has been removed:

- ❌ "John Doe" → ✅ Dynamic user full name
- ❌ "john@calicutspicetraders.com" → ✅ User's actual email
- ❌ "+91 9876543210" → ✅ User's actual phone
- ❌ "Export Manager" → ✅ User's job title
- ❌ "JD" initials → ✅ Generated from user's name

### Default Values

When users first access the system:

- **Name**: "User" (until they update it)
- **Email**: "user@company.com" (until they update it)
- **Initials**: "U" (auto-generated from name)
- **Department**: Empty (user selects)
- **Phone**: Empty (user enters)

## 📱 User Experience

### Profile Management

1. Users can update all their information via Settings
2. Changes are saved immediately to localStorage
3. Data persists across browser sessions
4. Initials auto-generate from full name

### Content Customization (SuperAdmin)

1. SuperAdmin can customize all visual elements
2. Logo uploads replace default placeholders
3. Text content is editable across all pages
4. Changes reflect immediately

## 🚀 Post-Deployment Steps

### For System Administrators

1. **Set SuperAdmin Credentials**:

   - Update environment variables with secure credentials
   - Test SuperAdmin login functionality
   - Configure company branding

2. **Guide Users**:

   - Direct users to Settings page for profile setup
   - Provide instructions for uploading profile photos
   - Set organizational preferences (departments, timezones)

3. **Content Setup**:
   - Upload company logos via Content Manager
   - Customize welcome text and messaging
   - Set up any custom plugins needed

### For End Users

1. **Complete Profile**:

   - Visit Settings → Profile tab
   - Fill in all personal information
   - Upload a profile photo
   - Set preferences (language, currency, etc.)

2. **Verify Information**:
   - Check that name appears correctly in navigation
   - Confirm email is accurate for notifications
   - Test that preferences are applied

## 🔐 Security Considerations

### SuperAdmin Security

- Use strong, unique passwords for SuperAdmin access
- Consider implementing 2FA for production environments
- Regularly rotate SuperAdmin credentials

### User Data Protection

- User data is stored locally in the browser
- No sensitive information is hardcoded in the application
- Profile data can be exported/deleted by users

## 📋 Checklist for Deployment

- [ ] Updated `.env` with company-specific values
- [ ] Set secure SuperAdmin credentials
- [ ] Tested user profile creation and editing
- [ ] Verified SuperAdmin access and content management
- [ ] Uploaded company logos and branding
- [ ] Configured organizational departments and settings
- [ ] Tested data persistence across sessions
- [ ] Verified all mock data has been removed

## 🆘 Troubleshooting

### Common Issues

1. **SuperAdmin Login Fails**:

   - Check environment variables are set correctly
   - Verify VITE\_ prefix is used for frontend variables
   - Clear browser cache and localStorage

2. **User Data Not Saving**:

   - Check browser localStorage permissions
   - Verify UserContext is properly wrapped around app
   - Check for JavaScript errors in console

3. **Profile Image Upload Issues**:
   - Verify file size limits (2MB default)
   - Check allowed file types (JPG, PNG, GIF)
   - Ensure upload functionality is properly configured

The application is now fully dynamic and ready for production use with real user data! 🎉
