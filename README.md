
# Railway Management System

## Overview
This project is a railway management system that allows users to search for trains between two stations, check seat availability, and book seats in real-time. The system is built using Node.js, Sequelize, MySQL/PostgreSQL, React.js, Redis for caching, and Socket.IO for real-time updates.

## Features
- User registration and login
- Role-based access control (Admin and User roles)
- Train management (Admin)
- Real-time train seat availability
- Real-time seat booking

## Tech Stack
- Backend: Node.js, Express, Sequelize
- Database: MySQL
- Frontend: React.js

## Project Structure

```
trainManagementApp/
├── backend/
│   ├── config/
│   │   ├── config.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── trainController.js
│   │   ├── bookingController.js
│   ├── middleware/
│   │   ├── auth.js
│   ├── models/
│   │   ├── index.js
│   │   ├── user.js
│   │   ├── train.js
│   │   ├── booking.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── trainRoutes.js
│   │   ├── bookingRoutes.js
│   ├── utils/
│   │   ├── cache.js
│   ├── .env
│   ├── app.js
│   ├── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── LoginPage.js
│   │   │   ├── RegisterPage.js
│   │   │   ├── TrainAvailabilityPage.js
│   │   │   ├── BookingPage.js
│   │   │   ├── BookingDetailsPage.js
│   │   ├── App.js
│   │   ├── index.js
│   ├── package.json
```

## Getting Started

### Prerequisites
- Node.js
- MySQL/PostgreSQL
- Redis

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Zeeshan6871/trainManagementApp.git
   cd trainManagementApp
   ```

2. **Set up the backend**

   - Navigate to the backend directory:
     ```bash
     cd Server
     ```

   - Install dependencies:
     ```bash
     npm install
     ```

   - Set up the environment variables:
     Create a `.env` file in the `backend` directory and add the following:
     ```plaintext
     DB_USERNAME=your_db_username
     DB_PASSWORD=your_db_password
     DB_NAME=railway_management
     DB_URL=database_url
     DB_HOST=127.0.0.1
     JWT_SECRET=your_jwt_secret
     ADMIN_API_KEY=your_admin_api_key
     ```

   - Start the backend server:
     ```bash
     npm run server
     ```

3. **Set up the frontend**

   - Navigate to the frontend directory:
     ```bash
     cd ../Client
     ```

   - Install dependencies:
     ```bash
     npm install
     ```

   - Start the frontend development server:
     ```bash
     npm run dev
     ```

## Usage

### Endpoints

#### Auth
- **Register a User**
  ```http
  POST /api/auth/register
  Request:
  {
    "username": "Zeeshna123@gmail.com",
    "password": "1234"
  }
  Response:
  {
    "message": "User registered successfully",
    "user_id": "12345"
  }
  ```

- **Login User**
- **User Credential**
  ```
  username = zeeshan123@gmail.com
  password = 1234
  ```
  
  ```http
  POST /api/auth/login
  Request:
  {
    "username": "example_user",
    "password": "example_password"
  }
  Response:
  {
    "status": "Login successful",
    "status_code": 200,
    "user_id": "12345",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
  }
  ```

#### Train
- **Admin Credential**
  ```
  username = admin@gmail.com
  password = 1234
  ```
- **Add a New Train (Admin)**
  ```http
  POST /api/trains/create
  Headers:
  {
    "Authorization": "Bearer {token}",
    "x-api-key": "{admin_api_key}"
  }
  Request:
  {
    "train_name": "Express Train",
    "source": "Station A",
    "destination": "Station B",
    "seat_capacity": 100,
    "arrival_time_at_source": "14:00:00",
    "arrival_time_at_destination": "20:30:00"
  }
  Response:
  {
    "message": "Train added successfully",
    "train_id": "9876543210"
  }
  ```

- **Get Train Availability**
  ```http
  GET /api/trains/availability?source=SOURCE&destination=DESTINATION
  Response:
  [
    {
      "train_id": "9876543210",
      "train_name": "Express Train",
      "available_seats": 75
    },
    {
      "train_id": "9876543211",
      "train_name": "Express Train 2",
      "available_seats": 0
    }
  ]
  ```

#### Booking
- **Book a Seat**
  ```http
  POST /api/trains/{train_id}/book
  Headers:
  {
    "Authorization": "Bearer {token}"
  }
  Request:
  {
    "user_id": "1234567890",
    "no_of_seats": 2
  }
  Response:
  {
    "message": "Seat booked successfully",
    "booking_id": "5432109876",
    "seat_numbers": [5, 6]
  }
  ```

- **Get Specific Booking Details**
  ```http
  GET /api/bookings/{booking_id}
  Headers:
  {
    "Authorization": "Bearer {token}"
  }
  Response:
  {
    "booking_id": "5432109876",
    "train_id": "9876543210",
    "train_name": "Express Train",
    "user_id": "1234567890",
    "no_of_seats": 1,
    "seat_numbers": [7],
    "arrival_time_at_source": "2023-01-01 14:00:00",
    "arrival_time_at_destination": "2023-01-01 20:30:00"
  }
  ```
