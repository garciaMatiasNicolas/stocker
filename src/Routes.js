import { Router } from "express";
import createProduct from "./MockData.js";

const productRoute = Router();

productRoute.get('/', (_, res)=> {

    let mockProducts = [];

    for (let i = 0; i < 5; i++) {
        let newProduct = createProduct();    
        mockProducts.push(newProduct);    
    };

    res.render('pages/table', {mockProducts})
  
})

export default productRoute