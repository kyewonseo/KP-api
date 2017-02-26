'use strict';

const mysql           = require('mysql');
const host            = '175.207.13.212';
const port            = '3306';
const user            = 'wallmoo';
const password        = 'Dostory8520!';
const database        = 'kiosk';

module.exports =  {

    create: function () {
        let pool = mysql.createPool({

            host    : host,
            port    : port,
            user    : user,
            password: password,
            database: database
        });
        return pool;
    }

};

