'use strict';

const mysql = require('mysql');
const db = require('./db/dbpool.js');
const MenuRes = [];
const resMsg = {};

exports.handle = function (event, context, cb) {
    console.log('processing event: %j', event.params.sub_category_id);

    const pool = db.create();

    pool.getConnection(function (err, connection) {

        connection.query("SELECT m.menu_id, m.store_id, m.sub_category_id, m.inventory_id, m.m_item, m.m_type, m.price, " +
            "m.points, m.calory, m.barcode, m.use_YN, m.m_regidate, m.description, m.file_id, " +
            "f.server, f.volume, f.path, f.name, f.status, f.saved_time " +
            "FROM menu m " +
            "INNER JOIN files f ON m.file_id = f.files_id " +
            "WHERE m.sub_category_id = ?", [event.params.sub_category_id], function (err, rows) {

            if (err) {

                connection.release();

                resMsg ["responseStatus"] = "400";
                resMsg ["responseMsg"] = "login info is incorrect";
                MenuRes.push(resMsg);

                context.fail(MenuRes[0]);
            }

            connection.release();

            if (rows[0] == null || rows[0] == "undefined") {

                resMsg ["responseStatus"] = "400";
                resMsg ["responseMsg"] = "rows is null";
                MenuRes.push(resMsg);

                context.fail(MenuRes[0]);
            } else {

                resMsg ["responseStatus"] = "200";
                resMsg ["responseMsg"] = "success";
                resMsg ["data"] = rows;

                MenuRes.push(resMsg);
                console.log('user info : ' + JSON.stringify(MenuRes[0]));

                context.succeed(MenuRes[0]);
            }
        });
    });
};
