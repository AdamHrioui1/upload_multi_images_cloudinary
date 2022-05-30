const mongoose = require('mongoose');

const connection = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`mongodb connect: ${con.connection.host}`)
    } catch (err) {
        console.log('mongodb error: ', err.message)
    }
}

module.exports = connection