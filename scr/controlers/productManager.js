import fs from 'fs';

export default class productsManager {
	constructor() {
		this.path = './src/models/products.json';
	}

	#id = 0;
	#readFile = async () => {
		const readProduct = await fs.promises.readFile(this.path, 'utf-8');
		return JSON.parse(readProduct);
	};
	#writeFile = async (products) => {
		await fs.promises.writeFile(this.path, JSON.stringify(products));
	};
	#generateId() {
		this.#id++;
		return this.#id;
	}
	#validId = async (id) => {
		let products = await this.#readFile();
		const findProductIndex = await products.findIndex(
			(product) => product.id === id
		);
		if (findProductIndex === -1) {
			return 'Producto no encontrado';
		} else {
			return findProductIndex;
		}
	};

	getProducts = async () => {
		let showProducts = await this.#readFile();
		return showProducts;
	};

	/** 
	 * @param {number} id 
	 */
	getProductById = async (id) => {
		let products = await this.#readFile();
		const findProductIndex = await this.#validId(id);
		return products[findProductIndex];
	};

	addProduct = async (product) => {
		if (
			!product.title ||
			!product.description ||
			!product.code ||
			!product.price ||
			!product.status ||
			!product.stock ||
			!product.category
		) {
			return `Faltan propiedades obligatorias en el producto!
			
			title: ${product.title} 
			description: ${product.description} 
			code: ${product.code} 
			price: ${product.price} 
			status: ${product.status}
			stock: ${product.stock} 
			category: ${product.category}

			Solo la propiedad 'thumbnails' no es obligatoria. 
			Por favor intente nuevamente.
			`;
		}

		let productsOld = await this.#readFile();
		let duplicateCode = productsOld.find(
			(newProduct) => newProduct.code === product.code
		);
		if (duplicateCode) {
			return 'El código ya existe';
		}
		product.id = this.#generateId();
		const addNewProduct = [...productsOld, product];
		this.#writeFile(addNewProduct);
		return 'Producto agregado';
	};

	/**
	 * @param {object} object)
	 */
	updateProduct = async (id, product) => {
		await this.#validId(id);
		await this.deleteProduct(id);
		let beforeListProducts = await this.#readFile();
		let afterListProducts = [{ ...product, id: id }, ...beforeListProducts];
		await this.#writeFile(afterListProducts);
		return 'Producto actualizado';
	};

	/** 
	 * @param {number} id
	 */
	deleteProduct = async (id) => {
		let products = await this.#readFile();
		const findProduct = await products.some((product) => product.id === id);
		if (findProduct) {
			
			let productFilter = products.filter((product) => product.id != id);
			
			this.#writeFile(productFilter);
			return 'Producto Eliminado';
		}
		return 'ID no encontrada';
	};
}