const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path")
const cors = require("cors"); 
const payment = require('./routes/payment');


// dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));



var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://asmita:asmita4321@blog.phtbcqt.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
   
  }).then(()=>console.log("Connected to MongoDB"))
  .catch(err => console.log(err));
 

  

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });

const upload = multer({storage:storage});
app.post("/api/upload", upload.single("file"), (req,res)=>{
  res.status(200).json("file has been uploaded");
})


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
// app.use("/api/payment", payment);
app.use('/api/payment', require('./routes/payment'));

// app.use("/", (req, res) => {
//   console.log("heyy this is main URL");
// });

app.listen("5000", () => {
  console.log("Backend is running...");
});


// mongodb+srv://asmita:asmita4321@blog.nseghbu.mongodb.net/?retryWrites=true&w=majority




