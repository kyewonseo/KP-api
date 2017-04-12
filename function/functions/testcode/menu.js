const chai = require('chai');
const apigClientFactory = require('aws-api-gateway-client');
config = {invokeUrl: 'https://zf1oua0eo3.execute-api.ap-northeast-2.amazonaws.com/dev'};
const apigClient = apigClientFactory.newClient(config);
const assert = chai.assert;

describe('Menu', function() {
    describe('/menu/list', function() {
        const params = {};
        const pathTemplate = '/menu/list';
        const method = 'POST';
        const additionalParams = {
            headers: {
                "content-type": "application/json"
            },
            queryParams: {}
        };
        const body = {
            store_id: "asda-23891273-asdasf-123asd"
        };

        var responseData;

        it('http status 200 check', function(done) {
            apigClient.invokeApi(params, pathTemplate, method, additionalParams, body)
                .then(function (result) {
                    console.log('result =>' + result.status);
                    assert.equal(200, result.status);
                    assert('Internal Server Error' != result.data);
                    responseData = result.data;
                    console.log(responseData.data);
                    done();
                }).catch(function (result) {
                console.log(result);
                done('error');
            });
        });
    });

    describe('/account/login', function() {
        const params = {};
        const pathTemplate = '/menu/detail';
        const method = 'POST';
        const additionalParams = {
            headers: {
                "content-type": "application/json"
            },
            queryParams: {}
        };
        const body = {
            store_id : "asda-23891273-asdasf-123asd",
            menu_id : "1c17ee80-ec2e-11e6-a11d-95f88570c917"
        };

        var responseData;

        it('http status 200 check', function(done) {
            apigClient.invokeApi(params, pathTemplate, method, additionalParams, body)
                .then(function (result) {
                    console.log('result =>' + result.status);
                    assert.equal(200, result.status);
                    assert('Internal Server Error' != result.data);
                    responseData = result.data;
                    console.log(responseData.data);
                    done();
                }).catch(function (result) {
                console.log(result);
                done('error');
            });
        });
    });
});
