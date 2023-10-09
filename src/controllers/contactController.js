const Contacts = require('../models/contacts');

const getContacts = async (request, response) => {
    try {
        const contacts = await Contacts.find({});
        response.status(200).json(contacts);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};

module.exports = {
    getContacts,
};
