require('dotenv').config()
const express = require('express');
const fileupload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./database/connection');

const app = express()
const port = process.env.PORT || 8080

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(fileupload({
    useTempFiles : true
}))

app.use('/api', require('./routes/ProductRoutes'))
app.use('/api', require('./routes/Cloudinary'))

connection()

app.get('/', (req, res) => {
    return res.json({ msg: 'hello world!' })
})

app.listen(port, () => console.log(`Server is listening on port: http://localhost:${port} `))