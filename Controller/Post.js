module.exports.AddProduct = async (req, res) => {
    const data = req.body;
    console.log(data);
    try {

        const product = new Product(data);
        await product.save();
        res.status(201).json({ message: 'Product added successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });

    }


}