'use strict';

const mysql = require('mysql');
const db = require('./db/dbpool.js');
const LoginRes = [];
const resMsg = {};

exports.handle = function (event, context, cb) {
    console.log('processing event.user_id: %j', event.user_id);

    const pool = db.create();

    pool.getConnection(function (err, connection) {
        connection.query("SELECT * FROM user WHERE u_id = " + event.user_id, function (err, data) {

            if (err) {

                connection.release();

                resMsg ["responseStatus"] = "400";
                resMsg ["responseMsg"] = "fail";
                LoginRes.push(resMsg);

                context.fail(JSON.stringify(LoginRes[0]));
            }

            connection.release();

            resMsg ["responseStatus"] = "200";
            resMsg ["responseMsg"] = "success";
            resMsg ["data"] = data[0];

            LoginRes.push(resMsg);
            console.log('user info : ' + JSON.stringify(LoginRes[0]));

            context.succeed(JSON.stringify(LoginRes[0]));
        });
    });
};
