// import React, { useEffect } from 'react';
// import { useSelector, useDispatch, batch } from 'react-redux';
// import { useHistory, Link } from 'react-router-dom';

// import { API_URL } from '../reusables/urls';

// import thoughts from '../reducers/thoughts';

// const Main = () => {
//     const accessToken = useSelector(store => store.user.accessToken);
//     const thoughtsItems = useSelector(store => store.thoughts.items);

//     const dispatch = useDispatch();
//     const history = useHistory();

//     useEffect(() => {
//         if (!accessToken) {
//             history.push('/login');
//         }
//     }, [accessToken, history]);

//     useEffect(() => {
//         const options = {
//             method: 'GET',
//             headers: {
//                 Authorization: accessToken
//             }
//         }

//         fetch(API_URL('thoughts'), options)
//             .then(res => res.json())
//             .then(data => {
//                 if (data.success) {
//                     batch(() => {
//                         dispatch(thoughts.actions.setThoughts(data.thoughts));
//                         dispatch(thoughts.actions.setErrors(null));
//                     });
//                 } else {
//                     dispatch(thoughts.actions.setErrors(data));
//                 }
//             });
//     }, [accessToken]);

//     console.log(thoughtsItems)
//     return (
//         <div>
//             <div>MAIN</div>
//             <Link to="/login">To login we go!</Link>
//             {thoughtsItems.map(thought => (
//                 <div key={thought._id}>{thought.message}</div>
//             ))}
//         </div>
//     );
// };

// export default Main


import React from 'react'


const Main = () => {

  return(
    <div>
      <h1>A secret?</h1>
      <p>"Grace Hopper was the first person to create a compiler for a programming language and one of the first programmers of the Harvard Mark I computer, an electro-mechanical computer based on Analytical Engine. Hopper's work with computers started in 1943, when she started working at the Bureau of Ordnance's Computation Project at Harvard where she programmed the Harvard Mark I. Hopper not only programmed the computer, but created a 500-page comprehensive manual for it.Even though Hopper created the manual, which was widely cited and published, she was not specifically credited in it.Hopper is often credited with the coining of the term "bug" and "debugging" when a moth caused the Mark II to malfunction.While a moth was found and the process of removing it called "debugging," the terms were already part of the language of programmers"./Wikipedia</p>
    </div>
  )
}

export default Main;