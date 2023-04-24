const express=require('express');
const app=express();
const mysql=require('mysql');
const cors=require('cors');
const bodyParser=require("body-parser");



const db=mysql.createConnection({
host:"localhost",
user:"root",
password:"password",
database:"btp_data",
});

app.use(express.json());
app.use(cors());
// app.use(bodyParser.urlencoded({extended:true}));
// connect to MySQL database
db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL database: ', err);
      return;
    }
    console.log('Connected to MySQL database...');
  });

// app.post("/post",(req,res)=>{

// const idcoal_mines=req.body.idcoal_mines;
// const Temperature=req.body.Temperature;
// const Fire=req.body.Fire;
// const Humidity=req.body.Humidity;
// const Class=req.body.Class;
// db.query('INSERT INTO coal_mines values(?,?,?,?,?)',[idcoal_mines, Temperature, Fire, Humidity, Class],(err,result)=>{
// if(err)
// {
//     console.log("error")
// }
// else{
//     res.send("connected");
// }
// });


// });

// use bodyParser to parse JSON data from POST requests
app.use(bodyParser.json());

// create POST endpoint to insert data into MySQL table
app.post('/post', (req, res) => {
  const { idcoal_mines, Temperature, Fire, Humidity, Class } = req.body;
  const query = `INSERT INTO coal_mines (idcoal_mines, Temperature, Fire, Humidity, Class) VALUES ('${idcoal_mines}', '${Temperature}','${Fire}', '${Humidity}', '${Class}')`;

  db.query(query, (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL table: ', err);
      return;
    }
    console.log('Data inserted into MySQL table...');
    res.send('Data inserted into MySQL table...');
  });
});


app.get('/api/insert',(req,res)=>{
    const sqlGet="SELECT * FROM coal_mines";
    db.query(sqlGet,(err,result)=>{
        res.send(result);
    })
});

app.listen(8081,()=>{
    console.log("Availabe at 8081")
});
