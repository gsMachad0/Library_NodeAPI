import NotFound from "../errors/NotFound.js";
import {authors} from "../models/index.js";

class AuthorsController {

	static listAuthors = async (req, res, next) => {
		try{
			const authorsResult = await authors.find();
			res.status(200).json(authorsResult);
		} catch(error)
		{
			next(error);
		}    
	};

	static listAuthorByID = async (req, res, next) => {
		const id = req.params.id;
		try
		{    
			const authorResult = await authors.findById(id);
			if(authorResult != null){
				res.status(200).send(authorResult);
			} else {
				next(new NotFound(`ID ${id} not found!`));
			}
		} catch(error)
		{
			next(error);
		}   
	};

	static registerAuthor = async (req, res, next) => {
		try
		{
			let author = new authors(req.body);
			await author.save();
			res.status(201).json(author);
		} catch(error)
		{
			next(error);
		}
	};

	static updateAuthor = async (req, res, next) => {
		try
		{      
			const id = req.params.id;
			const authorResult = await authors.findByIdAndUpdate(id, {$set: req.body});
			if(authorResult != null){
				res.status(200).send({message: "Author updated"});
			} else {
				next(new NotFound(`ID ${id} not found!`));
			}
			
		} catch(error)
		{
			next(error);
		}   
	};

	static deleteAuthor = async (req, res, next) => {    
		try
		{
			const id = req.params.id;
			const authorResult = await authors.findByIdAndDelete(id);
			if(authorResult != null){
				res.status(200).send({message: "author deleted"});
			} else {
				next(new NotFound(`ID ${id} not found!`));
			}
		} catch(error)
		{
			next(error);
		}
	};

}

export default AuthorsController;