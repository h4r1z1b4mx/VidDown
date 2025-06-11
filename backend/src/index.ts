import express from 'express';
import cors from 'cors';
import { mainRouter } from './router/main';
const app = express();

app.use(cors());
app.use(express.json());



app.use('/api',mainRouter);
app.get('/',(req:any, res:any) => {
    res.status(200).json({
        msg:'healthy'
    });
});


app.listen(3000, () => {
    console.log('Server is running on port ', 3000);
});