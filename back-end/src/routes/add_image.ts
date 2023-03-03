import { Router } from "express";
export const router = Router();
import { check_body } from "../middleware/check_body";
import client from "../middleware/typesense_connect";
import upload from "../middleware/multer_config";
import Tesseract from "tesseract.js";
import get_colors from "get-image-colors";
import path from "path";
import { check_login } from "..//middleware/check_login";

router.post("/images", upload, check_login, (req, res) => {
    const data = req.body;

    console.log(data);
    // const body_verif = check_body(["keywords, private"], data);
    // if (body_verif != "")
    //     return res
    //         .status(400)
    //         .send({ msg: `Missing mandatory element ${body_verif}` });

    if (!req.file) return res.status(400).send({ msg: "Missing file" });

    // if (!(Object.prototype.toString.call(data.keywords) === "[object Array]"))
    //     return res.status(400).send({ msg: "Type error on keywords" });

    if (data.private != "true" && data.private != "false")
        return res.status(400).send({ msg: "Type error on private" });

    Tesseract.recognize(req.file.path).then((result) => {
        get_colors(req.file.path).then(
            (colors) => {
                if (!req.file)
                    return res.status(400).send({ msg: "Missing file" });
                console.log(req.body);
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
                            console.log(("fail cli add"));
                            return res.status(500).send(err);
                        }
                        );
            },
            (err) => {
                console.log(("fail cli add"));
                return res.status(500).send(err);
            }
        );
    });
});
