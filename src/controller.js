const data = require('./data.json');

function findAccount(accountNumber){
    return data.bna.find(numbers => numbers.account === accountNumber);
}

module.exports = findAccount;