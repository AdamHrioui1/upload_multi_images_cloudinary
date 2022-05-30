import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SingleProduct from './SingleProduct'

function AllProducts() {
    const [allproducts, setallproducts] = useState([])

    const getAllProducts = async () => {
        try {
            const res = await axios.get('/api/product')
            setallproducts(res.data.products)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [])
    
    if(allproducts.length === 0) return <h1>No data to show</h1>

    console.log(allproducts)

    return (
        <div>
            {
                allproducts.map((product, index) => {
                    return <SingleProduct key={index} product={product} />
                })
            }
        </div>   
    )
}

export default AllProducts