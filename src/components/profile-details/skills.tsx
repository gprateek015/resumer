import { Chip, Grid, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import Heading from '../../app/workbench/components/heading';
import SchoolIcon from '@mui/icons-material/School';
import WorkExpDetailDesign from '@/components/work-experiences/detail';
import { SubmitHandler, useFieldArray, useFormContext } from 'react-hook-form';
import { Experience, Skill } from '@/types';
import EduDetailDesign from '@/components/educations/detail';
import ProjectDetailDesign from '@/components/projects/detail';
import SkillsInput, { CreatableSkill } from '@/components/skills-input';

import DraggableChip, { DragSkillItem } from './dragable-chip';
import { useDrop } from 'react-dnd';
import SkillSection from './skill-section';

type OnChangeValueType =
  | CreatableSkill
  | { name: string; type: Skill['type'] | 'new_skill'; value?: string };

const SkillsContainer = () => {
  const { setValue, getValues } = useFormContext();

  const { fields: technical, append: technicalAppend } = useFieldArray({
    name: 'technical_skills'
  });
  const { fields: tools, append: toolsAppend } = useFieldArray({
    name: 'dev_tools'
  });
  const { fields: core, append: coreAppend } = useFieldArray({
    name: 'core_subjects'
  });
  const { fields: languages, append: languagesAppend } = useFieldArray({
    name: 'languages'
  });

  const [newSkills, setNewSkills] = useState<string[]>([]);

  const isAlreadyAdded = (curr: any[], newVal: OnChangeValueType) => {
    const item = curr.find(skill => skill.name === newVal.name);
    return item !== undefined;
  };

  const onChange = (val: OnChangeValueType) => {
    if (
      ['technical_skills', 'dev_tools', 'core_subjects', 'languages'].includes(
        val.type
      )
    ) {
      if (isAlreadyAdded(getValues(val.type), val)) return;
    } else {
      if (isAlreadyAdded(newSkills, val)) return;
    }

    switch (val.type) {
      case 'technical_skills': {
        technicalAppend({ name: val.name });
        break;
      }
      case 'dev_tools': {
        toolsAppend({ name: val.name });
        break;
      }
      case 'core_subjects': {
        coreAppend({ name: val.name });
        break;
      }
      case 'languages': {
        languagesAppend({ name: val.name });
        break;
      }
      default: {
        setNewSkills(curr => [...curr, val.name]);
      }
    }
  };

  const handleRemoveFromArray = (array: any, val: string) =>
    array.filter((ele: any) => (ele?.name || ele) !== val);

  const handleDelete = (
    skillType: Skill['type'] | 'new_skill',
    val: string
  ) => {
    if (skillType === 'new_skill') {
      setNewSkills(curr => handleRemoveFromArray(curr, val));
    } else {
      setValue(skillType, handleRemoveFromArray(getValues(skillType), val));
    }
  };

  const onDropSkill = (item: DragSkillItem, droppedOn: Skill['type']) => {
    onChange({ name: item.name, type: droppedOn });
    handleDelete(item.type, item.name);
    item.type = droppedOn;
  };

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number, skillType: Skill['type']) => {
      const updatedList = getValues(skillType) as any[];
      const [movedItem] = updatedList.splice(dragIndex, 1);
      updatedList.splice(hoverIndex, 0, movedItem);

      setValue(skillType, updatedList);
      return;
    },
    []
  );

  return (
    <Grid
      sx={{
        zIndex: 10,
        width: '100%'
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
              {newSkills.map((skill, ind) => (
                <DraggableChip
                  key={skill}
                  onDelete={() => handleDelete('new_skill', skill)}
                  label={skill}
                  skillType='new_skill'
                  index={ind}
                  moveCard={moveCard}
                />
              ))}
            </Grid>
          </Grid>
        )}
        {/* <Grid
              ref={technicalDropRef}
              sx={{
                border: '1px solid',
                borderColor: technicalIsOver ? '#ffffff80' : 'transparent',
                background: technicalIsOver ? '#ffffff17' : 'transparent',
                borderRadius: '10px',
                padding: '5px'
              }}
            >
              <Typography mb='5px'>Technical</Typography>
              <Grid
                sx={{
                  display: 'flex',
                  gap: '10px',
                  flexWrap: 'wrap'
                }}
              >
                {technical.map((skill: any, ind) => (
                  <DraggableChip
                    key={skill.id}
                    onDelete={() =>
                      handleDelete('technical_skills', skill.value)
                    }
                    label={skill.value}
                    skillType='technical_skills'
                    index={ind}
                    moveCard={moveCard}
                  />
                ))}
              </Grid>
            </Grid> */}
        <SkillSection
          onDropSkill={onDropSkill}
          skillType='technical_skills'
          handleDelete={handleDelete}
          list={technical}
        />
        <SkillSection
          onDropSkill={onDropSkill}
          skillType='dev_tools'
          handleDelete={handleDelete}
          list={tools}
        />
        <SkillSection
          onDropSkill={onDropSkill}
          skillType='core_subjects'
          handleDelete={handleDelete}
          list={core}
        />
        <SkillSection
          onDropSkill={onDropSkill}
          skillType='languages'
          handleDelete={handleDelete}
          list={languages}
        />
        {/* <Grid ref={devToolsDropRef}>
              <Typography mb='5px'>Dev Tools</Typography>
              <Grid
                sx={{
                  display: 'flex',
                  gap: '10px',
                  flexWrap: 'wrap'
                }}
              >
                {tools.map((skill: any, ind) => (
                  <DraggableChip
                    key={skill.id}
                    onDelete={() => handleDelete('dev_tools', skill.value)}
                    label={skill.value}
                    skillType='dev_tools'
                    index={ind}
                    moveCard={moveCard}
                  />
                ))}
              </Grid>
            </Grid>
            <Grid ref={coreSubjectsDropRef}>
              <Typography mb='5px'>Core Subjects</Typography>
              <Grid
                sx={{
                  display: 'flex',
                  gap: '10px',
                  flexWrap: 'wrap'
                }}
              >
                {core.map((skill: any, ind) => (
                  <DraggableChip
                    key={skill.id}
                    onDelete={() => handleDelete('core_subjects', skill.value)}
                    label={skill.value}
                    skillType='core_subjects'
                    index={ind}
                    moveCard={moveCard}
                  />
                ))}
              </Grid>
            </Grid>
            <Grid ref={languagesDropRef}>
              <Typography mb='5px'>Languages</Typography>
              <Grid
                sx={{
                  display: 'flex',
                  gap: '10px',
                  flexWrap: 'wrap'
                }}
              >
                {languages.map((skill: any, ind) => (
                  <DraggableChip
                    key={skill.id}
                    onDelete={() => handleDelete('languages', skill.value)}
                    label={skill.value}
                    skillType='languages'
                    index={ind}
                    moveCard={moveCard}
                  />
                ))}
              </Grid>
            </Grid> */}
      </Grid>
    </Grid>
  );
};

export default SkillsContainer;
