import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'de';

interface Translations {
  [key: string]: {
    en: string;
    de: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.dashboard': { en: 'Dashboard', de: 'Dashboard' },
  'nav.profile': { en: 'Profile', de: 'Profil' },
  'nav.templates': { en: 'Templates', de: 'Vorlagen' },
  'nav.preview': { en: 'Preview', de: 'Vorschau' },
  
  // Header
  'header.title': { en: 'Professional Resume Builder', de: 'Professioneller Lebenslauf-Generator' },
  'header.subtitle': { en: 'Create ATS-optimized resumes tailored to your dream job', de: 'Erstellen Sie ATS-optimierte Lebensläufe für Ihren Traumjob' },
  
  // Personal Info
  'personal.title': { en: 'Personal Information', de: 'Persönliche Informationen' },
  'personal.firstName': { en: 'First Name', de: 'Vorname' },
  'personal.lastName': { en: 'Last Name', de: 'Nachname' },
  'personal.email': { en: 'Email', de: 'E-Mail' },
  'personal.phone': { en: 'Phone', de: 'Telefon' },
  'personal.location': { en: 'Location', de: 'Ort' },
  'personal.linkedin': { en: 'LinkedIn', de: 'LinkedIn' },
  'personal.website': { en: 'Website', de: 'Website' },
  'personal.summary': { en: 'Professional Summary', de: 'Berufliche Zusammenfassung' },
  
  // Work Experience
  'work.title': { en: 'Work Experience', de: 'Berufserfahrung' },
  'work.company': { en: 'Company', de: 'Unternehmen' },
  'work.position': { en: 'Position', de: 'Position' },
  'work.startDate': { en: 'Start Date', de: 'Startdatum' },
  'work.endDate': { en: 'End Date', de: 'Enddatum' },
  'work.current': { en: 'Currently working here', de: 'Aktuell hier tätig' },
  'work.location': { en: 'Location', de: 'Ort' },
  'work.responsibilities': { en: 'Responsibilities', de: 'Verantwortlichkeiten' },
  'work.achievements': { en: 'Achievements', de: 'Erfolge' },
  
  // Education
  'education.title': { en: 'Education', de: 'Bildung' },
  'education.institution': { en: 'Institution', de: 'Institution' },
  'education.degree': { en: 'Degree', de: 'Abschluss' },
  'education.field': { en: 'Field of Study', de: 'Studienbereich' },
  'education.gpa': { en: 'GPA (optional)', de: 'Note (optional)' },
  
  // Skills
  'skills.title': { en: 'Skills', de: 'Fähigkeiten' },
  'skills.technical': { en: 'Technical Skills', de: 'Technische Fähigkeiten' },
  'skills.soft': { en: 'Soft Skills', de: 'Soziale Kompetenzen' },
  'skills.proficiency.beginner': { en: 'Beginner', de: 'Anfänger' },
  'skills.proficiency.intermediate': { en: 'Intermediate', de: 'Fortgeschritten' },
  'skills.proficiency.advanced': { en: 'Advanced', de: 'Sehr gut' },
  'skills.proficiency.expert': { en: 'Expert', de: 'Experte' },
  
  // Languages
  'languages.title': { en: 'Languages', de: 'Sprachen' },
  'languages.proficiency.basic': { en: 'Basic', de: 'Grundkenntnisse' },
  'languages.proficiency.conversational': { en: 'Conversational', de: 'Unterhaltung' },
  'languages.proficiency.fluent': { en: 'Fluent', de: 'Fließend' },
  'languages.proficiency.native': { en: 'Native', de: 'Muttersprache' },
  
  // Projects
  'projects.title': { en: 'Projects', de: 'Projekte' },
  'projects.name': { en: 'Project Name', de: 'Projektname' },
  'projects.description': { en: 'Description', de: 'Beschreibung' },
  'projects.technologies': { en: 'Technologies', de: 'Technologien' },
  'projects.url': { en: 'Project URL', de: 'Projekt-URL' },
  
  // Certifications
  'certifications.title': { en: 'Certifications', de: 'Zertifizierungen' },
  'certifications.name': { en: 'Certification Name', de: 'Zertifizierungsname' },
  'certifications.issuer': { en: 'Issuer', de: 'Aussteller' },
  'certifications.date': { en: 'Date Obtained', de: 'Erhaltungsdatum' },
  'certifications.url': { en: 'Certificate URL', de: 'Zertifikat-URL' },
  
  // Buttons
  'button.add': { en: 'Add', de: 'Hinzufügen' },
  'button.save': { en: 'Save', de: 'Speichern' },
  'button.cancel': { en: 'Cancel', de: 'Abbrechen' },
  'button.delete': { en: 'Delete', de: 'Löschen' },
  'button.edit': { en: 'Edit', de: 'Bearbeiten' },
  'button.upload': { en: 'Upload Resume', de: 'Lebenslauf hochladen' },
  'button.download': { en: 'Download PDF', de: 'PDF herunterladen' },
  'button.customize': { en: 'AI Customize', de: 'KI-Anpassung' },
  
  // Templates
  'templates.modern': { en: 'Modern', de: 'Modern' },
  'templates.classic': { en: 'Classic', de: 'Klassisch' },
  'templates.creative': { en: 'Creative', de: 'Kreativ' },
  'templates.minimal': { en: 'Minimal', de: 'Minimal' },
  
  // Steps
  'steps.personal': { en: 'Personal Info', de: 'Persönliche Daten' },
  'steps.experience': { en: 'Experience', de: 'Erfahrung' },
  'steps.education': { en: 'Education', de: 'Bildung' },
  'steps.skills': { en: 'Skills', de: 'Fähigkeiten' },
  'steps.projects': { en: 'Projects', de: 'Projekte' },
  'steps.finalize': { en: 'Finalize', de: 'Abschließen' }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};