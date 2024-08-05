const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3600;

app.get('^/$|/index(.html)?', (req, res) => {
    //res.sendFile('./views/index.html', { root: __dirname });
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})//output:This is index

app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page.html');//302 by default
})//output:new page

//Route handlers
app.get('/hello(.html)?', (req, res, next) => {
    console.log('attempted to load hello.html');
    next()
}, (req, res) => {
    res.send('Hello World!');
});


// Chaining route handlers
const one = (req, res, next) => {
    console.log('one');
    next();
}

const two = (req, res, next) => {
    console.log('two');
    next();
}

const three = (req, res) => {
    console.log('three');
    res.send('Finished!');
}

app.get('/chain(.html)?', [one, two, three]);//Finished


app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})


app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views','404.html'));
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

