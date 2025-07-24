import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
} from 'react';
import {
  Resume,
  PersonalInfo,
  WorkExperience,
  Education,
  Skill,
  Language,
  Project,
  Certification,
} from '../types/resume';

interface ResumeState {
  resume: Resume;
  currentStep: number;
  isPreviewMode: boolean;
}

type ResumeAction =
  | { type: 'UPDATE_PERSONAL_INFO'; payload: PersonalInfo }
  | { type: 'ADD_WORK_EXPERIENCE'; payload: WorkExperience }
  | { type: 'UPDATE_WORK_EXPERIENCE'; payload: { id: string; data: WorkExperience } }
  | { type: 'DELETE_WORK_EXPERIENCE'; payload: string }
  | { type: 'ADD_EDUCATION'; payload: Education }
  | { type: 'UPDATE_EDUCATION'; payload: { id: string; data: Education } }
  | { type: 'DELETE_EDUCATION'; payload: string }
  | { type: 'ADD_SKILL'; payload: Skill }
  | { type: 'DELETE_SKILL'; payload: string }
  | { type: 'ADD_LANGUAGE'; payload: Language }
  | { type: 'DELETE_LANGUAGE'; payload: string }
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT'; payload: { id: string; data: Project } }
  | { type: 'DELETE_PROJECT'; payload: string }
  | { type: 'ADD_CERTIFICATION'; payload: Certification }
  | { type: 'DELETE_CERTIFICATION'; payload: string }
  | { type: 'SET_TEMPLATE'; payload: string }
  | { type: 'SET_STEP'; payload: number }
  | { type: 'TOGGLE_PREVIEW' }
  | { type: 'LOAD_RESUME'; payload: Partial<Resume> }; 

const initialState: ResumeState = {
  resume: {
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: '',
      summary: '',
    },
    workExperience: [],
    education: [],
    skills: [],
    languages: [],
    projects: [],
    certifications: [],
    selectedTemplate: 'modern',
  },
  currentStep: 0,
  isPreviewMode: false,
};

function resumeReducer(state: ResumeState, action: ResumeAction): ResumeState {
  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        resume: {
          ...state.resume,
          personalInfo: action.payload,
        },
      };
    case 'ADD_WORK_EXPERIENCE':
      return {
        ...state,
        resume: {
          ...state.resume,
          workExperience: [...state.resume.workExperience, action.payload],
        },
      };
    case 'UPDATE_WORK_EXPERIENCE':
      return {
        ...state,
        resume: {
          ...state.resume,
          workExperience: state.resume.workExperience.map((exp) =>
            exp.id === action.payload.id ? action.payload.data : exp,
          ),
        },
      };
    case 'DELETE_WORK_EXPERIENCE':
      return {
        ...state,
        resume: {
          ...state.resume,
          workExperience: state.resume.workExperience.filter(
            (exp) => exp.id !== action.payload,
          ),
        },
      };
    case 'ADD_EDUCATION':
      return {
        ...state,
        resume: {
          ...state.resume,
          education: [...state.resume.education, action.payload],
        },
      };
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        resume: {
          ...state.resume,
          education: state.resume.education.map((edu) =>
            edu.id === action.payload.id ? action.payload.data : edu,
          ),
        },
      };
    case 'DELETE_EDUCATION':
      return {
        ...state,
        resume: {
          ...state.resume,
          education: state.resume.education.filter(
            (edu) => edu.id !== action.payload,
          ),
        },
      };
    case 'ADD_SKILL':
      return {
        ...state,
        resume: {
          ...state.resume,
          skills: [...state.resume.skills, action.payload],
        },
      };
    case 'DELETE_SKILL':
      return {
        ...state,
        resume: {
          ...state.resume,
          skills: state.resume.skills.filter(
            (skill) => skill.id !== action.payload,
          ),
        },
      };
    case 'ADD_LANGUAGE':
      return {
        ...state,
        resume: {
          ...state.resume,
          languages: [...state.resume.languages, action.payload],
        },
      };
    case 'DELETE_LANGUAGE':
      return {
        ...state,
        resume: {
          ...state.resume,
          languages: state.resume.languages.filter(
            (lang) => lang.id !== action.payload,
          ),
        },
      };
    case 'ADD_PROJECT':
      return {
        ...state,
        resume: {
          ...state.resume,
          projects: [...state.resume.projects, action.payload],
        },
      };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        resume: {
          ...state.resume,
          projects: state.resume.projects.map((proj) =>
            proj.id === action.payload.id ? action.payload.data : proj,
          ),
        },
      };
    case 'DELETE_PROJECT':
      return {
        ...state,
        resume: {
          ...state.resume,
          projects: state.resume.projects.filter(
            (proj) => proj.id !== action.payload,
          ),
        },
      };
    case 'ADD_CERTIFICATION':
      return {
        ...state,
        resume: {
          ...state.resume,
          certifications: [...state.resume.certifications, action.payload],
        },
      };
    case 'DELETE_CERTIFICATION':
      return {
        ...state,
        resume: {
          ...state.resume,
          certifications: state.resume.certifications.filter(
            (cert) => cert.id !== action.payload,
          ),
        },
      };
    case 'SET_TEMPLATE':
      return {
        ...state,
        resume: {
          ...state.resume,
          selectedTemplate: action.payload,
        },
      };
    case 'SET_STEP':
      return {
        ...state,
        currentStep: action.payload,
      };
    case 'TOGGLE_PREVIEW':
      return {
        ...state,
        isPreviewMode: !state.isPreviewMode,
      };
    case 'LOAD_RESUME': {
      const loaded = action.payload;
      return {
        ...state,
        resume: {
          personalInfo: {
            ...initialState.resume.personalInfo,
            ...loaded.personalInfo,
          },
          workExperience: loaded.workExperience || [],
          education: loaded.education || [],
          skills: loaded.skills || [],
          languages: loaded.languages || [],
          projects: loaded.projects || [],
          certifications: loaded.certifications || [],
          selectedTemplate:
            loaded.selectedTemplate || state.resume.selectedTemplate,
        },
      };
    }
    default:
      return state;
  }
}

