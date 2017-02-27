'use strict';

const mysql = require('mysql');
const db = require('./db/dbpool.js');
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
                console.log("ref_menu_id data length : " , data.length);

                for (var i = 0; i < data.length; i++) {
                    pool.getConnection(function(i, err, connection) {
                        connection.query("SELECT * FROM menu WHERE menu_id = ?", [data[i].ref_menu_id], function (err, rows) {

                            console.log("menu rows : ", rows);
                            MenuOptionRes.push(rows);

                            if (err) {
                                connection.release();

                                resMsg ["responseStatus"] = "400";
                                resMsg ["responseMsg"] = "menu option item info is incorrect";
                                MenuOptionRes.push(resMsg);

                                context.fail(MenuOptionRes[0]);
                            }

                            if (i <= data.length) {

                                connection.release();
                                resMsg ["responseStatus"] = "200";
                                resMsg ["responseMsg"] = "success";
                                resMsg ["data"] = MenuOptionRes;
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
