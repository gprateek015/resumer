'use client';

import React, { useState, useEffect, useRef, useContext } from 'react';
import './style.scss';
import { Grid, IconButton, Typography } from '@mui/material';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import PdfViewer from '@/components/pdf-viewer';
import { DnDBackendContext, useDispatch, useSelector } from '@/redux/store';
import { generateResumeData, loadResume } from '@/actions/resume';
import PersonalOverview from './components/personal-overview';
import { Resume, Skill } from '@/types';
import Experiences from './components/experiences';
import Educations from './components/educations';
import Projects from './components/projects';
import ProfileLinks from './components/profile-links';
import { DndProvider } from 'react-dnd';
import Skills from './components/skills';
import { DividerWithText } from '@/components/auth/styles';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { downloadPDF } from '@/utils';
import { useRouter } from 'next/navigation';
import InfoIcon from '@mui/icons-material/Info';
import { righteous } from '@/font-family';
import Certifications from './components/certifications';
import { AuthButton } from '@/components/navbar/styles';
import { enqueueSnackbar } from 'notistack';
import SideBar from './components/sidebar';
import { updateUser } from '@/actions/user';

const Workbench = () => {
  const dispatch = useDispatch();
  const routes = useRouter();

  const Backend = useContext(DnDBackendContext);
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
      } else {
        enqueueSnackbar('Error generating the PDF', { variant: 'error' });
      }
    }
  };

  const onSave: SubmitHandler<Resume> = async data => {
    const { technical_skills, core_subjects, dev_tools, languages } = data;
    let skills: { name: string; type: Skill['type'] }[] = [];
    technical_skills?.forEach(skill => {
      skills.push({
        name: skill.name,
        type: 'technical_skills'
      });
    });
    core_subjects?.forEach(skill => {
      skills.push({
        name: skill.name,
        type: 'core_subjects'
      });
    });
    dev_tools?.forEach(skill => {
      skills.push({
        name: skill.name,
        type: 'dev_tools'
      });
    });
    languages?.forEach(skill => {
      skills.push({
        name: skill.name,
        type: 'languages'
      });
    });

    dispatch(updateUser({ ...data, skills }));
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
          position: 'relative',
          overflowX: 'hidden'
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
              <DndProvider backend={Backend}>
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
                  <Certifications
                    collapsed={expandedId !== 6}
                    toggleCollapse={() =>
                      setExpandedId(curr => (curr === 6 ? -1 : 6))
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
              overflowY: 'hidden',
              minWidth: { xs: 'calc(100vw - 30px)', md: '500px' },
              width: { xs: 'calc(100vw - 30px)', md: '500px' },
              flexDirection: { xs: 'column', md: 'column' },
              justifyContent: { xs: 'center' },
              margin: { xs: '0px 15px', md: '0px' }
            }}
            ref={resumeContainer}
          >
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
            <Grid container justifyContent={'center'} gap={'30px'}>
              <AuthButton
                sx={{
                  mt: '10px',
                  borderRadius: '20px',
                  alignSelf: 'center',
                  width: '120px'
                }}
                variant='outlined'
                onClick={handleSubmit(onSave)}
              >
                Save
              </AuthButton>
              <AuthButton
                sx={{
                  mt: '10px',
                  borderRadius: '20px',
                  alignSelf: 'center',
                  width: '120px'
                }}
                variant='outlined'
                onClick={() => downloadResume()}
              >
                Download
              </AuthButton>
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
