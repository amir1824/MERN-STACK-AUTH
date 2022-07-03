const mongoose  = require("mongoose")
const dotenv = require('dotenv');
const db = process.env.DATABASE

mongoose
.connect(
    db)
    .then(() => console.log('DB connection successful!'))
    


