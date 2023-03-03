import { Router } from "express";
export const router = Router();
import typesense_cli from "../middleware/typesense_connect";

router.delete("/image/:id", (req, res) => {
    typesense_cli
        .collections("images")
        .documents(req.params.id)
        .delete()
        .then(() => {
            res.status(200).send({ msg: "Success" });
        }, (err) => {
            res.status(500).send(err);
        });
});
