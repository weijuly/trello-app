import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server.babel';

chai.use(chaiHttp);

let should = chai.should;

describe('cards', () => {
    describe('GET /cards', () => {
        it('should return an example card', done => {
            chai
                .request(server)
                .get('/_api/cards')
                .end((err, res) => {
                    expect(res.status).toEqual(200);
                    done();
                });
        });
    });
});