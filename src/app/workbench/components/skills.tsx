import { Chip, Grid, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import Heading from './heading';
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

const Skills = ({
  collapsed,
  toggleCollapse
}: {
  collapsed: boolean;
  toggleCollapse: Function;
}) => {
  const { setValue, getValues } = useFormContext();
  // const technical: string[] = watch('technical_skills') || [];
  // const tools: string[] = watch('dev_tools') || [];
  // const core: string[] = watch('core_subjects') || [];
  // const languages: string[] = watch('languages') || [];

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
    const item = curr.find(
      skill => skill.value === (newVal.name || newVal.value)
    );
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
        technicalAppend({ value: val.name || val.value });
        break;
      }
      case 'dev_tools': {
        toolsAppend({ value: val.name || val.value });
        break;
      }
      case 'core_subjects': {
        coreAppend({ value: val.name || val.value });
        break;
      }
      case 'languages': {
        languagesAppend({ value: val.name || val.value });
        break;
      }
      default: {
        setNewSkills(curr => [...curr, val.name || (val.value as string)]);
      }
    }
  };

  const handleRemoveFromArray = (array: any, val: string) =>
    array.filter((ele: any) => (ele?.value || ele) !== val);

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

  // const [{ technicalIsOver }, technicalDropRef] = useDrop(() => ({
  //   accept: ['core_subjects', 'languages', 'dev_tools', 'new_skill'],
  //   drop: (item: DragSkillItem) => onDropSkill(item, 'technical_skills'),
  //   collect: monitor => ({
  //     technicalIsOver: !!monitor.isOver()
  //   })
  // }));
  // const [{ DevToolsIsOver }, devToolsDropRef] = useDrop(() => ({
  //   accept: ['core_subjects', 'languages', 'technical_skills', 'new_skill'],
  //   drop: (item: DragSkillItem) => onDropSkill(item, 'dev_tools'),
  //   collect: monitor => ({
  //     DevToolsIsOver: !!monitor.isOver()
  //   })
  // }));
  // const [{ CoreSubsIsOver }, coreSubjectsDropRef] = useDrop(() => ({
  //   accept: ['technical_skills', 'languages', 'dev_tools', 'new_skill'],
  //   drop: (item: DragSkillItem) => onDropSkill(item, 'core_subjects'),
  //   collect: monitor => ({
  //     CoreSubsIsOver: !!monitor.isOver()
  //   })
  // }));
  // const [{ languagesIsOver }, languagesDropRef] = useDrop(() => ({
  //   accept: ['core_subjects', 'dev_tools', 'technical_skills', 'new_skill'],
  //   drop: (item: DragSkillItem) => onDropSkill(item, 'languages'),
  //   collect: monitor => ({
  //     languagesIsOver: !!monitor.isOver()
  //   })
  // }));

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
      )}
    </Grid>
  );
};

export default Skills;
