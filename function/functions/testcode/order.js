const chai = require('chai');
const apigClientFactory = require('aws-api-gateway-client');
config = {invokeUrl: 'https://zf1oua0eo3.execute-api.ap-northeast-2.amazonaws.com/dev'};
const apigClient = apigClientFactory.newClient(config);
const assert = chai.assert;

describe('Orders', function() {
    describe('/orders/add', function() {
        const params = {};
        const pathTemplate = '/orders/add';
        const method = 'POST';
        const additionalParams = {
            headers: {
                "content-type": "application/json"
            },
            queryParams: {}
        };
        const body = {
            store_id: "asda-23891273-asdasf-123asd",
            user_id: "total_id1",
            price: "5.0",
            paymethod: "0,1,0",
            points: "50",
            detail: [{
                menu_id: "48ff0ed0-ec2c-11e6-a11d-95f88570c917",
                quantity: "1"
            }]
        };

        var responseData;

        it('http status 200 check', function(done) {
            apigClient.invokeApi(params, pathTemplate, method, additionalParams, body)
                .then(function (result) {
                    assert.equal(200, result.status);
                    assert('Internal Server Error' != result.data);
                    responseData = result.data;
                    //console.log(responseData.data);
                    done();
                }).catch(function (result) {
                console.log(result);
                done('error');
            });
        });
    });

    describe('/orders/detail', function() {
        const params = {};
        const pathTemplate = '/orders/detail';
        const method = 'POST';
        const additionalParams = {
            headers: {
                "content-type": "application/json"
            },
            queryParams: {}
        };
        const body = {
            user_id : "1",
            store_id : "asda-23891273-asdasf-123asd",
            startNo : 0,
            cnt :"3",
            orderByWith : "desc",
            orderBy : "createDate"
        };

        var responseData;

        it('http status 200 check', function(done) {
            apigClient.invokeApi(params, pathTemplate, method, additionalParams, body)
                .then(function (result) {
                    assert.equal(200, result.status);
                    assert('Internal Server Error' != result.data);
                    responseData = result.data;
                    //console.log(responseData.data);
                    done();
                }).catch(function (result) {
                console.log(result);
                done('error');
            });
        });
    });
});
