'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;


const mongoose = require('mongoose');
main().catch(err => console.log(err));
let BookModel;
async function main() {
  await mongoose.connect('mongodb://localhost:27017/Book-lab11');

  const BookSchema = new mongoose.Schema({
    title: String,
    imgUrl:String,
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
  imgUrl:'https://www.tripwiremagazine.com/wp-content/uploads/2016/10/Introducing-html_thumb.jpg',
  description:'Basic about HTML',
  email:'aseelalasaad@gmail.com',
  status:'available'

});
const JavaScript=new BookModel({
  title:'JavaScript',
  imgUrl:'https://images-na.ssl-images-amazon.com/images/I/511pKlY0zgL._SX331_BO1,204,203,200_.jpg',
  description:'Basic about JavaScript',
  email:'aseelalasaad@gmail.com',
  status:'notavailable'

});

const Python=new BookModel({
  title:'Python',
  imgUrl:'https://m.media-amazon.com/images/I/41+l48O6TbL.jpg',
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

app.listen(PORT, () => console.log(`listening on ${PORT}`));
