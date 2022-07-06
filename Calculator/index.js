const express = require('express');
const fs = require('fs');
const path = require('path');
const cookie = require('cookie-parser');

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(cookie());
app.set('view engine','hbs');

app.use(express.static(path.join(__dirname + "/")));
console.log(path.join(__dirname, "index.html"));
// app.get("/", (req, res)=>{
//     res.set({"Content-Type": "text/html"});
//     fs.readFile("index.html", (err, data)=>{
//         res.end(data)
//     })
// })

app.get('/Scientific',(req,res)=>{
    
    res.set({
        "Content-Type":"text/html"
    });

    fs.readFile("scientific.html",(err,data)=>{
        res.status(201).send(data)
    })

});

app.get('/Simple',(req,res)=>{
    
    res.set({
        "Content-Type":"text/html"
    });

    fs.readFile("simple.html",(err,data)=>{
        res.status(201).send(data)
    })

});

app.get('/view',(req,res)=>{
    console.log(req.cookies.calc);
    res.render('data',{
        item:req.cookies.calc
    })
});

app.get('/delete',(req,res)=>{
    console.log(req.body);
    res.clearCookie('calc');
    console.log(req.cookies);
    res.redirect("/");
});


app.get('/visit',(req,res)=>{
    console.log(req.params);
    if(req.query.ca==='Simple'){
        res.redirect("/Simple");
    }else{
        res.redirect("/Scientific")
    }
});

app.post('/exit',(req,res)=>{
    res.redirect("/");
});


app.post("/save",(req,res)=>{

    const save = [];


    for(var i=0;i<req.cookies?.calc?.length;i++){
        save.push(req.cookies?.calc[i]);
    }

    save.push(req.body.output);

    if(save.length>5){
        save.shift();
    }


    console.log(save)
    res.status(201).cookie('calc',save).redirect("/view");

});

app.get('/show',(req,res)=>{
   return res.status(201).json({data:req.cookies.calc});
});


const PORT = 5000 || process.env.PORT;

app.listen(PORT,()=>{
    console.log("Server is Running");
});