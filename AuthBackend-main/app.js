const express = require('express');
const mongoose = require('mongoose');

const AuthRoute = require('./routes/authRoute');

const mongoConfig = require('./app.config')
const app = express();

mongoose.connect(mongoConfig.connectionString).then(() => {
    console.log("db connected");
}).catch(err => { console.log(err); });

app.use(express.json());

app.get('/', (req, res) => { res.json({ message: "welcome" }) })
app.use('/auth', AuthRoute);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is live on port ${port}`);
});