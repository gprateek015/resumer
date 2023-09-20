'use client';

import React, { useState } from 'react'
import "./style.scss"
import SideBar from '@/components/sidebar/SideBar'
import { Button, Grid } from '@mui/material'
import user from "@/assets/icons/user.svg"
import Image from 'next/image'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import profile from "@/assets/profile.png";
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import SchoolIcon from '@mui/icons-material/School';


const page = () => {


  const [first, setFirst] = useState(false);
  const [second, setSecond] = useState(false);
  const [third, setThird] = useState(false);


  return (
    <>
      <div className='workHome'>
        <SideBar />
        <div className='workContainer'>

          <div className='title'>
            <section className='leftSection'>Title : <span>user135_cv</span></section>
            <section className='rightSection'><Button className='downloadBt' variant='contained'>Download</Button></section>
          </div>

          <div className='innerGrid'>

            <div className='leftGrid'>


              {/* //-------------------------------- first service ----------------------------------------// */}
              <div className='serviceFirst'>
                <div className='serviceTop' onClick={() => setFirst(!first)}> <Image className='iconClass' src={user} alt='' /> Personal Overview <KeyboardArrowDownIcon className='arrow' /> </div>
                {first && <div className='serviceData'>
                  <div className='basicDetails'>
                    <div className='imageContainer'>
                      <Image alt='' src={profile} className='profile' />
                    </div>

                    <div className='basicTop'>

                      <div className='inpGrid'>
                        <div>
                          <label htmlFor="fname">First Name</label>
                          <input type="text" name="" id="fname" />
                        </div>
                        <div>
                          <label htmlFor="lname">Last Name</label>
                          <input type="text" name="" id="lname" />
                        </div>
                      </div>

                      <div className='inputTag'>
                        <label htmlFor="phone">Phone Number</label>
                        <input type="text" id='phone' />
                      </div>

                      <div className='inputTag'>
                        <label htmlFor="email">Email</label>
                        <input type="text" id='email' />
                      </div>
                    </div>
                  </div>

                  <div className='basicBottom'>
                    <div className='inpGrid'>
                      <div>
                        <label htmlFor="fname">Date of birth</label>
                        <input type="text" name="" id="fname" />
                      </div>
                      <div>
                        <label htmlFor="lname">Nationality</label>
                        <input type="text" name="" id="lname" />
                      </div>
                    </div>
                    <div className='inpGrid'>
                      <div>
                        <label htmlFor="fname">Street, number</label>
                        <input type="text" name="" id="fname" />
                      </div>
                      <div>
                        <label htmlFor="lname">city</label>
                        <input type="text" name="" id="lname" />
                      </div>
                    </div>
                    <div className='inpGrid'>
                      <div>
                        <label htmlFor="fname">Postal</label>
                        <input type="text" name="" id="fname" />
                      </div>
                      <div>
                        <label htmlFor="lname">Country</label>
                        <input type="text" name="" id="lname" />
                      </div>
                    </div>
                    <div className='inputTag'>
                      <label htmlFor="email">Web</label>
                      <input type="text" id='email' />
                    </div>

                    <Button variant='contained' className='subBt'>+ Add Custom Fields</Button>

                  </div>


                </div>}
              </div>


              {/* //-------------------------------- Second service ----------------------------------------// */}
              <div className='serviceFirst'>
                <div className='serviceTop' onClick={() => setSecond(!second)}> <WorkHistoryIcon className='iconClass' /> Experiences <KeyboardArrowDownIcon className='arrow' /> </div>
                {second && <div className='serviceData'>

                  <div className='basicBottom'>
                    <div className='inpGrid'>
                      <div>
                        <label htmlFor="fname">Company name</label>
                        <input type="text" name="" id="fname" />
                      </div>
                      <div>
                        <label htmlFor="lname">Job title</label>
                        <input type="text" name="" id="lname" />
                      </div>
                    </div>
                    <div className='inpGrid'>
                      <div>
                        <label htmlFor="fname">City</label>
                        <input type="text" name="" id="fname" />
                      </div>
                      <div>
                        <label htmlFor="lname">Country</label>
                        <input type="text" name="" id="lname" />
                      </div>
                    </div>

                    <div className='inpGrid'>
                      <div>
                        <label htmlFor="fname">Start Date</label>
                        <input type="text" name="" id="fname" />
                      </div>
                      <div>
                        <label htmlFor="lname">End Date</label>
                        <input type="text" name="" id="lname" />
                      </div>
                    </div>

                    <Button variant='contained' className='subBt'>+ Add Work Experience</Button>

                  </div>


                </div>}
              </div>


              {/* //-------------------------------- Second service ----------------------------------------// */}
              <div className='serviceFirst'>
                <div className='serviceTop' onClick={() => setThird(!third)}> <SchoolIcon className='iconClass' /> Academic History <KeyboardArrowDownIcon className='arrow' /> </div>
                {third && <div className='serviceData'>

                  <div className='basicBottom'>
                    <div className='inpGrid'>
                      <div>
                        <label htmlFor="fname">Company name</label>
                        <input type="text" name="" id="fname" />
                      </div>
                      <div>
                        <label htmlFor="lname">Job title</label>
                        <input type="text" name="" id="lname" />
                      </div>
                    </div>
                    <div className='inpGrid'>
                      <div>
                        <label htmlFor="fname">City</label>
                        <input type="text" name="" id="fname" />
                      </div>
                      <div>
                        <label htmlFor="lname">Country</label>
                        <input type="text" name="" id="lname" />
                      </div>
                    </div>

                    <div className='inpGrid'>
                      <div>
                        <label htmlFor="fname">Start Date</label>
                        <input type="text" name="" id="fname" />
                      </div>
                      <div>
                        <label htmlFor="lname">End Date</label>
                        <input type="text" name="" id="lname" />
                      </div>
                    </div>

                    <Button variant='contained' className='subBt'>+ Add Work Experience</Button>

                  </div>


                </div>}
              </div>





            </div>

            <div className='rightGrid'>
              <div className='pdfContainer'></div>
            </div>

          </div>

        </div>
      </div>
    </>
  )
}

export default page