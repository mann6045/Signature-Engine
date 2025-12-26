const express = require('express');
const cors = require('cors');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path'); // Ensure this is here
const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.post('/sign-pdf', async (req, res) => {
    try {
        const { leftPct, topPct, signatureBase64 } = req.body;

        // --- FIX STARTS HERE ---
        const pdfPath = path.join(__dirname, 'sample.pdf');
        
        if (!fs.existsSync(pdfPath)) {
            console.error("FILE MISSING AT:", pdfPath);
            return res.status(404).send("PDF file missing on server");
        }

        const existingPdfBytes = fs.readFileSync(pdfPath);
        // --- FIX ENDS HERE ---

        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        const { width, height } = firstPage.getSize();

        // Coordinate Math
        const pdfX = (leftPct / 100) * width;
        const pdfY = height - ((topPct / 100) * height) - 50; 

        const base64Data = signatureBase64.replace(/^data:image\/\w+;base64,/, "");
        const signatureImage = await pdfDoc.embedPng(Buffer.from(base64Data, 'base64'));
        
        firstPage.drawImage(signatureImage, {
            x: pdfX,
            y: pdfY,
            width: 100, 
            height: 50,
        });

        const pdfBytes = await pdfDoc.save();
        res.setHeader('Content-Type', 'application/pdf');
        res.send(Buffer.from(pdfBytes));

    } catch (err) {
        console.error("Signature Error:", err);
        res.status(500).send("Backend Error: " + err.message);
    }
});

app.listen(5001, () => console.log("🚀 Server spinning on http://localhost:5001"));