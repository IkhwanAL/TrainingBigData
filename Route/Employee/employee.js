const employee = require('express').Router;
const {Con} = require('../../connection');
require('dotenv/config');

const memo = {};

var findUser = (tableName, option = {field: [], filterOption = []}) => {
    let {field, filterOption} = option;
    return new Promise((resolve, reject) => {
        let findUser = '';
        if(field.length == 0){
            findUser += `SELECT * from ${tableName}`;
        }else{
            
        }
    })
}

employee.get('/', async (req, res) => {

})

module.exports = {employee}