import { Button, Modal, Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import {useSelector} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faTrash } from '@fortawesome/free-solid-svg-icons';

const DashUsers = () => {

    const{currentUser} = useSelector((state) => state.user) 
    const [showModal, setShowModal] = useState(false)
    const [data, setData] = useState({users: []})
    const [userIdToDelete, setUserIdToDelete] = useState('')
    

    useEffect(() => {
        const fetchUsers = async() => {
            try{
                const res = await fetch(`/api/user/get-users`)
                const data = await res.json()
                console.log('Fetched data :', data);
                setData(data)
            }catch(error){
                console.log(error);
            }
        }
        fetchUsers()
    },[])

    const handleDeleteUser = async() => {
        try{
            const res = await fetch(`/api/user/delete/${userIdToDelete}`,{
                method: 'DELETE',
            })
            const data = await res.json()
            if(res.ok){
                // setData((prev) => prev.filter((user) => user._id !== userIdToDelete))
                setData((prev) => ({ ...prev, users: prev.users.filter((user) => user._id !== userIdToDelete) }));

                setShowModal(false)
            }else{
                console.log(data.message);
            }
        }catch(error){
            console.log(error.message);
        }
    }

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 
    dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>

      {currentUser.isAdmin  ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date Created</Table.HeadCell>
              <Table.HeadCell>Image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>

            <Table.Body>
                {
                    data.users.map((user, index) => (
                        <Table.Row key={`$${user._id}=${index}`}>
                            <Table.Cell>{new Date(user.createdAt).toLocaleString()}</Table.Cell>
                            <Table.Cell>
                                <img src={user.profilePicture} alt={`Profile of ${user.username}`} className='w-8 h-8 rounded-full' />
                            </Table.Cell>
                            <Table.Cell>{user.username}</Table.Cell>
                            <Table.Cell>
                                {
                                    user.isAdmin ? <FontAwesomeIcon icon={faCheckCircle} color="green" /> : 
                                    <FontAwesomeIcon icon={faTimesCircle} color="red" />
                                }</Table.Cell>
                            <Table.Cell>
                                <FontAwesomeIcon icon={faTrash} color="#d2691e" onClick={() => {
                                    setShowModal(true);
                                    setUserIdToDelete(user._id)
                                }} />
                            </Table.Cell>
                        </Table.Row>
                    ))
                }
            </Table.Body>
            
          </Table>

          
        </>
      ) : (
        <p>You have no posts yet</p>
      )}

      <Modal 
        show={showModal} 
        onClose={() => setShowModal(false)} 
        popup 
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200
            mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-600 dark:text-gray-400'>
              Are you sure you want to delete this post?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteUser} >
                Yes I'm sure
              </Button>
              <Button onClick={() => setShowModal(false)}>
                No Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal> 
    </div>
  )
}

export default DashUsers