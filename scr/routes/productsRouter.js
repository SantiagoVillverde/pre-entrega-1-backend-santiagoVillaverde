import { Router } from 'express';
import productsManager from "../controlers/productManager.js"

const productsRoutes = Router();
const productList = new productsManager();

productsRoutes.get('/', async (req, res) => {
	try {
		const getProductList = await productList.getProducts();
		let limit = parseInt(req.query.limit);
		if (!limit) {
			return res.status(200).send({ getProductList });
		} else {
			let productsLimit = getProductList.slice(0, limit);
			res.status(200).send({ productsLimit });
		}
	} catch (err) {
		res.status(400).send({ err });
	}
});

productsRoutes.get('/:pid', async (req, res) => {
	try {
		let id = parseInt(req.params.pid);
		let obtenerID = await productList.getProductById(id);
		if (!obtenerID) {
			res.status(400).send({ Resultado: 'ID no encontrada' });
		}
		res.status(200).send(await obtenerID);
	} catch (err) {
		res.status(400).send({ err });
	}
});


productsRoutes.post('/', async (req, res) => {
	try {
		let newProduct = req.body;
		res.status(201).send(await productList.addProduct(newProduct));
	} catch (err) {
		res.status(400).send({ err });
	}
});

productsRoutes.put('/:pid', async (req, res) => {
	try {
		let id = parseInt(req.params.pid);
		let newProduct = req.body;
		res.status(200).send(await productList.updateProduct(id, newProduct));
	} catch (err) {
		res.status(400).send({ err });
	}
});

productsRoutes.delete('/:pid', async (req, res) => {
	try {
		let id = parseInt(req.params.pid);
		res.status(200).send(await productList.deleteProduct(id));
	} catch (err) {
		res.status(400).send({ err });
	}
});

export default productsRoutes;