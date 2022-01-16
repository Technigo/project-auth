import React from 'react'
import { useSelector } from 'react-redux'

const Main = () => {
    
    const thoughtsItems = useSelector(store => store.thoughts.items)

    return (
        <section>
            <h1>Protected Happy Thoughts:</h1>
            {thoughtsItems.map((item) => (
                <article key={item._id}>{item.message}</article>
            ))}
        </section>
    )
}

export default Main