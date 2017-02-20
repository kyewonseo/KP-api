'use strict';

const mysql = require('mysql');
const db = require('./db/dbpool.js');
const StoresRes = [];
const resMsg = {};

exports.handle = function (event, context, cb) {
    console.log('processing event : %j', event);
    console.log('processing event account_id: %j', event.params.account_id);

    const pool = db.create();

    pool.getConnection(function (err, connection) {
        connection.query("SELECT s.store_id, s.store, s.s_address, s.s_logo, s.status, " +
            "m.merchant_id, m.company, m.m_name, m.m_phone, m.m_address, m.m_logo, m.status, m.registed_date FROM user u " +
            "INNER JOIN account a ON(u.account_id = a.account_id) " +
            "INNER JOIN store s ON(u.store_id = s.store_id) " +
            "INNER JOIN merchant m ON(s.merchant_id = m.merchant_id) " +
            "WHERE u.account_id = ?", [event.params.account_id], function (err, rows) {

            if (err) {

                connection.release();
                resMsg ["responseStatus"] = "400";
                resMsg ["responseMsg"] = "store_id is null";
                StoresRes.push(resMsg);

                context.fail(StoresRes[0]);
            }

            connection.release();

            resMsg ["responseStatus"] = "200";
            resMsg ["responseMsg"] = "success";
            resMsg ["data"] = rows;

            StoresRes.push(resMsg);
            console.log('user info : ' + JSON.stringify(StoresRes[0]));

            context.succeed(StoresRes[0]);
        });
    });
};
