import {
    data
} from '../src/controller.js';

test('data.find returns the account if it exists', ()=> {
    expect(data.find('8004838314')).toEqual(
        expect.objectContaining({account: '8004838314'}),
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
        expect.objectContaining({account: '0'}),
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
    expect(data.addComment(account, 'hi mom')).toEqual(
        expect.objectContaining({comment: 'hi mom'}),
    );
});