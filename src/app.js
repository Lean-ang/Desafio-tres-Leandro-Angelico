import express from "express";
import ProductManager from "./models/ProductManager.js";

const PORT = process.env.PORT || 8080;
const productsManagers = new ProductManager('./data/products.json');
const app = express();

app.get('/products', async (req, res) => {
    try {
        const products = await productsManagers.getProducts()
        const limitValue = +(req.query.limit);
        
        if(!limitValue){
            res.json(products);
        } else {
            const productLimit = [];
            for (let i = 0; i < limitValue && i < 10; i++) {
                productLimit.push(products[i])
            }
            res.json(productLimit);
        }
    } 
    catch (error) {
        console.log(error);
    }
});

app.get('/products/:id', async(req, res) => {
    try {     
        const productById = await productsManagers.getProductsById(+req.params.id)
         res.json(productById) 
    } 
    catch (error) {
        console.log(error);
    }
});


app.listen(PORT, () => {
    console.log(`Example app listening on port: ${PORT}`);
    console.log('Path: ', 'http://localhost:8080/products')
});