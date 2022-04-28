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
            status: "Active",
            types: ["Advance Pay"],
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
    },
    addDeposit(depositInfo) {
        const newDeposit = depositInfo;

        /* auto-fill omitted information */
        if (!depositInfo.type) { newDeposit.type = "Deposit" };

        if (!depositInfo.addedBy) { newDeposit.addedBy = "InContactMainAdvancePayIVR" };

        if (!depositInfo.comment) { newDeposit.comment = "" };

        if (!depositInfo.system) { newDeposit.system = "ADVANCEPAY-IVR" };

        if (!depositInfo.status) { newDeposit.status = "APPROVED" };

        if (!depositInfo.destination) { newDeposit.destination = "8004838314" };

        if (!depositInfo.cc) { newDeposit.cc = "444444********4444" };

        if (!depositInfo.exp) { newDeposit.exp = "1299" };

        if (!depositInfo.amount) { newDeposit.amount = "5.00" };

        if (!depositInfo.auth1) { newDeposit.auth1 = "00000000000000000000000000000000" };

        if (!depositInfo.auth2) { newDeposit.auth2 = "000000" };

        if (!depositInfo.order) { newDeposit.order = "00000000000" };

        if (!depositInfo.date) {
            const date = new Date();
            const formattedDate = date.toLocaleDateString(undefined, {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            });
            const formattedTime = date.toLocaleTimeString("en-US");
            newDeposit.date = `${formattedDate} ${formattedTime}`;
        };
        
        if (!depositInfo.vender) { newDeposit.vender = "PaymenTech" };

        if (!depositInfo.transaction1) { newDeposit.transaction1 = "Payment" };

        if (!depositInfo.transaction2) { newDeposit.transaction2 = "Post-Auth" };

        if (!depositInfo.fee) { newDeposit.fee = "3.00" };

        /* */

        this.all.transactions.push(newDeposit);
        return this.all.transactions[this.all.transactions.length-1];
    }
}

export {
    data
}

