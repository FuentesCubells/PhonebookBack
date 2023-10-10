const Contacts = require("../models/contacts");
const path = require('path');

const getContacts = async (request, response) => {
  try {
    const contacts = await Contacts.find({});
    response.status(200).json(contacts);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

const addContact = async (request, response) => {
  try {
    const body = request.body;
    const file = request.file;

    if (!body.name || !body.phone) {
      return response.status(400).send("The name and phone are required");
    }
   
    const contactExist = await Contacts.findOne({ name: body.name });
    const imagePath = file.path;

    if (contactExist) {
      return response.status(400).send({ error: "Contact already exists" });
    } else {
      const contact = {
        name: body.name,
        phone: body.phone,
        email: body.email,
        company: body.company,
        role: body.role,
        sector: body.sector,
        city: body.city,
        image: imagePath,
      };

      const NewContact = new Contacts(contact);
      await NewContact.save();

      response.status(200).json({ message: "New Contact Added", contact });
    }
  } catch (error) {
    console.error('Error adding contact', error)
    response.status(500).json({ error: error.message });
  }
};

const editContact = async (request, response) => {
    try {
        const body = request.body;
        const contact = await Contacts.findOne({ name: body.name });
        if(!contact){
            return response.status(404).json({erro:"Contact not found"})
        }

        const updateFields = {};

        for (const key in body) {
            if (body.hasOwnProperty(key)) {
                updateFields[key] = body[key];
            }
        }
        
        const result = await Contacts.findOneAndUpdate(
            { _id: contact._id },
            { $set: updateFields },
            { new: true }
        );
        
        if (result) {
            // The contact was found and updated successfully
            response.status(200).json({ message: 'Contact updated successfully', contact: result });
        } else {
            // Document not found or no changes made
            response.status(404).json({ error: 'Contact not found' });
        }

    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};

const deleteContact = async (request, response) => {

    try {
        const body = request.body
        const contact = await Contacts.findOne({ name: body.name });
        if(!contact){
            return response.status(404).json({erro:"Contact not found"})
        }

        const deletedContact = await Contacts.findByIdAndRemove(contact._id);

        if(deletedContact){
            response.status(200).json({ message: 'Contact deleted successfully'});
        } else {
            response.status(404).json({message: 'Something went wrong'})
        }

    } catch (error) {
        response.status(500).json({error: error.message});
    }
}

module.exports = {
  getContacts,
  addContact,
  editContact,
  deleteContact,
};
