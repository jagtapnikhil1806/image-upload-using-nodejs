import express from "express"
import path from "path"
import multer from "multer"

const PORT=3000;
const app =express();

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,"./uploads");
},
filename:function(req,file,cb){
    return cb(null,`${Date.now()}-${file.originalname}`)
},
})

const upload = multer({storage })

//view engine
app.set('view engine','ejs')
app.set('views', path.join(process.cwd(), 'views'))
// app.set('views', path.join(__dirname, 'views'));
//middlewares
app.use(express.urlencoded({extended: false}))

app.get('/',(req,res)=>{
    res.render("home")
})

app.post("/upload",upload.single("uploadedImage"),(req,res)=>{
    // console.log(req.body)
    console.log(req.file)
    return res.redirect("/");
})

app.listen((PORT),()=>{
    console.log(`App is running on http://localhost:${PORT}`)
})