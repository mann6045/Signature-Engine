# BoloForms PDF Signature Engine

A full-stack application designed to allow users to place digital signature fields on a PDF document and generate a signed version with the signature permanently embedded into the document.

## 🚀 Key Features
- **Interactive UI**: Users can add a draggable signature placeholder and position it anywhere on the PDF page.
- **Coordinate Transformation**: Implemented a mathematical engine to map browser-based pixel coordinates (Top-Left origin) to PDF-standard point coordinates (Bottom-Left origin).
- **Automated Signing**: A Node.js backend that utilizes `pdf-lib` to "burn" the signature image into the PDF at the exact user-defined location.
- **Responsive Handling**: Coordinate calculations are percentage-based to ensure accuracy across different screen sizes.

## 📁 Project Structure
The project is organized as a monorepo for clear separation of concerns:
- **/Frontend**: React (Vite) application using `react-pdf` and `react-draggable`.
- **/Backend**: Node.js & Express server handling PDF manipulation and file streams.

## 🛠️ Installation & Setup

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### 2. Backend Setup
```bash
cd Backend
npm install
node server.js

The server will run on http://localhost:5001.

3. Frontend Setup
Bash

cd Frontend
npm install
npm run dev
The application will be accessible at http://localhost:5173.

📖 Usage Guide
Load PDF: Ensure a file named sample.pdf is present in both the Frontend/public and Backend/ directories.

Add Field: Click the "STEP 1: ADD BOX" button.

Position: Drag the signature box to the desired location on the document.

Finalize: Click "STEP 2: SIGN & DOWNLOAD".

Download: The backend will process the request and your browser will automatically download the signed PDF.

🛠️ Technologies Used
Frontend: React, Vite, react-pdf, react-draggable.

Backend: Node.js, Express, pdf-lib, CORS.

Developed as part of the BoloForms Full-Stack Developer Assessment.

---

