import React from 'react'
import {db, auth} from '../config/firebase'
import {getDocs, collection, query, orderBy, addDoc, where, deleteDoc, doc} from 'firebase/firestore'
import { IoIosHeart } from "react-icons/io";
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaRegTrashCan } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import {motion} from 'framer-motion'






export default  function Post({hasUndefined}) {

    const[user] = useAuthState(auth)

const [feed, setFeed] =  React.useState([])

const [likes, setLikes] = React.useState({})

const likesRef = collection(db, 'likes')
const [canDelete, setCanDelete] = React.useState(false)



const likeAmout = (item) =>  query(likesRef, where('postId', '==', item.id))


const feedList = collection(db, 'posts')
 
const q = query(feedList, orderBy('createdAt', 'desc')) 



const getLikes = async (item) => {
    try {
      const data = await getDocs(likeAmout(item));
      const likeCount = data.docs.length;
      setLikes((prevLikes) => ({ ...prevLikes, [item.id]: likeCount }));
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  };





const getPosts = async () => {
    const data = await getDocs(q)
    const filterData = data.docs.map((doc)=> ({
        ...doc.data(),
        id: doc.id
    }))

    setFeed(filterData)
    filterData.forEach((item) => getLikes(item));

    

}


React.useEffect(() => {
    const fetchData = async () => {
        await getPosts();
       
    
    };
    fetchData();
    

    
  }, []);



const addLikes = async (item) => {
    
    await addDoc(likesRef, {
        uid: user.uid,
        postId: item.id

    })
    await getLikes(item)
    setCanDelete(true)

    
}


const deleteLike = async (item) => {
    try {
        // Query to find the like record of the current user for the specific post
        const likeQuery = query(likesRef, where('postId', '==', item.id, '&&', 'uid', '==', user.uid));
    
        // Get the like record
        const querySnapshot = await getDocs(likeQuery);
        if (!querySnapshot.empty) {
          // If a like record is found, delete it
          const likeDoc = querySnapshot.docs[0];
          await deleteDoc(likeDoc.ref);
    
          // Update the like count for the post
          getLikes(item);
        }
    
        // Set canDelete to false after deleting the like
        setCanDelete(false);
      } catch (error) {
        console.error('Error deleting like:', error);
      }
    };

    const deletePost = async (item) => {
        const removePost = doc(db, 'posts', item.id)
        await deleteDoc(removePost)
    
        setFeed((prev) => prev.filter((post) => post.id !== item.id));
    
     }



  return (
    <div className='feed--container'>
        <div className='feed--list'>
            {feed ? feed.map((item) => (
            <motion.div 
            initial={{scale:0.4}}
            transition={{duration: 0.7, delay: item.id * 0.1}}
            whileInView={{scale: 1}}
            key={item.id} className='post--item' onClick={() => console.log(item.id)}>
                { item.imageURL === null ? <div className='post--pic default'> <FaUserAlt /></div> :<div className='post--pic'><img src={item.profile} alt={`user is ${item.username}`} /> </div>}
                <div>
                <div className='username--div'>  {item.username}<span>{item.createdAt.toDate().toLocaleString()}</span> {item.uid === user.uid && <div onClick={() => deletePost(item)} className='delete--button'> <FaRegTrashCan  style={{ fontSize:'20px'}}/> </div>}</div>
                {item.imageURL && <div className='post--content'><img src={ item.imageURL} alt={item.imageURL} /></div>}
                <div className='description--div'>{item.description}</div>
                {!canDelete && item.id ? <div onClick={() => addLikes(item)}className='like--con'>  <IoIosHeart style={{ color:"rgb(135, 126, 255)", fontSize:'22px'}}/> {likes?.[item.id]}</div>:  <div onClick={() => deleteLike(item)}className='like--con'>  <IoIosHeart style={{ color:"rgb(135, 126, 255)", fontSize:'22px'}}/> {likes?.[item.id]}</div>}
                </div>
            </motion.div>)) : <p>..Loading</p>}

             
        
    </div>
    </div>
  )
}