import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import * as typesense from "typesense";
import * as login from "./routes/login";
import * as search from "./routes/search";
import * as edit_image from "./routes/edit_image";
import * as add_image from "./routes/add_image";
import mongo_client from "./middleware/mongo_connect";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use(login.router);
app.use(search.router);
app.use(edit_image.router);
app.use(add_image.router);

mongo_client.connect().then(
    (db) => {
        app.locals.db = db;

        app.listen(process.env.APP_PORT, () => {
            console.log(`Listening on port ${process.env.APP_PORT}`);
        });
    },
    (err) => {
        console.log(`Failed to connect to the database. ${err.stack}`);
        process.exit(1);
    }
);
