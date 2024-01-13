import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Select from 'react-select';

import {
  FormInput,
  FormLabel,
  Heading,
  selectStyles,
  Option,
  Options,
  PageNavButton,
  Button
} from './styles';
import { PageNavPropsType } from '.';
import PageContainer from './page-container';
import { useDispatch, useSelector } from '@/redux/store';
import { deleteEducation, fetchEductions } from '@/actions/education';
import EducationalDetailsEdit from './educational-details-edit';

const EducationalDetails = ({ prevPage, nextPage }: PageNavPropsType) => {
  const dispatch = useDispatch();
  const { educations } = useSelector(state => state.onboarding);
  const [editId, setEditId] = useState<string | undefined | null>(null);

  const handleCancel = () => setEditId(null);

  const handleDelete = async (id?: string) => {
    if (id) await dispatch(deleteEducation(id));
  };

  useEffect(() => {
    if (educations?.length) {
      setEditId('');
    } else {
      setEditId('new');
    }
  }, [educations]);

  useEffect(() => {
    dispatch(fetchEductions());
  }, []);

  return (
    <PageContainer nextPage={nextPage} prevPage={prevPage}>
      <Grid>
        <Heading mb='20px'>
          Kindly provide us the following <br />
          details regarding your education
        </Heading>
        <Grid>
          {educations.map(education => (
            <Box key={education.id}>
              {editId === education.id ? (
                <EducationalDetailsEdit
                  handleCancel={handleCancel}
                  value={education}
                />
              ) : (
                <Grid
                  sx={{
                    border: '1px solid white',
                    p: '10px',
                    borderRadius: '5px',
                    mb: '15px'
                  }}
                >
                  <Grid
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <Typography
                      mr='20px'
                      sx={{
                        fontSize: '16px'
                      }}
                    >
                      {education.institute_name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '12px'
                      }}
                    >
                      {education.start_year as string}&nbsp;-&nbsp;
                      {education.end_year as string}
                    </Typography>
                  </Grid>
                  <Grid
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '12px'
                      }}
                    >
                      {['graduation', 'post_graduation'].includes(
                        education.level as string
                      )
                        ? education.degree
                        : education.level}
                      {[
                        'senior_secondary',
                        'diploma',
                        'graduation',
                        'post_graduation'
                      ].includes(education?.level as string) &&
                        `- ${education.specialisation}`}
                    </Typography>
                    <Typography>
                      {education.scoring_type}&nbsp;{education.score}
                      &nbsp;/&nbsp;
                      {education.maximum_score}
                    </Typography>
                  </Grid>
                  <Grid display={'flex'} gap='20px' mt='10px'>
                    <Button
                      sx={{ flexBasis: '50%' }}
                      onClick={() => setEditId(education.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      sx={{ flexBasis: '50%' }}
                      onClick={() => handleDelete(education.id)}
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              )}
            </Box>
          ))}
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default EducationalDetails;
