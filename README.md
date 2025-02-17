# Form Approval System Backend

This is the backend for a **Form Approval System** built using the **MERN** stack (MongoDB, Express.js, React, Node.js). It includes the authentication system (JWT-based), file uploads to Cloudinary, and role-based access for submitters and approvers. The backend provides RESTful APIs for managing forms, approving/rejecting them, and user registration and login.

## Features

- **User Authentication & Authorization**: Users can register, log in, and log out. JWT tokens are used for session management.
- **Form Management**: Submitters can create, update, submit, and view the status of their forms. Approvers can review, approve, or reject the forms.
- **Cloudinary File Uploads**: Forms can include file attachments (images or PDFs), which are stored on Cloudinary.
- **Role-based Access**: Two user roles: **submitter** (can create and submit forms) and **approver** (can review and approve/reject forms).
- **Dashboard**: Both submitters and approvers have a dashboard to view their forms and form statuses.
MongoDB Setup
Ensure you have a MongoDB instance running. If you’re using MongoDB Atlas, make sure to replace the MONGO_URI with your MongoDB Atlas connection string.

API Endpoints
Authentication Endpoints
POST /api/auth/register

Register a new user (submitter or approver).
Request Body: { name, email, password, role }
Response: Returns user data with a JWT token.
POST /api/auth/login

Login a user and return a JWT token.
Request Body: { email, password }
Response: Returns user data with a JWT token.
POST /api/auth/logout

Logout the user by clearing the JWT token in the cookie.
Form Management Endpoints (For Submitters)
POST /api/forms

Create a new form.
Request Body: { title, description, fileUrl }
Response: Returns the created form.
PUT /api/forms/:id

Update a form (only if the form status is Draft).
Request Body: { title, description, fileUrl }
Response: Returns the updated form.
PUT /api/forms/submit/:id

Submit a form for approval (changes status to Pending Approval).
Response: Success message.
GET /api/forms/dashboard

Get the submitter's dashboard showing all form statuses.
Response: Returns forms grouped by status (draft, pending approval, approved, rejected).
Form Management Endpoints (For Approvers)
GET /api/approver/pending

Get all forms pending approval.
Response: Returns a list of forms with status Pending Approval.
PUT /api/approver/review/:id

Review a form (approve or reject).
Request Body: { status (Approved/Rejected), comments }
Response: Success message.
GET /api/approver/dashboard

Get the approver's dashboard showing all pending forms for review.
Response: Returns a list of pending forms.
Testing the Application
Manual Testing
To manually test the application, you can use Postman or any REST client to test the following:

User Authentication:

Register a user (POST /api/auth/register).
Login (POST /api/auth/login).
Verify that the JWT token is returned.
Use the JWT token to access protected routes (e.g., /api/forms/dashboard).
Form Operations:

Create a form (POST /api/forms).
Update the form (PUT /api/forms/:id).
Submit the form for approval (PUT /api/forms/submit/:id).
Approve or reject the form (PUT /api/approver/review/:id).
File Upload:

When creating or updating a form, include a file (jpg, png, or pdf) to test the Cloudinary integration.
Ensure that files are correctly uploaded to Cloudinary and the file URL is stored in the form.


