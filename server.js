const express = require("express")
const path = require("path")
const multer = require("multer")
const cors = require('cors');
const app = express()

const port = process.env.PORT || 3001;

// app.use(express.static(path.resolve(__dirname, './build')))
app.use(cors());

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop())
    }
})

const maxSize = 4 * 1000 * 1000;


var upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function(req, file, cb){
        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);
  
        var extname = filetypes.test(path.extname(
                    file.originalname).toLowerCase());
        
        if (mimetype && extname) {
            return cb(null, true);
        }
      
        cb("Error: File upload only supports the "
                + "following filetypes - " + filetypes);
    }
}).single('image')


app.post('/api/upload/',  function (req, res) {
     upload(req,res,function(err) {
        if(err) {
  
            // ERROR occured (here it can be occured due
            // to uploading image of size greater than
            // 4MB or uploading different file type)
            res.status(400).json(err)
        }
        else {
  
            // SUCCESS, image successfully uploaded
            res.json({
                'file' : req.file.path,
                message: "Success"
            })
        }
    })
})


// All other GET requests not handled before will return our React app
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './build', 'index.html'));
// });

app.listen(port,function(error) {
    if(error) throw error
        console.log('Server listening at port %d', port);
})