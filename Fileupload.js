const File = require('../models/File');

exports.localFileUpload = async (req, res) => {
    try {
        // Fetch file
        const file = req.files.file;
        console.log("file aagyi jee", file);

        const fileExtension = file.name.split('.')[file.name.split('.').length - 1];
        let path = __dirname + "/files/" + Date.now() + `.${fileExtension}`;
        console.log("path", path);
        
        file.mv(path, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: "Failed to upload file"
                });
            }

            res.json({
                success: true,
                message: "Local file uploaded"
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}


// file upload to cloudinary without compressiojn

exports.imageUpload = async(req,res) =>{
    try {
        // data fetch
        const {name, tags, email} = req.body;
        console.log(name,tags, email);

        const file=req.files.imageFile;
        console.log(file);

        // validation
        const supportedTypes=['jpg','jpeg','png'];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"file format not supported"
            })
        }
        console.log("file type========>",fileType);
        // save image to cloudinarty
        console.log("uplaoding    ")
        const response= await uploadFileToCloudinary(file, "codehelp");
        console.log("resssssssss",response);

       
        // db mei entry
        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })

         res.json({
            success:true,
            // imageUrl:response.secure_url,
            message:"image successfully uploaded"
        })


    } catch (error) {
        console.error(error)
        res.status(400).json({
            success:false,
            message:"something went wrong"
        })
    }
}



// video upload

// video upload
exports.videoUpload=async(req,res)=>{
    try {
        // data fetch
        const {name, tags, email} = req.body;
        console.log(name,tags, email);

        const file=req.files.videoFile;
        console.log(file);

        // validation
        const supportedTypes=['mp4','mov'];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"file format not supported"
            })
        }
        console.log("file type========>",fileType);
        // save image to cloudinarty
        console.log("uplaoding    ")
        const response= await uploadFileToCloudinary(file, "codehelp");
        console.log("resssssssss",response);

       
        // db mei entry
        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })

         res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"image successfully uploaded"
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:'something wrong'
        })
    }
}

// image quality reducer uploader to cloudinary

exports.imageReducer=async(req,res)=>{
    try {
        // fetch
        const{tags, email, name}=req.body;
        console.log(tags,email,name);

        const file=req.files.imageFile;
        console.log(file);


        // supported type
        const supportedTypes=['jpeg','jpg','png'];
        const fileType=file.name.split('.'[1].toLowerCase());

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.json({
                success:false,
                message:"file type not supported"
            })
        }

        //
        console.log("uploading to cloudinary")
        const response=await uploadFileToCloudinary(file,"codehelp",30);
        console.log(response);

        // db mei entry
        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"image uploaded"
        })

    } catch (error) {
         console.error(error)
        res.status(400).json({
            success:false,
            message:"something went wrong"
        })
    }
    }
