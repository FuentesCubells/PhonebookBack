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

const addContact = async (request, response, next) => {
  try {
    const body = request.body;
    const file = request.file ? request.file : '';

    const error = {};

    if (!body.name) {
      error.name = "Name is required";
    }

    if (!body.phone) {
      error.phone = "Phone is required";
    }

    if (body.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(body.email)) {
        error.email = "Invalid email format";
      }
    }

    if (body.phone) {
      const phoneRegex = /^\d{9}$/;
      if (!phoneRegex.test(body.phone)) {
        error.phone = "Enter a valid nine-digit phone number without prefixes";
      }
    }

    if (Object.keys(error).length > 0) {
      
      return response.status(400).send({ error });
    }

    // Proceed with the add logic here
    const contactExist = await Contacts.findOne({ name: body.name });
    const imagePath = file.path ? file.path : '';
    const imageURL = imagePath.replace('public/', 'https://phonebookback-production.up.railway.app/');

    if (request.fileValidationError) {
      return response.status(400).send({ error: 'Upload a valid image file' });
    }

    if (contactExist) {
      return response.status(400).send({ exist: "Contact already exists" });
    }

    // Add logic
    const contact = {
      name: body.name,
      phone: body.phone,
      email: body.email,
      company: body.company,
      role: body.role,
      sector: body.sector,
      city: body.city,
      image: imageURL
    };

    const NewContact = new Contacts(contact);
    await NewContact.save();

    response.status(200).json({ message: "New Contact Added", contact });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};


const editContact = async (request, response) => {
  try {
      
      const body = request.body;
      
      const file = request.file ? request.file : '';
      const contact = await Contacts.findOne({ _id: body.id });

      if (!contact) {
          return response.status(404).json({ error: "Contact not found" });
      }
      

      const updateFields = {...body }; // Copy the entire request body
      
      if (request.file) {
          const imagePath = request.file.path;
          const imageURL = imagePath.replace('public/', 'http://localhost:3001/');
          updateFields['image'] = imageURL;
      }

      const result = await Contacts.findOneAndUpdate(
          { _id: contact._id },
          { $set: updateFields },
      );

      if (result) {
          response.status(200).json({ message: 'Contact updated successfully', contact: result });
      } else {
          response.status(404).json({ error: 'Contact not found' });
      }
  } catch (error) {
      response.status(500).json({ error: error.message });
  }
};

const deleteContact = async (request, response) => {

    try {
        const body = request.params;
        const contact = await Contacts.findOne({ _id: body.id });
        if(!contact){
            return response.status(404).json({error:"Contact not found"})
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

const getImage = async (request, response) => {
  try {
    const body = request.params;
    const contact = await Contacts.findOne({ name: body.name });

    console.log(contact);
  } catch (error) {
    
  }
}
module.exports = {
  getContacts,
  addContact,
  editContact,
  deleteContact,
  getImage,
};
