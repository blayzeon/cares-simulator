const data = require('./data.json');

function findAccount(accountNumber){
    return data.bna.find(numbers => numbers.account === accountNumber);
}

function returnBna(account){
    return {
        name1: account.name1,
        name2: account.name2,
        address1: account.address1,
        address2: account.address2,
        zip: account.zip,
        city: account.city,
        state: account.state,
        phone1: account.phone1,
        phone2: account.phone2,
        email: account.email,
        tax: account.tax,
        passcode: account.passcode,
        notes: account.notes,
        au: account.au,
        lec: account.lec,
        facility: account.facility,
    }
}

export {
    findAccount,
    returnBna
}