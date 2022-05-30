import React from 'react'
import { Link } from 'react-router-dom'

function SingleProduct({ product }) {
    const { _id, name, price, images } = product

    return (
        <div className='single__product'>
            <Link to={`/products/${_id}`}>
                <div className="img_container">
                    <img src={images[0].secure_url} alt="" width={100} height={100} />
                </div>
                <p>{name}</p>
                <p>${price}</p>
            </Link>
        </div>
    )
}

export default SingleProduct