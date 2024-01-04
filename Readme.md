# Notes App

The Notes App is a simple web application built with Express that allows users to create, read, update, and delete notes. Additionally, it provides the functionality to share notes with other users.

## Features

- **Create Note:** Users can create a new note by providing a title and content.

- **Read Notes:** Users can view their own notes as well as notes shared with them by other users.

- **Update Note:** Users can edit the content of their own notes.

- **Delete Note:** Users can delete their own notes.

- **Share Note:** Users can share a note with other users by specifying the user ID.

## Technologies Used

### Backend Framework

- **Express:** A fast, unopinionated, minimalist web framework for Node.js.

### Database

- **MongoDB:** A NoSQL database used for storing and retrieving data.

### Authentication

- **JSON Web Token (JWT):** A compact, URL-safe means of representing claims to be transferred between two parties.

### Validation

- **Validator:** A library for string validation and sanitization.

### Rate Limiting

- **express-rate-limit:** Middleware to limit repeated requests to public APIs and/or endpoints.

### Request Throttling

- **express-slow-down:** Middleware for adding delay before the request is processed.

### Testing

- **Jest:** A delightful JavaScript Testing Framework with a focus on simplicity.

## Setup

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Dev-Ashank/notes-backend.git
   ```

2. Navigate to the project directory:
   ```bash
   cd notes-backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Configuration

1. Create a .env file in the project root and configure the following variables:
   ```bash
   PORT=3000
    MONGODB_URI=mongodb://root:root@localhost:27017/notes-api
    SECRET_KEY=mysecretkey
    JWT_SECRET = HAPPYNAPPY
   ```
   Replace YOUR_MONGODB_URI with your MongoDB connection URI and YOUR_SECRET_KEY with a secret key for JWT authentication.
2. For testing create .env.test file in the project root and configure the following variables;
   ```
   PORT = 3001
   NODE_ENV=test
   MONGODB_URI=mongodb://root:root@localhost:27017/test-db
   SECRET_KEY=mysecretkeytest
   JWT_SECRET = HAPPYNAPPY
   ```
   Replace YOUR_MONGODB_URI with your MongoDB connection URI and YOUR_SECRET_KEY with a secret key for JWT authentication.

### Running the Application

1. Start the server:
   ```
   npm start
   ```
2. The server will run on the specified port (default is 3000). Access the application at http://localhost:3000.

### Testing the Application

1. Start the server:
   ```
   npm test
   ```
2. The server will run on the specified port (default is 3001). Access the application at http://localhost:3001.

### Rate Limiting

- For rate Limiting express-rate-limit is used.

### Request Throttling

- For request throttling express-slow-down is used.

### Contact

    Email : kumardivyashankgaurav@gmail.com
