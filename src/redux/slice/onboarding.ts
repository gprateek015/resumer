import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchSelf, loginUser, registerUser } from '@/actions/user';
import { AUTH_TOKEN } from '@/constants';
import { generateResumeData, loadResume, uploadResume } from '@/actions/resume';
import {
  User,
  Experience,
  Project,
  Education,
  ProfileLink,
  Skill
} from '@/types';
import { fetchExperiences, postExperience } from '@/actions/experience';
import { fetchEductions, postEducation } from '@/actions/education';
import { fetchProjects, postProject } from '@/actions/project';

export type InitialState = {
  data: {
    experiences: Experience[];
    certificates: ProfileLink[];
    projects: Project[];
    educations: Education[];
    achievements: string[];
    skills: {
      technical_skills?: Skill[];
      core_subjects?: Skill[];
      dev_tools?: Skill[];
      languages?: Skill[];
    };
    profile_links: ProfileLink[];
    phone: string;
    linkedin: string;
    github: string;
    twitter: string;
    portfolio: string;
    country: string;
    state: string;
    city: string;
  };
  errors: any;
  resumeParseCompleted: boolean;
};

const initialState: InitialState = {
  data: {
    experiences: [],
    educations: [],
    certificates: [],
    projects: [],
    achievements: [],
    skills: {},
    profile_links: [],
    phone: '',
    linkedin: '',
    github: '',
    twitter: '',
    portfolio: '',
    country: '',
    state: '',
    city: ''
  },
  errors: null,
  resumeParseCompleted: false
};

export const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    clearOnboardingErrors: state => {
      state.errors = null;
    },
    addExperience: (state, action) => {
      state.data.experiences = [
        ...(state.data.experiences || []),
        action.payload
      ];
    },
    updateExperienceOnb: (state, action) => {
      const { id } = action.payload;
      state.data.experiences = state.data.experiences.map(exp => {
        if (exp._id === id) return action.payload.data;
        return exp;
      });
    },
    deleteExperience: (state, action) => {
      const { id } = action.payload;
      state.data.experiences = state.data.experiences.filter(
        exp => exp._id !== id
      );
    },
    addProject: (state, action) => {
      state.data.projects = [...(state.data.projects || []), action.payload];
    },
    updateProjectOnb: (state, action) => {
      const { id } = action.payload;
      state.data.projects = state.data.projects.map(project => {
        if (project._id === id) return action.payload.data;
        return project;
      });
    },
    deleteProject: (state, action) => {
      const { id } = action.payload;
      state.data.projects = state.data.projects.filter(exp => exp._id !== id);
    },
    addEducation: (state, action) => {
      state.data.educations = [
        ...(state.data.educations || []),
        action.payload
      ];
    },
    updateEducationOnb: (state, action) => {
      const { id } = action.payload;
      state.data.educations = state.data.educations.map(edu => {
        if (edu._id === id) return action.payload.data;
        return edu;
      });
    },
    deleteEducation: (state, action) => {
      const { id } = action.payload;
      state.data.educations = state.data.educations.filter(
        exp => exp._id !== id
      );
    },
    updateOnboardingData: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = {
          ...state.data,
          ...action.payload?.user,
          codingProfiles: action.payload?.user?.profile_links,
          skills: state.data.skills
        };
      })
      .addCase(fetchSelf.fulfilled, (state, action) => {
        state.data = {
          ...state.data,
          ...action.payload?.user,
          codingProfiles: action.payload?.user?.profile_links,
          skills: state.data.skills
        };
      })
      .addCase(fetchExperiences.fulfilled, (state, action) => {
        state.data.experiences = action?.payload?.experiences;
      })
      .addCase(fetchEductions.fulfilled, (state, action) => {
        state.data.educations = action?.payload?.educations;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.data.projects = action?.payload?.projects;
      })
      // .addCase(postExperience.rejected, (state, action) => {
      //   try {
      //     state.errors = JSON.parse(action?.error?.message || '');
      //   } catch (_) {
      //     state.errors = action?.error?.message;
      //   }
      // })
      // .addCase(postEducation.rejected, (state, action) => {
      //   try {
      //     state.errors = JSON.parse(action?.error?.message || '');
      //   } catch (_) {
      //     state.errors = action?.error?.message;
      //   }
      // })
      // .addCase(postProject.rejected, (state, action) => {
      //   try {
      //     state.errors = JSON.parse(action?.error?.message || '');
      //   } catch (_) {
      //     state.errors = action?.error?.message;
      //   }
      // })
      .addCase(uploadResume.fulfilled, (state, action) => {
        state.resumeParseCompleted = action.payload.success;
        state.data = { ...state.data, ...action.payload.data };
      })
      .addCase(uploadResume.rejected, (state, action) => {
        state.errors = action?.error?.message || 'Internal server error';
      });
  }
});

export const {
  clearOnboardingErrors,
  addExperience,
  updateExperienceOnb,
  addProject,
  updateProjectOnb,
  addEducation,
  updateEducationOnb,
  updateOnboardingData,
  deleteExperience,
  deleteProject,
  deleteEducation
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
