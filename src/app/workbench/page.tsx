'use client';

import React, { useState, useEffect } from 'react';
import './style.scss';
import SideBar from '@/components/sidebar/SideBar';
import { Button, Grid } from '@mui/material';
import user from '@/assets/icons/user.svg';
import Image from 'next/image';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import profile from '@/assets/onboarding1.png';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import SchoolIcon from '@mui/icons-material/School';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import GridViewIcon from '@mui/icons-material/GridView';
import DescriptionIcon from '@mui/icons-material/Description';
import AirplayIcon from '@mui/icons-material/Airplay';
import HelpIcon from '@mui/icons-material/Help';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import PdfViewer from '@/components/pdf-viewer';
import { useDispatch, useSelector } from '@/redux/store';
import { generateResumeData, loadResume } from '@/actions/resume';
import Heading from './components/heading';
import { Righteous } from 'next/font/google';
import PersonalOverview from './components/personal-overview';
import { Resume } from '@/types';
import Experiences from './components/experiences';
import Educations from './components/educations';
import Projects from './components/projects';
import Skills from './components/skills';
import ProfileLinks from './components/profile-links';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const righteous = Righteous({
  weight: ['400'],
  subsets: ['latin']
});

type ResumeWorkbench = Resume & {
  technical_skills?: { value: string }[];
  core_subjects?: { value: string }[];
  dev_tools?: { value: string }[];
  languages?: { value: string }[];
};

const Workbench = () => {
  const dispatch = useDispatch();

  const { data = {} } = useSelector(state => state.workbench);
  const [pdf, setPdf] = useState<ArrayBuffer | null>(null);
  const [expandedId, setExpandedId] = useState(0);

  const methods = useForm<ResumeWorkbench>();

  const { setValue, handleSubmit } = methods;

  const loadResumePdf = async (data: Resume) => {
    const resp = await dispatch(loadResume({ resumeData: data }));
    if (resp.type === 'load/resume/fulfilled') setPdf(resp.payload);
  };

  const onSubmit: SubmitHandler<ResumeWorkbench> = data => {
    if (data)
      loadResumePdf({
        ...data,
        technical_skills: data.technical_skills?.map(
          (skill: { value: string }) => skill.value
        ),
        core_subjects: data.core_subjects?.map(
          (skill: { value: string }) => skill.value
        ),
        dev_tools: data.dev_tools?.map(
          (skill: { value: string }) => skill.value
        ),
        languages: data.languages?.map(
          (skill: { value: string }) => skill.value
        )
      });
  };

  useEffect(() => {
    loadResumePdf(data);

    (Object.keys(data) as Array<keyof ResumeWorkbench>).forEach(key => {
      if (
        [
          'technical_skills',
          'core_subjects',
          'dev_tools',
          'languages'
        ].includes(key)
      ) {
        setValue(
          key,
          (data[key] as string[])?.map(skill => ({
            value: skill
          })) as any
        );
      } else {
        setValue(key, data[key]);
      }
    });
  }, [data]);

  useEffect(() => {
    dispatch(generateResumeData({ jobDescription: '' }));
  }, []);

  return (
    <>
      <Grid
        sx={{
          width: '100%',
          height: '100%',
          flexGrow: 1,
          display: 'flex'
        }}
        className={righteous.className}
      >
        <SideBar />
        <Grid
          sx={{
            display: 'flex',
            flexGrow: 1,
            mt: '50px',
            gap: '50px',
            mx: '50px'
          }}
        >
          <Grid
            sx={{
              display: 'flex',
              flexGrow: 1,
              maxHeight: 'calc(100vh - 150px)',
              overflow: 'auto',
              width: '40vw'
            }}
          >
            <FormProvider {...methods}>
              <DndProvider backend={HTML5Backend}>
                <Grid
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                  }}
                >
                  <PersonalOverview
                    collapsed={expandedId !== 0}
                    toggleCollapse={() =>
                      setExpandedId(curr => (curr === 0 ? -1 : 0))
                    }
                  />
                  <Experiences
                    collapsed={expandedId !== 1}
                    toggleCollapse={() =>
                      setExpandedId(curr => (curr === 1 ? -1 : 1))
                    }
                  />
                  <Educations
                    collapsed={expandedId !== 2}
                    toggleCollapse={() =>
                      setExpandedId(curr => (curr === 2 ? -1 : 2))
                    }
                  />
                  <Projects
                    collapsed={expandedId !== 3}
                    toggleCollapse={() =>
                      setExpandedId(curr => (curr === 3 ? -1 : 3))
                    }
                  />
                  <Skills
                    collapsed={expandedId !== 4}
                    toggleCollapse={() =>
                      setExpandedId(curr => (curr === 4 ? -1 : 4))
                    }
                  />
                  <ProfileLinks
                    collapsed={expandedId !== 5}
                    toggleCollapse={() =>
                      setExpandedId(curr => (curr === 5 ? -1 : 5))
                    }
                  />
                  <Button variant='contained' onClick={handleSubmit(onSubmit)}>
                    Save
                  </Button>
                </Grid>
              </DndProvider>
            </FormProvider>
          </Grid>
          <Grid
            sx={{
              height: '100%',
              flexBasis: '40%',
              display: { xs: 'none', md: 'flex' }
            }}
          >
            <PdfViewer pdf={pdf} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Workbench;
