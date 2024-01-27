import { ProfileLink } from '.';
import Education from './education';
import Experience from './experience';
import Project from './project';

type Resume = {
  name?: string;
  city?: string;
  state?: string;
  phone?: string;
  gender?: 'male' | 'female' | 'others';
  email?: string;
  achievements?: string[];
  projects?: Project[];
  experiences?: Experience[];
  educations?: Education[];
  linkedin?: string;
  github?: string;
  profile_links?: ProfileLink[];
  technical_skills?: string[];
  dev_tools?: string[];
  core_subjects?: string[];
  languages?: string[];
};

export default Resume;
