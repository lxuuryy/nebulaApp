import React from 'react'
import { IoLogoStencil } from "react-icons/io5";
import { FaGoogle } from "react-icons/fa6";
import {Link, useNavigate} from 'react-router-dom'
import {auth, GoogleProvider, db} from '../config/firebase'
import {  signInWithEmailAndPassword,  signInWithPopup } from "firebase/auth";
import {addDoc, collection, getDocs, query, where} from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth';
import {motion} from 'framer-motion'




export default function Login (){

    const navigate = useNavigate()

    const userRef = collection(db, 'users')
    const [user] = useAuthState(auth)

    

    const googleSignIn = async () => {
        try {

            const result = await signInWithPopup(auth, GoogleProvider)

            const user = result.user;
            const userExists = await checkIfUserExists(user.uid);

        if (!userExists) {
            // User doesn't exist, add them to the database
            await addDoc(userRef, {
                name: user.displayName,
                verified: user.email,
                image: user.photoURL,
                uid: user.uid
            });
            
                navigate('/')
            
        }

        if (userExists){
            navigate('/')
        }

        navigate('/')
        } catch(error){
            console.log(error)
        }
        
    }

    async function checkIfUserExists(uid) {
        const querySnapshot = await getDocs(query(userRef, where('uid', '==', uid)));
        return !querySnapshot.empty;
    }

const  signIn = async (event ) => {

    event.preventDefault()

    try {
    const data = await signInWithEmailAndPassword(auth, userCred.email, userCred.password)

    

    if (auth?.currentUser?.uid){
        navigate('/')
    }

    console.log(data)
    

    } catch(error) {
        console.log(error)
    }
  
}


    const [userCred, setUserCred] = React.useState({
        email: '',
        password: ''
    })

    function handleChange(event){
        event.preventDefault()

        const { type, value, checked, name} = event.target
        setUserCred((prev) => {
            return {
                ...prev,
              [name] :  type === 'checkbox' ? checked : value
            }
        })

    }

    return (
        <div className='login--con1'>
        <div className='login--div'>
            <div className='cred--con'>
                <div className='login--logo'>
                    <h1> <IoLogoStencil style={{color:'rgb(135, 126, 255)'}} /> NebulaNest</h1> 
                </div>
                <div className='login--header'>
                    <h2>Log in to your account</h2>
                    <p>Welcome back! please enter your details.</p>
                </div>
                <div >
                    <form className='login--form--div' onSubmit={signIn}>
                    <label>Email</label>
                    <input 
                    type='text'
                    name='email'
                    value={userCred.email}
                    onChange={handleChange} 
                    />
                    <label>Password</label>
                    <input 
                    type='password'
                    name='password'
                    value={userCred.password}
                    onChange={handleChange}
                    />
                    <button>Log In</button>
                    
                    

                </form>
                <button className='first--page' onClick={googleSignIn}> < FaGoogle /> GOOGLE</button>
                    <div className='user--button'> Dont have an account ? <Link  className='login--link' to='/register'>SIGN UP</Link> </div>
                </div>
                
            </div>
            <div className='user--image'>
                <img src='/images/appImage.jpg' alt='my--login--page' />
            </div>
        </div>
        </div>
    )
}