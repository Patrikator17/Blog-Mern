import { Sidebar } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import {HiArrowSmRight, HiDocumentText, HiUser, HiOutlineUserGroup, HiChartPie} from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signoutSuccess } from '../redux/user/userSlice'

const DashSidebar = () => {

    const dispatch = useDispatch()
    
    const location = useLocation()

    const [tab, setTab] = useState('')
    const {currentUser} = useSelector((state) => state.user)


    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab')
        // console.log(tabFromUrl);
    
    if(tabFromUrl){ 
      setTab(tabFromUrl)
    } // to show dahboard only if profile is needed to display
  }, [location.search])//why search

  const handleSignout = async() => {
    try{
      const res = await fetch('api/user/signout', {
        method: 'POST',
      });
      const data = await res.json()
      if(!res.ok){
        console.log(data.message);
      }else{
        dispatch(signoutSuccess())
      }
      
    }catch(error){
      console.log(error.message);
    }
  }


  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup className='flex flex-col gap-1'>

            {
                  currentUser.isAdmin && 

                  <Link to='/dashboard?tab=dashboard'>
                      <Sidebar.Item 
                      active={tab==='dashboard'} //active when tab = posts
                      icon={HiChartPie} 
                      as='div'>   
                      {/* as div to avoid link anchor rtag error */}
                          Dashboard
                      </Sidebar.Item>
                  </Link>
            }


                <Link to='/dashboard?tab=profile'>
                    <Sidebar.Item 
                    active={tab==='profile'} 
                    icon={HiUser} 
                    label={currentUser.isAdmin ? 'Admin' : 'User'} 
                    labelColor='dark'
                    as='div'>   
                    {/* as div to avoid link anchor rtag error */}
                        Profile
                    </Sidebar.Item>
                </Link>


                {
                  currentUser.isAdmin && 

                  <Link to='/dashboard?tab=posts'>
                      <Sidebar.Item 
                      active={tab==='posts'} //active when tab = posts
                      icon={HiDocumentText} 
                      as='div'>   
                      {/* as div to avoid link anchor rtag error */}
                          Posts
                      </Sidebar.Item>
                  </Link>
                }


                {
                  currentUser.isAdmin && 

                  <Link to='/dashboard?tab=users'>
                      <Sidebar.Item 
                      active={tab==='users'} //active when tab = posts
                      icon={HiOutlineUserGroup} 
                      as='div'>   
                      {/* as div to avoid link anchor rtag error */}
                          Users
                      </Sidebar.Item>
                  </Link>
                }

                <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignout}>
                    Signout 
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar