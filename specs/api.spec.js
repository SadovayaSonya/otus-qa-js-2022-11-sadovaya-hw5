import axios from "axios";
import randomName from "../helpers/randomName.js";
import randomPassword from "../helpers/randomPassword.js";

describe("API tests for Book Store", () => {
    const username = randomName(10);
    const password = randomPassword();

    test("Check of successful user creation", async () => {
        const response = await axios.post('https://bookstore.demoqa.com/Account/v1/User', {
            userName: `${username}`,
            password: `${password}`
        }, {headers: {'Content-Type': 'application/json'}});
        expect(response.status).toEqual(201);
        expect(response.data.username).toEqual(`${username}`);
        expect(response.data.userID).toBeTruthy();
    });

    test("Check of the creation of a user with an already used username and password", async () => {
        try {
            const response = await axios.post('https://bookstore.demoqa.com/Account/v1/User', {
                userName: `${username}`,
                password: `${password}`
            }, {headers: {'Content-Type': 'application/json'}});
        } catch (e) {
            expect(e.response.status).toEqual(406);
            console.log(e.response.data.message);
        }
    });

    test("Check of the creation of a user with an incorrect password", async () => {
        try {
            const response = await axios.post('https://bookstore.demoqa.com/Account/v1/User', {
                userName: `${username}`,
                password: 'incorrectPassword'
            }, {headers: {'Content-Type': 'application/json'}});
        } catch (e) {
            expect(e.response.status).toEqual(400);
            console.log(e.response.data.message);
        }
    });

    test("Check of successful token generation", async () => {
        const response = await axios.post('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
            userName: `${username}`,
            password: `${password}`
        }, {headers: {'Content-Type': 'application/json'}});
        expect(response.status).toEqual(200);
        expect(response.data.status).toEqual('Success');
        expect(response.data.result).toEqual('User authorized successfully.');
        expect(response.data.token).toBeTruthy();
    });

    test("Check of token generation without a password", async () => {
        try {
            const response = await axios.post('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
                userName: `${username}`,
                password: ''
            }, {headers: {'Content-Type': 'application/json'}});
        } catch (e) {
            expect(e.response.status).toEqual(400);
            console.log(e.response.data.message);
        }
    });

    test("Check of token generation with a wrong password", async () => {
        try {
            const response = await axios.post('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
                userName: `${username}`,
                password: 'Wr0ngP@ssw0rd'
            }, {headers: {'Content-Type': 'application/json'}});
        } catch (e) {
            expect(e.response.status).toEqual(200);
            expect(e.response.data.token).toBeNull();
            expect(e.response.data.status).toEqual('Failed');
            expect(e.response.data.result).toEqual('User authorization failed.');
        }
    });
});