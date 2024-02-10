import Education from './education';
import Experience from './experience';
import Project from './project';
import User from './user';
import Resume from './resume';

export type Skill = {
  _id?: string;
  name: string;
  type: 'technical_skills' | 'dev_tools' | 'core_subjects' | 'languages';
};

export type ProfileLink = {
  _id?: string;
  name:
    | 'leetcode'
    | 'codeforces'
    | 'geeksforgeeks'
    | 'hackerrank'
    | 'hackerearth'
    | 'atcoder'
    | 'codechef';
  link?: string;
};

export type { Education, Experience, Project, User, Resume };
