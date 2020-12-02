//import school
const fs = require('fs');
const readXlsxFile = require('read-excel-file/node');
// const mongoose = require("mongoose");
const SchoolModel = require ("./model/School");
const dotenv = require("dotenv");

dotenv.config();


// Connect to Databse
// mongoose.connect(
//     process.env.DB_CONNECT,
//     { useNewUrlParser: true, useUnifiedTopology: true },
//     () => console.log("CONNECTED TO DATABASE", "success")
//   );
//   mongoose.set('useFindAndModify', false);



readXlsxFile('./list_of_schools.xlsx').then((rows) => {
    for (i in rows){
       for (j in rows[i]){
           console.dir(rows[i][j]);
        }
   }
}).catch((e) => {
    console.error(e)

})

console.log('test');
