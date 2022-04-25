import {
    data
} from '../src/controller.js';

test('checks if 8004838314 is an existing account', ()=> {
    expect(data.find('8004838314')).toEqual(
        expect.objectContaining({account: '8004838314'}),
    );
});

test('checks if 0 is an existing account', ()=> {
    expect(data.find('0')).toEqual(undefined);
});

test('Checks if we can get the BNA of an account', ()=> {
    const account = data.find('8004838314');
    expect(data.bna(account)).toEqual(
        expect.objectContaining({name1: 'GTL'}),
    );
});