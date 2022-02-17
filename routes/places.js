var express = require('express');
const res = require('express/lib/response');
var router = express.Router();
const fs =require("fs")


getAllPlaces= (req,res)=>{
    fs.readFile("apiInfo/db.json",(err,json)=>{
        let obj= JSON.parse(json);
        console.log(Object.keys(obj))
        allPlacesList=[]
        for (const k of Object.keys(obj)){
            allPlacesList.push(...obj[k])
        }
        res.json(allPlacesList);
    });
}
getPlaceByType= (req,res)=>{
    if (!req.params.id){
        res.status(400).send({
            message: "Debe proveer el tipo de lugar que busca."
        })
    }
    fs.readFile("apiInfo/db.json",(err,json)=>{
        let obj= JSON.parse(json);
        const resp=obj[req.params.id]
        if (!resp){
            res.status(400).send({
                message: "El tipo de lugar no está disponible."
            })
        }
        res.json(resp);
    });
}


/* GET users listing. */
router.get('/', getAllPlaces);
router.get('/type/:id', getPlaceByType);


module.exports = router;
