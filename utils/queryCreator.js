/**
 * 
 * @param {string} tableName 
 * @param {object} option include field and filterOption
 * @returns Promise SQL Query
 */
 let findSomething = (tableName, option = {field: [], filterOption: []}) => {
    let {field, filterOption} = option;
    let findUser = '';
        if(!tableName){
            throw new Error('Table Name is Empty');
        }
        // Input find base of length
        if(field.length == 0){
            findUser += `SELECT * from ${tableName}`;
            // return(findUser);
        }else{
            findUser += 'SELECT ';
            field.forEach( (f, index) => {
                if(index == field.length - 1){
                    findUser += `${f} `;
                }else{
                    findUser += `${f}, `
                }
            })
            findUser += `from ${tableName}`;
        }
        // filter option in find
        if(filterOption.length == 0){
            return findUser;
        }else{
            filterOption.forEach((fill) => {
                findUser += ` ${fill}`
            })
            return findUser;
        }
}

module.exports = {findSomething}