import React from 'react'
import { IoLogoStencil } from "react-icons/io5";
import {auth, GoogleProvider, db} from '../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile} from 'firebase/auth'
import {collection, addDoc, query, where, getDocs} from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaGoogle } from "react-icons/fa6";

import {Link,  useNavigate} from 'react-router-dom'




export default function Register (){

    

    

    const [user] = useAuthState(auth)

    const navigate = useNavigate()

    const userRef = collection(db, 'users')

    async function googleSignIn(){

        try {
            
           const result  =  await signInWithPopup(auth, GoogleProvider)
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
            
            
            
            
        if(userExists){
            navigate('/')
        }
                
            

            
        } catch(error){
            console.log(error)
        }
       
  
    }

    async function checkIfUserExists(uid) {
        const querySnapshot = await getDocs(query(userRef, where('uid', '==', uid)));
        return !querySnapshot.empty;
    }

   

    async function createUser( event){
        event.preventDefault()
        try {

            const data = await createUserWithEmailAndPassword(auth, userCred.email, userCred.password, userCred.name, userCred.username)
            const user = data.user;
    
            const userExists = await checkIfUserExists(user.uid)

                if(!userExists){
                    await addDoc(userRef, {
                        name: userCred.name,
                        verified: userCred.email,
                        image: user.photoURL,
                        uid: user.uid
                    })

                    navigate('/')
                }   
            
            await updateProfile(user, {
                displayName: userCred.name,
                photoURL: null
            })


               
                navigate("/")
                
             
           

        } catch (error){
            console.log(error)
        }
        

    }

    const [userCred, setUserCred] = React.useState({
        name:'',
        username:'',
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
        <div className='login--con'>
        <div className='login--div'>
            <div className='cred--con'>
                <div className='login--logo'>
                    <h1> <IoLogoStencil style={{color:'rgb(135, 126, 255)'}} /> NebulaNest</h1> 
                </div>
                <div className='login--header'>
                    <h2>Create a new account</h2>
                    <p>To use NebulaNest, Please enter your details.</p>
                </div>
                <div >
                    <form className='login--form--div' onSubmit={createUser}>
                    <label>Name</label>
                    <input 
                    type='text'
                    name='name'
                    value={userCred.name}
                    onChange={handleChange} 
                    />
                    <label>Username</label>
                    <input 
                    type='text'
                    name='username'
                    value={userCred.username}
                    onChange={handleChange} 
                    />
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
                    <button className='first--page'onClick={googleSignIn}> <FaGoogle /> GOOGLE</button>
                    <div className='user--button'> Already have an account ? <Link  className='login--link' to='/login'>LOG IN</Link> </div>
                </div>
                
            </div>
            <div className='user--image'>
                <img src='/images/appImage.jpg' alt='my--login--page' />
            </div>
        </div>
        </div>
    )
}