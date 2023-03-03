import { Router } from "express";
export const router = Router();

router.put("/image/:id", (req, res) => {
    res.status(200).send({ msg: "Success" });
});
