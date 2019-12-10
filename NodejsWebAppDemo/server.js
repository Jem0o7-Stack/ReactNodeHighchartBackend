'use strict';

var path = require('path');
var express = require('express');
var app = express();
var mssql = require('mssql');
var bodyParser = require('body-parser');

var multer = require('multer');
var mimetype = require('mimetype');

 // config for your database  
var config = {
    server: '192.68.100.153\\sqlexpress',
    database: 'ReactJsMvc',
    user: 'sqluser',
    password: 'usersql'  
    
};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());

app.set('port', process.env.PORT || 1337);

var staticPath = path.join(__dirname, '/');
app.use(express.static(staticPath));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/src/index.html'));
});

app.post('/GetData', function (req, res) {
    
    let param = req.body;

    try {
        var conn = new mssql.ConnectionPool(config);

        conn.connect().then(function () {
            // create Request object
            var request = new mssql.Request(conn);

            request.input('page', mssql.NVarChar, param.page);
            request.input('sizePerPage', mssql.NVarChar, param.sizePerPage);

            request.execute('SpGetData').then(function (recordsets) {
               // console.log(recordsets.recordset);
                res.json(recordsets.recordset);

            });
        });
    }
    catch (e) {
        res.json(e);
    }
});

app.post('/PageData', function (req, res) {
    //debugger;
    let param = req.body;
    try {
        var conn = new mssql.ConnectionPool(config);
   
        conn.connect().then(function () {
            //debugger;
            var request = new mssql.Request(conn);
            request.input('page', mssql.NVarChar, param.page);
            request.input('sizePerPage', mssql.NVarChar, param.sizePerPage);
        
            request.execute('SpGetData').then(function (recordsets) {
                
                //console.log(recordsets.recordset);
                res.json(recordsets.recordset);

            });
        });
    }
    catch (e) {
        res.json(e);
    }
});

app.post('/SaveData', function (req, res) {
    try {

        var input = req.body; 
        var data = {

            Fullname: input.Fullname,
            Email: input.Email,
            Message: input.Message,
            Gender: input.Gender,
            Games: input.Games,
            Date: input.Date,
            Time: input.Time
        };
        var sql = "insert into ContactsData (Fullname,Email,Message,Gender,Games,Date,Time) values ('" + data.Fullname + "','" + data.Email + "','" + data.Message + "','" + data.Gender + "','" + data.Games + "','" + data.Date + "','" + data.Time + "')";
        var conn = new mssql.ConnectionPool(config);
        conn.connect().then(function () {
        
            var request = new mssql.Request(conn);
           
            // query to the database and get the records
            request.query(sql, function (recordsets) {
                
                res.redirect('/');
            });
        });
    }
    catch (e) {
        res.json(e);
    }   
});

app.get('/GetCountry', function (req, res) {
    //debugger;
    try {
        var conn = new mssql.ConnectionPool(config);
        var temp = 'select conName,conId from Country';
        // connect to your database
        conn.connect().then(function () {
            // create Request object
            var request = new mssql.Request(conn);

            // query to the database and get the records
            request.query(temp).then(function (recordsets) {
                // send records as a response

                res.json(recordsets.recordset);

            });
        });
    }
    catch (e) {
        res.json(e);
    }
});

app.get('/getState', function (req, res) {
    let param = req.query.index;
    
    try {
        var conn = new mssql.ConnectionPool(config);

        // connect to your database
        conn.connect().then(function () {
            // create Request object
            var request = new mssql.Request(conn);

            // query to the database and get the records
            request.input('conId', mssql.NVarChar, param)
                .execute('SpGetState').then(function (recordsets) {
                    // send records as a response
                    //  console.log(recordsets.recordset);
                    res.json(recordsets.recordset);

                });
        });
    }
    catch (e) {
        res.json(e);
    }

});

app.post('/DeleteData', function (req, res) {
   
    let param = req.body;
  
    try {
        var conn = new mssql.ConnectionPool(config);
       
        // connect to your database
        conn.connect().then(function () {
            // create Request object
            var request = new mssql.Request(conn);
            request.input('ContactID', mssql.NVarChar, param)
                .execute('SpDeleteRows').then(function (recordsets) {
                 
                    res.redirect('/');

                });
         });
    }
    catch (e) {
        res.json(e);
    }
});

app.post('/EditData', function (req, res) {
    
    try {
        var conn = new mssql.ConnectionPool(config);
       
        var data = {
            ContactID: req.body[0].ContactId,
            Fullname: req.body[1].Country,
            Email: req.body[2].State,
            Message: req.body[3].msg,
            Gender: req.body[4].gender,
            Games: req.body[5].games,
            Date: req.body[6].date,
            Time: req.body[7].time
        };
        // connect to your database
        conn.connect().then(function () {        
        var request = new mssql.Request(conn);

            request.input('ContactID', mssql.NVarChar, data.ContactID);
            request.input('FullName', mssql.NVarChar, data.Fullname);
            request.input('Email', mssql.NVarChar, data.Email);
            request.input('Message', mssql.NVarChar, data.Message);
            request.input('Gender', mssql.NVarChar, data.Gender);
            request.input('Games', mssql.NVarChar, data.Games);
            request.input('Date', mssql.NVarChar, data.Date);
            request.input('Time', mssql.NVarChar, data.Time);

            request.execute('SpEditData').then(function (recordsets) {                  
                //console.log(recordsets.recordset);
                res.redirect('/');

               });
        });
    }
    catch (e) {
        res.json(e);
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/assets/UploadImages/');
    },
    filename: (req, file, cb) => {

        var filename1 = file.originalname;       
        var fileextension = filename1.substring(0, filename1.lastIndexOf('.'));
        cb(null, fileextension + '-' + Date.now() + '.png');
    },
});
// create the multer instance that will be used to upload/save the file
const upload = multer({
    storage: storage
});

app.post('/ImgPreview', upload.single('selectedFile'), function (req, res) {
    try {
        var conn = new mssql.ConnectionPool(config);
        if (req.file) {
          
            if (req.file.mimetype == "image/jpeg" || req.file.mimetype == "image/png" || req.file.mimetype == "image/gif" || req.file.mimetype == "image/jpg") {

                var imgname = req.file.filename;
                var path = req.file.path;
                var sql = "insert into ImagePreview (imgname,imagePreviewUrl) values ('" + imgname + "','" + path + "')";

            }
            //else {
            //    alert('please select image only')
            //}
        }
        else {
            var imgname = "noimage.jpg";
            var path = null;
            var sql = "insert into ImagePreview (imgname) values ('" + imgname + "','" + path + "')";
        }
        
        conn.connect().then(function () {
            var request = new mssql.Request(conn);

            request.query(sql, function (recordsets) {
                res.send('done');
            });               
        });
    }
    catch (e) {
        res.json(e);
    }   
});

app.post('/GetGraphValues', function (req, res) {
   
    try {
        var conn = new mssql.ConnectionPool(config);

        conn.connect().then(function () {
            // create Request object
            var request = new mssql.Request(conn);

            request.execute('SpGetGraphData').then(function (recordsets) {
                console.log(recordsets.recordset);
                res.json(recordsets.recordset);

            });
        });
    }
    catch (e) {
        res.json(e);
    }
});


var server = app.listen(app.get('port'), function () {
    console.log('listening');
});