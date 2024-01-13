import { ProfileLink, Skill } from '.';
import Education from './education';
import Experience from './experience';
import Project from './project';

type User = {
  id?: string;
  name?: string;
  username?: string;
  city?: string;
  state?: string;
  country?: string;
  phone?: string;
  gender?: 'male' | 'female' | 'other';
  email?: string;
  profile_links?: ProfileLink[];
  linkedin?: string;
  github?: string;
  twitter?: string;
  portfolio?: string;
  achievements?: string[];
  projects?: Project[];
  experiences?: Experience[];
  skills?: Skill[];
  educations?: Education[];
  referral_code?: string;
  user_role?: 'admin' | 'user';
  resumes?: string[];
  default_resume_id?: string;
  onboarding_completed?: boolean;
};

export default User;
