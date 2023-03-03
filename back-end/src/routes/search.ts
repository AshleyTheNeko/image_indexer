import { Router } from "express";
import { existsSync } from "fs";
export const router = Router();
import { check_body } from "../middleware/check_body";
import ts_client from "../middleware/typesense_connect";

router.post("/search", (req, res) => {
    const data = req.body;

    const body_verif = check_body(["filter_by", "query"], data);
    if (body_verif != "")
        return res
            .status(400)
            .send({ msg: `Missing mandatory element ${body_verif}` });

    const searchParameters = {
        q: data.query,
        query_by: data.filter_by,
        // filter_by: ``,
    };

    ts_client
        .collections("images")
        .documents()
        .search(searchParameters)
        .then(
            (searchResults) => {
                return res.status(200).send(searchResults);
            },
            (reason) => {
                return res.status(500).send(reason);
            }
        );
});

router.get("/images/:name", (req, res) => {
    const path = `/data/${req.params.name}`;

    try {
        if (existsSync(path)) {
            res.status(200).sendFile(path);
        } else
            res.status(404).send({ msg: "Not found" });
    } catch (err) {
        console.log(err);
    }
});