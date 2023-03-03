import { createHash } from "crypto";
import { Router } from "express";
export const router = Router();
import * as jwt from "jsonwebtoken";
import { MongoClient } from "mongodb";

router.post("/login", (req, res) => {
    const db = req.app.locals.db as MongoClient;
    const pass = req.body.pass;
    const mail = req.body.mail;
    if (mail == undefined || pass == undefined)
        return res.status(400).send({ msg: "Bad request" });

    db.db("accounts")
        .collection("accounts")
        .find({
            mail: mail,
            pass: createHash("md5").update(pass).digest("hex"),
        })
        .toArray()
        .then(
            (val) => {
                if (val.length == 0)
                    return res.status(401).send({ msg: "Wrong credentials" });

                const token_data = {
                    time: Date.now(),
                    id: val[0]._id.toString(),
                    mail: val[0].mail,
                };
                const token = jwt.sign(token_data, "fortnite");
                res.status(200).send({ token: token });
            },
            (err) => {
                return res.status(500).send(err);
            }
        );
});

router.post("/register", (req, res) => {
    const db = req.app.locals.db as MongoClient;
    const pass = req.body.pass;
    const mail = req.body.mail;
    if (mail == undefined || pass == undefined)
        return res.status(400).send({ msg: "Bad request" });

    db.db("accounts")
        .collection("accounts")
        .findOne({ mail: mail })
        .then(
            (val) => {
                if (val != null)
                    return res.status(400).send({ msg: "Already exists." });
                db.db("accounts")
                    .collection("accounts")
                    .insertOne({
                        mail: mail,
                        pass: createHash("md5").update(pass).digest("hex"),
                    })
                    .then(
                        () => {
                            res.status(201).send({ msg: "User created." });
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
