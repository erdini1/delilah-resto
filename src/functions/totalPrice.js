const { checkIdProduct } = require("../repositories/products")

exports.totalPrice = async (details) => {
    let total = 0
    for await (product of details){
        let productFind = await checkIdProduct(product.product_id)
        if(productFind){
            total += (parseInt(productFind.toJSON().price)*parseInt(product.amount))
        }
    }
    return total
}
