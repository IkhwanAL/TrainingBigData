const exp = require('express');
const {Con} = require('./connection');
const app = exp();
const event = require('events').EventEmitter;
const {employee} = require('./Route/Employee/employee');

require('dotenv/config');

const api = process.env.API_URL;

app.use(exp.urlencoded({extended: true}));
app.use('/emp', employee);

app.listen(process.env.EXPRESS_PORT);