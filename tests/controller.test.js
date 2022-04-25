const findAccount = require('../src/controller');

test('checks if 8004838314 is an existing account', ()=> {
    expect(findAccount('8004838314')).toEqual(
        expect.objectContaining({account: '8004838314'}),
    );
});

test('checks if 0 is an existing account', ()=> {
    expect(findAccount('0')).toEqual(undefined);
});