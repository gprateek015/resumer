import { Grid, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import DraggableChip, { DragSkillItem } from './dragable-chip';
import { useDrop } from 'react-dnd';
import { Skill } from '@/types';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { firstLetterCapital } from '@/utils';
import { righteous } from '@/font-family';

const SkillSection = ({
  onDropSkill,
  skillType,
  handleDelete,
  list
}: {
  onDropSkill: Function;
  skillType: Skill['type'];
  handleDelete: Function;
  list: any[];
}) => {
  const { getValues, setValue } = useFormContext();

  const [{ technicalIsOver }, technicalDropRef] = useDrop(() => ({
    accept: [
      'core_subjects',
      'languages',
      'dev_tools',
      'new_skill',
      'technical_skills'
    ].filter(skill => skill !== skillType),
    drop: (item: DragSkillItem) => onDropSkill(item, skillType),
    collect: monitor => ({
      technicalIsOver: !!monitor.isOver()
    })
  }));

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
      ref={technicalDropRef}
      sx={{
        border: '1px solid',
        borderColor: technicalIsOver ? '#ffffff80' : 'transparent',
        background: technicalIsOver ? '#ffffff17' : 'transparent',
        borderRadius: '10px',
        padding: '5px'
      }}
    >
      <Typography mb='5px' fontFamily={righteous.style.fontFamily}>
        {firstLetterCapital(skillType.split('_').join(' '))}
      </Typography>
      <Grid
        sx={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap'
        }}
      >
        {list.map((skill: any, ind) => (
          <DraggableChip
            key={skill.id}
            onDelete={() => handleDelete(skillType, skill.name)}
            label={skill.name}
            skillType={skillType}
            index={ind}
            moveCard={moveCard}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default SkillSection;
