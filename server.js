const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');


app.use((req,res,next)=>{
    var now  = new Date().toString();
    var log = `${now}: ${req.method}: ${req.path}`;
    fs.appendFile('server.log',log + '\n',(err)=>{
        if(err){
            console.log("Unable to log to server.log");
        }
    });
next();
});
app.use((req,res,next)=>{
    res.render('maintenance.hbs');
});

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIT',(str)=>{
    return str.toUpperCase();
});
// app.get('/',(request, response)=>{
// //response.send('<h1>Hello express</h1>');
// response.send({
//     name:"vaibhav katariya",
//     like:[
//         'js coding',
//         'server technologies'
//     ]
// });
// });



// app.get('/about-us', (request,response)=>{
// response.send("<h1>You Are On About Page</h1>");
// });

app.get('/',(request, response)=>{
    response.render('home.hbs',{
      pageTitle: "Home page",
      welcome: "hello it must work"
    })
});

app.get('/about', (request, response)=>{
response.render('about.hbs',{
    pageTitle: "About Page test handlebars"
    
});
});
app.listen(3000, ()=>{
    console.log('server starts at port 3000');
});