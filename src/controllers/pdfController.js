const cloudinary = require('../config/cloudinary');
const Pdf = require('../models/Pdf');
const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib')

const uploadPdf = async (req, res, next) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const uploadResponse = await cloudinary.uploader.upload(file.path, {
            resource_type: 'raw',
            folder: 'PDF-Extracter'
        })
        const pdf = new Pdf({
            fileName: req.file.filename,
            filePath: req.file.path,
            cloudinaryPublicId: uploadResponse.public_id,
            url: uploadResponse.secure_url
        })
        const savedPdf = await pdf.save();
        res.status(201).json(savedPdf);
    } catch (error) {
        next(error)
    }
}

const getPdf = async (req, res, next) => {
    try {
        const pdf = await Pdf.findById(req.params.id);
        if (!pdf) {
            return res.status(404).json({ message: `PDF not found` });
        }
        res.status(201).json({url:pdf.url});
    } catch (error) {
        next(error);
    }
}

const extractPages = async (req, res, next) => {
    const { id } = req.params;
    const { pages } = req.body;
    try {
        const pdf = await Pdf.findById(id);
        if (!pdf) {
            return res.status(404).json({ messege: 'PDF not found' });
        }
        const existingPdfBytes = fs.readFileSync(pdf.filePath);
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const newPdfDoc = await PDFDocument.create();
        for (const pageNumber of pages) {
            const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [pageNumber - 1]);
            newPdfDoc.addPage(copiedPage);
        }
        const newPdfBytes = await newPdfDoc.save();
        const newPdfPath = path.join(`uploads`, `extracted-${Date.now()}.pdf`);
        fs.writeFileSync(newPdfPath, newPdfBytes);

        res.download(newPdfPath, 'extracted.pdf', (err) => {
            if (err) {
                next(err)
            }
            fs.unlinkSync(newPdfPath)
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    uploadPdf,
    getPdf,
    extractPages
}
