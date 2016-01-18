var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var expect = chai.expect;
var assert = chai.assert;

chai.use(chaiHttp);

describe('basic http server', function() {

  it('responds to request with current time on the server.', function(done) {
    var colon=":";
    chai.request(server)  //localhost:8080
      .get('/time')
      .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.text;
        //expect 3rd character of response to be a colon
        //indicator of a 24 hour time
        expect( res.text.slice(2,3) ).to.equal(colon);
        done();
      });
  });

  it('sends back string that greets the name in the path', function(done) {
    chai.request(server)
        .get('/greet/miles')
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.text;
          console.log('*********res is: ', res.text);
          done();
        });
  });

  it('accepts name in JSON format on /greet', function(done) {
    chai.request(server)
        .post('/greet')
        .send({"name": "rudolph"})
        .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res).to.be.text;
            var greeting = res.body.toString(); 
            // console.log(res, ' is res');
            done();
        });
  });
});