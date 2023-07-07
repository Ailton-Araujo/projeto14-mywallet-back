import { Router } from "express";
import {
  listTransactions,
  addTransaction,
  deleteTransaction,
  editTransaction,
} from "../controllers/transactionController.js";
import validateSchema from "../middlewares/validateSchema.js";
import { transactionSchema } from "../schemas/transactions.Schemas.js";

const transactionRouter = Router();

transactionRouter.get("/transactions", listTransactions);
transactionRouter.post(
  "/transaction/:type",
  validateSchema(transactionSchema),
  addTransaction
);
transactionRouter.delete("/transaction/:id", deleteTransaction);
transactionRouter.put(
  "/transaction-edit/:id",
  validateSchema(transactionSchema),
  editTransaction
);

export default transactionRouter;
