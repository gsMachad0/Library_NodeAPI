import express from "express";
import BookController from "../controllers/booksController.js";

const router = express.Router();

router
	.get("/books", BookController.listBooks)    
	.get("/books/search", BookController.listBookByFilter)
	.get("/books/:id", BookController.listBookByID)
	.post("/books", BookController.registerBook)
	.put("/books/:id", BookController.updateBook)
	.delete("/books/:id", BookController.deleteBook);

export default router;