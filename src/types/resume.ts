import { z } from 'zod';

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  summary: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate:string;
  current: boolean;
  location: string;
  responsibilities: string[];
  achievements: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  location: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'soft';
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'basic' | 'conversational' | 'fluent' | 'native';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  startDate: string;
  endDate: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface Resume {
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  projects: Project[];
  certifications: Certification[];
  selectedTemplate: string;
}

// Zod Schemas for validation
export const personalInfoSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  // Allow email to be a valid email OR an empty string
  email: z.string().email().or(z.literal('')),
  phone: z.string(),
  location: z.string(),
  // Allow linkedin to be a valid URL OR an empty string
  linkedin: z.string().url().or(z.literal('')),
  // Allow website to be a valid URL OR an empty string
  website: z.string().url().or(z.literal('')),
  summary: z.string(),
});

export const workExperienceSchema = z.object({
  id: z.string(),
  company: z.string(),
  position: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  current: z.boolean(),
  location: z.string(),
  responsibilities: z.array(z.string()),
  achievements: z.array(z.string()),
});

export const educationSchema = z.object({
  id: z.string(),
  institution: z.string(),
  degree: z.string(),
  field: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  gpa: z.string().optional(),
  location: z.string(),
});

export const skillSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.enum(['technical', 'soft']),
  proficiency: z.enum(['beginner', 'intermediate', 'advanced', 'expert']),
});

export const languageSchema = z.object({
  id: z.string(),
  name: z.string(),
  proficiency: z.enum(['basic', 'conversational', 'fluent', 'native']),
});

export const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  technologies: z.array(z.string()),
  url: z.string().url().or(z.literal('')).optional(),
  startDate: z.string(),
  endDate: z.string(),
});

export const certificationSchema = z.object({
  id: z.string(),
  name: z.string(),
  issuer: z.string(),
  date: z.string(),
  url: z.string().url().or(z.literal('')).optional(),
});

export const resumeSchema = z.object({
  personalInfo: personalInfoSchema,
  workExperience: z.array(workExperienceSchema),
  education: z.array(educationSchema),
  skills: z.array(skillSchema),
  languages: z.array(languageSchema),
  projects: z.array(projectSchema),
  certifications: z.array(certificationSchema),
  selectedTemplate: z.string(),
});