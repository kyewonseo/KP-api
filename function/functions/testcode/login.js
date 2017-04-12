const chai = require('chai');
const apigClientFactory = require('aws-api-gateway-client');
config = {invokeUrl: 'https://zf1oua0eo3.execute-api.ap-northeast-2.amazonaws.com/dev'};
const apigClient = apigClientFactory.newClient(config);
const assert = chai.assert;
const LambdaTester = require( 'lambda-tester' );
const lambdaHandler = require( '../index' ).handler;

let testingAggregate = proxyquire('../index', { 'aws-sdk': apigClient });
testingAggregate.increase_io_write_capacity(function(err, data){
    expect(err).to.equal('Invoker error: Error: Lambda not in this region');
});

describe('Account', function() {
    describe('/account/login', function() {
        const params = {};
        const pathTemplate = '/account/login';
        const method = 'POST';
        const additionalParams = {
            headers: {
                "content-type": "application/json"
            },
            queryParams: {}
        };
        const body = {
            account_id : "total_id1",
            passwd : "encryptionPwd"
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
            return LambdaTester(lambdaHandler)
                .event( { login: 'login test' } )
                .expectResult();
        });
    });
});
