import multer from "multer";

const MIME_TYPES: object = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
};

const genRanHex = (size: number) =>
    [...Array(size)]
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join("");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "/data/");
    },
    filename: (req, file, callback) => {
        let extension: string;
        if (!((file.mimetype as keyof typeof MIME_TYPES) in MIME_TYPES))
            extension = "jpg";
        else extension = MIME_TYPES[file.mimetype as keyof typeof MIME_TYPES];
        console.log("called");
        callback(null, genRanHex(5) + Date.now() + "." + extension);
    },
});

export default multer({ storage: storage }).single("image");
