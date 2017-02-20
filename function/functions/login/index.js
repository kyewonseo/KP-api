'use strict';

const mysql = require('mysql');
const db = require('./db/dbpool.js');
const LoginRes = [];
const resMsg = {};

exports.handle = function (event, context, cb) {
    console.log('processing event: %j', event);

    const pool = db.create();

    //TODO: fixme => passwd encrypt , decrypt
    pool.getConnection(function (err, connection) {

        connection.query("SELECT a.account_id, a.name, a.phone, a.token, a.status, a.regidate, " +
            "u.user_id, u.store_id, u.u_points, u.u_status, u.u_level, u.regidate FROM account a " +
            "INNER JOIN user u ON(u.account_id = a.account_id) " +
            "WHERE a.account_id = ?", [event.login_id, event.login_passwd], function (err, rows) {

            if (err) {

                connection.release();

                resMsg ["responseStatus"] = "400";
                resMsg ["responseMsg"] = "login info is incorrect";
                LoginRes.push(resMsg);

                context.fail(LoginRes[0]);
            }

            connection.release();

            resMsg ["responseStatus"] = "200";
            resMsg ["responseMsg"] = "success";
            resMsg ["data"] = rows;

            LoginRes.push(resMsg);
            console.log('user info : ' + JSON.stringify(LoginRes[0]));

            context.succeed(LoginRes[0]);
        });
    });
};
