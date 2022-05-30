const Product = require("../model/productModel")

const ProductCtrl = {
    getProducts: async (req, res) => {
        try {
            const products = await Product.find()
            return res.json({ products })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createProduct: async (req, res) => {
        try {
            const { name, price, images } = req.body

            const product = new Product({
                name: name,
                price: price,
                images: images
            })

            await product.save()

            return res.status(200).json({ product })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { id } = req.params
            const { name, price, images } = req.body

            const updatedProduct = await Product.findOneAndUpdate({ _id: id }, {
                name: name,
                price: price,
                images: images
            })


            res.json({ updatedProduct })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const { id } = req.params
            await Product.findByIdAndDelete({ _id: id })
            res.json({ msg: 'Product deleted successfuly!' })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = ProductCtrl