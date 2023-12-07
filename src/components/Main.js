import React from 'react'
import Sidebar from './Sidebar'
import Body from './Body'
import Users from './Users.js'
import { onAuthStateChanged, getAuth} from 'firebase/auth'

import {useAuthState} from 'react-firebase-hooks/auth'

import {auth} from '../config/firebase'
import { useNavigate} from 'react-router-dom';

export default function Main (){

    

    const [name, setName] = React.useState(null)
    const [userName, setUserName] =  React.useState(null)


    const [user] = useAuthState(auth)



  
    React.useEffect(() => {

    

    
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setName(user.email)
        setUserName(user.displayName)
        
        // ...
      }
    })
   
}, [auth?.currentUser?.uid])
   
    
   function handleClick(){
    console.log(user)
   }

    


   

    const navigate = useNavigate()

    

 
        return (
            <div>
                {user ? (
                <div className='main--components'>
                    <Sidebar />
                    <Body />
                    <Users />

                </div>)
            :
            navigate('/login')}
            </div>
        )
}