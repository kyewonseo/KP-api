'use strict';

const mysql = require('mysql');
const db = require('./db/dbpool.js');
const NewOrderRes = [];
const resMsg = {};

exports.handle = function (event, context, cb) {
    console.log('processing event: %j', event);

    let query = {
        order_id: event.order_id,
        store_id: event.store_id,
        machine_id: event.machine_id,
        user_id: event.user_id,
        amount: event.amount,
        coupon: event.coupon,
        coupon_title: event.coupon_title,
        discount: event.discount,
        discount_title: event.discount_title,
        price: event.price,
        add_points: event.add_points,
        order_status: event.order_status,
        cook_status: event.cook_status,
        paymethod: event.paymethod,
        user_agent: event.user_agent,
        cash: event.cash,
        card: event.card,
        points: event.points,
        package: event.package,
        registed_date: event.registed_date
    };
    console.log("sql query : " + query);

    const pool = db.create();
    pool.getConnection(function (err, connection) {

        connection.query("INSERT INTO kiosk.order SET ?", query, function (err, rows) {

            if (err) {

                connection.release();

                resMsg ["responseStatus"] = "400";
                resMsg ["responseMsg"] = "order info is incorrect";
                NewOrderRes.push(resMsg);

                context.fail(NewOrderRes[0]);
            }

                connection.release();

                resMsg ["responseStatus"] = "200";
                resMsg ["responseMsg"] = "success";
                NewOrderRes.push(resMsg);

                console.log('user info : ' + JSON.stringify(NewOrderRes[0]));
                context.succeed(NewOrderRes[0]);
            });
    });
};
