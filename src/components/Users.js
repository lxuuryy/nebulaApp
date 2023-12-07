import React from 'react'
import {db} from  '../config/firebase'
import {getDocs, collection} from  'firebase/firestore'
import { FaUserAlt } from "react-icons/fa";


function Users() {

    const [users, setUsers] = React.useState([])

    const userRef = collection(db, 'users')

    React.useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(userRef)
            const allData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }))

            setUsers(allData)
        }
        getUsers()
    }, [])

  return (
    <div className='body--tab post'>
        <div className='feed--header'><h1>Users</h1></div>
        <div  className='users--tab'>
            {users ? users.map((item) => (
                <div className='users--item' key={item.id}>
                    <div>{item.name}</div>
                    <div className='email--tag'>{item.verified}</div>

                    {item.image === null ? <div className='users--default--icon'> <FaUserAlt style={{ fontSize: '20'}}/> </div> : <div className='users--default--icon'> <img className='users--img' src={item.image} alt={item.name} /></div>}
                </div>
            )) : <p>...Loading</p>}
            </div>
        </div>

  )
}

export default Users