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
  technical_skills?: { name: string }[];
  dev_tools?: { name: string }[];
  core_subjects?: { name: string }[];
  languages?: { name: string }[];
};

export default Resume;
