'use client';

import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import Image from 'next/image';

import OnboardingIcon from '@/assets/onboarding2.png';
import WorkExperience from './work-experience';
import WorkExperienceDetails from './work-experience-details';
import HighestEducation from './highest-education';
import ContactDetails from './contact-details';
import Degrees from './degrees';
import EducationalDetails from './educational-details';
import ProjectDetails from './project-details';
import CodingProfiles from './coding-profile';
import { useRouter } from 'next/navigation';
import Skills from './skills';
import { useDispatch, useSelector } from '@/redux/store';
import { updateUser } from '@/actions/user';
import { Skill } from '@/types';
import { righteous } from '@/font-family';
import AchievementsAndCertificates from './achievements-certs';

export type PageNavPropsType = {
  nextPage: Function;
  prevPage: Function;
};

const OnboardingQuestions = () => {
  const route = useRouter();
  const { data } = useSelector(state => state.onboarding);
  const [page, setPage] = useState<number>(0);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  const dispatch = useDispatch();

  const nextPage = () => {
    if (page === 8) setOnboardingCompleted(true);
    setPage(page => Math.min(page + 1, 8));
  };
  const prevPage = () => {
    setPage(page => Math.max(0, page - 1));
  };

  const OnboardingPage = () => {
    switch (page) {
      case 0:
        // return <WorkExperience nextPage={nextPage} prevPage={prevPage} />;
        return <HighestEducation nextPage={nextPage} prevPage={prevPage} />;
      case 1:
        return (
          <WorkExperienceDetails nextPage={nextPage} prevPage={prevPage} />
        );
      case 2:
        return <ContactDetails nextPage={nextPage} prevPage={prevPage} />;
      // case 3:
      //   return <HighestEducation nextPage={nextPage} prevPage={prevPage} />;
      case 3:
        return <Degrees nextPage={nextPage} prevPage={prevPage} />;
      case 4:
        return <EducationalDetails nextPage={nextPage} prevPage={prevPage} />;
      case 5:
        return <ProjectDetails nextPage={nextPage} prevPage={prevPage} />;
      case 6:
        return <Skills nextPage={nextPage} prevPage={prevPage} />;
      case 7:
        return (
          <AchievementsAndCertificates
            nextPage={nextPage}
            prevPage={prevPage}
          />
        );
      case 8:
        return <CodingProfiles nextPage={nextPage} prevPage={prevPage} />;
      default:
        return <CodingProfiles nextPage={nextPage} prevPage={prevPage} />;
    }
  };

  useEffect(() => {
    if (onboardingCompleted) {
      (async () => {
        let skills: { name: string; type: Skill['type'] }[] = [];
        data.skills?.technical_skills?.forEach(skill => {
          skills.push({
            name: skill.name,
            type: 'technical_skills'
          });
        });
        data.skills?.core_subjects?.forEach(skill => {
          skills.push({
            name: skill.name,
            type: 'core_subjects'
          });
        });
        data.skills?.dev_tools?.forEach(skill => {
          skills.push({
            name: skill.name,
            type: 'dev_tools'
          });
        });
        data.skills?.languages?.forEach(skill => {
          skills.push({
            name: skill.name,
            type: 'languages'
          });
        });

        const finalData = { ...data, skills, onboarding_completed: true };

        await dispatch(updateUser(finalData));

        route.push('/job-description');
        return;
      })();
    }
  }, [data]);

  return (
    <Grid
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '100px',
        borderRadius: '20px',
        padding: { xs: '20px', md: '20px 40px' },
        margin: { xs: 'auto 0px', md: 'auto 150px' },
        width: '100%',
        height: 'calc(100vh - 120px)',
        maxHeight: { xs: '90%', md: '600px' }
      }}
      className={righteous.className}
    >
      <Grid flexGrow={1} height='100%'>
        {OnboardingPage()}
      </Grid>
      <Box
        sx={{
          display: { xs: 'none', md: 'block' }
        }}
      >
        <Image
          src={OnboardingIcon}
          alt='icon'
          style={{
            height: '520px',
            width: '350px'
          }}
        />
      </Box>
    </Grid>
  );
};

export default OnboardingQuestions;
