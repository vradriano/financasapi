const express = require('express')
const app = express();

const { v4: uuidv4 } = require('uuid')

app.use(express.json())

const customers = [];


app.post('/account', (req, res) => {
  const { cpf, name } = req.body;
  
  const customerAlreadyExists = customers.some((customer) => customer.cpf === cpf)
  
  if(customerAlreadyExists){
    return res.status(401).send({ error: "cUSTOMER ALREADY EXIST" })
  }
  
  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: [],
  });

  return res.status(201).send();
});

app.get('/statement/:cpf', (req, res) => {
  const { cpf } = req.params

  const customer = customers.find((customer) => customer.cpf === cpf)

  if(!customer){
    return res.status(400).json({ error: "Customer not found!" })
  }

  return res.json(customer.statement);
});

const port = process.env.PORT || 8080 
app.listen(port, () => console.log(`Server is working at ${port}`))