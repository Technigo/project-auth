import React from 'react'
import './aside.css'

export const Aside = ({ render }) => {
    return (
        <section class="aside">
            {render}
        </section>
    )
}
