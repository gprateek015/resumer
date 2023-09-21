'use client';

import React, { useState, useEffect } from 'react';
import './style.scss';
import SideBar from '@/components/sidebar/SideBar';
import { Button, Grid } from '@mui/material';
import user from '@/assets/icons/user.svg';
import Image from 'next/image';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import profile from '@/assets/profile.png';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import SchoolIcon from '@mui/icons-material/School';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import GridViewIcon from '@mui/icons-material/GridView';
import DescriptionIcon from '@mui/icons-material/Description';
import AirplayIcon from '@mui/icons-material/Airplay';
import HelpIcon from '@mui/icons-material/Help';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import PdfViewer from '@/components/pdf-viewer';

const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

  const [first, setFirst] = useState(false);
  const [second, setSecond] = useState(false);
  const [third, setThird] = useState(false);
  const [fourth, setFourth] = useState(false);

  const { resumeData } = useSelector((state: any) => state.user);

  useEffect(() => {
    if (resumeData) {
      setValue('fname', String(resumeData.name).split(' ')[0]);
      setValue('lname', String(resumeData.name).split(' ')[1]);
      setValue('phone', resumeData.phone);
      setValue('email', resumeData.email);
      setValue('city', resumeData.city);
      setValue('state', resumeData.state);
      setValue('nationality', 'Indian');
      setValue('country', 'India');

      setValue('company_name', resumeData.experiences[0].company_name);
      setValue('start_date', resumeData.experiences[0].start_date);
      setValue('end_date', resumeData.experiences[0].end_date);
      setValue('position', resumeData.experiences[0].position);
      setValue('mode', resumeData.experiences[0].mode);
      setValue('description', resumeData.experiences[0].description[0]);

      setValue('institute_name', resumeData.educations[0].institute_name);
      setValue('education_type', resumeData.educations[0].education_type);
      setValue('specialisation', resumeData.educations[0].specialisation);
      setValue('start_year', resumeData.educations[0].start_year);
      setValue('score', resumeData.educations[0].score);

      let techString = '';
      for (let i = 0; i < resumeData.technical_skills.length; i++) {
        techString += resumeData.technical_skills[i] + ', ';
      }
      setValue('technical_skills', techString);

      let langString = '';
      for (let i = 0; i < resumeData.languages.length; i++) {
        langString += resumeData.languages[i] + ', ';
      }
      setValue('languages', langString);

      let coreStr = '';
      for (let i = 0; i < resumeData.core_subjects.length; i++) {
        coreStr += resumeData.core_subjects[i] + ', ';
      }
      setValue('core_subjects', coreStr);

      let devStr = '';
      for (let i = 0; i < resumeData.dev_tools.length; i++) {
        devStr += resumeData.dev_tools[i] + ', ';
      }
      setValue('dev_tools', devStr);
    }
  }, [resumeData]);

  const onSubmit = (data: any) => {
    console.log({
      ...resumeData,
      name: data.fname + ' ' + data.lname,
      email: data.email,
      phone: data.phone,
      city: data.city,
      state: data.state
    });
  };

  return (
    <>
      <div className='workHome'>
        <SideBar />
        <div className='workContainer'>
          <div className='title'>
            <section className='leftSection'>
              Title : <span>user135_cv</span>
            </section>
            <section className='rightSection'>
              <Button className='downloadBt' variant='contained'>
                Download
              </Button>
            </section>
          </div>

          <div className='innerGrid'>
            <div className='leftGrid'>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* //-------------------------------- first service ----------------------------------------// */}
                <div className='serviceFirst'>
                  <div className='serviceTop' onClick={() => setFirst(!first)}>
                    {' '}
                    <Image className='iconClass' src={user} alt='' /> Personal
                    Overview <KeyboardArrowDownIcon className='arrow' />{' '}
                  </div>
                  {first && (
                    <div className='serviceData'>
                      <div className='basicDetails'>
                        <div className='imageContainer'>
                          <Image alt='' src={profile} className='profile' />
                        </div>

                        <div className='basicTop'>
                          <div className='inpGrid'>
                            <div>
                              <label htmlFor='fname'>First Name</label>
                              <input
                                type='text'
                                id='fname'
                                {...register('fname')}
                              />
                            </div>
                            <div>
                              <label htmlFor='lname'>Last Name</label>
                              <input
                                type='text'
                                id='lname'
                                {...register('lname')}
                              />
                            </div>
                          </div>

                          <div className='inputTag'>
                            <label htmlFor='phone'>Phone Number</label>
                            <input
                              type='text'
                              id='phone'
                              {...register('phone')}
                            />
                          </div>

                          <div className='inputTag'>
                            <label htmlFor='email'>Email</label>
                            <input
                              type='text'
                              id='email'
                              {...register('email')}
                            />
                          </div>
                        </div>
                      </div>

                      <div className='basicBottom'>
                        <div className='inpGrid'>
                          <div>
                            <label htmlFor='fname'>Date of birth</label>
                            <input type='text' name='' id='fname' />
                          </div>
                          <div>
                            <label htmlFor='lname'>Nationality</label>
                            <input
                              type='text'
                              id='lname'
                              {...register('nationality')}
                            />
                          </div>
                        </div>
                        <div className='inpGrid'>
                          <div>
                            <label htmlFor='fname'>Street, number</label>
                            <input type='text' name='' id='fname' />
                          </div>
                          <div>
                            <label htmlFor='lname'>city</label>
                            <input
                              type='text'
                              id='lname'
                              {...register('city')}
                            />
                          </div>
                        </div>
                        <div className='inpGrid'>
                          <div>
                            <label htmlFor='fname'>State</label>
                            <input
                              type='text'
                              id='fname'
                              {...register('state')}
                            />
                          </div>
                          <div>
                            <label htmlFor='lname'>Country</label>
                            <input
                              type='text'
                              id='lname'
                              {...register('country')}
                            />
                          </div>
                        </div>
                        <div className='inputTag'>
                          <label htmlFor='email'>Web</label>
                          <input type='text' id='email' />
                        </div>

                        <Button variant='contained' className='subBt'>
                          + Add Custom Fields
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* //-------------------------------- Second service ----------------------------------------// */}
                <div className='serviceFirst'>
                  <div
                    className='serviceTop'
                    onClick={() => setSecond(!second)}
                  >
                    {' '}
                    <WorkHistoryIcon className='iconClass' /> Experiences{' '}
                    <KeyboardArrowDownIcon className='arrow' />{' '}
                  </div>
                  {second && (
                    <div className='serviceData'>
                      <div className='basicBottom'>
                        <div className='inpGrid'>
                          <div>
                            <label htmlFor='fname'>Company name</label>
                            <input
                              type='text'
                              id='fname'
                              {...register('company_name')}
                            />
                          </div>
                          <div>
                            <label htmlFor='lname'>Job title</label>
                            <input
                              type='text'
                              id='lname'
                              {...register('position')}
                            />
                          </div>
                        </div>
                        <div className='inpGrid'>
                          <div>
                            <label htmlFor='fname'>mode</label>
                            <input
                              type='text'
                              id='fname'
                              {...register('mode')}
                            />
                          </div>
                          <div>
                            <label htmlFor='lname'>Country</label>
                            <input
                              type='text'
                              id='lname'
                              {...register('country')}
                            />
                          </div>
                        </div>

                        <div className='inpGrid'>
                          <div>
                            <label htmlFor='fname'>Start Date</label>
                            <input
                              type='text'
                              id='fname'
                              {...register('start_date')}
                            />
                          </div>
                          <div>
                            <label htmlFor='lname'>End Date</label>
                            <input
                              type='text'
                              id='lname'
                              {...register('end_date')}
                            />
                          </div>
                        </div>

                        <div className='inputTag'>
                          <label htmlFor='email'>Description</label>
                          <input
                            type='text'
                            id='email'
                            {...register('description')}
                          />
                        </div>

                        <Button variant='contained' className='subBt'>
                          + Add Work Experience
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* //-------------------------------- third service ----------------------------------------// */}
                <div className='serviceFirst'>
                  <div className='serviceTop' onClick={() => setThird(!third)}>
                    {' '}
                    <SchoolIcon className='iconClass' /> Academic History{' '}
                    <KeyboardArrowDownIcon className='arrow' />{' '}
                  </div>
                  {third && (
                    <div className='serviceData'>
                      <div className='basicBottom'>
                        <div className='inpGrid'>
                          <div>
                            <label htmlFor='fname'>Institution name</label>
                            <input
                              type='text'
                              id='fname'
                              {...register('institute_name')}
                            />
                          </div>
                          <div>
                            <label htmlFor='lname'>Field of study</label>
                            <input
                              type='text'
                              id='lname'
                              {...register('specialisation')}
                            />
                          </div>
                        </div>
                        <div className='inpGrid'>
                          <div>
                            <label htmlFor='fname'>Degree</label>
                            <input
                              type='text'
                              id='fname'
                              {...register('education_type')}
                            />
                          </div>
                          <div></div>
                        </div>
                        <div className='inpGrid'>
                          <div>
                            <label htmlFor='fname'>Start Year</label>
                            <input
                              type='text'
                              id='fname'
                              {...register('start_year')}
                            />
                          </div>
                          <div>
                            <label htmlFor='lname'>Score</label>
                            <input
                              type='text'
                              id='lname'
                              {...register('score')}
                            />
                          </div>
                        </div>

                        <Button variant='contained' className='subBt'>
                          + Add Academic Experience
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* //-------------------------------- fourth service ----------------------------------------// */}
                <div className='serviceFirst'>
                  <div
                    className='serviceTop'
                    onClick={() => setFourth(!fourth)}
                  >
                    {' '}
                    <AcUnitIcon className='iconClass' /> Skill{' '}
                    <KeyboardArrowDownIcon className='arrow' />{' '}
                  </div>
                  {fourth && (
                    <div className='serviceData'>
                      <div className='basicBottom'>
                        <div className='inpGrid'>
                          <div>
                            <label htmlFor='fname'>Skill #1</label>
                            <input
                              type='text'
                              name=''
                              id='fname'
                              readOnly
                              value={'Technical Skill'}
                            />
                          </div>
                          <div>
                            <label htmlFor='lname'>Skill level</label>
                            <input
                              type='text'
                              id='lname'
                              {...register('technical_skills')}
                            />
                          </div>
                        </div>
                        <div className='inpGrid'>
                          <div>
                            <label htmlFor='fname'>Skill #2</label>
                            <input
                              type='text'
                              name=''
                              id='fname'
                              readOnly
                              value={'Core Subjects'}
                            />
                          </div>
                          <div>
                            <label htmlFor='lname'>Skill level</label>
                            <input
                              type='text'
                              id='lname'
                              {...register('core_subjects')}
                            />
                          </div>
                        </div>
                        <div className='inpGrid'>
                          <div>
                            <label htmlFor='fname'>Skill #3</label>
                            <input
                              type='text'
                              name=''
                              id='fname'
                              readOnly
                              value={'Languages'}
                            />
                          </div>
                          <div>
                            <label htmlFor='lname'>Skill level</label>
                            <input
                              type='text'
                              id='lname'
                              {...register('languages')}
                            />
                          </div>
                        </div>
                        <div className='inpGrid'>
                          <div>
                            <label htmlFor='fname'>Skill #4</label>
                            <input
                              type='text'
                              name=''
                              id='fname'
                              readOnly
                              value={'Dev Tools'}
                            />
                          </div>
                          <div>
                            <label htmlFor='lname'>Skill level</label>
                            <input
                              type='text'
                              id='lname'
                              {...register('dev_tools')}
                            />
                          </div>
                        </div>

                        <Button variant='contained' className='subBt'>
                          + Add New Skill
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <div className='submitBtn'>
                  <Button className='bt' type='submit' variant='contained'>
                    Save
                  </Button>
                </div>
              </form>
            </div>

            <div className='rightGrid'>
              <div className='pdfContainer'>
                <div className='topBtnCon'>
                  <div>
                    <GridViewIcon className='imgIcon' /> Overview
                  </div>
                  <div>
                    <DescriptionIcon className='imgIcon' />
                    models
                  </div>
                  <div>
                    <AirplayIcon className='imgIcon' />
                    instructions
                  </div>
                  <div>
                    <HelpIcon className='imgIcon' />
                    Assistance
                  </div>
                </div>
                <PdfViewer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
