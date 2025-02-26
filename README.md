# PDF Converter App

A powerful and easy-to-use **Electron-based** desktop application that converts text files, images, and OCR-scanned text into PDFs. This app allows users to select multiple files, specify an output location, and track progress with a built-in progress bar.

![UI Screenshot](screenshot.png)  
(*Replace this with your actual UI screenshot*)

## Features

✔ Convert **TXT** to **PDF**  
✔ Convert **Images** (JPG, PNG) to **PDF**  
✔ Extract **text from images** using OCR and save as **PDF**  
✔ Support for **multiple file selection**  
✔ **Output folder selection** for saving files  
✔ **Progress bar** for real-time tracking  
✔ **Modern UI** built with HTML, CSS, and JavaScript  
✔ **Electron-based standalone application for Windows**

## Installation & Usage

### **1. Run from Source**
Ensure you have **Node.js** installed, then clone this repository:

```sh
git clone https://github.com/YOUR_USERNAME/PDF-Converter.git
cd PDF-Converter
Install dependencies:

sh
Copy
npm install
Run the app:

sh
Copy
npm start
2. Download Pre-built Executable
Alternatively, download the latest release from the Releases Page.

Building the Application
To build a Windows .exe installer, run:

sh
Copy
npm run dist
This will create a standalone installer inside the dist folder.

How to Use
Select the conversion type (TXT to PDF, Image to PDF, OCR to PDF).
Click "Select Files" and choose one or multiple files.
Click "Select Output Folder" to specify where the converted files should be saved.
Click "Convert" to start the conversion.
Track progress with the built-in progress bar.
Once complete, the converted PDF files will be available in your selected output folder.

Dependencies
Electron - Build cross-platform desktop apps with JavaScript
PDFKit - Generate PDFs dynamically
Tesseract.js - OCR engine for text recognition
fs-extra - File handling utilities
Contributing
Feel free to fork the project, submit issues, and contribute improvements. Pull requests are welcome!

License
This project is open-source and licensed under the MIT License.