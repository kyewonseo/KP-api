"use strict";
//const chai              = require('chai');
const apigClientFactory = require('aws-api-gateway-client');
const config            = {invokeUrl: 'https://zf1oua0eo3.execute-api.ap-northeast-2.amazonaws.com/dummy'};
const apigClient        = apigClientFactory.newClient(config);
const assert            = require('assert');

describe('User', function() {
    describe('/users/login', function() {

        let params = {};
        let pathTemplate = '/users/login';
        let method = 'POST';
        let additionalParams = {
            headers: {
                "Authorization" : "test@8EF83BB6D7F446D192F1DDA5919B8438" //temp
            },
            queryParams: {
            }
        };
        let body = {
            login_id: "1",
            pass_id: "abcd"
        };

        let responseData;

        it('http status 200 check', function(done) {
            apigClient.invokeApi(params, pathTemplate, method, additionalParams, body)
                .then(function (result) {
                    responseData = result.data;
                    assert.equal(200, result.status);

                    console.log(responseData);
                    done();
                }).catch(function (result) {
                console.log(result);
                done('error');
            });
        });

        it('id null check', function(done) {
            assert(responseData.login_id != null);
            console.log(responseData.login_id);
            done();
        });
        it('passwd null check', function(done) {
            assert(responseData.pass_id != null);
            console.log(responseData.pass_id);
            done();
        });
    });
});
