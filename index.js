const express = require("express");
const path = require('path');
const port = 8000;


const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

// middleware 1

// app.use(function(req, res, next){
//     req.myName = "Aashish";
//    // console.log('middleware 1 is called');
//     next();

// });

// app.use(function(req, res, next){
//     console.log('My Name from MW2 ', req.myName);
//    // console.log('Middle ware 2 is called');
//     next();
// });

var contactList = [
    {
        name: "Arpan",
        phone: "434325"
    },
    {
        name: "Tony stark",
        phone: "68986"
    },
    {
        name: "Abhay",
        phone: "68896"
    }
]

app.get('/', function(req, res){
  // console.log('from the get route controller',req.myName);
  
  Contact.find({}, function(err, contacts){
      if (err) {
          console.log('Error in fetchig contacts from db');
          return;
      }

      return res.render('home',{ 
        title: "My Contact List",
        contact_list: contacts 
     });

  })
   
});

app.get('/practice', function(req, res) {
    return res.render('practice', { 
        title: "Lets play with ejs" 
    });
});

app.post('/create-contact', function(req,res){
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });

    //contactList.push(req.body);

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if (err) {console.log('error in creating a contact !');
        return;}

        console.log('*******', newContact);
        return res.redirect('back');
    });

    //return res.redirect('back');
});
// for deleting a contact 
app.get('/delete-contact', function(req, res){
    // get the query from the query in the ul

    //console.log(req.query);
    let id = req.query.id;
// find the contact in the databse using id and delete
    
Contact.findByIdAndDelete(id, function(err){
    if(err) {
        console.log('error in deleting an object from database');
        return;
    }
    return res.redirect('back');
});

    

});

app.listen(port, function(err){

    if(err) {
        console.log('Error in running the server', err);
    }

    console.log('yup my server is running on port 8000', port);

});