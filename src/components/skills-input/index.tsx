import React from 'react';
import { Grid, Typography } from '@mui/material';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { useDispatch } from '@/redux/store';
import { fetchSkills } from '@/actions/skill';
import { Skill } from '@/types';
import { selectStyles } from '../onboarding-questions/styles';

export type CreatableSkill = Skill & {
  name: string;
  label: string;
};

const SkillsInput = ({ onChange }: { onChange: Function }) => {
  const dispatch = useDispatch();
  return (
    <>
      <AsyncCreatableSelect
        onChange={(val: any) => {
          if (!val?._id) {
            // new skill
            onChange({
              ...val,
              type: 'new_skill',
              name: val.value
            });
          } else {
            onChange(val);
          }
        }}
        defaultOptions
        value={null}
        loadOptions={async input => {
          const resp = await dispatch(fetchSkills({ query: input }));
          return resp.payload;
        }}
        getOptionLabel={(opt: CreatableSkill) => {
          if (opt._id) return opt.name;
          return opt.label;
        }}
        getOptionValue={(opt: CreatableSkill) => {
          if (opt._id) return opt._id;
          return opt.name;
        }}
        styles={selectStyles}
        placeholder='Type in the skill...'
      />
    </>
  );
};

export default SkillsInput;
