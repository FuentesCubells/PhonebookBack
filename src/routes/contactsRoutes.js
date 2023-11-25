contactController = require ('../controllers/contactController.js')

const express = require('express')
const router = express.Router();
const {getContacts, addContact, editContact, deleteContact, getImage} = require('../controllers/contactController');
const upload = require('../config/multer');

router.get('/', getContacts);
router.post('/add', upload.single('image'), addContact);
router.put('/edit/:id', upload.single('image'), editContact);
router.delete('/delete/:id', upload.single('image'), deleteContact);

module.exports = router;