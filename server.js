const express = require("express");

const app = express()
const PORT = 8080
const path = require('path');
app.set('view engine', 'ejs');

const modelService = require("./modules/modelService")
app.set('views',path.join(__dirname,'/views'));
app.use(express.static(__dirname + '/public'));


app.get("/",(req, res) => {
   //to call getModels fn from modelService module
    modelService.getModels().then((models) => {
        //to render dynaic HTML view --> ejs
        res.render("index", {
            //assign value of retrievd models to a new models array , which is then passed to index view to display it
            models: models
        })
    })

    
})
app.get("/about", (req, res) => {
    // to render about view 
    res.render("about")
})


app.get("/models",(req,res)=>{
    modelService.getModels().then((models)=>{
        res.json(models)
    }).catch((err)=>{
        console.log(err)
    })
})

app.get("/models/:id",(req,res)=>{
   modelService.getModelByID(req.params.id).then((modelData)=>{
    res.send(modelData)
   }).catch((err)=>{
    console.log(err)
   })
})

app.get("*", (req, res) => {
    res.send("404")
})

 modelService.initialize().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    })
 })