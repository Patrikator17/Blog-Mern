import React, { useEffect, useState } from 'react'
import { Avatar, Button, Dropdown, Navbar, NavbarCollapse, TextInput } from 'flowbite-react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon, FaSun} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice'
import { signoutSuccess } from '../redux/user/userSlice'

const Header = () => {

    const path = useLocation().pathname;
    const {currentUser} = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const {theme} = useSelector((state) => state.theme)
    const[searchTerm, setSearchTerm] =useState('')
    const location = useLocation()
    // console.log(searchTerm);
    const navigate = useNavigate()


    const handleSignout = async() => {
        console.log('Attempting signout...')
        try{
          const res = await fetch(`/api/user/signout`, {
            method: 'POST',
          });
          const data = await res.json()
          if(!res.ok){
            // console.log(data.message);
            throw new Error(`Signout failed with status ${res.status}`);
          }else{
            dispatch(signoutSuccess())
          }
          
        }catch(error){
          console.log('Signout error message : ',error.message);
        }
      }

      useEffect(() =>{
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm')
        if(searchTermFromUrl){
            setSearchTerm(searchTermFromUrl)
        }


      },[location.search])

      const handleSubmit = async(e)=>{
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search)
        urlParams.set('searchTerm', searchTerm)
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`)
      }

  return (
    <Navbar className='border-b-2 border-gray-300' >
        {/* <Link to='/' className='self-center whitespace-nowrap text-sm 
            sm:text-xl font-semibold dark:text-white'>
            <span className='px-2 py-1  bg-gradient-to-r from-blue-400 to-purple-600
             hover:from-pink-500 hover:to-yellow-500 text-white rounded-xl'>Pratik's</span>
           &nbsp; Blog
        </Link> */}

        <Link to='/' className='flex items-center'>
        <span className='text-2xl sm:text-3xl font-bold dark:text-white'>
            Pratik's
        </span>
        <span className='px-2 py-1 ml-2 bg-gradient-to-r from-blue-400 to-purple-600
            hover:from-pink-500 hover:to-purple-500 text-white rounded-full'>
            Blog
        </span>
        </Link>

        <form onSubmit={handleSubmit}> 
            <TextInput
                type='text'
                placeholder='Search...'
                rightIcon={AiOutlineSearch}
                className='hidden lg:inline'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}

             />
        </form>

        <Button className='w-12 h-10 lg:hidden' color='gray' pill>
            <AiOutlineSearch />
        </Button>

        <div className='flex gap-2 md:order-2'>

            <Button 
                 className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={() => dispatch(toggleTheme())}>
                    {theme === 'light' ?<FaSun /> : <FaMoon />}
                 {/* <FaMoon  /> */}
            </Button>

            {currentUser ? (
                <Dropdown 
                    arrowIcon={false} 
                    inline
                    label={
                        <Avatar
                            alt='user'
                            img={currentUser.profilePicture}
                            rounded
                        />
                    }
                >
                    <Dropdown.Header>
                        <span className='block text-sm'>@{currentUser.username}</span>
                        <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
                        
                    </Dropdown.Header>
                    <Link to={'/dashboard?tab=profile'}>
                        <Dropdown.Item>Profile</Dropdown.Item>
                    </Link>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleSignout}>Signout</Dropdown.Item>
                </Dropdown>
            ):
            (
                <Link to='/login'>
                    <Button gradientDuoTone='purpleToBlue' outline>
                        Login
                    </Button>
                </Link>
                
            )}

            <Navbar.Toggle />
        </div>
        <NavbarCollapse>
                <Navbar.Link active={path === '/'} as={'div'}>
                    <Link to='/'>
                        Home
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/about'} as={'div'}>
                    <Link to='/about'>
                        About
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/project'} as={'div'}>
                    <Link to='/project'>
                        Projects
                    </Link>
                </Navbar.Link>
        </NavbarCollapse>
    </Navbar>
  )
}

export default Header