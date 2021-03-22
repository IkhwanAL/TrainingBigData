const exp = require('express');
const app = exp();
const Employee = require('./Route/Employee/employee');

require('dotenv/config');

const api = process.env.API_URL;

app.use(exp.urlencoded({extended: true}));
app.use(`${api}/Employee`, Employee);

app.listen(process.env.EXPRESS_PORT);