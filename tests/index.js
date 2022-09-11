const axios = require('axios');
axios.default.withCredemtials = true;
const mocha = require('mocha');
// const assert = require('chai').assert;
const assert = require('assert');
const url = 'http://127.0.0.1:81';

const token = '';

describe('userAPI', () => {
    describe('Login', () => {
        it('login', (done) => {
            const options = {
                url: `${url}/user/login`,
                method: 'POST',
                data: {
                    username: "test sign up",
                    password: "1111"
                }
            };
            axios(options)
                .then(res => {
                    assert.equal(res.data.statusCode, 200, 'passed');
                    console.log(`res is -> ${JSON.stringify(res.data)}`);
                    done();
                })
                .catch((error) => {
                    console.log(`res is -> ${JSON.stringify(error.response.data)}`);
                    done(error);
                });
        });
        it('login', (done) => {
            const options = {
                url: `${url}/user/login`,
                method: 'POST',
                data: {
                    username: "test sign up",
                    password: "111"
                }
            };
            axios(options)
                .then(res => {
                    // assert.equal(res.data.statusCode, 401, 'passed');
                    console.log(`res is -> ${JSON.stringify(res.data)}`);
                    done();
                })
                .catch((error) => {
                    assert.equal(error.response.status, 401, 'passed');
                    console.log(`res is -> ${JSON.stringify(error.response.data)}`);
                    done();
                });
        });
    });
});