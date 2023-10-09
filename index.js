require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const MONGO_CONNECTION = process.env.MONGODB_URI;
const constactRoutes = require("./src/routes/contactsRoutes");

app.use(cors());
app.use("/", constactRoutes);

mongoose
  .connect(MONGO_CONNECTION)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const PORT = process.env.PORT
  app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/*
app.get('/', (request, response) => {
  response.send(
  );
})

app.get('/api/persons', (request, response) => {
    try {
      response.send(persons);
    } catch (error) {
      response.send(error.message);
    }
})

app.get('/api/persons/:id', (request, response) => {
  try {

    const id = Number(request.params.id);

    if (isNaN(id)) {
      return response.status(400).send(`The id ${request.params.id} is not a valid id number`);
    }

    if(!id){
      return response.send(404, `The person with id ${request.params.id} is not found`);
    }

    const person = persons.find(person => person.id === id);
    
    return response.send(person);
    
  } catch (error) {
    response.status(500).send(error.message);
  }
});

app.post('/api/persons/create', (request, response) => {
  const body = request.body;
  
  persons.forEach(person => {
    if(person.number=== body.number) {
      return response.status(400).send(`${person.name} already exists`);
    }
  });
  if( !body.name && !body.number ){
    return response.status(400).send( 'Something is missing');
  }

  const person = {
      id: 11,
      name: body.name,
      phone: body.number,
      email: body.email,
      company: body.company,
      role: body.role,
      sector: body.sector,
      city: body.city,
  }
  persons = persons.concat(person);
  return response.send(persons);
})

app.put('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const body = request.body;
  
  if( !body ) {
    return response.status(400).send( 'Something is missing');
  }
  const personIndex = persons.findIndex(person => person.id === id);

  if(personIndex === -1) {
    return response.status(404).send(`The person with id ${id} was not found`);
  }

  persons[personIndex] = {
    ...persons[personIndex],
    ...body,
  }
  
  return response.status(200).send(persons);
})

app.delete('/api/persons/:id', (request, response) => {
  try {
    const id = Number(request.params.id);

    if (isNaN(id)) {
      return response.status(400).send(`The id ${request.params.id} is not a valid id number`);
    }

    if(!id){
      return response.status(404).send(`The person with id ${id} was not found`);
    }

    const personDeleted = persons.filter(person => person.id == id)
    const nameDeleted = personDeleted[0].name
    return response.send(nameDeleted);

  } catch (error) {
    response.status(500).send(error.message);
  }
})
*/
