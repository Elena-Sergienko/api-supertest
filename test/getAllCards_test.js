const expect = require('chai').expect;
const supertest = require('supertest');
const faker = require('faker');

const request = supertest('https://nazarov-kanban-server.herokuapp.com');

let response;

describe('GET ALL CARDS. Status', () => {
    before(async () => {          // Async Await (js - Преимущества асинхронного программирования)
        const cards = await request.get('/card')   // Async function - будет ждать Await завершения этой функции)
            .then(res => {           // then - когда положительный ответ получен, тогда сделай...
                response = res;
                return res.body
            });

        cards.map(el => el._id).forEach(el => {
            request.delete(`/card/${el}`)
                .then(res => {
                        console.log(res.body)
                    })
                .catch(err => console.log(err))
        }); // получаем массив всех ID карт и все удаляем все карты
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

describe.skip('Create, Update, Delete', () => {
    it('should create new card', async () => {
        let arrLength = response.body.length;

        let newCard = {
            description: faker.lorem.word(),
            priority: 2,
            status: 'to do',
            name: faker.name.firstName(),
        };

        await request
            .post('/card')
            .send(newCard)
            .set("Accept", "application/json");
        let responseNew;
        await request.get('/card')
            .then(res => {
                responseNew = res;
            })
        expect(responseNew.body.length).equal(arrLength + 1);

    });

});

describe.skip('Create new card', () => {
    it('Create new card', async () => {
        let arrLength = response.body.length;
        let newCard = {
            description: 'newCard',
            priority: 2,
            status: 'to do',
            name: 'Andrey privet',
        };
        await request
            .post('/card')
            .send(newCard)
            .set('Accept', 'application/json');
        let responseNew;
        await request.get('/card')
            .then(res => {
                responseNew = res;
            });
        expect(responseNew.body.length).equal(arrLength + 1);
    });
});