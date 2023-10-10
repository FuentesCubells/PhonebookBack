contactController = require ('../controllers/contactController.js')

const express = require('express')
const router = express.Router();
const {getContacts, addContact, editContact, deleteContact} = require('../controllers/contactController');
const upload = require('../config/multer');

router.get('/', getContacts);
router.post('/add', upload.single('image'), addContact);
router.put('/edit:name', editContact);
router.delete('/delete:name', deleteContact);


module.exports = router;