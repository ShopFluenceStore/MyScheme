# Temporary Login Credentials

## Test User Account
- **Email**: test@example.com
- **Password**: Password123!
- **Role**: user

## Test Admin Account
- **Email**: admin@example.com
- **Password**: Admin123!
- **Role**: admin

## Notes
- These are temporary credentials for testing purposes
- Change these credentials in production
- Users can be created via the signup page at `/signup`
- Admin users can manage the system via `/admin/dashboard`

## Database Setup
If you need to manually create these users in MongoDB:

```javascript
// User account
{
  name: "Test User",
  email: "test@example.com",
  password: "$2a$12$hashedPasswordHere", // bcrypt hash of "Password123!"
  role: "user",
  avatar: "",
  bio: "Test user account",
  socialLinks: {},
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
}

// Admin account
{
  name: "Admin User", 
  email: "admin@example.com",
  password: "$2a$12$hashedPasswordHere", // bcrypt hash of "Admin123!"
  role: "admin",
  avatar: "",
  bio: "Administrator account",
  socialLinks: {},
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
}
```