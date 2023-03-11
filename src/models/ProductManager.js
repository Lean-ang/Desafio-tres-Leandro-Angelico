import fs from "fs";

export default class ProductManager {
    #path
    #products
    constructor(path) {
        this.#path = path
        this.#products =[]
    }

    //leer
    async #readingJSON(){    
            const data = await fs.promises.readFile(this.#path, 'utf-8')
            this.#products = JSON.parse(data)                
    }

    //escribir
    async #writingSave(){
            const dataJSON = JSON.stringify(this.#products, null, 2)
             await fs.promises.writeFile(this.#path, dataJSON)   
    }

    //guardar
    async dataSaving(item){
        await this.#readingJSON()
        this.#products.push(item)
        await this.#writingSave()
        return item 
    }

    //buscar
    async getProducts(){
        await this.#readingJSON()
        return this.#products
    }

    //buscar por id
    async getProductsById(id){       
            await this.#readingJSON()
            const prod = this.#products.find(prod => prod.id === id)
            if (!prod){
               throw new Error(`Id Not Found ${id}`)
            }
            return prod
        }

    //añadir
    async addProducts(item){
        try {
            const products = await this.#readingJSON();
            if(products.length){
                if(products.find( product => product.code === item.code )){
                    return console.log("El producto se encuentra agregado")
                } else {
                    let lastIndex = products.length - 1;
                    let lastId = products[lastIndex].id;
                    item.id = lastId + 1;
                    let id = item.id;
                    products.push(item);
                    this.#writingSave(products);
                    console.log("Producto agregado")
                    return id;
                }
            }
             else {
                item.id = 1;
                products.push(item);
                this.#writingSave(products);
                console.log("Producto agregado")
            }
        } 
        catch (error) {
            console.log(error);
        }
    }
    
    async updatProduct(id, newItem){
        await this.#readingJSON()
        const index = this.#products.findIndex(prod => prod.id === id)
        if (index === -1){
            throw new Error('Id Not Found')
        }
        this.#products[index] = newItem
        await this.#writingSave()
        return newItem
        
    }

    async deleteProductId(id){
        await this.#readingJSON()
        const index = this.#products.findIndex(prod => prod.id === id)
        if (index === -1){
            throw new Error('Id Not Found')
        }
        const [del] = this.#products.splice(index, 1)
        await this.#readingJSON()
        return del      
    }
    
}


