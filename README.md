# Calicut Spice Traders Workspace

A PHP-based collaborative workspace for Calicut Spice Traders LLP partners, designed for deployment on Hostinger premium hosting.

## 🚀 Quick Deployment Instructions

### 1. Upload Files to Hostinger

- Upload all files to your `workspace.calicutspicetraders.com` subdomain folder
- Ensure the file structure remains intact

### 2. Database Setup

1. Access cPanel → MySQL Databases
2. Your database details:

   - **Database Name**: `u272045696_zjbgK`
   - **Username**: `u272045696_ttPpR`
   - **Password**: [Your database password]

3. Update `config/database.php` with your database password

### 3. Initialize Database

1. Visit: `https://workspace.calicutspicetraders.com/setup/install.php`
2. This will create all necessary tables and sample data
3. **Delete the `/setup` folder after installation for security**

### 4. Default Login Credentials

**Super Administrator:**

- Email: `admin@calicutspicetraders.com`
- Password: `admin123`

**Sample Partner Accounts:**

- Email: `rajesh@calicutspicetraders.com` / Password: `partner123`
- Email: `priya@calicutspicetraders.com` / Password: `partner123`
- Email: `mohammed@calicutspicetraders.com` / Password: `partner123`
- Email: `suresh@calicutspicetraders.com` / Password: `partner123`
- Email: `lakshmi@calicutspicetraders.com` / Password: `partner123`

### 5. Security Setup

1. **Change all default passwords** immediately after first login
2. Delete `/setup` folder after installation
3. Set proper file permissions (644 for files, 755 for folders)

## 📁 File Structure

```
/
├── config/
│   └── database.php          # Database configuration
├── includes/
│   └── auth.php             # Authentication functions
├── setup/
│   └── install.php          # Database installation (DELETE AFTER USE)
├── index.php                # Main workspace dashboard
├── login.php                # User login page
├── admin.php                # Admin panel for user management
├── logout.php               # Logout handler
└── README.md                # This file
```

## 🔐 User Roles & Permissions

- **Super Admin**: Full access to all features, user management
- **Admin**: Access to admin panel, user management (limited)
- **Partner**: Access to workspace features, collaboration tools
- **User**: Basic workspace access

## 🛠 Features Included

### ✅ Core Features (Implemented)

- User authentication and role-based access control
- Admin panel for user management
- Activity logging and monitoring
- Responsive design with modern UI
- Partner collaboration dashboard
- Database integration with sample data

### 🔄 Modules Ready for Extension

- Document management system (database tables ready)
- Team messaging system (database tables ready)
- Export shipment tracking (sample data included)
- File upload handling
- Advanced reporting

## 🎨 Customization

The workspace uses Tailwind CSS with custom brand colors:

- **Primary Green**: `#2d7d32` (Brand identity)
- **Accent Gold**: `#ffc107` (Highlights)
- Fully responsive design for all devices

## 📊 Database Tables

The installation creates these tables:

- `users` - User accounts and roles
- `workspace_activities` - Activity logging
- `documents` - File management (ready for implementation)
- `messages` - Team communication (ready for implementation)
- `export_shipments` - Shipment tracking with sample data

## 🔒 Security Features

- Password hashing with PHP's `password_hash()`
- Session-based authentication
- SQL injection protection with PDO prepared statements
- Role-based access control
- CSRF protection ready for implementation

## 📞 Support

For technical support or customization requests:

- Email: admin@calicutspicetraders.com
- Workspace: Internal messaging system

## ⚠️ Important Notes

1. **Change default passwords** immediately after installation
2. **Delete `/setup` folder** after successful installation
3. Regular database backups recommended
4. Monitor `/workspace_activities` table for security auditing
5. Keep the application updated for security patches

---

**Ready for Production Deployment on Hostinger Premium Hosting**
