import React from 'react'
import {Footer} from 'flowbite-react'
import { Link } from 'react-router-dom'
import { BsFacebook, BsGithub, BsInstagram, BsLinkedin, BsTwitter} from 'react-icons/bs'

const FooterComponent = () => {
  return (
    <Footer className='border border-t-4 border-r-indigo-300  border-blue-900'>
        <div className='w-full max-w-7xl mx-auto'>
            <div className='grid w-full justify-between sm:flex md: grid-cols-1'>
                <div className='mt-5'>
                {/* Logo */}
                  <Link to='/' className='self-center whitespace-nowrap text-sm 
                    sm:text-xl font-semibold dark:text-white'>
                    <span className='px-2 py-1  bg-gradient-to-r from-blue-400 to-purple-600
                    hover:from-pink-500 hover:to-yellow-500 text-white rounded-xl'>Pratik's</span>
                      &nbsp; Blog
                  </Link>
                </div>

                <div className='grid grid-cols-2 gap-8 sm: mt-4 sm:grid-cols-3 sm:gap-6'>
                  <div>
                    <Footer.Title title='About' />
                    <Footer.LinkGroup col>
                      <Footer.Link 
                      href='https://www.google.com'
                      target='_blank'
                      rel='noopener noreferer'
                      >
                        Domain Summary
                      </Footer.Link>

                      <Footer.Link 
                      href='https://www.google.com'
                      target='_blank'
                      rel='noopener noreferer'
                      >
                        Resume
                      </Footer.Link>
                    </Footer.LinkGroup>
 
                  </div>
                  <div>
                    <Footer.Title title='Follow Us' />
                    <Footer.LinkGroup col>
                      <Footer.Link 
                      href='https://www.google.com'
                      target='_blank'
                      rel='noopener noreferer'
                      >
                        Github
                      </Footer.Link>

                      <Footer.Link 
                      href='https://www.google.com'
                      target='_blank'
                      rel='noopener noreferer'
                      >
                        Linkedin
                      </Footer.Link>
                    </Footer.LinkGroup>
 
                  </div>
                  <div>
                    <Footer.Title title='Legal' />
                    <Footer.LinkGroup col>
                      <Footer.Link 
                      href='https://www.google.com'
                      target='_blank'
                      rel='noopener noreferer'
                      >
                        Privacy Policy
                      </Footer.Link>

                      <Footer.Link 
                      href='https://www.google.com'
                      target='_blank'
                      rel='noopener noreferer'
                      >
                        Terms and Conditions
                      </Footer.Link>
                    </Footer.LinkGroup>
 
                  </div>


                </div>
            </div>
            <Footer.Divider />
            <div className='w-full sm:flex sm:items-center sm:justify-between'> 
              <Footer.Copyright href='#' by='Pratik Patkar' year={new Date().getUTCFullYear()}/>
            

              <div className='flex gap-6 sm:mt-0 mt-4 mb-4 sm:justify-center'>
                <Footer.Icon href='#' icon={BsFacebook}/>
                <Footer.Icon href='#' icon={BsInstagram}/>
                <Footer.Icon href='#' icon={BsTwitter}/>
                <Footer.Icon href='#' icon={BsGithub}/>
                <Footer.Icon href='#' icon={BsLinkedin}/>
              </div>
            </div>
        </div>
    </Footer>
  )
}

export default FooterComponent