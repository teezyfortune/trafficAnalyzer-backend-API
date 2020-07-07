import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';
import {logger} from '../server/utils/http';
import conn from '../server/database/index.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 7000;
const server = `http://localhost:${PORT}`;


app.listen(PORT, () => logger(`server running on ${server}`));

 