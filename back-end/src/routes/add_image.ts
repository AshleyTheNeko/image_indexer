import { Router } from "express";
export const router = Router();
import { check_body } from "../middleware/check_body";
import client from "../middleware/typesense_connect";
import upload from "../middleware/multer_config";
import Tesseract from "tesseract.js";
import get_colors from "get-image-colors";
import path from "path";
import { check_login } from "..//middleware/check_login";

router.post("/images", check_login, upload, (req, res) => {
    const data = req.body;

    const body_verif = check_body(["keywords, private"], data);
    if (body_verif != "")
        return res
            .status(400)
            .send({ msg: `Missing mandatory element ${body_verif}` });

    if (!req.file) return res.status(400).send({ msg: "Missing file" });

    if (!(Object.prototype.toString.call(data.keywords) === "[object Array]"))
        return res.status(400).send({ msg: "Type error on keywords" });

    if (data.private != "true" && data.private != "false")
        return res.status(400).send({ msg: "Type error on private" });

    Tesseract.recognize(req.file.path).then((result) => {
        get_colors(path.join(__dirname, "/pic.jpg")).then(
            (colors) => {
                if (!req.file)
                    return res.status(400).send({ msg: "Missing file" });
                const new_img = {
                    user: req.body.user.mail,
                    private: data.private,
                    img_path: req.file.filename,
                    ocr_result: result.data.text.replace("/[^\x00-\x7F]/g", ""),
                    keywords: data.keywords,
                    color: colors[0]._rgb,
                    date_added: Math.floor(Date.now() / 1000),
                };

                client
                    .collections("images")
                    .documents()
                    .create(new_img)
                    .then(
                        () => {
                            return res.status(201).send({ msg: "Created" });
                        },
                        (err) => {
                            return res.status(500).send(err);
                        }
                    );
            },
            (err) => {
                return res.status(500).send(err);
            }
        );
    });
});
