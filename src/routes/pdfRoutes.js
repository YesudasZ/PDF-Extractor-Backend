const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')
const {
    uploadPdf,
    getPdf,
    extractPages
} = require('../controllers/pdfController');

router.post('/uploadPdf', upload.single('pdf'), uploadPdf);
router.get('/:id',getPdf );
router.post('/extract/:id',extractPages)

module.exports = router;