import React from 'react'
import { IoLogoStencil } from "react-icons/io5";
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from '../config/firebase'
import {Link, useNavigate} from 'react-router-dom'
import {signOut} from 'firebase/auth'
import { FaUserAlt } from "react-icons/fa";
import { RiMenu3Fill } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";





function Sidebar() {

    const navigate = useNavigate()

const [nav, setNav] = React.useState(false)


const handleNav =   () => {
    setNav((prev) => !prev)
}
    


async function logOut(){
    await signOut(auth).then(() => {
        window.location.reload()
        navigate('/login')
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
    }
    
    const [user] = useAuthState(auth)
  return (
    <div className='body--tab'>
    
    
    <div className='logodiv'><div><h1 className='login--logo'> <IoLogoStencil  style={{color:'rgb(135, 126, 255)'}}/> NebulaNest</h1> </div><div className='burger--men' onClick={handleNav}> <RiMenu3Fill  style={{color:'rgb(135, 126, 255)' , fontSize:'30px', }}/></div> </div>
    {nav && <div className='nav--men'> 
        <div  className='close--div' onClick={handleNav} > <MdOutlineClose  style={{color: 'rgb(135, 126, 255)', fontSize:'30px', marginTop:'40px'} }/></div>
        <div className='log--out--nav'><button onClick={logOut}>LOG OUT</button></div>
    </div> }
        { user ? (<div className='login--logo1'>
                     
                    <div className='sidebar--profile'>
                        <div className='profile--pic'>{!user.photoURL === null ? <img src={user.photoURL} alt={`this is ${user.displayName}`} />: <div className='default--icon'><FaUserAlt style={{}} /></div>}
            
            <div className='email--profile'>
            <h2>{user.displayName}</h2>{user.email}</div></div></div>

                </div>) : <div>...Loading</div>}
            
            <div className='sidebar--links'>
                
            </div>
            <div className='log--out'><button onClick={logOut}>Logout</button></div>
        
        </div>
  )
}

export default Sidebar