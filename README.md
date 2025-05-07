# ImageVault

![ImageVault Banner](https://github.com/adesh9201/imagevault/blob/main/ImageVault-frontend/public/img5.png)

## 📸 Overview

ImageVault is a full-stack image hosting and gallery application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and styled with Tailwind CSS. Upload, view, and manage your images in a clean, responsive interface.

## ✨ Demo

- **Live Frontend**: [imagevault.vercel.app](https://adeshmishra-imagevault.vercel.app)
- **API Endpoint**: [adeshmishra-imagevault.onrender.com](https://atadeshmishra-imagevault.onrender.com)

## 🌟 Features

- ✅ Upload images (PNG, JPG, JPEG, etc.)
- ✅ View uploaded images in a responsive gallery
- ✅ Image previews with metadata
- ✅ Server-side image storage
- ✅ RESTful API built with Express.js
- ✅ Modern UI with Tailwind CSS

## 🛠️ Technology Stack

### Frontend
- React.js (built with React)
- Tailwind CSS for styling
- React Router for navigation
- Axios for API requests

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose ODM)
- Multer for image uploads

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## 📂 Project Structure

```
imagevault/
│
├── ImageVault-frontend/     # React frontend with Tailwind
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── App.jsx          # Main application component
│   │   └── main.jsx         # Entry point
│   ├── public/              # Static assets
│   ├── .env                 # Environment variables (gitignored)
│   └── package.json         # Frontend dependencies
│
├── ImageVault-backend/      # Node + Express backend
│   ├── routes/              # API route definitions
│   ├── controllers/         # Route controllers
│   ├── models/              # Mongoose models
│   ├── uploads/             # Image upload directory
│   ├── server.js            # Server entry point
│   ├── .env                 # Environment variables (gitignored)
│   └── package.json         # Backend dependencies
│
└── README.md                # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB (local instance or MongoDB Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/adesh9201/imagevault.git
   cd imagevault
   ```

2. **Set up backend**
   ```bash
   cd ImageVault-backend
   npm install
   
   # Create .env file with the following variables
   # PORT=5000
   # MONGODB_URI=your_mongodb_connection_string
   # FRONTEND_URL=http://localhost:5173
   
   npm run dev  # Starts the server with nodemon
   ```

3. **Set up frontend**
   ```bash
   cd ../ImageVault-frontend
   npm install
   
   # Create .env file with the following variables
   # VITE_API_URL=http://localhost:5000/api
   
   npm run dev  # Starts the development server
   ```

4. **Open your browser**
   - Frontend will be running at: http://localhost:5173
   - Backend API will be available at: http://localhost:5000/api

## 📡 API Endpoints

| Method | Endpoint          | Description           | Request Body                   |
|--------|-------------------|-----------------------|-------------------------------|
| GET    | /api/images       | Get all images        | None                          |
| POST   | /api/images       | Upload a new image    | Form data with 'image' field  |
| GET    | /api/images/:id   | Get image by ID       | None                          |
| DELETE | /api/images/:id   | Delete image by ID    | None                          |

## 🧰 Usage Examples

### Uploading an Image

```javascript
// Using fetch API
const formData = new FormData();
formData.append('image', imageFile);

fetch('https://atadeshmishra-imagevault.onrender.com/api/images', {
  method: 'POST',
  body: formData,
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

### Fetching All Images

```javascript
// Using axios
import axios from 'axios';

axios.get('https://atadeshmishra-imagevault.onrender.com/api/images')
  .then(response => {
    const images = response.data;
    console.log(images);
  })
  .catch(error => console.error('Error:', error));
```

## 🔒 Environment Variables

### Backend (.env)

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=https://your-frontend.vercel.app
```

### Frontend (.env)

```
VITE_API_URL=https://your-backend-api.render.com/api
```

## 🛣️ Roadmap

- 🔐 User authentication with JWT
- ☁️ Cloud storage integration (AWS S3 or Cloudinary)
- 🖼️ Image tagging and search functionality
- 🗑️ Image deletion with confirmation
- 📱 Mobile-responsive enhancements
- 🌓 Dark mode toggle

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repository and submit pull requests.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

- **Adesh Mishra** - [GitHub](https://github.com/adesh9201)

## 🙏 Acknowledgments

- MongoDB for the database service
- Render and Vercel for the hosting platforms
- The MERN stack community for the excellent documentation and resources

---

⭐ Star this repository if you find it useful!