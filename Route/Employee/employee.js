const express = require('express');
const employee = express.Router();
const {Con} = require('../../connection');
const cors = require('cors');
const redis = require('redis');
require('dotenv/config');

const client = redis.createClient();
client.on('error', (er) => {
    console.log(er)
})

const findUser = (tableName, option = {field: [], filterOption: []}) => {
    let {field, filterOption} = option;
    return new Promise((resolve, reject) => {
        let findUser = '';
        if(field.length == 0){
            findUser += `SELECT * from ${tableName}`;
        }else{
            
        }
    })
}

const getData = async (key, callback) => {
    let connection = await Con();
    connection.query('SELECT * FROM salaries', (er, rows, fields) => {
        if(er) throw er;

        client.setex(key, 3600, JSON.stringify(rows))

        return callback(rows);
    })
}

// employee.use(cors());

employee.get('/', async (req, res) => {
    console.log('im in')
    const setKeyEmployee = 'emp';
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', 'GET');
    let data = await Con();
    // data.query('SELECT * FROM salaries', (er, row, fil) => {
    //     if(er) throw er;
    //     res.send(row)
    // })
    // res.json(result)
    return client.get(setKeyEmployee, (err, data) => {
        if(err) throw err;

        if(data){
            return res.json({data: JSON.parse(data)})
        }else{
            let result;
            getData(setKeyEmployee, (stuff) => {
                result = stuff;
            })
            return res.json({data: result});
        }
    })
})

module.exports = {employee}