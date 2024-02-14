'use client';

import React, { useState, useEffect, useRef } from 'react';
import './style.scss';
import SideBar from '@/components/sidebar';
import { Grid, IconButton, Button, Box, Typography } from '@mui/material';
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
import PersonalOverview from './components/personal-overview';
import { Resume } from '@/types';
import Experiences from './components/experiences';
import Educations from './components/educations';
import Projects from './components/projects';
import ProfileLinks from './components/profile-links';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Skills from './components/skills';
import { DividerWithText } from '@/components/auth/styles';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { downloadPDF } from '@/utils';
import { useRouter } from 'next/navigation';
import InfoIcon from '@mui/icons-material/Info';
import { righteous } from '@/font-family';

const Workbench = () => {
  const dispatch = useDispatch();
  const routes = useRouter();

  const { data: resumeData = {} } = useSelector(state => state.workbench);
  const [pdf, setPdf] = useState<ArrayBuffer | null>(null);
  const [expandedId, setExpandedId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const prevSelectedTemplate = useRef(0);
  const resumeContainer = useRef<any>(null);
  const [downloadResumeData, setDownloadResumeData] = useState<Blob | null>(
    null
  );

  const methods = useForm<Resume>();

  const { handleSubmit, reset, getValues } = methods;

  const loadResumePdf = async (data: Resume, templateId: number) => {
    if (Object.keys(data || {}).length > 0) {
      const resp = await dispatch(
        loadResume({
          resumeData: {
            ...data,
            technical_skills: data.technical_skills?.map(
              (skill: { name: string }) => skill.name
            ),
            core_subjects: data.core_subjects?.map(
              (skill: { name: string }) => skill.name
            ),
            dev_tools: data.dev_tools?.map(
              (skill: { name: string }) => skill.name
            ),
            languages: data.languages?.map(
              (skill: { name: string }) => skill.name
            )
          },
          templateId
        })
      );
      if (resp.type === 'load/resume/fulfilled') {
        setPdf(resp.payload);
        const pdfBlob = new Blob([resp.payload], { type: 'application/pdf' });
        setDownloadResumeData(pdfBlob);
      }
    }
  };

  const reloadResume: SubmitHandler<Resume> = async data => {
    if (data) {
      setLoading(true);
      await loadResumePdf(data, selectedTemplate);
      setLoading(false);
    }
  };

  const downloadResume = async () => {
    const data = getValues();
    let { name = 'Resume' } = data;
    name = name.split(' ').join('_');

    if (downloadResumeData) {
      downloadPDF({ pdfBlob: downloadResumeData, filename: name });
    } else; // Handl error
  };

  useEffect(() => {
    if (Object.keys(resumeData).length === 0) {
      // routes.replace('/job-description');
      dispatch(generateResumeData({ jobDescription: '' }));
    } else {
      loadResumePdf(resumeData, selectedTemplate);
      reset(resumeData);
    }
  }, [resumeData]);

  useEffect(() => {
    if (prevSelectedTemplate.current !== selectedTemplate) {
      handleSubmit(reloadResume)();
      prevSelectedTemplate.current = selectedTemplate;
    }
  }, [selectedTemplate]);

  useEffect(() => {
    const handleSaveClick = (event: KeyboardEvent) => {
      const isMac = navigator?.userAgent.toUpperCase().indexOf('MAC') >= 0;

      if (
        (isMac && event.metaKey && event.key === 's') ||
        (!isMac && event.ctrlKey && event.key === 's')
      ) {
        event.preventDefault();

        handleSubmit(reloadResume)();
      }
    };

    const confirmReload = (event: any) => {
      event.preventDefault();
    };

    window.addEventListener('keydown', handleSaveClick);
    window.addEventListener('beforeunload', confirmReload);
    return () => {
      window.removeEventListener('keydown', handleSaveClick);
      window.removeEventListener('beforeunload', confirmReload);
    };
  }, []);

  return (
    <>
      <Grid
        sx={{
          width: '100%',
          height: '100%',
          flexGrow: 1,
          display: 'flex',
          position: 'relative'
        }}
        className={righteous.className}
      >
        <SideBar
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
        />
        <Grid
          sx={{
            display: 'flex',
            flexGrow: 1,
            mt: '50px',
            gap: '0px',
            mx: { md: '50px' }
          }}
        >
          <Grid
            sx={{
              display: { xs: 'none', md: 'flex' },
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
                  <Educations
                    collapsed={expandedId !== 2}
                    toggleCollapse={() =>
                      setExpandedId(curr => (curr === 2 ? -1 : 2))
                    }
                    reloadResume={reloadResume}
                  />
                  <Experiences
                    collapsed={expandedId !== 1}
                    toggleCollapse={() =>
                      setExpandedId(curr => (curr === 1 ? -1 : 1))
                    }
                    reloadResume={reloadResume}
                  />
                  <Projects
                    collapsed={expandedId !== 3}
                    toggleCollapse={() =>
                      setExpandedId(curr => (curr === 3 ? -1 : 3))
                    }
                    reloadResume={reloadResume}
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
                </Grid>
              </DndProvider>
            </FormProvider>
          </Grid>
          <DividerWithText
            orientation='vertical'
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            <IconButton onClick={handleSubmit(reloadResume)}>
              <AutorenewIcon
                sx={{ color: '#ffffff9c' }}
                className={loading ? 'center-loader' : ''}
              />
            </IconButton>
          </DividerWithText>
          <Grid
            sx={{
              height: '100%',
              display: 'flex',
              maxHeight: 'calc(100vh - 150px)',
              overflowY: 'auto',
              minWidth: { xs: 'calc(100vw - 30px)', md: '450px' },
              width: { xs: 'calc(100vw - 30px)', sm: '450px' },
              flexDirection: { xs: 'column-reverse', md: 'column' },
              justifyContent: { xs: 'center' },
              margin: { xs: '0px 15px', md: '0px' }
            }}
            ref={resumeContainer}
          >
            <Button
              sx={{
                alignSelf: { xs: 'center', md: 'flex-end' },
                color: 'white',
                borderColor: '#ffffff91',
                '&:hover': {
                  borderColor: '#ffffff'
                },
                mb: '10px',
                mt: { xs: '10px', md: '0px' },
                padding: '2px 15px'
              }}
              variant='outlined'
              onClick={() => downloadResume()}
            >
              Download
            </Button>
            <Grid
              sx={{
                overflow: 'auto',
                minHeight: '400px'
              }}
            >
              <PdfViewer
                pdf={pdf}
                width={resumeContainer?.current?.offsetWidth}
              />
            </Grid>
          </Grid>
        </Grid>
        <Typography
          sx={{
            position: 'absolute',
            bottom: '15px',
            width: '100%',
            display: { xs: 'flex', md: 'none' },
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px'
          }}
        >
          <InfoIcon />
          To edit the resume you must be on desktop!
        </Typography>
      </Grid>
    </>
  );
};

export default Workbench;
