import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

chai.use(chaiHttp);

let should = chai.should;
let app = undefined;

const generateCard = () => {
    return {
        header: 'header',
        description: 'description',
        state: 'B',
        created: '2019-01-30T17:57:07+00:00',
        due: '2019-01-30T17:57:07+00:00',
        owner: 'gganesan'
    }
};

const clearCards = async(app) => {
    const response = await chai
        .request(app)
        .get('/_api/cards');
    for (let i = 0; i < response.body.cards.length; i++) {
        await chai.request(app).del(`/_api/cards/${response.body.cards[i].id}`);
    }
};


describe('cards', () => {

    beforeEach(async (done) => {
        app = await server;
        await clearCards(app);
        done();
    });

    describe('cards API functional tests', () => {

        it('GET /_api/cards should return empty list at startup', async (done) => {
            const res = await chai
                .request(app)
                .get('/_api/cards');
            expect(res.status).toEqual(200);
            expect(res.body.cards).toEqual([]);
            done();
        });

        it('POST /_api/cards should create a new card', async (done) => {
            const res = await chai
                .request(app)
                .post('/_api/cards')
                .type('application/json')
                .send(generateCard());
            expect(res.status).toEqual(201);
            expect(res.body.id).toBeDefined();
            done();
        });

        it('GET /_api/cards/{cardId} should get the created card', async (done) => {
            let res = await chai
                .request(app)
                .post('/_api/cards')
                .type('application/json')
                .send(generateCard());
            expect(res.status).toEqual(201);
            const cardId = res.body.id;
            res = await chai
                .request(app)
                .get(`/_api/cards/${cardId}`);
            expect(res.status).toEqual(200);
            done();
        });

        it('PATCH /_api/cards/{cardId} should update the created card', async (done) => {
            let res = await chai
                .request(app)
                .post('/_api/cards')
                .type('application/json')
                .send(generateCard());
            expect(res.status).toEqual(201);
            const cardId = res.body.id;
            res = await chai
                .request(app)
                .patch(`/_api/cards/${cardId}`)
                .type('application/json')
                .send(generateCard());
            expect(res.status).toEqual(200);
            done();
        });

        it('DELETE /_api/cards/{cardId} should delete the created card', async (done) => {
            let res = await chai
                .request(app)
                .post('/_api/cards')
                .type('application/json')
                .send(generateCard());
            expect(res.status).toEqual(201);
            const cardId = res.body.id;
            res = await chai
                .request(app)
                .del(`/_api/cards/${cardId}`)
            expect(res.status).toEqual(200);
            done();
        });

        it('DELETE /_api/cards/{cardId} should error on non existent card', async (done) => {
            const res = await chai
                .request(app)
                .del(`/_api/cards/111111111111111111111111`);
            expect(res.status).toEqual(404);
            done();
        });

        it('PATCH /_api/cards/{cardId} should error on non existent card', async (done) => {
            const res = await chai
                .request(app)
                .patch(`/_api/cards/111111111111111111111111`)
                .type('application/json')
                .send(generateCard());
            expect(res.status).toEqual(404);
            done();
        });

        it('GET /_api/cards/{cardId} should error on non existent card', async (done) => {
            const res = await chai
                .request(app)
                .get(`/_api/cards/111111111111111111111111`);
            expect(res.status).toEqual(404);
            done();
        });
    });

});