import React, {useContext, useState, useEffect} from 'react';
import {auth} from '../firebase';


const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}


export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()

//if do not want to use firebase just change this line to log to another server
function signin(email,password){
    return auth.signInWithEmailAndPassword(email,password)
}

//if do not want to use firebase just change this line to log to another server
//use in the signup form make sure works successfully if an error and redirect to the correct page
function signup (email,password){
    return auth.createUserWithEmailAndPassword(email,password)
    }

function logout (){
    return auth.signOut()
}

//set the user from firebase every time signup function is called
//in useeffect, has to run just once when the component run
useEffect(()=>{

//make sure unsubscribe when is done. func unsubscribe returns a method that unsubscribe when the method is called the on off state changed event
   const unsubscribe = auth.onAuthStateChanged(user=>{
        setCurrentUser(user)
    })
//unsubscribe when the method is unmounted
    return unsubscribe
},[])

const value = {
    currentUser,
    signin,
    signup,
    logout
}
return (
    <AuthContext.Provider value = {value}>
        {children}
    </AuthContext.Provider>
)
}
