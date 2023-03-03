import multer from "multer";

const MIME_TYPES: object = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "/data/images");
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(" ").join("_").substring(0, 16);
        let extension: string;
        if (!((file.mimetype as keyof typeof MIME_TYPES) in MIME_TYPES))
            extension = "jpg";
        else extension = MIME_TYPES[file.mimetype as keyof typeof MIME_TYPES];
        callback(null, name + Date.now() + "." + extension);
    },
});

export default multer({ storage: storage }).single("image");
