const express = require('express')
const cors = require('cors')

const port = 8500

const corsOptions = {
  optionsSuccessStatus: 200,
}

const app = express()
app.use(cors({
  optionsSuccessStatus: 200,
}))

app.post('/customer/login/', cors(corsOptions), (req, res) => {
  res.send({
    token_type: 'bearer',
    access_token: '1234567',
    success: 'true',
  })
})
app.get('/customer/debt/', (req, res) => {
  res.send({

  })
})

app.get('/customer/details/', (req, res) => {
  res.send({
    success: true,
    customer: {
      customerName: 'Testovy',
      customerLastname: 'User',
      customerPsition: 'Student',
      city: 'Mukhosransk',
      houseNumber: '15',
      street: 'Marshala Zhutkogo',
      officeNumber: '318A',
      customerWebsite: 'doyky.com',
      customerPhone: 'Nokia',
      customerEmail: 'test@emeil.com',
      roles: [{ name: 'admin' }, { name: 'user' }, { name: 'superAdmin' }],
    },
  })
})

app.listen(port, () => {
  console.log(`Fake server listening at http://localhost:${port}`)
})
