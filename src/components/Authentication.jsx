import React, { useState } from 'react'
import LoginComponent from './LoginComponent';
import RegisterComponent from './RegisterComponent';
import { supabase } from './client';

const Authentication = ({changeStateApp}) => {
  const [isSignIn, setIsSignIn] = useState(true);

  const changeState = () => {
    setIsSignIn(!isSignIn)
  }

  async function signUp(userName, email, password) {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: { userName },
      },
    });

    if (error) {
      alert("Error SignUp User: " + error.message);
      return null;
    } else {
      alert("Check your email for verification!");
      return data.user;
    }
  }

  async function signIn(identifier, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: identifier,  
      password: password,
    });

    if (error) {
      alert("Error SignIn User: " + error.message);
      return null;
    } else {
      alert("Sign in successful! 🎉");
      changeStateApp(data.user)
    }
  }

  return (
    isSignIn 
      ? (<LoginComponent changeState={changeState} signIn={signIn} />) 
      : (<RegisterComponent changeState={changeState} signUp={signUp} />)
  )
}

export default Authentication
