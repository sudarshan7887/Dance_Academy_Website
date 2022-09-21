const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");

mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const port = 80;

// Define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });
  var Contact = mongoose.model('Contact', contactSchema);

//Express Specific Configuration
app.use("/static", express.static('static'));   //Serving static files
app.use(express.urlencoded());

//pug Specific Configuration
app.set('view engine', 'pug');      //set the template engine as pug
app.set('views', path.join(__dirname, 'views'));

//ENDPOINTS
app.get('/index', (req, res)=>{ 
    const params = { }
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{ 
    const params = { }
    res.status(200).render('contact.pug', params);
})

app.get('/home', (req, res)=>{ 
    const params = { }
    res.status(200).render('home.pug', params);
})

app.get('/services', (req, res)=>{ 
    const params = { }
    res.status(200).render('services.pug', params);
})

app.get('/about', (req, res)=>{ 
    const params = { }
    res.status(200).render('about.pug', params);
})

app.get('/class_info', (req, res)=>{ 
    const params = { }
    res.status(200).render('class_info.pug', params);
})

app.post('/contact', (req, res)=>{ 
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
})

//Start the Server
app.listen(port, () => {
    console.log(`Website Successfully run on port ${port}`);
});