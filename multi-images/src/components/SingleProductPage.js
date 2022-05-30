import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

function SingleProductPage() {
    const params = useParams()
    const [currentProduct, setcurrentProduct] = useState([])
    const [image, setimage] = useState('')

    const getcurrentProduct = async () => {
        try {
            const res = await axios.get('/api/product')
            res.data.products.forEach(d => {
                if(d._id === params.id) setcurrentProduct(d)
            });
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getcurrentProduct()
    }, [])
    
    if(currentProduct.length === 0) return <h1>No data to show</h1>
    
    const { _id, name, price, images } = currentProduct

    return (

        <div className='single__product_pages_details'>
            <Link to='/products'>Products</Link>
            <div className="img_container">    
                <img src={image ? image : images[0].secure_url } alt="" width={200} height={200} />
            </div>

            <div className="all_images">
                {
                    images.map((i, index) => {
                        return <img src={i.secure_url} onClick={() => setimage(i.secure_url)} width={50} key={index} height={50} />
                    })
                }    
            </div>

            <p>{name}</p>
            <p>${price.toFixed(2)}</p>
        </div>
    )
}

export default SingleProductPage