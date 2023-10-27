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
            validate: {
                validator: function (v) {
                    return /^\d{9}$/.test(v);
                },
                message: 'Enter a valid phone number',
            },
            required: true,
        },
        email: {
            type: String,
            match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
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
