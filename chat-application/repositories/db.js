var sql = require("mssql");

// config for your database
var config = {
    user: 'sa',
    password: 'sa@123',
    server: 'DELL\\SQLEXPRESS',
    database: 'fadson'
};
exports.studentTable = 'tblStudent';
exports.tutorTable = 'tbltutor';

exports.getData = function (query,callback) {
    sql.connect(config, function (err) {

        if (err)
            return callback(false);

        var request = new sql.Request();
        request.query(query, function (err, recordset) {
            if (err) {
                return callback(false);
            } else {
                return callback(recordset);
            }

        });


    });
}