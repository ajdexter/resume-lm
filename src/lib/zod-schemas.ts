import { z } from "zod";

// Base schemas for reusable components
export const workExperienceSchema = z.object({
  company: z.string(),
  position: z.string(),
  location: z.string().optional(),
  date: z.string(),
  description: z.array(z.string()),
  technologies: z.array(z.string()).optional(),
});

export const educationSchema = z.object({
  school: z.string(),
  degree: z.string(),
  field: z.string(),
  location: z.string().optional(),
  date: z.string(),
  gpa: z.string().optional(),
  achievements: z.array(z.string()).optional(),
});

export const projectSchema = z.object({
  name: z.string(),
  description: z.array(z.string()),
  date: z.string().optional(),
  technologies: z.array(z.string()).optional(),
  url: z.string().url().optional(),
  github_url: z.string().url().optional(),
});

export const skillSchema = z.object({
  category: z.string(),
  items: z.array(z.string()),
});

export const certificationSchema = z.object({
  name: z.string(),
  issuer: z.string(),
  date_acquired: z.string().optional(),
  expiry_date: z.string().optional(),
  credential_id: z.string().optional(),
  url: z.string().url().optional(),
});

export const documentSettingsSchema = z.object({
  // Global Settings
  document_font_size: z.number(),
  document_line_height: z.number(),
  document_margin_vertical: z.number(),
  document_margin_horizontal: z.number(),

  // Header Settings
  header_name_size: z.number(),
  header_name_bottom_spacing: z.number(),

  // Skills Section
  skills_margin_top: z.number(),
  skills_margin_bottom: z.number(),
  skills_margin_horizontal: z.number(),
  skills_item_spacing: z.number(),

  // Experience Section
  experience_margin_top: z.number(),
  experience_margin_bottom: z.number(),
  experience_margin_horizontal: z.number(),
  experience_item_spacing: z.number(),

  // Projects Section
  projects_margin_top: z.number(),
  projects_margin_bottom: z.number(),
  projects_margin_horizontal: z.number(),
  projects_item_spacing: z.number(),

  // Education Section
  education_margin_top: z.number(),
  education_margin_bottom: z.number(),
  education_margin_horizontal: z.number(),
  education_item_spacing: z.number(),
});

export const sectionConfigSchema = z.object({
  visible: z.boolean(),
  max_items: z.number().nullable().optional(),
  style: z.enum(['grouped', 'list', 'grid']).optional(),
});

// Main Resume Schema
export const resumeSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  name: z.string(),
  target_role: z.string(),
  is_base_resume: z.boolean(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  phone_number: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url().optional(),
  linkedin_url: z.string().url().optional(),
  github_url: z.string().url().optional(),
  work_experience: z.array(workExperienceSchema),
  education: z.array(educationSchema),
  skills: z.array(skillSchema),
  projects: z.array(projectSchema),
  certifications: z.array(certificationSchema),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  document_settings: documentSettingsSchema.optional(),
  section_order: z.array(z.string()).optional(),
  section_configs: z.record(sectionConfigSchema).optional(),
});

// Type inference helpers
export type Resume = z.infer<typeof resumeSchema>;
export type WorkExperience = z.infer<typeof workExperienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Skill = z.infer<typeof skillSchema>;
export type Certification = z.infer<typeof certificationSchema>;
export type DocumentSettings = z.infer<typeof documentSettingsSchema>;
export type SectionConfig = z.infer<typeof sectionConfigSchema>; 