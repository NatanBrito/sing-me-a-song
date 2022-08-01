import { Request, Response } from "express";
import { resetDataBaseService } from "../services/resetDataBaseService.js";
async function deleteData(req: Request, res: Response) {
  console.log(process.env.DEVELOP_NODE);
  if (process.env.DEVELOP_NODE === "develop") {
    await resetDataBaseService.deleteData();
    return res.sendStatus(200);
  }
  res.status(401).send("is route invalid for users");
}

export const resetDataController = {
  deleteData,
};
