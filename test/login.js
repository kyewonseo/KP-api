"use strict";
//const chai              = require('chai');
const apigClientFactory = require('aws-api-gateway-client');
const config            = {invokeUrl: 'https://zf1oua0eo3.execute-api.ap-northeast-2.amazonaws.com/dummy'};
const apigClient        = apigClientFactory.newClient(config);
const assert            = require('assert');

let responseData = null;
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
            login_id: "total_id1",
            login_passwd: "encryptionPwd"
        };

        it('http status 200 check', function(done) {
            apigClient.invokeApi(params, pathTemplate, method, additionalParams, body)
                .then(function (result) {
                    assert.equal(200, result.status);

                    responseData = result.data;
                    console.log(responseData);
                    done();
                }).catch(function (result) {
                console.log(result);
                done('error');
            });
        });
    });
});
