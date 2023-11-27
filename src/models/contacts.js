const mongoose = require('mongoose');

const contactSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 50,
        },
        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            
        },
        company: {
            type: String,
            maxlength: 50,
        },
        role: {
            type: String,
            maxlength: 50,
        },
        sector: {
            type: String,
            maxlength: 50,
        },
        city: {
            type: String,
            maxlength: 50,
        },
        image: {
            type: String,
        }
    }
)

const Contacts = mongoose.model('Contacts',contactSchema);
module.exports = Contacts;
