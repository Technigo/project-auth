import React, { useEffect } from 'react'
import './manga.css'
import { Item } from '../../Components/Item'

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../../utils/url';
import { manga } from '../../Reducers/manga';

export const Manga = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const mangaItems = useSelector(store => store.manga.items);
    console.log(mangaItems)
    const accessToken = useSelector((store) => store.user.accessToken);

    useEffect(() => {
        if (!accessToken) {
            navigate('/singup');
        }
    }, [accessToken, navigate]);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                Authorization: accessToken,
            },
        };

        fetch(API_URL('manga'), options)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.success) {
                    dispatch(manga.actions.setItems(data.response));
                    dispatch(manga.actions.setError(null));
                } else {
                    dispatch(manga.actions.setItems([]));
                    dispatch(manga.actions.setError(data.response));
                }
            })
    }, [accessToken]);

    return (
        <section className='mainContainer'>
            <Link to="/signup"> Please sign up first to have access to info</Link>
            <h1>Manga information</h1>
            {mangaItems && mangaItems.map((item) => (
                <Item key={item.name} item={item} />
            ))}
        </section>
    )
}
