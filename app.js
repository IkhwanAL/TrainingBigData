const exp = require('express');
const {Con} = require('./connection');
const app = exp();
const event = require('events').EventEmitter;
const {employee} = require('./Route/Employee/employee');

require('dotenv/config');

const api = process.env.API_URL;

app.use(exp.urlencoded({extended: true}));
app.use('/emp', employee);

const getSalaries = async() => {
    let connection = await Con();
    // connection.query('select * FROM salaries', (er, row, field) => {
    //     console.log(row);
    // })
}

app.listen(process.env.EXPRESS_PORT, () => {
    getSalaries();
});