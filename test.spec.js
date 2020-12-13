'use strict';
require('dotenv').config()

var gateway = require('./function').getWeather
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;

// Tell chai to use chai-http
chai.use(chaiHttp);

describe("OpenWeatherMap API", function() {

  it('should not get invalidated third-party API key', function() {
    return new Promise((resolve, reject) => { 
      var event={
        "query": {
          "city": "Austin",
          "country_code": "us",
          }
      };
      var context ={};
      var callback = (ctx, data) => {
        //console.log("cod")
        var cod = data.body.cod
        //console.log(cod)
        //console.log(data);
        if(cod == 401){
          reject(data);
        }
        else{
          resolve(data);
        }
      }
      gateway(event,context,callback)
    })
  })

  it('should get events response for city and country_code', function() {
    return new Promise((resolve, reject) => { 
      var event={
        "query": {
          "city": "Austin",
          "country_code": "us"
          }
      };
      var context ={};
      var callback = (ctx, data) => {
        var cod = data.body.cod
        if(cod == 200){
          resolve(data);
        }
        else{
          reject(data);
        }
        // console.log(data);
      }
      gateway(event,context,callback)
    })
  })

  it('should get unavailable city', function() {
    return new Promise((resolve, reject) => { 
      var event={
        "query": {
          "city": "Atlantis",
          "country_code": "yz"
          }
      };
      var context ={};
      var callback = (ctx, data) => {
        var cod = data.body.cod
        if(cod == 404){
          resolve(data);
        }
        else{
          reject(data);
        }
        // console.log(data);
      }
      gateway(event,context,callback)
    })
  })
});

describe('Lamba Function API', function() {

  var url = 'https://xo834g8b72.execute-api.us-east-1.amazonaws.com/prod/weather';

  it("returns a result for a valid location", function() {
    chai.request(url)
      .get("")
      .query({"city": 'Austin', 
              "country_code": 'US',
            })
      .then(function(res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.instanceof(Object);
          expect(res.body.body).to.have.own.property('name')
          expect(res.body.body).to.have.own.property('sys')
          expect(res.body.body.sys).to.have.own.property('country')
          expect(res.body.body.name).to.equal('Austin')
          expect(res.body.body.sys.country).to.equal('US')
      })
      .catch(function(err) {
        throw err;
      });
  });

  it("returns null results for invalid location", function() {
    chai.request(url)
      .get("")
      .query({"city": 'Atlantis', 
              "country_code": 'zy',
            })
      .then(function(res) {
          expect(res).to.have.status(200);
          expect(res.body.body.cod).to.equal('404')
          expect(res.body.body.message).to.equal('city not found')
      })
      .catch(function(err) {
        throw err;
      });
  });
});