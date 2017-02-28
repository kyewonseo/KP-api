'use strict';

const mysql = require('mysql');
const db = require('./db/dbpool.js');
const StringBuffer = require("stringbuffer");
const sb = new StringBuffer();
const MenuOptionRes = [];
const resMsg = {};

exports.handle = function (event, context, cb) {
    console.log('processing event: %j', event.params.menu_id);

    const pool = db.create();

    pool.getConnection(function (err, connection) {

        connection.query("SELECT op.ref_menu_id " +
            "FROM menu_option op " +
            "INNER JOIN menu m ON m.menu_id = op.menu_id " +
            "WHERE m.menu_id = ?", [event.params.menu_id], function (err, data) {

            if (err) {

                connection.release();

                resMsg ["responseStatus"] = "400";
                resMsg ["responseMsg"] = "menu option info is incorrect";
                MenuOptionRes.push(resMsg);

                context.fail(MenuOptionRes[0]);
            }

            if (data[0] == null || data[0] == "undefined") {

                connection.release();

                resMsg ["responseStatus"] = "400";
                resMsg ["responseMsg"] = "data is null";
                MenuOptionRes.push(resMsg);

                context.fail(MenuOptionRes[0]);
            } else {

                console.log("ref_menu_id list : " , data);

                for (var i = 0; i < data.length; i++) {
                    pool.getConnection(function(i, err, connection) {
                        connection.query("SELECT * FROM menu WHERE menu_id = ?", [data[i].ref_menu_id], function (err, rows) {

                            console.log("menu option => menu rows : ", rows[0]);
                            sb.append(rows[0]);

                            if (err) {
                                connection.release();

                                resMsg ["responseStatus"] = "400";
                                resMsg ["responseMsg"] = "menu option item info is incorrect";
                                MenuOptionRes.push(resMsg);

                                context.fail(MenuOptionRes[0]);
                            }

                            if (i <= data.length) {

                                console.log('sb info : ' + sb.buffer);
                                connection.release();
                                resMsg ["responseStatus"] = "200";
                                resMsg ["responseMsg"] = "success";
                                resMsg ["data"] = sb.buffer;

                                MenuOptionRes.push(resMsg);
                                console.log('user info : ' + JSON.stringify(MenuOptionRes[0]));
                                context.succeed(MenuOptionRes[0]);
                            }
                        });
                    }.bind(pool, i));
                }
            }
        });
    });
};
