'use client';

import React, { useEffect } from 'react';
import './profile.scss';
import Image from 'next/image';
import profile from '@/assets/onboarding1.png';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

  const { resumeData } = useSelector((state: any) => state.user);

  useEffect(() => {
    if (resumeData.name) {
      setValue('fname', String(resumeData.name).split(' ')[0]);
      setValue('lname', String(resumeData.name).split(' ')[1]);
      setValue('phone', resumeData.phone);
      setValue('email', resumeData.email);
      setValue('city', resumeData.city);
      setValue('street', '207/8 Mahakal Colony Dewas');
      setValue('dob', '07 June 2002');
      setValue('website', 'https://anandtechnical.netlify.app');
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

      setValue('project_name', resumeData.projects[0].name);
      setValue('project_link', resumeData.projects[0].live_url);
      setValue('project_description', resumeData.projects[0].description[0]);

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

  return (
    <>
      <div className='profile'>
        <section className='header'>Account and Profile</section>

        <div className='innerBox'>
          <div className='selectBar'>
            <div className='active'>Profile</div>
            <div>Account settings</div>
          </div>
          <div className='partitionBox'>
            <div className='left'>
              <section>Resume Profile</section>
              <div className='imageSection'>
                <Image className='image' src={profile} alt='' />
              </div>

              <div className='infoSection'>
                <div className='inpGrid'>
                  <div>
                    <label htmlFor='fname'>First Name</label>
                    <input type='text' id='fname' {...register('fname')} />
                  </div>
                  <div>
                    <label htmlFor='lname'>Last Name</label>
                    <input type='text' id='lname' {...register('lname')} />
                  </div>
                </div>

                <div className='inputTag'>
                  <label htmlFor='phone'>Phone Number</label>
                  <input type='text' id='phone' {...register('phone')} />
                </div>

                <div className='inputTag'>
                  <label htmlFor='phone'>Email address</label>
                  <input type='text' id='email' {...register('email')} />
                </div>

                <div className='inpGrid'>
                  <div>
                    <label htmlFor='fname'>Birth date</label>
                    <input type='text' id='fname' {...register('dob')} />
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
                    <input type='text' id='fname' {...register('street')} />
                  </div>
                  <div>
                    <label htmlFor='lname'>City</label>
                    <input type='text' id='lname' {...register('city')} />
                  </div>
                </div>

                <div className='inpGrid'>
                  <div>
                    <label htmlFor='fname'>State</label>
                    <input type='text' id='fname' {...register('state')} />
                  </div>
                  <div>
                    <label htmlFor='lname'>Country</label>
                    <input type='text' id='lname' {...register('country')} />
                  </div>
                </div>

                <div className='inputTag'>
                  <label htmlFor='phone'>Website</label>
                  <input type='text' id='phone' {...register('website')} />
                </div>
              </div>
            </div>
            <div className='right'>
              <div className='inpGrid'>
                <div>
                  <label htmlFor='fname'>Job Title</label>
                  <input type='text' id='fname' {...register('position')} />
                </div>
                <div>
                  <label htmlFor='lname'>Mode</label>
                  <input type='text' id='lname' {...register('mode')} />
                </div>
              </div>

              <div className='inpGrid'>
                <div>
                  <label htmlFor='fname'>Start Date</label>
                  <input type='text' id='fname' {...register('start_date')} />
                </div>
                <div>
                  <label htmlFor='lname'>End Date</label>
                  <input type='text' id='lname' {...register('end_date')} />
                </div>
              </div>

              <div className='inputTag'>
                <label htmlFor='phone'>Job Description</label> <br />
                <textarea {...register('description')}></textarea>
              </div>

              <div className='btnCon'>
                <Button className='moreBt' variant='contained'>
                  Add More
                </Button>
              </div>

              <div className='inpGrid'>
                <div>
                  <label htmlFor='fname'>Project Title</label>
                  <input type='text' id='fname' {...register('project_name')} />
                </div>
                <div>
                  <label htmlFor='lname'>Live Url</label>
                  <input type='text' id='lname' {...register('project_link')} />
                </div>
              </div>

              <div className='inputTag'>
                <label htmlFor='phone'>Project Description</label> <br />
                <textarea {...register('project_description')}></textarea>
              </div>

              <div className='btnCon'>
                <Button className='moreBt' variant='contained'>
                  Add More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
