import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, batch } from 'react-redux';
import styled from 'styled-components';
import { API_URL } from 'utils/url';
import user from 'reducers/user';
import secrets from '../reducers/secrets';

export const SecretContent = () => {
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);
  const secretItems = useSelector((store) => store.secrets.items);

  const dispatch = useDispatch();

  const logout = () => {
    batch(() => {
      dispatch(user.actions.setUsername(null));
      dispatch(user.actions.setAccessToken(null));
    });
  };

  // Styled components
  const Cake = styled.h1`
    font-size: 4em;
    margin: 0px;
  `;

  const H1 = styled.h2`
    font-size: 1.7em;
  `;

  const H2 = styled.h2`
    color: #d4426e;
    text-align: center;
  `;
  const LogoutButton = styled.button`
    background-color: #92dea0;
    align-self: center;
    width: fit-content;
    padding: 5px 15px;
    margin: 10px;
    font-size: 1em;
    padding: 5px;
    border: 2px solid black;
    text-transform: uppercase;
  `;

  // redirect user to login if they are not logged in
  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: accessToken,
      },
    };

    console.log('dags att fetcha hemligheter!!!');

    fetch(API_URL('secrets'), options)
      .then((res) => res.json())
      .then((data) => {
        console.log('den här koden körs väl');
        // if (data.success) {
        dispatch(secrets.actions.setItems(data.response));
        // dispatch(secrets.actions.setError(null));
        //        } else {
        //        dispatch(secrets.actions.setItems([]));
        //      dispatch(secrets.actions.setError(data.response));
        //  }
      });
  }, [accessToken]);
  console.log('secrets', typeof secretItems);
  return (
    <>
      <Cake>
        <span role='img' aria-label='cupcake'>
          🧁
        </span>
      </Cake>

      {/* <Link className="Link" to="/login">
        <button type="submit">Log out</button>
      </Link> */}
      <LogoutButton onClick={logout}>Log out</LogoutButton>
      <H1>
        This is super secret
        <span role='img' aria-label='eyes'>
          👀
        </span>{' '}
        ... for some reason
        {/* Fetching this h2 from the secret endpoint in the backend */}
      </H1>

      {secretItems.map((items) => (
        <div key={items.id}>
          <H2>{items.text}</H2>
        </div>
      ))}
      <p>
        Topping muffin marzipan carrot cake icing. Powder sesame snaps gummi
        bears oat cake candy canes.{' '}
        <span role='img' aria-label='cupcake'>
          🧁
        </span>
        Lollipop tart cheesecake cotton candy gingerbread tootsie roll. Topping
        dragée jujubes bonbon icing. Jujubes lollipop cupcake pastry gummi bears
        macaroon danish sesame snaps gummies.{' '}
        <span role='img' aria-label='cupcake'>
          🍪
        </span>
        Sweet jelly dessert soufflé candy canes. Cupcake soufflé icing jelly-o
        oat cake muffin oat cake soufflé sweet roll.
        <br />
        <br />
        Tootsie roll chocolate gummi bears dragée sugar plum jelly beans bonbon
        cotton candy. Topping candy carrot cake cake gingerbread candy. Candy
        canes marzipan brownie lemon drops dessert fruitcake biscuit brownie
        soufflé. Chupa chups gummies tart chocolate bar muffin{' '}
        <span role='img' aria-label='cupcake'>
          🧁
        </span>
        brownie brownie soufflé sugar plum. Brownie topping tiramisu oat cake
        dessert tootsie roll jelly beans. Dragée tart tiramisu liquorice
        croissant cupcake tart tart. Jelly beans apple pie gummies brownie
        dessert. Pie marzipan cotton candy jelly caramels.{' '}
        <span role='img' aria-label='cupcake'>
          🍪
        </span>
        Donut topping icing danish sweet ice cream sweet ice cream. Cake jelly-o
        lollipop croissant sugar plum.{' '}
        <span role='img' aria-label='cupcake'>
          🧁
        </span>
        Bear claw shortbread marshmallow brownie jelly beans fruitcake sugar
        plum.
        <br />
        <br />
        Croissant chocolate cake chocolate bar dessert sweet cotton candy cotton
        candy sugar plum sesame snaps. Sweet roll sugar plum dragée sesame snaps
        marzipan chocolate bar jujubes. Cookie sweet roll jelly beans cotton
        candy cookie. Apple pie jelly chocolate cupcake sweet roll marzipan
        gummi bears marshmallow.{' '}
        <span role='img' aria-label='cupcake'>
          🍪
        </span>
        Jelly beans cake chupa chups chocolate tiramisu dessert candy. Cookie
        toffee liquorice topping lemon drops. Chocolate bar sweet tart chocolate
        bar chocolate cake wafer sweet roll. Pie jelly beans gummi bears dragée
        croissant soufflé cake.{' '}
        <span role='img' aria-label='cupcake'>
          🧁
        </span>
        Donut toffee icing dessert chocolate. Powder ice cream shortbread
        lollipop tart chocolate bar dragée cake. Bonbon carrot cake icing
        jelly-o jelly pudding jelly biscuit.{' '}
        <span role='img' aria-label='cupcake'>
          🍪
        </span>
        Dessert soufflé donut sugar plum dessert biscuit. Jujubes shortbread
        candy canes jelly chocolate cake. Jelly sugar plum liquorice powder
        brownie danish pastry carrot cake. Lollipop halvah tart bear claw cotton
        candy lollipop donut. Croissant gummies chocolate cake bear claw pie
        halvah. Chocolate bar sweet roll shortbread chupa chups brownie
        chocolate cake. Marzipan fruitcake jujubes sweet roll candy biscuit
        tiramisu ice cream ice cream. Gingerbread cheesecake oat cake dragée
        chocolate bar.{' '}
        <span role='img' aria-label='cupcake'>
          🧁
        </span>
        Cheesecake biscuit topping oat cake chupa chups.
        <br />
        <br />
        Cotton candy tart oat cake bear claw cheesecake topping jelly-o cotton
        candy powder. Cake jelly beans marshmallow powder toffee cheesecake.
        Jelly macaroon powder sesame snaps oat cake tart dragée.{' '}
        <span role='img' aria-label='cupcake'>
          🍪
        </span>
        Chocolate cake bear claw jujubes macaroon gummi bears marshmallow.
        Shortbread croissant cotton candy candy tiramisu jelly beans.{' '}
        <span role='img' aria-label='cupcake'>
          🍩
        </span>
        Oat cake candy danish danish chocolate bar cheesecake jelly beans
        chocolate cake. Wafer lemon drops soufflé donut gummi bears gingerbread
        gummi bears marshmallow candy. Cookie candy canes shortbread dragée bear
        claw oat cake cookie sweet dessert. Donut muffin sugar plum caramels
        carrot cake cotton candy caramels jelly-o. Soufflé soufflé{' '}
        <span role='img' aria-label='cupcake'>
          🍩
        </span>
        caramels soufflé liquorice danish. Marshmallow bonbon sugar plum halvah
        sugar plum jujubes chocolate cake. Cake liquorice bear claw cookie
        shortbread sesame snaps cheesecake cake powder. Carrot cake muffin
        tootsie roll ice cream tiramisu gingerbread. Liquorice pudding jelly-o
        danish caramels. Croissant lollipop topping chocolate dessert oat cake
        muffin jelly beans.{' '}
        <span role='img' aria-label='cupcake'>
          🍩
        </span>
        Candy canes fruitcake gummi bears candy sweet chocolate. Wafer dessert
        jelly macaroon croissant jelly apple pie tootsie roll gummies.
        <br />
        <br />
        Pastry shortbread halvah lemon drops gummi bears cotton candy pie candy.
        Carrot cake liquorice jujubes oat cake caramels. Danish cake cake
        gummies cheesecake croissant cheesecake jelly beans.{' '}
        <span role='img' aria-label='cupcake'>
          🧁
        </span>
        Jelly-o icing carrot cake powder fruitcake soufflé biscuit liquorice.
        Wafer cake sweet cake lollipop. Brownie chupa chups chocolate bar halvah
        oat cake. Brownie toffee apple pie bear claw jelly lemon drops sweet pie
        tart.{' '}
        <span role='img' aria-label='cupcake'>
          🍩
        </span>
        Macaroon topping caramels cake liquorice topping candy canes
        marshmallow. Powder muffin candy canes bonbon jelly dessert.{' '}
        <span role='img' aria-label='cupcake'>
          🧁
        </span>
        Toffee sweet roll danish bonbon wafer bear claw.
      </p>
    </>
  );
};
