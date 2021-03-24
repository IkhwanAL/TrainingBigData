const express = require('express');
const employee = express.Router();
const {Con} = require('../../connection');
const cors = require('cors');
const {Readable, Writable} = require('stream');
const {findSomething} = require('../../utils/queryCreator')
require('dotenv/config');

employee.use(cors());

employee.get('/' ,async (req, res) => {
    console.log('im in');
    try{
        const options = {
            field: ['emp_no', 'salary', 'to_date'],
            filterOption: ['ORDER BY salary DESC', 'LIMIT 5000'], // Offset Limit
        }
        let con = await Con();
        // console.log(findSomething('salaries', options));
        const query = con.query(findSomething('salaries', options));
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Request-Method', 'GET');
            res.setHeader('Content-Type', 'application/json');
        
            let result = [];
            query.stream().pipe(require('stream').Transform({
                objectMode: true,
                transform: (data, encoding, callback) => {
                    // res.write(JSON.stringify(data));
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