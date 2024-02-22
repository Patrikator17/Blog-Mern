import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'
import DashSidebar from '../components/DashSidebar'
import DashProfile from '../components/DashProfile'

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

        {/* Profile */}
        {tab === 'profile' && <DashProfile />}

    </div>
    </>
  )
}

export default Dashboard