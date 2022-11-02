import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get('/',(req,res) =>{
    console.log('Test');
    res.send('Test Server');
});

app.listen(PORT, () =>
    console.log(`Server running on PORT : http://localhost:${PORT}`)
);
