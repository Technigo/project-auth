import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import { API_URL } from '../../utils/url';
import { manga } from '../../Reducers/manga';
import { Header } from 'Components/Header';
import { Footer } from 'Components/Footer';
import { Item } from '../../Components/Item';
import { Logout } from '../../Components/Logout';

import './manga.css'

export const Manga = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const mangaItems = useSelector(store => store.manga.items);
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
        <>
            <Header />
            <section className='mangaMainContainer'>
                <div className="returnHome" >
                    <Link to="/" className="back">
                        <i className="fas fa-chevron-circle-left"></i>Home
                    </Link>
                </div>
                <Logout />
                <h1 className='mangaText'>My hero Academy Characters</h1>
                <div className='mangaContainer'>
                    {mangaItems && mangaItems.map((item) => (
                        <Item key={item._id} item={item} />
                    ))}
                </div>
            </section>
            <Footer />
        </>
    )
}
