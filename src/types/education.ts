type Education = {
  _id?: string;
  id?: string;
  level?:
    | 'lower_secondary'
    | 'senior_secondary'
    | 'diploma'
    | 'graduation'
    | 'post_graduation'
    | string;
  institute_name?: string;
  start_year?: string;
  end_year?: string;
  score?: number;
  scoring_type?: 'cgpa' | 'percentage';
  maximum_score?: number;
  specialisation?: string; // required for levels senior_secondary | diploma | graduation | post_graduation
  degree?: string; // required for levels graduation | post_graduation
  user_id?: string;
};

export default Education;
