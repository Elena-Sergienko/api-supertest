const expect = require('chai').expect;
const supertest = require('supertest');
const faker = require('faker');

const request = supertest('https://nazarov-kanban-server.herokuapp.com');

let response;

describe('GET ALL CARDS. Status', () => {
    before(async () => {          // Async Await делает js в этой функции синхронным (js асинхронно работает обычно
        await request.get('/card')   // т.е. не ждет когда завершится запрос. Async Await заставляет подождать завершения)
            .then(res => {           // then - когда положительный ответ получен, тогда сделай...
                response = res;
                console.log(res);
            });
    });

    it('should return 200 response', () => {
        expect(response.status).equal(200);
    });

    it('data is an array', () => {
        expect(response.body).to.be.an('array') // expect from chai
    });

    it('array has an objects', () => {
        let isError = false;

        response.body.forEach(el => {
            if (!(el.hasOwnProperty('priority') && el.hasOwnProperty('name') && el.hasOwnProperty('description'))) {
                isError = true;
            }
            expect(isError).equal(false);
        });
    });

});