const express = require('express');
const employee = express.Router();
const {Con} = require('../../connection');
const cors = require('cors');
const {findSomething} = require('../../utils/queryBuilder')
require('dotenv/config');

const allowUrl = ['http://localhost:3000', 'http://my.example.com'];
const corsDelegate = (req, callback) => {
    // console.log(req.decoded = 'string');
    var corsOption = {};
    corsOption = {origin: true, allowMethod: ['GET', 'POST']};
    callback(null, corsOption);
}

employee.get('/', cors(corsDelegate), async (req, res) => {
    console.log('im in');
    try{
        const options = {
            field: ['emp_no', 'salary', 'to_date'],
            filterOption: ['ORDER BY salary DESC', 'LIMIT 5000'], // Offset Limit
        }

        // Connection, Query, And Stream Data To Client
        let con = await Con(); 
        const query = con.query(findSomething('salaries', options));
            res.setHeader('Content-Type', 'application/json');
        
            let result = [];
            query.stream().pipe(require('stream').Transform({
                objectMode: true,
                transform: (data, encoding, callback) => {
                    // console.log(encoding);
                    result.push(data);
                    callback();
                }
            })).once('finish',() => {
                console.log("END!!!");
                res.send(JSON.stringify(result));
                res.end()
                con.release();
            })
    }catch(er){
        console.log('Error');
        res.status(500).json({'message': `${er}`})
    }
   
})

module.exports = {employee}