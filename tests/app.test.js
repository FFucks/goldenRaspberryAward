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

      it('Should get minMaxMovies endpoint with expected min and max values', (done) => {
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
      
             // Assuming there is at least one item in the 'min' array
            const minItem = res.body.min[0];
            expect(minItem).to.have.property('interval', 1);

            // Assuming there is at least one item in the 'max' array
            const maxItem = res.body.max[0];
            expect(maxItem).to.have.property('interval', 13);
      
            done();
          });
      });
  });