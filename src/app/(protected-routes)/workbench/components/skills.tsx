import { Chip, Grid, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import SchoolIcon from '@mui/icons-material/School';
import WorkExpDetailDesign from '@/components/work-experiences/detail';
import { SubmitHandler, useFieldArray, useFormContext } from 'react-hook-form';
import { Experience, Skill } from '@/types';
import EduDetailDesign from '@/components/educations/detail';
import ProjectDetailDesign from '@/components/projects/detail';
import SkillsInput, { CreatableSkill } from '@/components/skills-input';

import { useDrop } from 'react-dnd';
import SkillsContainer from '@/components/profile-details/skills';
import Heading from './heading';
import { DragSkillItem } from '../../../components/profile-details/dragable-chip';

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
    const item = curr?.find(skill => skill.value === newVal.name);
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
          <SkillsContainer />
        </Grid>
      )}
    </Grid>
  );
};

export default Skills;
