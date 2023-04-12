import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user.model';

import { validLogin as login, user } from './mocks/login.mock';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Route /login tests', () => {
  afterEach(sinon.restore);
  describe('invalid request cases', () => {
    it('checks if sending a empty body returns the rigth error message and a status 400', async () => {
      const httpResponse = await chai.request(app).post('/login').send()
      
      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
    })
    it('checks if sending only email returns the rigth error message and a status 400', async () => {
      const httpResponse = await chai.request(app).post('/login').send({ email: 'test@email.com' })
      
      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
    })
    it('checks if sending only password returns the rigth error message and a status 400', async () => {
      const httpResponse = await chai.request(app).post('/login').send({ password: 'password' })
      
      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
    })
    it('checks if sending an invalid email returns the right error message and a status 401', async () => {
      const httpResponse = await chai.request(app).post('/login').send({
        email: 'invalidEmail',
        password: 'validPassword',
      })

      expect(httpResponse.status).to.equal(401);
      expect(httpResponse.body).to.deep.equal({ message: 'Invalid email or password' })
    })
    it('checks if sending an invalid pass returns the right error message and a status 401', async () => {
      const httpResponse = await chai.request(app).post('/login').send({
        email: 'valid@email.com',
        password: '12345',
      })

      expect(httpResponse.status).to.equal(401);
      expect(httpResponse.body).to.deep.equal({ message: 'Invalid email or password' })
    })
    it('checks if sending a valid but wrong pass returns the right error message and a status 401', async () => {
      const httpResponse = await chai.request(app).post('/login').send({
        email: 'user@user.com',
        password: 'validPassword',
      })

      expect(httpResponse.status).to.equal(401);
      expect(httpResponse.body).to.deep.equal({ message: 'Invalid email or password' })
    })
  })
  
  it('check if sending a valid user returns status 200 and a token', async () => {
    sinon.stub(User, 'findOne').resolves(user as User);
    const httpResponse = await chai.request(app).post('/login').send(login);

    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.have.key('token');
  })
});
