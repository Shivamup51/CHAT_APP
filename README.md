# Chat Application

A real-time chat application with user authentication, message history, and real-time communication capabilities.

## Features

- User authentication (register, login, logout)
- Real-time messaging
- Message history
- Responsive design
- User profiles with avatars (via Cloudinary)
- Message notifications

## Tech Stack

### Frontend
- **React**: UI library
- **Vite**: Build tool and development server
- **React Router**: For navigation
- **Zustand**: State management
- **Socket.io-client**: Real-time communication
- **TailwindCSS & DaisyUI**: Styling
- **Axios**: API requests
- **React Hot Toast**: Notifications

### Backend
- **Node.js**: Runtime environment
- **Express**: Web framework
- **MongoDB**: Database
- **Mongoose**: MongoDB ODM
- **Socket.io**: Real-time communication
- **JWT**: Authentication
- **bcryptjs**: Password hashing
- **Cloudinary**: Cloud storage for images
- **Compression**: Response compression

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database
- Cloudinary account (for image uploads)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/chat-app.git
   cd chat-app
   ```

2. Backend Setup
   ```bash
   cd backend
   npm install
   ```
   
   Create a `.env` file with:
   ```
   PORT=8000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

3. Frontend Setup
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. Start Backend
   ```bash
   cd backend
   npm run dev
   ```

2. Start Frontend (in another terminal)
   ```bash
   cd frontend
   npm run dev
   ```

3. Access the application at `http://localhost:5173`

## Deployment

- Backend: Deployed on Vercel
- Frontend: Deployed on Vercel
- Database: MongoDB Atlas

## Project Structure
chat-app/
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── lib/
│ │ ├── middleware/
│ │ ├── models/
│ │ └── routes/
│ ├── index.js
│ └── package.json
└── frontend/
├── public/
├── src/
│ ├── components/
│ ├── contexts/
│ ├── pages/
│ ├── store/
│ └── utils/
├── index.html
└── package.json
```

## License

This project is licensed under the MIT License.