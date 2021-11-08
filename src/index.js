const { request } = require('express');
const express = require('express')
const app = express();

const { v4: uuidv4 } = require('uuid')

app.use(express.json())

const customers = [];

function verifyIfExistsAccountCPF(req, res, next){
  const { cpf } = req.query

  const customer = customers.find((customer) => customer.cpf === cpf)

  if(!customer){
    return res.status(400).json({ error: "Customer not found" })
  }

  request.customer = customer; 

  return next();
}

function getBalance(statement) {
  const balance = statement.reduce((acc, operation) => {
    if(operation.type === 'credit'){
      return acc + operation.amount
    } else {
      return acc - operation.amount
    }
  }, 0);

  return balance
}

app.post('/account', (req, res) => {
  const { cpf, name } = req.body;
  
  const customerAlreadyExists = customers.some((customer) => customer.cpf === cpf)
  
  if(customerAlreadyExists){
    return res.status(401).send({ error: "Customer already exists!!" })
  }
  
  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: [],
  });

  return res.status(201).send();
});

app.post('/deposit/', verifyIfExistsAccountCPF, (req, res) => {
  const { description, amount } = req.body
  
  const { customer } = request; 


  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "credit",
  };
    customer.statement.push(statementOperation);

    return res.status(201).send()
})

app.get('/statement/', verifyIfExistsAccountCPF, (req, res) => {
  const { customer } = request; 

  return res.json(customer.statement);
});

app.post('/withdraw/', verifyIfExistsAccountCPF, (req, res) => {
  const { amount } = req.body;
  const { customer } = request;

  const balance = getBalance(customer.statement)

  if(balance < amount){
    return res.status(400).json({ error: "Insufficient funds, please try again!" })
  }

  const statementOperation = {
    amount,
    created_at: new Date(),
    type: "credit",
  }

  customer.statement.push(statementOperation)

  return res.status(201).json({ message: "success" })

})

app.get('/statement/date', verifyIfExistsAccountCPF, (req, res) => {  
  const { customer } = request; 
  const { date } = req.query

  const dateFormat = new Date(date + " 00:00")

  const statement = customer.statement.filter((statement) => statement.created_at.toDateString() === new Date(dateFormat).toDateString())


  return res.json(statement);
});

app.put('/account', verifyIfExistsAccountCPF, (req, res) => {
  const { name } = req.body;
  const { customer } = request;

  customer.name = name

  return res.status(201).json({ success: "Name changed with success!"})
})

app.get('/account', verifyIfExistsAccountCPF, (req, res) => {
  const { customer } = request;

  return res.json(customer)
})

app.delete('/account', verifyIfExistsAccountCPF, (req, res) => {
  const { customer } = request;

  customers.splice(customer, 1);

  return res.status(201).json({ success: "Deleted!"})
})

app.get('/balance', verifyIfExistsAccountCPF, (req, res) => {
  const { customer } = request;

  const balance = getBalance(customer.statement)

  return res.json(balance)
});


const port = process.env.PORT || 8080 
app.listen(port, () => console.log(`Server is working at ${port}`))