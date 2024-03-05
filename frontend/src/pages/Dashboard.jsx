import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'
import DashSidebar from '../components/DashSidebar'
import DashProfile from '../components/DashProfile'
import DashPost from '../components/DashPost'
import DashUsers from '../components/DashUsers'
import DashComments from '../components/DashComments'
import DashboardComponent from '../components/DashboardComponent'

const Dashboard = () => {

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
    <>
    <div className='min-h-screen flex flex-col md:flex-row'>
      {/* Sidebar */}
        <div className='md:w-56'>
          <DashSidebar />
        </div>

        {/* Dashboard */}
        {tab === 'dashboard' && <DashboardComponent />}

        {/* Profile */}
        {tab === 'profile' && <DashProfile />}

        {/* Posts */}
        {tab === 'posts' && <DashPost />}

        {/* Users */}
        {tab === 'users' && <DashUsers />}

        {/* Comments */}
        {tab === 'comments' && <DashComments />}

    </div>
    </>
  )
}

export default Dashboard