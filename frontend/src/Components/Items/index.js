import React from 'react'
import './items.css'
import { useSelector } from 'react-redux'
import { Product } from '../Item'


export const Items = () => {
    const naturalProducts = useSelector(store => store.stock.naturalProducts);

    return (
        <section className='mainContainer'>
            {naturalProducts.map(product => <Product key={product.productId} naturalProduct={product} />)}
        </section>
    )
}
