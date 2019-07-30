
var multer =  require('multer');

export let storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,'publico/comics')
    },
    filename: function (req,file,cb){
        cb(null,Date.now()+'-'+file.originalname)
    }

});