import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser } from '@/actions/user';
import { AUTH_TOKEN } from '@/constants';

const resumeData = {
  name: 'Prateek Goyal',
  city: 'Gwalior',
  state: 'Madhya Pradesh',
  phone: '+91 7999856584',
  gender: 'male',
  email: 'prateekgoyal79@gmail.com',
  achievements: [
    'Smart India Hackathon 2022 National Runner-up. Out of 125 submission across India on our problem statement, we were among the top 5 teams.',
    'Specialist at Codeforces with Highest rating of 1470',
    'Highest rating of 1960 at Leetcode, with 600+ DSA questions solved',
    'Ranked 620 at ICPC Kanpur region preliminary round',
    'Ranked 473 among 20000+ participants in Leetcode Biweekly contest 75'
  ],
  projects: [
    {
      name: 'YelpCamp',
      skills_required: ['React.js', 'Node.js', 'EJS', 'MongoDB', 'Mapbox'],
      description: [
        'With the monolithic model-view-controller architecture, I built a fullstack web application based on NodeJS',
        'Yelpcamp offers a simple interface for users to view, add, edit and delete campgrounds as well as leave reviews',
        'Using PassportJS OAuth2.0 to authenticate users and to store user-uploaded files I’m using Cloudinary and it’s APIs'
      ],
      live_url: 'https://yelp-camp-brown.vercel.app/',
      user_id: '647ce532a5a3a4d70901914d',
      id: '647ce5afa5a3a4d709019180'
    },
    {
      name: 'YelpCamp',
      skills_required: ['React.js', 'Node.js', 'EJS', 'MongoDB', 'Mapbox'],
      description: [
        'With the monolithic model-view-controller architecture, I built a fullstack web application based on NodeJS',
        'Yelpcamp offers a simple interface for users to view, add, edit and delete campgrounds as well as leave reviews',
        'Using PassportJS OAuth2.0 to authenticate users and to store user-uploaded files I’m using Cloudinary and it’s APIs'
      ],
      live_url: 'https://yelp-camp-brown.vercel.app/',
      user_id: '647ce532a5a3a4d70901914d',
      id: '648d8d73cfae573f3de45d5e'
    }
  ],
  experiences: [
    {
      company_name: 'Doions Pvt. Ltd.',
      position: 'Software Engineering Intern',
      start_date: 'June 2021',
      end_date: 'August 2021',
      description: [
        'Revamped their website, improving the user experience and adding 5+ core back-end functionalities',
        'Redesigned the website using ReactJs, which resulted in an increased user attraction of about 40%',
        'Designed 3+ mailing templates and fixed various bugs resulting in a 15% improvement in performance'
      ],
      mode: 'remote',
      user_id: '647ce532a5a3a4d70901914d',
      id: '648d821aa13f69be0e709e63'
    },
    {
      company_name: 'Doions Pvt. Ltd.',
      position: 'Software Engineering Intern',
      start_date: 'June 2021',
      end_date: 'August 2021',
      description: [
        'Revamped their website, improving the user experience and adding 5+ core back-end functionalities',
        'Redesigned the website using ReactJs, which resulted in an increased user attraction of about 40%',
        'Designed 3+ mailing templates and fixed various bugs resulting in a 15% improvement in performance'
      ],
      mode: 'remote',
      user_id: '647ce532a5a3a4d70901914d',
      id: '648d8da4cfae573f3de45d6f'
    }
  ],
  educations: [
    {
      level: 'graduation',
      institute_name: 'Jabalpur Engineering College',
      start_year: 2020,
      end_year: 2024,
      score: 8.4,
      scoring_type: 'CGPA',
      maximum_score: 10,
      specialisation: 'Computer Science and Engineering',
      user_id: '647ce532a5a3a4d70901914d',
      id: '650afe121142c7452356d1dd',
      education_type: 'Bachelors in Computer Science and Engineering'
    }
  ],
  linkedin: 'https://linkedin.com/in/prateek-goyal1/',
  github: 'https://github.com/gpratekk015',
  profile_links: [
    {
      name: 'linkedin',
      link: 'https://linkedin.com/in/prateek-goyal1/'
    },
    {
      name: 'github',
      link: 'https://github.com/gpratekk015'
    },
    {
      name: 'leetcode',
      link: 'https://leetcode.com/prateek_01/'
    },
    {
      name: 'codeforces',
      link: 'https://codeforces.com/profile/prateek_01'
    }
  ],
  technical_skills: [
    'Javascript',
    'C/C++',
    'HTML',
    'CSS',
    'React',
    'Python',
    'Express'
  ],
  dev_tools: ['VS Code', 'Jupyter Notebook', 'Xcode', 'Android studio'],
  core_subjects: [
    'Object Oriented Programming',
    'Operating System',
    'DBMS',
    'Computer Networks'
  ],
  languages: ['English', 'Hindi']
};

const initialState = {
  authAoken: '',
  data: {},
  resumeData: resumeData
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserData: state => {
      state.authAoken = '';
      state.data = {};
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload?.user;
        state.authAoken = action.payload?.token;
        localStorage.setItem(AUTH_TOKEN, action.payload?.token);
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload?.user;
        state.authAoken = action.payload?.token;
        localStorage.setItem(AUTH_TOKEN, action.payload?.token);
      });
  }
});

export const { clearUserData } = userSlice.actions;

export default userSlice.reducer;
