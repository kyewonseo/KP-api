'use strict';

const mysql = require('mysql');
const db = require('./db/dbpool.js');
const SubcategoryRes = [];
const resMsg = {};

exports.handle = function (event, context, cb) {
    console.log('processing event : %j', event);
    console.log('processing event account_id: %j', event.params.store_id);

    const pool = db.create();

    //TODO: fix me => 실 서버에서 "메뉴"를 나타내는 catalog_name 이 정해질때 바뀔 예정
    const catalog_name = "illum";

    pool.getConnection(function (err, connection) {
        connection.query("SELECT c.category_id, c.catalog_name,  " +
            "sub.sub_category_id, sub.sub_category_name, sub.file_id FROM category c " +
            "INNER JOIN sub_category sub ON(sub.category_id = c.category_id) " +
            "WHERE c.store_id = ? and catalog_name = ?", [event.params.store_id, catalog_name], function (err, rows) {

            if (err) {

                connection.release();
                resMsg ["responseStatus"] = "400";
                resMsg ["responseMsg"] = "store_id is null";
                SubcategoryRes.push(resMsg);

                context.fail(SubcategoryRes[0]);
            }

            connection.release();

            resMsg ["responseStatus"] = "200";
            resMsg ["responseMsg"] = "success";
            resMsg ["data"] = rows;

            SubcategoryRes.push(resMsg);
            console.log('user info : ' + JSON.stringify(SubcategoryRes[0]));

            context.succeed(SubcategoryRes[0]);
        });
    });
};