interface ResumeContextType {
  state: ResumeState;
  dispatch: React.Dispatch<ResumeAction>;
  updatePersonalInfo: (info: PersonalInfo) => void;
  addWorkExperience: (exp: WorkExperience) => void;
  updateWorkExperience: (id: string, data: WorkExperience) => void;
  deleteWorkExperience: (id: string) => void;
  addEducation: (edu: Education) => void;
  updateEducation: (id: string, data: Education) => void;
  deleteEducation: (id: string) => void;
  addSkill: (skill: Skill) => void;
  deleteSkill: (id: string) => void;
  addLanguage: (lang: Language) => void;
  deleteLanguage: (id: string) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, data: Project) => void;
  deleteProject: (id: string) => void;
  addCertification: (cert: Certification) => void;
  deleteCertification: (id: string) => void;
  setTemplate: (template: string) => void;
  setStep: (step: number) => void;
  togglePreview: () => void;
  loadResume: (resume: Partial<Resume>) => void; 
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(resumeReducer, initialState);

  const contextValue: ResumeContextType = {
    state,
    dispatch,
    updatePersonalInfo: (info) =>
      dispatch({ type: 'UPDATE_PERSONAL_INFO', payload: info }),
    addWorkExperience: (exp) =>
      dispatch({ type: 'ADD_WORK_EXPERIENCE', payload: exp }),
    updateWorkExperience: (id, data) =>
      dispatch({ type: 'UPDATE_WORK_EXPERIENCE', payload: { id, data } }),
    deleteWorkExperience: (id) =>
      dispatch({ type: 'DELETE_WORK_EXPERIENCE', payload: id }),
    addEducation: (edu) => dispatch({ type: 'ADD_EDUCATION', payload: edu }),
    updateEducation: (id, data) =>
      dispatch({ type: 'UPDATE_EDUCATION', payload: { id, data } }),
    deleteEducation: (id) =>
      dispatch({ type: 'DELETE_EDUCATION', payload: id }),
    addSkill: (skill) => dispatch({ type: 'ADD_SKILL', payload: skill }),
    deleteSkill: (id) => dispatch({ type: 'DELETE_SKILL', payload: id }),
    addLanguage: (lang) => dispatch({ type: 'ADD_LANGUAGE', payload: lang }),
    deleteLanguage: (id) => dispatch({ type: 'DELETE_LANGUAGE', payload: id }),
    addProject: (project) => dispatch({ type: 'ADD_PROJECT', payload: project }),
    updateProject: (id, data) =>
      dispatch({ type: 'UPDATE_PROJECT', payload: { id, data } }),
    deleteProject: (id) => dispatch({ type: 'DELETE_PROJECT', payload: id }),
    addCertification: (cert) =>
      dispatch({ type: 'ADD_CERTIFICATION', payload: cert }),
    deleteCertification: (id) =>
      dispatch({ type: 'DELETE_CERTIFICATION', payload: id }),
    setTemplate: (template) =>
      dispatch({ type: 'SET_TEMPLATE', payload: template }),
    setStep: (step) => dispatch({ type: 'SET_STEP', payload: step }),
    togglePreview: () => dispatch({ type: 'TOGGLE_PREVIEW' }),
    loadResume: (resume) =>
      dispatch({ type: 'LOAD_RESUME', payload: resume }),
  };

  return (
    <ResumeContext.Provider value={contextValue}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};