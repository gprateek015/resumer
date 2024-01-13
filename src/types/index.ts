import Education from './education';
import Experience from './experience';
import Project from './project';
import User from './user';

export type Skill = {
  id?: string;
  name?: string;
  proficiency?: 'beginner' | 'moderate' | 'expert';
};

export type ProfileLink = {
  id?: string;
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

export type { Education, Experience, Project, User };
