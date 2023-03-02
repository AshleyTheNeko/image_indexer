import mongo_client from "./middleware/mongo_connect";
import typesense_cli from "../../back-end/src/middleware/typesense_connect";
import fs from "fs";

async function checkPimUpdates(next) {
    if (next.ns.coll == "pim") {
        if (next.operationType == "delete") {
            mongo_client
                .db("typesense")
                .collection("join_table")
                .deleteOne(
                    { pimID: next.fullDocument._id.toString() },
                    (err, res_del) => {
                        if (err) console.log(err);
                    }
                );
        } else if (next.operationType == "insert") {
            var new_pim = {
                pimID: next.fullDocument._id.toString(),
                knowledges: [],
            };
            mongo_client
                .db("typesense")
                .collection("join_table")
                .insertOne(new_pim, (err, res_insert) => {
                    if (err) console.log(err);
                });
        }
    } else if (next.ns.coll == "questions") {
        if (next.operationType == "insert") {
            var new_id = {
                knowledge_id: next.fullDocument._id.toString(),
                count: 0,
            };
            mongo_client
                .db("analytics")
                .collection("knowledges")
                .insertOne(new_id, (err, res_insert) => {
                    if (err) console.log(err);
                });
            mongo_client
                .db("analytics")
                .collection("satisfaction")
                .insertOne(
                    {
                        positive: 0,
                        negative: 0,
                        knowledge_id: new_id.knowledge_id,
                    },
                    (err, res_insert) => {
                        if (err) console.log(err);
                    }
                );
        } else if (next.operationType == "delete") {
            console.log(next);
            var k_id = next.documentKey._id.toString();
            await mongo_client
                .db("typesense")
                .collection("join_table")
                .updateMany(
                    {},
                    {
                        $pull: {
                            knowledges: k_id,
                        },
                    }
                );
            await mongo_client
                .db("analytics")
                .collection("satisfaction")
                .deleteOne({ knowledge_id: k_id });
            await mongo_client
                .db("analytics")
                .collection("knowledges")
                .deleteOne({ knowledge_id: k_id });
        }
    }
}

async function index(next) {
    await checkPimUpdates(next);
    if (next.operationType == "delete") {
        await typesense_cli
            .collections(next.ns.coll)
            .documents(next.documentKey._id)
            .delete();
    } else if (next.operationType == "update") {
        let data = JSON.stringify(next.updateDescription.updatedFields);
        await typesense_cli
            .collections(next.ns.coll)
            .documents(next.documentKey._id)
            .update(data);
    } else {
        next.fullDocument.id = next.fullDocument["_id"];
        delete next.fullDocument._id;
        let data = JSON.stringify(next.fullDocument);
        await typesense_cli.collections(next.ns.coll).documents().upsert(data);
    }
}

async function monitorListingsUsingEventEmitter() {
    ["questions", "pim"].forEach((elem) => {
        const collection = mongo_client.db("typesense").collection(elem);
        const changeStream = collection.watch();
        changeStream.on("change", (next) => {
            console.log(next.operationType + " on collection " + elem);
            index(next);
        });
    });
}

const create_scheme = (): void => {
    var toCreate = ["questions", "pim"];
    const collectionsList = typesense_cli.collections().retrieve();
    collectionsList.forEach((elem) => {
        toCreate.splice(toCreate.indexOf(elem["name"]), 1);
    });

    toCreate.forEach(async (elem) => {
        await typesense_cli.collections().create(ts_schema[elem]);
    });
    mongo_client
        .db("typesense")
        .collection("news")
        .find({})
        .toArray((err, result) => {
            if (result.length == 0) {
                var to_add = [];
                for (var i = 1; i < 4; i++)
                    to_add.push({ knowledges: [], target: `${i}` });
                mongo_client
                    .db("typesense")
                    .collection("news")
                    .insertMany(to_add, (err, res) => {
                        if (err) throw err;
                    });
            }
        });
}

mongo_client.connect().then(
    (client) => {
        console.log("watcher connected to mongoDB");
        monitorListingsUsingEventEmitter();
        create_scheme();
    },
    (err) => {
        console.log(err);
        process.exit(1);
    }
);
