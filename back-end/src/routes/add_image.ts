import { Router } from "express";
export const router = Router();

router.post("/images", (req, res) => {
    const data = req.body;
    const db = req.app.locals.db.db("pog");

    if (!is_valid(["name", "desc", "allergens", "fridge_id"], data))
        return res.status(400).send({ msg: "Missing mandatory element(s)" });
    if (!req.files || !req.files.thumbnail)
        return res.status(400).send({ msg: "Missing file" });

    try {
        var allergens = JSON.parse(data.allergens);
        if (allergens.constructor.name != "Array")
            return res.status(400).send({ msg: "Wrong allergens data" });
    } catch (error) {
        return res.status(400).send({ msg: "Wrong allergens data" });
    }
    for (let i = 0; i < allergens.length; i++) {
        if (allergens[i] > 15 || allergens[i] < 1)
            return res.status(400).send({ msg: "Wrong allergens data" });
    }

    var new_dish = {
        name: data.name,
        desc: data.desc,
        time: Math.floor(Date.now() / 1000),
        fridge_id: data.fridge_id,
        allergens: allergens
    };

    db.collection("fridges").find({ _id: ObjectId(data.fridge_id) }).toArray((err, result) => {
        if (err)
            return res.status(500).send(err_arr);
        if (result.length == 0)
            return res.status(400).send({ msg: "Invalid fridge ID" });
        if (result[0].dishes.indexOf(null) == -1) {
            return res.status(400).send({ msg: "Fridge is full" });
        }

        db.collection("dishes").insertOne(new_dish, (err, res_insert) => {
            if (err) res.status(500).send(err);

            db.collection("fridges").updateOne(
                { _id: ObjectId(data.fridge_id), dishes: undefined },
                { $set: { "dishes.$": `${res_insert.insertedId}` } },
                (err, res_update) => {
                    if (err) res.status(500).send(err);
                    else {
                        req.files.thumbnail.mv(`${process.env.TB_PATH}/${res_insert.insertedId}.jpg`);
                        res.status(201).send({ id: res_insert.insertedId });
                    }
                });
        });
    });
});