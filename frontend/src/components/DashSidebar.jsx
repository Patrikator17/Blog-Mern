import { Sidebar } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import {HiArrowSmRight, HiUser} from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom'

const DashSidebar = () => {
    
    const location = useLocation()

    const [tab, setTab] = useState('')
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab')
        // console.log(tabFromUrl);
    
    if(tabFromUrl){ 
      setTab(tabFromUrl)
    } // to show dahboard only if profile is needed to display
  }, [location.search])//why search



  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Link to='/dashboard?tab=profile'>
                    <Sidebar.Item 
                    active={tab==='profile'} 
                    icon={HiUser} 
                    label={'User'} 
                    labelColor='dark'
                    as='div'>   
                    {/* as div to avoid link anchor rtag error */}
                        Profile
                    </Sidebar.Item>
                </Link>

                <Sidebar.Item  icon={HiArrowSmRight} className='cursor-pointer'>
                    Signout
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar