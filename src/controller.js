const jsonData = require('./data.json');

const data = {
    all: jsonData,
    returnCurrentDateTime() {
        const date = new Date();
        const formattedDate = date.toLocaleDateString(undefined, {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        });
        const formattedTime = date.toLocaleTimeString("en-US");
        
        return {
            date: formattedDate,
            time: formattedTime
        }
    },
    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    },
    find(accountNumber) { return this.all.bna.find(numbers => numbers.destination === accountNumber) },
    filter(destination) { return this.all.transactions.filter(transaction => transaction.destination === destination) },
    sortFilter(destination) {
        const data = this.filter(destination);

        const result = {
            Deposit: {
                amount: 0,
                count: 0
            },
            "Call Usage": {
                amount: 0,
                count: 0
            },
            Taxes: {
                amount: 0,
                count: 0
            },
            Fees: {
                amount: 0,
                count: 0
            },
            "Funds Xfer": {
                amount: 0,
                count: 0
            },
            "Adj Increase": {
                amount: 0,
                count: 0
            },
            "Adj Decrease": {
                amount: 0,
                count: 0
            },
            Withdrawal: {
                amount: 0,
                count: 0
            },
            "Ret Check": {
                amount: 0,
                count: 0
            },
            "Close Acct": {
                amount: 0,
                count: 0
            },
            "Exp Funds": {
                amount: 0,
                count: 0
            },
            Chareback: {
                amount: 0,
                count: 0
            }
        }

        data.forEach((trans) => {
            for (let key in result) {
                if (key === trans.pa) {
                    const newAmount = result[key].amount += parseFloat(trans.amount);
                    result[key].amount = parseFloat(newAmount).toFixed(2);
                    result[key].count += 1;
                }
            }
        });

        return result;
    },
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
            destination: accountNumber,
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
    addDeposit(depositInfo={}) {
        const newDeposit = depositInfo;

        /* auto-fill omitted information */
        if (!depositInfo.type) { newDeposit.type = "Deposit" };

        if (depositInfo.type === "Deposit") {
            newDeposit.refundable = true;

            if (!depositInfo.addedBy) { newDeposit.addedBy = "InContactMainAdvancePayIVR" };

            if (!depositInfo.system) { newDeposit.system = "ADVANCEPAY-IVR" };

            if (!depositInfo.status) { newDeposit.status = "APPROVED" };

            if (!depositInfo.cc) { newDeposit.cc = "444444********4444" };

            if (!depositInfo.exp) { newDeposit.exp = "1299" };

            if (!depositInfo.auth1) { newDeposit.auth1 = "00000000000000000000000000000000" };

            if (!depositInfo.auth2) { newDeposit.auth2 = "000000" };

            if (!depositInfo.order) { newDeposit.order = "00000000000" };

            if (!depositInfo.vender) { newDeposit.vender = "PaymenTech" };

            if (!depositInfo.transaction1) { newDeposit.transaction1 = "Payment" };

            if (!depositInfo.transaction2) { newDeposit.transaction2 = "Post-Auth" };

            if (!depositInfo.fee) { newDeposit.fee = "3.00" };

            depositInfo.pa = "Deposit";

        }

        if (depositInfo.type === "CallUsage") {
            newDeposit.refundable = false;
            newDeposit.addedBy = "HOUVAL11";
            newDeposit.pa = "Call Usage"
        }

        if (!depositInfo.destination) { newDeposit.destination = "8004838314" };
        if (!depositInfo.amount) { newDeposit.amount = "5.00" };
        if (!depositInfo.comment) { newDeposit.comment = "" };

        if (!depositInfo.date) {
            const date = this.returnCurrentDateTime();
            newDeposit.date = `${date.date} ${date.time}`;   
        };

        this.all.transactions.push(newDeposit);
        return this.all.transactions[this.all.transactions.length-1];
    },
    returnTransactions(destination) {
        const trans = data.filter(destination);
        const deposits = [];
        let balance = 0.00;
        trans.forEach((tran) => {
            if (tran.type) {
                if (tran.pa === 'Deposit' || tran.type === 'AdjustmentIncrease') {
                    balance += parseFloat(tran.amount);
                    deposits.unshift(
                        {
                            "Date": tran.date,
                            "Type": tran.type,
                            "Added By": tran.addedBy,
                            "Amount": `$${tran.amount}`,
                            "Balance": `$${balance.toFixed(2)}`,
                            "Comment": tran.comment 
                        }
                    );

                    if (tran.fee){
                        const fee2 = (tran.amount * 0.0325).toFixed(2);
                        balance -= parseFloat(fee2);
                        deposits.unshift(
                            {
                                "Date": tran.date,
                                "Type": "3rdPartyFinancialTransactionFee",
                                "Added By": tran.addedBy,
                                "Amount": `$${fee2}`,
                                "Balance": `$${balance.toFixed(2)}`,
                                "Comment": "",
                                "pa": "Fees"
                            }
                        );
        
                        balance -= parseFloat(tran.fee);
                        deposits.unshift(
                            {
                                "Date": tran.date,
                                "Type": "DepositTransactionFee",
                                "Added By": tran.addedBy,
                                "Amount": `$${tran.fee}`,
                                "Balance": `$${balance.toFixed(2)}`,
                                "Comment": "",
                                "pa": "Fees"
                            }
                        );
                    }
                } else {
                    balance -= parseFloat(tran.amount);
                    deposits.unshift(
                        {
                            "Date": tran.date,
                            "Type": tran.type,
                            "Added By": tran.addedBy,
                            "Amount": `$${tran.amount}`,
                            "Balance": `$${balance.toFixed(2)}`,
                            "Comment": tran.comment 
                        }
                    );
                }
            }
        });
    
        return { deposits, balance: balance.toFixed(2) };
    },
    returnRefundable(destination) {
        function returnRefundObj(transaction) {
            const refundObj = {
                destination: transaction.destination,
                type: 'AdjustmentDecrease',
                amount: transaction.amount,
                addedBy: "CARES",
                cc: transaction.cc,
                exp: transaction.exp,
                system: "CARES",
                comment: "Adjustment Decrease for Refund Request",
                refundable: false
            }
            return {obj: refundObj, transaction};
        }

        const trans = data.filter(destination);
        
        const transArray = []
        for (let i = 0; i < trans.length; i += 1) {
            console.log(trans[i])
            if (trans[i].refundable) {
                const toPush = {
                    menu1: {
                        date: 'undefined',
                        addedBy: 'undefined',
                        amount: 'undefined',
                        cc: 'undefined',
                        comment: 'undefined',
                        exp: 'undefined'
                    },
                    menu2: {
                        // request date
                        // rep's name
                        // customer account
                        // customer's name
                        merchantId: "284973",
                        cc: 'undefined',
                        exp: 'undefined',
                        date: 'undefined',
                        amount: 'undefined',
                        // reason for refund
                        // refund amount
                        //email receipt
                        // email address
                        // comment         
                    },
                    refundInfo: undefined
                };

                for (let key in trans[i]) {
                    if (toPush.menu1[key]){
                        toPush.menu1[key] = trans[i][key];
                    }
    
                    if (toPush.menu2[key]){
                        toPush.menu2[key] = trans[i][key];
                    }
                    toPush.refundInfo = returnRefundObj(trans[i]);
                }

                transArray.push(toPush);
            }
        } 
    
        return transArray;
    },
    returnCcAuths(searchValue, searchType="destination") {
        const trans = this.all.transactions.filter(transaction => transaction[searchType] === searchValue);
        

        const rDestination = [];
        const rCc = [];
        trans.forEach((tran) => {
            // Calling System > Status > Destination > CC Number > Exp > Amount > Auth Code > Order ID > Add Date > Vendor > Transaction Type
            rCc.push(
                [
                    tran.system,
                    tran.status,
                    tran.destination,
                    tran.cc,
                    tran.exp,
                    tran.amount,
                    tran.auth,
                    tran.order,
                    tran.date,
                    tran.vendor,
                    tran.transaction,
                ]
            );

            rDestination.push(
                [
                    tran.system,
                    tran.date,
                    tran.cc,
                    tran.status,
                    tran.amount,
                    tran.auth,
                    tran.order,
                    tran.reject,
                    tran.vendor,
                    tran.transaction,
                ]
            );
        });

        if (searchType === "destination") {
            return rDestination;
        } else {
            return rCc;
        }
    },
    returnCallAttempts(destination) {
        const calls = this.all.transactions.filter(transaction => transaction[searchType] === searchValue);

        const result = [];

        calls.forEach((call) => {
            result.unshift(
                {
                    date: call.date,
                    sub: call.sub,

                }
            )
        });
    },
    refundTransaction(refundObj, transaction) {
        transaction.refundable = false;
        const refunded = this.addDeposit(refundObj);

        return refunded;
    },
    transfer(fromAccount, toAccount, amount, comment="") {
        const remove = {
            type: "AdjustmentDecrease",
            destination: fromAccount,
            amount,
            comment,
            pa: "Funds Xfer"
        }

        const add = {
            type: "AdjustmentIncrease",
            destination: toAccount,
            amount,
            comment,
            pa: "Funds Xfer"
        }

        this.addDeposit(remove);
        this.addDeposit(add);

        return { remove, add };
    }, 
    createCall(destination, duration=this.getRandomInt(16), tax=0, facilityIndex=this.getRandomInt(this.all.facilities.length-1)) {
        const fac = this.all.facilities[facilityIndex];
        const rate = parseFloat(fac.Rate);
        const seconds = duration === 15 ? 0 : this.getRandomInt(60);
        const billDur = seconds > 30 ? duration + 1 : duration;
        const bill = rate * billDur;
        const sCode = duration > 0 ? "D0" : "D5";

        let tempEndCode = false;
        if (sCode === "D0") {
            tempEndCode = duration === 15 ? "TO" : "HU";
        }

        const eCode = tempEndCode ? tempEndCode : "";

        const callTransaction = {destination, type: "CallUsage", amount: bill.toFixed(2)};
        const transaction = this.addDeposit(callTransaction);

        const call = {
            date: transaction.date,
            sub: fac['Sub ID'],
            orig: fac.Orig,
            pin: fac.Inmate.PIN,
            duration: `${duration}m ${seconds}s`,
            bill: bill.toFixed(2),
            tax: tax.toFixed(2),
            total: bill.toFixed(2),
            sCode: sCode,
            eCode: eCode,
            type: "H",
            rate: this.getRandomInt(6) + 1
        }

        return {
            transaction,
            call,
            fac
        }
    }
}

export {
    data
}

