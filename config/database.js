const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection

db.on('connection', function() {
    console.log(`Connected to MongodDB ${db.name} ${db.host}:${db.port}`)
})