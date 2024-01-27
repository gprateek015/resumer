import { Chip, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Heading from './heading';
import SchoolIcon from '@mui/icons-material/School';
import WorkExpDetailDesign from '@/components/work-experiences/detail';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { Experience, Skill } from '@/types';
import EduDetailDesign from '@/components/educations/detail';
import ProjectDetailDesign from '@/components/projects/detail';
import SkillsInput, { CreatableSkill } from '@/components/skills-input';

const Skills = ({
  collapsed,
  toggleCollapse
}: {
  collapsed: boolean;
  toggleCollapse: Function;
}) => {
  const { setValue, watch } = useFormContext();
  const technical: string[] = watch('technical_skills');
  const tools: string[] = watch('dev_tools');
  const core: string[] = watch('core_subjects');
  const languages: string[] = watch('languages');
  const [newSkills, setNewSkills] = useState<string[]>([]);

  const getUniqueNames = (curr: string[], newVal: CreatableSkill) => {
    const isAlreadyAdded = curr.find(
      skill => skill === (newVal.name || newVal.value)
    );
    if (isAlreadyAdded) {
      return curr;
    }
    return [...curr, newVal.name || newVal.value];
  };

  const onChange = (val: CreatableSkill) => {
    switch (val.type as CreatableSkill['type']) {
      case 'technical_skills': {
        setValue('technical_skills', getUniqueNames(technical, val));
        break;
      }
      case 'dev_tools': {
        setValue('dev_tools', getUniqueNames(tools, val));
        break;
      }
      case 'core_subjects': {
        setValue('core_subjects', getUniqueNames(core, val));
        break;
      }
      case 'languages': {
        setValue('languages', getUniqueNames(languages, val));
        break;
      }
      default:
        setNewSkills(curr => getUniqueNames(curr, val));
        break;
    }
  };

  const handleRemove = (stringArray: string[], val: string) =>
    stringArray.filter(curr => curr !== val);

  const handleDelete = (
    skillType: Skill['type'] | 'new_skill',
    val: string
  ) => {
    switch (skillType) {
      case 'technical_skills': {
        setValue('technical_skills', handleRemove(technical, val));
        break;
      }
      case 'dev_tools': {
        setValue('dev_tools', handleRemove(tools, val));
        break;
      }
      case 'core_subjects': {
        setValue('core_subjects', handleRemove(core, val));
        break;
      }
      case 'languages': {
        setValue('languages', handleRemove(languages, val));
        break;
      }
      default:
        setNewSkills(curr => handleRemove(curr, val));
        break;
    }
  };

  return (
    <Grid
      sx={{
        zIndex: 10
      }}
    >
      <Heading
        title='Skills'
        icon={<SchoolIcon />}
        collapsed={collapsed}
        toggleCollapse={() => toggleCollapse()}
      />

      {!collapsed && (
        <Grid
          sx={{
            borderRadius: '0px 0px 20px 20px',
            background: 'rgba(255, 255, 255, 0.10)',
            backdropFilter: 'blur(20px)',
            padding: '10px 15px 25px 15px'
          }}
        >
          <SkillsInput onChange={onChange} />
          <Grid
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              my: '10px'
            }}
          >
            {newSkills?.length !== 0 && (
              <Grid>
                <Typography mb='5px'>
                  Uncategorized Skills{' '}
                  <Typography component={'span'} fontSize='11px'>
                    (You need to drag these skills to some category)
                  </Typography>
                </Typography>
                <Grid
                  sx={{
                    display: 'flex',
                    gap: '10px',
                    flexWrap: 'wrap'
                  }}
                >
                  {newSkills.map(skill => (
                    <Chip
                      key={skill}
                      onDelete={() => handleDelete('new_skill', skill)}
                      label={skill}
                      sx={{
                        color: 'white',
                        border: '1px solid white',
                        '& svg': {
                          color: '#ffffff80 !important'
                        }
                      }}
                    />
                  ))}
                </Grid>
              </Grid>
            )}
            <Grid>
              <Typography mb='5px'>Technical</Typography>
              <Grid
                sx={{
                  display: 'flex',
                  gap: '10px',
                  flexWrap: 'wrap'
                }}
              >
                {technical.map(skill => (
                  <Chip
                    key={skill}
                    onDelete={() => handleDelete('technical_skills', skill)}
                    label={skill}
                    sx={{
                      color: 'white',
                      border: '1px solid white',
                      '& svg': {
                        color: '#ffffff80 !important'
                      }
                    }}
                  />
                ))}
              </Grid>
            </Grid>
            <Grid>
              <Typography mb='5px'>Dev Tools</Typography>
              <Grid
                sx={{
                  display: 'flex',
                  gap: '10px',
                  flexWrap: 'wrap'
                }}
              >
                {tools.map(skill => (
                  <Chip
                    key={skill}
                    onDelete={() => handleDelete('dev_tools', skill)}
                    label={skill}
                    sx={{
                      color: 'white',
                      border: '1px solid white',
                      '& svg': {
                        color: '#ffffff80 !important'
                      }
                    }}
                  />
                ))}
              </Grid>
            </Grid>
            <Grid>
              <Typography mb='5px'>Core Subjects</Typography>
              <Grid
                sx={{
                  display: 'flex',
                  gap: '10px',
                  flexWrap: 'wrap'
                }}
              >
                {core.map(skill => (
                  <Chip
                    key={skill}
                    onDelete={() => handleDelete('core_subjects', skill)}
                    label={skill}
                    sx={{
                      color: 'white',
                      border: '1px solid white',
                      '& svg': {
                        color: '#ffffff80 !important'
                      }
                    }}
                  />
                ))}
              </Grid>
            </Grid>
            <Grid>
              <Typography mb='5px'>Languages</Typography>
              <Grid
                sx={{
                  display: 'flex',
                  gap: '10px',
                  flexWrap: 'wrap'
                }}
              >
                {languages.map(skill => (
                  <Chip
                    key={skill}
                    onDelete={() => handleDelete('languages', skill)}
                    label={skill}
                    sx={{
                      color: 'white',
                      border: '1px solid white',
                      '& svg': {
                        color: '#ffffff80 !important'
                      }
                    }}
                  />
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default Skills;
