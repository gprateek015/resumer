type Experience = {
  _id: string;
  id?: string;
  company_name?: string;
  position?: string;
  start_date?: string;
  end_date?: string;
  description?: string[];
  mode?: 'onsite' | 'remote';
  location?: string;
  user_id?: string;
};

export default Experience;
