'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3001;


const mongoose = require('mongoose');
main().catch(err => console.log(err));
let BookModel;
async function main() {
  await mongoose.connect(process.env.MONGO_URL);

  const BookSchema = new mongoose.Schema({
    title: String,
    description:String,
    email:String,
    status:String

  });

  BookModel=mongoose.model('Book',BookSchema);
  // seedData();
}
//seedData
async function seedData(){
const HTMLtestBook=new BookModel({
  title:'HTML',
  description:'Basic about HTML',
  email:'aseelalasaad@gmail.com',
  status:'available'

});
const JavaScript=new BookModel({
  title:'JavaScript',
  description:'Basic about JavaScript',
  email:'aseelalasaad@gmail.com',
  status:'notavailable'

});

const Python=new BookModel({
  title:'Python',
  description:'Basic about Python',
  email:'aseelalasaad@gmail.com',
  status:'available'


});

await HTMLtestBook.save();
await JavaScript.save();
await Python.save();
}


//http://localhost:3010/Book?email=aseelalasaad@gmail.com
app.get('/Book', getBook );
app.post('/addBook',addBookhandel);
app.delete('/deleteBook/:id',deleteBookhandel);



function getBook(req,res){
  const email=req.query.email;
  BookModel.find({email:email},(err,result)=>{
    if(err)
    {
      console.log(err);
    }
    else{
      
      res.send(result)
    }
  })
}


 async function addBookhandel(req,res){

  const title= req.body.title;
  const description= req.body.description;
  const email= req.body.email;
  const status= req.body.status;
  await BookModel.create({
    title:title,
    description:description,
    email:email,
    status:status
  });
  BookModel.find({email:email},(err,result)=>{
    if(err)
    {
      console.log(err);
    }
    else{
      
      res.send(result)
    }
  })
  
}


function deleteBookhandel(req,res){
  const bookId=req.params.id;
  const email=req.query.email;

  BookModel.deleteOne({_id:bookId},(err,result)=>{
    BookModel.find({email:email},(err,result)=>{
      if(err)
      {
        console.log(err);
      }
      else{
        
        res.send(result)
      }
    })
  })

}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
