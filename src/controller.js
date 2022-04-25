const jsonData = require('./data.json');

const data = {
    all: jsonData,
    find(accountNumber) { return this.all.bna.find(numbers => numbers.account === accountNumber) },
    filter(destination) { return this.all.transactions.filter(number => number.destination === destination) },
    bna(account) {
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
    },
    create(accountNumber) {
        this.all.bna.push({
            account: accountNumber,
            name1: "",
            name2: "",
            address1: "",
            address2: "",
            zip: "",
            city: "",
            state: "",
            phone1: "",
            phone2: "",
            email: "",
            tax: "",
            passcode: "",
            notes: "",
            au: "",
            lec: "",
            facility: "",
            comments: [],
            policies: [
                {
                    label: "Cell phone/VOIP setup at own risk",
                    status: false
                },
                {
                    label: "Service Fees",
                    status: false
                },
                {
                    label: "90 Days Account Expiration",
                    status: false
                },
                {
                    label: "180 Days Account Expiration",
                    status: false
                }
            ]
        });

        return this.all.bna[this.all.bna.length-1];
    },
    set(object, item, value) {
        object[item] = value;
        return object;
    },
    addComment(object, comment, date='4/25/2022', time='4:40 PM') {
        object.comments.push({
            date,
            time,
            comment
        });

        return object.comments[object.comments.length-1];
    }
}

export {
    data
}