var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var expect = chai.expect;
var assert = chai.assert;

chai.use(chaiHttp);

describe('basic http server', function() {

  it('responds to request with current time of the server.', function() {
    chai.request(server)
      .get('/time')
      .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.text;
        //var //value first 2 characters < 24 
      });
  });

  it('sends back string that greets the name in the path', function() {
    chai.request(server)
        .get('/greet/miles')
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.text;
          var greeting = res.body.toString();
          assert.equal(greeting, 'hello miles');
        });
  });

  it('accepts name in JSON format on /greet', function() {
    chai.request(server)
        .post('/greet')
        .send({"name": "miles"})
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.text;
          var greeting = res.body.toString();
          assert.equal(greeting, 'salutations Mr. Jason')
        });
  });
});