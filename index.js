const express = require('express');
require('dotenv').config();
const app = express();
const pg = require("pg");
const bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({ extended: true });
var client = new pg.Client(process.env.URI);
app.use(express.static(__dirname + '/'));
client.connect();
app.listen(3000, () => console.log("Corriendo en http//localhost:3000"));

app.post('/create', urlencodeParser,
 (req, res) => {
        client.query('INSERT INTO paciente(id, nombre, apellido, cedula) VALUES(DEFAULT, $1, $2, $3)', 
        [req.body.nombre, req.body.apellido, req.body.cedula],
            (e, r) => { res.send('Data Submitted'); });
    }
);

app.post('/read', urlencodeParser,
 (req, res) => {
        client.query('SELECT * FROM paciente WHERE id=$1', 
        [req.body.id],
            (e, r) => { res.send(r.rows[0]) });
    }
);

app.post('/update', urlencodeParser,
 (req, res) => {
        client.query('UPDATE paciente SET nombre=$1, apellido=$2, cedula=$3 WHERE id=$4', 
        [req.body.nombre, req.body.apellido, req.body.cedula, req.body.id],
            (e, r) => { res.send('Data Submitted'); });
    }
);

app.post('/delete', urlencodeParser,
 (req, res) => {
        client.query('DELETE FROM paciente WHERE id=$1', 
        [req.body.id],
            (e, r) => { res.send('Data Deleted'); });
    }
);