/**
 * Created by wminikuma@gmail.com on 2020/11/25
 * Blog : https://minikuma-laboratory.tistory.com/
 * Github : http://github.com/minikuma
 */
const request = require('supertest');
const should = require('should');
const app = require('../../index');
const models = require('../../model/models');

describe('GET /users 는...', () => {

    const users = [{name: 'alice'}, {name: 'chris'}, {name: 'danny'}];
    before(() => models.sequelize.sync({force: true}));
    before(() => models.User.bulkCreate(users));

    describe('성공 시...', () => {
        it('유저 객체를 담은 배열로 응답한다.', (done) => {
            request(app)
                .get('/users')
                .end((err, res) => {
                    res.body.should.be.instanceOf(Array);
                    done();
                });
        });

        it('최대 Limit 갯수만큼 응답한다.', (done) => {
            request(app)
                .get('/users?limit=2')
                .end((err, res) => {
                    res.body.should.have.lengthOf(2);
                    done();
                });
        });
    });

    describe('실패 시...', () => {
        it('Limit 가 숫자형이 아니면 400 을 응답한다.', (done) => {
            request(app)
                .get('/users?limit=two')
                .expect(400)
                .end(done);
        });
    });
});

describe('GET /users/:id 는...', () => {

    const users = [{name: 'alice'}, {name: 'chris'}, {name: 'danny'}];
    before(() => models.sequelize.sync({force: true}));
    before(() => models.User.bulkCreate(users));

    describe('성공시...', () => {
        it('id 가 1인 유저 객체를 응답한다.', (done) => {
            request(app)
                .get('/users/1')
                .end((err, res) => {
                    res.body.should.have.property('id', 1);
                    done();
                });
        });
    });
    describe('실패시...', () => {
        it('id 가 숫자가 아닌 경우 400 으로 응답한다.', (done) => {
            request(app)
                .get('/users/one')
                .expect(400)
                .end(done);
        });
        it('id 로 유저를 찾을 수 없을 경우 404 로 응답한다.', (done) => {
            request(app)
                .get('/users/99999')
                .expect(404)
                .end(done);
        });
    });
});

describe('DELETE /users/:id 는...', () => {

    const users = [{name: 'alice'}, {name: 'chris'}, {name: 'danny'}];
    before(() => models.sequelize.sync({force: true}));
    before(() => models.User.bulkCreate(users));

    describe('성공시...', () => {
        it('204 를 응답한다.', (done) => {
            request(app)
                .delete('/users/1')
                .expect(204)
                .end(done);
        });
    });
    describe('실패시...', () => {
        it('id 가 숫자가 아닌 경우 400 으로 응답한다.', (done) => {
            request(app)
                .delete('/users/one')
                .expect(400)
                .end(done);
        });
    });
});

describe('POST /users 는...', () => {

    const users = [{name: 'alice'}, {name: 'chris'}, {name: 'danny'}];
    before(() => models.sequelize.sync({force: true}));
    before(() => models.User.bulkCreate(users));

    describe('성공시...', () => {
        let name = 'daniel', body;
        before(done => {
            request(app)
                .post('/users')
                .send({name})
                .expect(201)
                .end((err, res) => {
                    body = res.body;
                    done();
                });
        })

        it('생성된 유저 객체를 반환한다.', () => {
            body.should.have.property('id');
        });

        it('입력한 name 을 반환한다.', () => {
            body.should.have.property('name', name);
        });
    });

    describe('실패시...', () => {
        it('name 파라미터 누락 시 400 을 반환한다.', (done) => {
            request(app)
                .post('/users')
                .send({})
                .expect(400)
                .end(done);
        });

        it('name 이 중복인 경우 409 을 반환한다.', (done) => {
            request(app)
                .post('/users')
                .send({name: 'daniel'})
                .expect(409)
                .end(done);
        });
    });
});

describe('PUT /user/:id', () => {

    const users = [{name: 'alice'}, {name: 'chris'}, {name: 'danny'}];
    before(() => models.sequelize.sync({force: true}));
    before(() => models.User.bulkCreate(users));

    describe('성공시...', () => {
        it('변경된 정보를 응답한다.', (done) => {
            const name = 'den';
            request(app)
                .put('/users/3')
                .send({name})
                .end((err, res) => {
                    res.body.should.have.property('name', name);
                    done();
                });
        });
    });
    describe('실패시...', () => {
        it('정수가 아닌 id 인 경우 400 응답.', (done) => {
            const name = 'good';
            request(app)
                .put('/users/three')
                .send({name})
                .expect(400)
                .end(done);
        });

        it('name 이 없을 경우 400 응답', (done) => {
            const name = 'man';
            request(app)
                .put('/users/3')
                .send({})
                .expect(400)
                .end(done);
        });

        it('없는 유저인 경우 404 응답.', (done) => {
            const name = 'boy';
            request(app)
                .put('/users/10000')
                .send({name})
                .expect(404)
                .end(done);
        });

        it('이름이 중복인 경우 409 응답.', (done) => {
            const name = 'alice';
            request(app)
                .put('/users/2')
                .send({name})
                .expect(409)
                .end(done);
        });
    });
});