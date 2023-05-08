
import { Router } from 'express';
import cartsManager from '../controlers/cartsManager.js';

const cartsRoutes = Router();
const cartsList = new cartsManager();

cartsRoutes.post('/', async (req, res) => {
	try {
		res.status(201).send(await cartsList.addCart());
	} catch (err) {
		res.status(400).send({ err });
	}
});

cartsRoutes.get('/:cid', async (req, res) => {
	try {
		const cid = parseInt(req.params.cid);
		let getID = await cartsList.getCartById(cid);
		res.status(200).send(await getID);
	} catch (err) {
		res.status(400).send({ err });
	}
});

cartsRoutes.post('/:cid/product/:pid', async (req, res) => {
	try {
		const cid = parseInt(req.params.cid);
		const pid = parseInt(req.params.pid);
		res.status(201).send(await cartsList.addProductToCart(cid, pid));
	} catch (err) {
		res.status(400).send({ err });
	}
});

export default cartsRoutes;