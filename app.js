const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./model/blog');
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);


//expresss app
const app = express();

// connect to mongoDB
const dbURI = "mongodb+srv://hammadalisyed1_db_user:has123@cluster0.iy2fnl3.mongodb.net/note-tuts?appName=Cluster0";
mongoose.connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((error) =>console.log(error), { userNewUrlParser: true, useUnifiedTopology: true});

//register view engine 
app.set('view engine', 'ejs');


// listen for request


//middleware & static files
app.use(express.static('public'));
app.use(morgan('dev')); 

 
//routes

app.get('/', (req,res) => {
    res.redirect('/blogs');
});

app.get('/about', (req,res) => {

    // res.send('<p>home page </p>');
    res.render('about', { title: 'About'});   
});

//FOR PRODUCTS
app.get('/products', (req,res) => {
  res.json([
    { id: 1, name: 'Laptop', price: 1299},
    { id: 2, name: 'Mouse', price: 1500}
  ])
})

//blog routes
app.get('/blogs', (req, res) =>{
    Blog.find().sort({ createdAt: -1})
      .then((result) => {
        res.render('index', { title: 'All Blogs', blogs: result});
      })
      .catch((err) => {
        console.log(err);
      })
});

app.get('/products/:id', (req,res) => {
  const id = Number(req.params.id)

  const products = [
    { id: 1, name: 'Laptop', price: 1299},
    { id: 2, name: 'Mouse', price: 1500}
  ]

  const requestedProduct = products.find((product) => product.id === id)
  res.json(requestedProduct);
})

app.get('/blogs/create', (req,res) => {
    res.render('create', { title: 'Create a new Blog'});
})

// .. 404 ;( ..
app.use((req,res) => {
    res.render('404', { title: 'Error'});
})

