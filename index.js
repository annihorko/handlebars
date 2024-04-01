const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

// Dummy database. IRL we could get the data from the MongoDB.
const products =
[
    {
        name: 'Kia',
        price: 25000
    },
    {
        name: 'Volvo',
        price: 30000
    }
]

app.engine('handlebars',exphbs.engine({
    defaultLayout: 'main'
}));

app.set('view engine','handlebars');

app.get('/', (req,res) => {
    //res.send("Testing");
    //res.render('index');
    res.render('index',
    { 
        title: 'Home',
        companyName: 'Business Ltd'
    }
    );
});

app.get('/contact', (req,res) => {
    res.render('contact',
    {
        title: 'Contact',
        companyName: 'Business Ltd'
    }
    );
});

app.get('/products', (req,res) =>{
    res.render('products',
    {
        title: 'Products',
        products: products
    }
    )
});

//Folder for static files like css, jpg...
app.use(express.static('public'));

app.use((req,res,next) => {
    res.status(404).send("Sorry, could not find the content");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));