import React from 'react'
import { Button, Navbar, NavbarCollapse, TextInput } from 'flowbite-react'
import {Link, useLocation} from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon} from 'react-icons/fa'

const Header = () => {

    const path = useLocation().pathname;

  return (
    <Navbar className='border-b-2' >
        <Link to='/' className='self-center whitespace-nowrap text-sm 
            sm:text-xl font-semibold dark:text-white'>
            <span className='px-2 py-1  bg-gradient-to-r from-blue-400 to-purple-600
             hover:from-pink-500 hover:to-yellow-500 text-white rounded-xl'>Pratik's </span>
            Blog
        </Link>

        <form>
            <TextInput
                type='text'
                placeholder='Search...'
                rightIcon={AiOutlineSearch}

             />
        </form>

        <Button className='w-12 h-10 lg:hidden' color='gray' pill>
            <AiOutlineSearch />
        </Button>

        <div className='flex gap-2 md:order-2'>
            <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
                <FaMoon  />
            </Button>

            <Link to='/login'>
                <Button gradientDuoTone='purpleToBlue' outline>
                    Login
                </Button>
            </Link>
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