const express = require("express");

const app = express()
const PORT = 8080

const modelService = require("./modules/modelService")

app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.send("hello");
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