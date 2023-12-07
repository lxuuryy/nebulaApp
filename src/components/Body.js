
import React from 'react'
import Post from './Post'
import {db, auth, storage} from '../config/firebase'
import {ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import {motion} from 'framer-motion'


 
export default function Body() {

    const [user] = useAuthState(auth)
    
   
    
   
    const [file, setFile] = React.useState("");
 
    // progress
    
 
    // Handle file upload event and update state
    function handleChanges(event) {
        setFile(event.target.files[0]);
    }
    const handleUpload = () => {
        const storageRef = ref(storage, `/files/${file.name}`);
    
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
        "state_changed",
        (snapshot) => {
            const percent = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setPercent(percent);
        },
        async (err) => {
            console.log(err);
        },
        async () => {
            try {
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                console.log(url);

                // Check if the string contains the word "undefined"
                const hasUndefined = /undefined/.test(url);

                await addDoc(postRef, {
                    description: form.post,
                    username: user.displayName,
                    uid: user.uid,
                    profile: user.photoURL,
                    createdAt: serverTimestamp(),
                    imageURL: hasUndefined ? null : url,
                });

                

                setForm({
                    post: '',
                });

                window.location.reload()
               
            } catch (error) {
                console.error('Error getting download URL:', error);

                // If there's an error (e.g., no image), add the document without imageURL
                
            }
        }
    );
};

                    
    const [percent, setPercent] = React.useState(0);


    
     
    
    
    const [post, setPost] = React.useState(false)

    const [form, setForm ] = React.useState({
        post: ''
    })


   

    const handleChange = (event) => {
        const {name, type, value, checked} = event.target
       
            setForm((prevForm) => ({
              ...prevForm,
              [name]: type === 'checkbox' ? checked : value,
        
    }))
        };







    

    const newPost = () => {
        setPost((prev) => !prev)
    }

    const postRef =  collection(db, 'posts')

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        
        handleUpload()
    
          
          
          newPost();
        
          
          
         
          
        
      };

  return (
    <div className='body--tab post'>
        <div className='feed--header'><h1 className='feed--header'>Home Feed</h1>  </div>
        <div>
            { !post && <div className='add--button'><button onClick={newPost}>CREATE A NEW POST</button></div>}
            { post &&
             <div className='post---div'>
               
               {post && <button onClick={newPost}>CANCLE</button>}
                <form onSubmit={handleSubmit}>
                    
                    <textarea
                    onChange={handleChange}
                    placeholder="What's Happening?"
                    name='post' 
                    value={form.post}/>
                    
                    <input
                    type='file'
                    onChange={handleChanges}
                    accept="/image/*"
                    />
                    <button>POST</button> 
                    
                </form>
                

                </div>}
                
        </div>
        {percent > 1 && <p> {percent} %</p>}
        <div><Post percent={percent}/></div>

    </div>
  )
            }