#   Authentication System (Node.js + JWT + Redis)


#  Description

This is a secure authentication system built using Node.js and Express.
It supports user registration, login, and logout functionality using JWT (JSON Web Tokens) and Redis for token blacklisting.

# Features
User Registration with validation
Password hashing using bcrypt
Secure Login using JWT authentication
Token stored in cookies
Logout functionality using Redis (token blacklist)
Middleware-based route protection
Prevents unauthorized API access after logout


  # Tech Stack
Node.js
Express.js
MongoDB (Mongoose)
JWT (JSON Web Token)
Redis

bcrypt
-- API Endpoints
-- Register User
POST /auth/register

# Description:

Validates user data
Hashes password
Stores user in database
--Login User
POST /auth/login

 # Description:

Verifies email and password
Generates JWT token
Stores token in cookies
   -- Logout User
POST /auth/logout

 # Description:

Extracts token from cookies
Stores token in Redis blacklist
Sets expiry same as JWT
Clears cookie from browser
#   Authentication Flow
User registers → password hashed using bcrypt
User logs in → JWT token generated
Token stored in cookies
Middleware (userAuth) verifies token for protected routes
On logout → token stored in Redis blacklist
Blocked token cannot access APIs

  Key Concepts Used
 Password Hashing
Password is encrypted using bcrypt
Improves security (no plain text storage)
 # JWT Authentication
Stateless authentication
Token contains user data + expiry
Verified on every request
#  Redis (Important )
Used to store blocked tokens
Prevents reuse of token after logout