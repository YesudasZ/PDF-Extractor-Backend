# PDF Extractor Backend Server

A Node.js/Express backend service for handling PDF uploads, storage, and page extraction operations. This service uses MongoDB for storage management and Cloudinary for cloud-based file hosting.

## 🚀 Features

- PDF file upload and storage
- Page extraction from PDF files
- Cloudinary integration for file hosting
- MongoDB integration for metadata storage
- Error handling middleware
- Secure file upload with Multer

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB installed and running
- Cloudinary account
- Git

## ⚙️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/pdf-extractor
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. Create the uploads directory:
```bash
mkdir uploads
```

## 🏃‍♂️ Running the Server

Development mode:
```bash
npm start
```

The server will start on `http://localhost:3000` by default.

## 📁 Project Structure

```
server/
├── src/
│   ├── config/
│   │   ├── cloudinary.js     # Cloudinary configuration
│   │   └── db.js            # MongoDB configuration
│   ├── controllers/
│   │   └── pdfController.js # PDF handling logic
│   ├── middleware/
│   │   └── errorMiddleware.js # Error handling
│   ├── models/
│   │   └── Pdf.js           # PDF schema
│   ├── routes/
│   │   └── pdfRoutes.js     # API routes
│   ├── services/
│   │   └── pdfService.js    # PDF processing service
│   ├── utils/
│   │   └── multer.js        # File upload configuration
│   └── app.js               # Express app setup
└── uploads/                 # Temporary PDF storage
```

## 🔗 API Endpoints

### Upload PDF
```http
POST /api/pdf/uploadPdf
Content-Type: multipart/form-data

field: pdf (file)
```

### Get PDF
```http
GET /api/pdf/:id
```

### Extract Pages
```http
POST /api/pdf/extract/:id
Content-Type: application/json

{
  "pages": [1, 2, 3]  // Array of page numbers to extract
}
```

## 💾 Database Schema

### PDF Model
```javascript
{
  filename: String,
  cloudinaryUrl: String,
  uploadDate: Date,
  size: Number,
  pageCount: Number
}
```

## 🔒 Security

- File uploads are restricted to PDFs only
- Multer middleware for secure file handling
- Size limits on uploads
- Temporary file cleanup

## ⚠️ Error Handling

The server includes centralized error handling middleware that catches and processes:
- File upload errors
- PDF processing errors
- Database errors
- Invalid request errors

## 🛠 Development

### Adding New Features

1. Create necessary route in `routes/`
2. Implement controller logic in `controllers/`
3. Add any required services in `services/`
4. Update models if needed in `models/`

### Code Style

- Use async/await for asynchronous operations
- Implement error handling for all async operations
- Follow the existing project structure
- Use meaningful variable and function names

## 🧪 Testing

Run tests:
```bash
npm test
```

The project uses Jest and Supertest for testing API endpoints.

## 📦 Dependencies

- express: Web framework
- mongoose: MongoDB ODM
- cloudinary: Cloud storage
- multer: File upload handling
- pdf-lib: PDF manipulation
- dotenv: Environment configuration
- cors: Cross-origin resource sharing
- Other utilities: See package.json

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request


## 🆘 Support

For support, please create an issue in the repository or contact the maintainers.