import React, { useState, useEffect } from 'react';
import ThoughtsList from './ThoughtsList';
import ThoughtForm from './ThoughtForm';


export const Fromapp = () => {
  const [counter, setCounter] = useState(0);
  const [newThought, setNewThought] = useState('');
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(false);
  

  // USING:https://project-happy-thoughts-api-lsdubteuzq-lz.a.run.app/
  // latest google deploy but broke the code: https://project-happy-thoughts-api-lsdubteuzq-lz.a.run.app/
  
  const fetchData = () => {
    setLoading(true);
    fetch('https://project-happy-thoughts-api-lsdubteuzq-lz.a.run.app/thoughts')
   //fetch('https://project-auth-lsdubteuzq-lz.a.run.app/thoughts') 
      .then((response) => response.json())
      .then((Data) => setThoughts(Data)) 
      .catch((error) => console.error(error))
      .then(console.log('works'))
      .finally(() => setLoading(false));
  }
  
  useEffect(() => {
    fetchData();
  }, []); 

  // will trigger first when app starts, and every time the variable in the dependency array changes
  useEffect(() => {
    //window.alert(`the current counter is ${counter}`);
    }, [counter]);
  
  const onNewThoughtChange = (event) => {
    setNewThought(event.target.value);
  }

const handleHeartCounter = (_id) => {
  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json',},
  };
 
  //fetch(`https://project-happy-thoughts-api-lsdubteuzq-lz.a.run.app/thoughts/${_id}/like`, options)
  fetch (`https://project-auth-lsdubteuzq-lz.a.run.app/thoughts/${_id}/like`, options) 
    then((response) => response.json())
    .finally(() => fetchThought(data));
};

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const options = {
      method: 'POST',
      body: JSON.stringify
      ({message: newThought }),
      headers: {'Content-Type': 'application/json'}
    }

    
    setLoading(true);
    fetch('https://project-happy-thoughts-api-lsdubteuzq-lz.a.run.app/thoughts', options)
    //fetch ('https://project-auth-lsdubteuzq-lz.a.run.app/thoughts', options) 
      .then((response) => response.json())
      .then(() => fetchData())
      .catch((error) => console.error(error))
      .finally(() => setNewThought(''));
    }
  if (loading) {
  return <p>THE PAGE IS LOADING</p> 
}

  return (
    <section className="section">
    <h2 className="header">Share happiness with happy thought!❤️</h2>
   
      <ThoughtForm
        newThought={newThought}
        handleFormSubmit={handleFormSubmit}
        onNewThoughtChange={onNewThoughtChange}/>
      
      <ThoughtsList
      thoughts={thoughts}
      setThoughts={setThoughts}
      handleHeartCounter={handleHeartCounter}/>
    </section>
    
  );
  }