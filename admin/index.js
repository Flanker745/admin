const express = require("express");
const app = express();
require("./db");
const cors = require("cors");
const login = require("./Models/login");
const multer = require("multer");
const course = require("./Models/course");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uplodes");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage: storage }).single("img");
app.use(express.json());
app.use(cors());
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const response = await login.find({ username: username });
  if (response.length == 0) {
    return res.json({ msg: "invalid User", status: false });
  }
  if (response[0].password !== password) {
    return res.json({ msg: "invalid Password", status: false });
  }

  res.json({ msg: "login successfully", status: true });
});
app.post("/addcourse", upload, async (req, res) => {
  const { coursename, courseprice, coursedur, coursedes, coursestatus } =
    req.body;
  const coursesimg = req.file.filename;
  const saveCourse = new course({
    coursename,
    courseprice,
    coursedur,
    coursedes,
    coursesimg,
    coursestatus: coursestatus === "true",
  });
  try {
    const response = await saveCourse.save();
    res.json({ msg: "Api called", res: response , statu:true });
  } catch (err) {
    res.json({ msg: "err" , statu:false });
  }
});
app.get("/viewcourse" , async(req,res)=>{
  try{
    const response = await course.find();
    res.json({msg:"done" , res:response})
  }
  catch(err){
    res.json({msg:"err" , statu:false})
  }
})

app.listen(5500, () => {
  console.log("5500");
});
