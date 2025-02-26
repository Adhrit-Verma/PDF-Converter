const { ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const Tesseract = require('tesseract.js');

let selectedFiles = [];
let outputFolder = '';

document.getElementById('selectFiles').addEventListener('click', async () => {
  console.log("Select Files button clicked");
  const filters = []; 
  try {
    const result = await ipcRenderer.invoke('open-file-dialog', filters);
    console.log("File dialog result:", result);
    if (!result.canceled) {
      selectedFiles = result.filePaths;
      document.getElementById('fileList').innerText = selectedFiles.join('\n');
      console.log("Selected files:", selectedFiles);
    }
  } catch (error) {
    console.error("Error in selectFiles:", error);
  }
});

document.getElementById('selectOutput').addEventListener('click', async () => {
  console.log("Select Output Folder button clicked");
  try {
    const result = await ipcRenderer.invoke('open-folder-dialog');
    console.log("Folder dialog result:", result);
    if (!result.canceled && result.filePaths.length > 0) {
      outputFolder = result.filePaths[0];
      document.getElementById('outputPath').innerText = outputFolder;
      console.log("Selected output folder:", outputFolder);
    }
  } catch (error) {
    console.error("Error in selectOutput:", error);
  }
});

document.getElementById('convertBtn').addEventListener('click', async () => {
  console.log("Convert button clicked");
  const conversionType = document.getElementById('conversionType').value;
  
  if (!selectedFiles.length || !outputFolder) {
    alert('Please select files and an output folder.');
    return;
  }
  
  // Show progress bar
  const progressContainer = document.getElementById('progressContainer');
  const progressBar = document.getElementById('progressBar');
  progressContainer.style.display = 'block';
  progressBar.value = 0;
  
  const totalFiles = selectedFiles.length;
  
  for (let i = 0; i < totalFiles; i++) {
    const file = selectedFiles[i];
    const ext = path.extname(file).toLowerCase();
    const baseName = path.basename(file, ext);
    let outputFile = path.join(outputFolder, `${baseName}.pdf`);
    
    if (conversionType === 'txtToPdf') {
      const doc = new PDFDocument();
      const writeStream = fs.createWriteStream(outputFile);
      doc.pipe(writeStream);
      const content = fs.readFileSync(file, 'utf-8');
      doc.text(content);
      doc.end();
      console.log(`Converted TXT to PDF: ${outputFile}`);
      
    } else if (conversionType === 'imagesToPdf') {
      const doc = new PDFDocument({ autoFirstPage: false });
      doc.addPage();
      doc.image(file, { fit: [500, 700], align: 'center', valign: 'center' });
      const writeStream = fs.createWriteStream(outputFile);
      doc.pipe(writeStream);
      doc.end();
      console.log(`Converted Image to PDF: ${outputFile}`);
      
    } else if (conversionType === 'ocrToPdf') {
      try {
        const { data: { text } } = await Tesseract.recognize(file, 'eng');
        const doc = new PDFDocument();
        const writeStream = fs.createWriteStream(outputFile);
        doc.pipe(writeStream);
        doc.text(text);
        doc.end();
        console.log(`OCR completed and saved to PDF: ${outputFile}`);
      } catch (err) {
        console.error('OCR failed for file:', file, err);
      }
    }
    
    // Update progress after each file
    progressBar.value = ((i + 1) / totalFiles) * 100;
  }
  
  alert('Conversion completed!');
  progressContainer.style.display = 'none';
});
