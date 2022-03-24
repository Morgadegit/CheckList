import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import reel from "./models/reel.js"
import imaginaire from "./models/imaginaire.js"

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.once('open', () => 
  console.log("MongoDB database connection established successfully")
)

app.get('/reel', (req, res) => {
  reel.find().then(reels => res.json(reels))
  .catch(err => res.status(400).json('Error: ' + err));
});
app.route('/reel/add').post((req, res) => {

  const newItem = new reel({
    name: req.body.name, 
    checked: req.body.checked, 
    links: req.body.links});
  newItem.save().then(() => console.log("item added reel"))
  .catch(err => console.log(err));
})
app.route('/reel/delete/:name').get((req, res) => {
  reel.deleteOne({name: req.params.name},
    (err, data) => {
      if (err)
        console.log(err)
      else
        console.log(`item ${req.params.name} removed`)
    })
})

app.get('/imaginaire', (req, res) => {
  imaginaire.find().then(reels => res.json(reels))
  .catch(err => res.status(400).json('Error: ' + err));
});
app.route('/imaginaire/add').post((req, res) => {

  const newItem = new imaginaire({
    name: req.body.name, 
    checked: req.body.checked, 
    links: req.body.links});
  newItem.save().then(() => console.log("item added - imaginaire"))
  .catch(err => console.log(err));
})
app.route('/imaginaire/delete/:name').get((req, res) => {
  imaginaire.deleteOne({name: req.params.name},
    (err, data) => {
      if (err)
        console.log(err)
      else
        console.log(`item ${req.params.name} removed`)
    })
})

app.listen(port, (req, res) => console.log(`Server open on http://localhost:${port}`))