const express = require('express');

const app = express();

app.get('/',(req:any, res:any) => {
    res.status(200).json({
        msg:'healthy'
    });
});


app.listen(3000, () => {
    console.log('Server is running on port ', 3000);
});