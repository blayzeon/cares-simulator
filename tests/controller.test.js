import {
    findAccount,
    returnBna
} from '../src/controller.js';

test('checks if 8004838314 is an existing account', ()=> {
    expect(findAccount('8004838314')).toEqual(
        expect.objectContaining({account: '8004838314'}),
    );
});

test('checks if 0 is an existing account', ()=> {
    expect(findAccount('0')).toEqual(undefined);
});

test('Checks if we can get the BNA of an account', ()=> {
    const account = findAccount('8004838314');
    expect(returnBna(account)).toEqual(
        expect.objectContaining({name1: 'GTL'}),
    );
});