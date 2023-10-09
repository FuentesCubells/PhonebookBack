const mongoose = require('mongoose');

const contactSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
        },
        company: {
            type: String,
        },
        role: {
            type: String,
            required: true,
        },
        sector: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        }
    }
)

const Contacts = mongoose.model('Contacts',contactSchema);
module.exports = Contacts;
