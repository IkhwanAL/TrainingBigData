const express = require('express');
const employee = express.Router();
const {Con} = require('../../connection');
const cors = require('cors');
const redis = require('redis');
const utils = require('util');
const {findSomething} = require('../../utils/queryCreator')
require('dotenv/config');

employee.use(cors());

employee.get('/' ,async (req, res) => {
    console.log('im in');
    try{
        const options = {
            field: ['emp_no', 'salary', 'to_date'],
            filterOption: ['ORDER BY salary DESC', 'LIMIT 100'],
        }
        let con = await Con();
        const query = con.query(await findSomething('salaries', options));
        // let key = 'salaries';
        if(query){
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Request-Method', 'GET');
            res.setHeader('Content-Type', 'application/json');
            query.stream().pipe(require('stream').Transform({
                objectMode: true,
                transform: (data, encoding, callback) => {
                    res.write(JSON.stringify(data))
                    callback()  
                }
            })).on('finish',() => {
                console.log("END!!!");
                res.end();
            })
        }
    }catch(er){
        res.status(500).json({'message': `${er}`})
    }
   
})

module.exports = {employee}