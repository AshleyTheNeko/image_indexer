import { Router } from "express";
import { existsSync } from "fs";
import { check_login } from "../middleware/check_login";
export const router = Router();
import { check_body } from "../middleware/check_body";
import ts_client from "../middleware/typesense_connect";

router.post("/search", check_login, (req, res) => {
    const data = req.body;

    console.log(req.body);
    // const body_verif = check_body(["filter_by", "query"], data);
    // if (body_verif != "")
    //     return res
    //         .status(400)
    //         .send({ msg: `Missing mandatory element ${body_verif}` });

    const searchParameters = {
        q: data.query,
        query_by: data.filter_by,
        // filter_by: "",
    };
    console.log(searchParameters);

    ts_client
        .collections("images")
        .documents()
        .search(searchParameters)
        .then(
            (searchResults) => {
                return res.status(200).send(searchResults);
            },
            (reason) => {
                console.log(reason);
                return res.status(500).send(reason);
            }
        );
});

router.get("/images/:name", check_login, (req, res) => {
    const path = `/data/${req.params.name}`;

    try {
        if (existsSync(path)) {
            res.status(200).sendFile(path);
        } else res.status(404).send({ msg: "Not found" });
    } catch (err) {
        console.log(err);
    }
});
