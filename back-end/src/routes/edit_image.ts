import { Router } from "express";
import { check_body } from "../middleware/check_body";
import typesense_cli from "../middleware/typesense_connect";
export const router = Router();

router.put("/image/:id", (req, res) => {
    const data = req.body;

    const body_verif = check_body(["keywords, private"], data);
    if (body_verif != "")
        return res
            .status(400)
            .send({ msg: `Missing mandatory element ${body_verif}` });
    
    typesense_cli
    .collections("images")
    .documents(req.params.id)
    .update({keywords: data.keywords, private: data.private})
    .then(() => {
        res.status(200).send({ msg: "Success" });
    }, (err) => {
        res.status(500).send(err);
    });
});
