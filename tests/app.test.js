const chai = require('chai');
const supertest = require('supertest');
const app = require('../app');

const { expect } = chai;
const request = supertest(app);

describe('Test 1', () => {
    before((done) => {
      done();
    });
  
    after((done) => {
      done();
    });
  
    it('Should get minMaxMovies endpoint', (done) => {
        request
          .get('/minMaxMovies')
          .expect(200)
          .end((err, res) => {
            if (err) {
                console.log(err);
                return done(err);
            }
    
            expect(res.body).to.have.property('min');
            expect(res.body).to.have.property('max');
    
            expect(res.body.min).to.be.an('array');
            expect(res.body.max).to.be.an('array');
    
            done();
          });
      });


      it('Should return all movies', (done) => {
        request
          .get('/getMoviesList')
          .expect(200)
          .end((err, res) => {
            if (err) {
                console.log(err);
                return done(err);
            }
    
            expect(res.body).to.be.an('array');
    
            done();
          });
      });
  });