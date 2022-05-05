import {
    data
} from '../src/controller.js';

test('data.find returns the account if it exists', ()=> {
    expect(data.find('8004838314')).toEqual(
        expect.objectContaining({destination: '8004838314'}),
    );
});

test('data.find returns undefined when account doesnt exist', ()=> {
    expect(data.find('0')).toEqual(undefined);
});

test('data.bna can get the BNA of an account', ()=> {
    const account = data.find('8004838314');
    expect(data.bna(account)).toEqual(
        expect.objectContaining({name1: 'GTL'}),
    );
});

test('data.create can create new accounts', ()=> {
    expect(data.create('0')).toEqual(
        expect.objectContaining({destination: '0'}),
    );
});

test('data.set can change values', ()=> {
    const account = data.find('8004838314');
    expect(data.set(account, 'name1', 'bob')).toEqual(
        expect.objectContaining({name1: 'bob'}),
    );
});

test('data.addComment can add comments', ()=> {
    const account = data.find('8004838314');
    expect(data.addComment(account, 'hello world')).toEqual(
        expect.objectContaining({comment: 'hello world'}),
    );
});

test('data.filter returns transactions associated with a number', ()=> {
    expect(data.filter('8004838314')).toBeTruthy();
});

test('data.addDeposit can add deposits associated with an account', ()=> {
    expect(data.addDeposit({destination: "0", amount: "0.00"})).toEqual(
        expect.objectContaining({destination: '0'}),
    );
});

test('data.addDeposit will auto populate omitted fields', ()=> {
    expect(data.addDeposit({destination: "0", amount: "0.00"})).toEqual(
        expect.objectContaining({type: 'Deposit', fee: '3.00', vender: "PaymenTech"}),
    );
});

test('data.returnTransactions can return the balance on an account', ()=> {
    const transactions = data.returnTransactions('8004838314');
    expect(transactions.balance).toEqual('21.19');
});

test('data.returnTransactions returns the same thing no matter how many times it is ran', ()=> {
    const transactions = data.returnTransactions('8004838314');
    data.returnTransactions('8004838314');
    data.returnTransactions('8004838314');
    expect(transactions.balance).toEqual('21.19');
});

test('data.transfer will transfer funds from one account to another', ()=> {
    data.transfer('8004838314', '8889884768', '21.19');
    const transactionsFrom = data.returnTransactions('8004838314');
    const transactionsTo = data.returnTransactions('8889884768');

    const balances = {
        from: transactionsFrom.balance,
        to: transactionsTo.balance
    }
    expect(balances).toEqual(
        expect.objectContaining({from: '0.00', to: '21.19'}),
    );
});

test('data.addDeposit will be added to new data.filter results', ()=> {
    const oldL = data.filter('0').length;
    data.addDeposit({amount: "999.00", destination: "0"});
    const newL = data.filter('0').length;

    let result = false;
    if (newL > oldL) { result = true };
    expect(result).toEqual(true);
});

test('data.returnRefundable will return information about refundable deposits', ()=> {
    data.addDeposit({destination: "1", amount: "999.99"});
    const refundable = data.returnRefundable("1");
    expect(refundable[0].refundInfo.obj).toEqual(
        expect.objectContaining({amount: "999.99"}),
    );
});

test('data.returnRefundable will allow transactions to create refundObjs', ()=> {
    data.addDeposit({destination: "1", amount: "999.99"});
    const refundable = data.returnRefundable("1");
    const refundMe = refundable[0].refundInfo;
    const refunded = data.refundTransaction(refundMe.obj, refundMe.transaction)
    expect(refunded).toEqual(
        expect.objectContaining({type: "AdjustmentDecrease"}),
    );
});

test('data.createCall will generate info needed for call records', ()=> {
    const call = data.createCall('8004838314');
    const callObj = call.call;
    expect(callObj).toEqual(
        expect.objectContaining({"Call Type": "H"}),
    );
});

test('data.createCall will generate calls for transactions', ()=> {
    const oldBalance = data.returnTransactions('8004838314').balance;
    data.createCall('8004838314', 15, 0, 0); // "Rate": "0.05" - total $0.75
    const newBalance = data.returnTransactions('8004838314').balance;

    const result = oldBalance > newBalance ? true : false;
    expect(result).toEqual(true);
});

test('data.sortFilter returns the info needed for transaction summary', ()=> {
    const summary = data.sortFilter('8004838314');
    expect(summary.Deposit).toEqual(
        expect.objectContaining({amount: "25.00", count: 1}),
    );
});

test('data.returnCcAuths can search transactions by cc number', ()=> {
    const result = data.returnCcAuths('472776********3464', 'cc');
    expect(result[0][3]).toEqual("472776********3464");
});




// show transaction summary

// show cc auths (destination)

// show cc auths (first 6/last 4)

// call records

