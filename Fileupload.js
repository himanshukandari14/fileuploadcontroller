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
