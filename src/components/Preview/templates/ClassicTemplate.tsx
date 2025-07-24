import React from 'react';
import { Resume } from '../../../types/resume';

interface ClassicTemplateProps {
  resume: Resume;
  language: 'en' | 'de';
}

const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ resume, language }) => {
  const { personalInfo, workExperience, education, skills, languages, projects, certifications } = resume;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return language === 'de' 
      ? date.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })
      : date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const sectionTitles = {
    en: {
      experience: 'PROFESSIONAL EXPERIENCE',
      education: 'EDUCATION',
      skills: 'SKILLS',
      languages: 'LANGUAGES',
      projects: 'PROJECTS',
      certifications: 'CERTIFICATIONS'
    },
    de: {
      experience: 'BERUFSERFAHRUNG',
      education: 'BILDUNG',
      skills: 'FÄHIGKEITEN',
      languages: 'SPRACHEN',
      projects: 'PROJEKTE',
      certifications: 'ZERTIFIZIERUNGEN'
    }
  };

  const titles = sectionTitles[language];

  return (
    <div className="p-8 bg-white min-h-full" style={{ fontFamily: 'Arial, sans-serif', fontSize: '10pt', lineHeight: '1.2' }}>
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="font-bold text-gray-900 mb-3" style={{ fontSize: '20pt', fontFamily: 'Arial, sans-serif' }}>
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        
        <div className="text-gray-600 space-y-1" style={{ fontSize: '10pt' }}>
          {personalInfo.email && <p>{personalInfo.email}</p>}
          {personalInfo.phone && <p>{personalInfo.phone}</p>}
          {personalInfo.location && <p>{personalInfo.location}</p>}
          {personalInfo.linkedin && <p>{personalInfo.linkedin}</p>}
          {personalInfo.website && <p>{personalInfo.website}</p>}
        </div>

        {personalInfo.summary && (
          <p className="text-gray-700 text-justify mt-4 max-w-4xl mx-auto" style={{ fontSize: '10pt', lineHeight: '1.3' }}>
            {personalInfo.summary}
          </p>
        )}
      </div>

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <section className="mb-6">
          <h2 className="font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1" style={{ fontSize: '20pt', fontFamily: 'Arial, sans-serif' }}>
            {titles.experience}
          </h2>
          <div className="space-y-4">
            {workExperience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-gray-900" style={{ fontSize: '10pt' }}>{exp.position}</h3>
                    <p className="text-gray-700 font-semibold" style={{ fontSize: '10pt' }}>{exp.company}, {exp.location}</p>
                  </div>
                  <p className="text-gray-600" style={{ fontSize: '10pt' }}>
                    {formatDate(exp.startDate)} - {exp.current ? (language === 'de' ? 'Heute' : 'Present') : formatDate(exp.endDate)}
                  </p>
                </div>
                
                {exp.responsibilities.length > 0 && (
                  <ul className="list-disc list-inside text-gray-700 space-y-1" style={{ fontSize: '10pt' }}>
                    {exp.responsibilities.map((resp, index) => (
                      <li key={index}>{resp}</li>
                    ))}
                  </ul>
                )}
                
                {exp.achievements.length > 0 && (
                  <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2" style={{ fontSize: '10pt' }}>
                    {exp.achievements.map((achievement, index) => (
                      <li key={index} className="font-semibold">{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1" style={{ fontSize: '20pt', fontFamily: 'Arial, sans-serif' }}>
            {titles.education}
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900" style={{ fontSize: '10pt' }}>{edu.degree} in {edu.field}</h3>
                  <p className="text-gray-700" style={{ fontSize: '10pt' }}>{edu.institution}, {edu.location}</p>
                  {edu.gpa && <p className="text-gray-600" style={{ fontSize: '10pt' }}>GPA: {edu.gpa}</p>}
                </div>
                <p className="text-gray-600" style={{ fontSize: '10pt' }}>
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills and Languages */}
      <div className="grid grid-cols-2 gap-8 mb-6">
        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1" style={{ fontSize: '20pt', fontFamily: 'Arial, sans-serif' }}>
              {titles.skills}
            </h2>
            <div className="space-y-3">
              {['technical', 'soft'].map((category) => {
                const categorySkills = skills.filter(skill => skill.category === category);
                if (categorySkills.length === 0) return null;
                
                return (
                  <div key={category}>
                    <h4 className="font-bold text-gray-900 mb-1" style={{ fontSize: '10pt' }}>
                      {category === 'technical' ? (language === 'de' ? 'Technische Fähigkeiten' : 'Technical Skills') : (language === 'de' ? 'Soziale Kompetenzen' : 'Soft Skills')}
                    </h4>
                    <p className="text-gray-700" style={{ fontSize: '10pt' }}>
                      {categorySkills.map(skill => skill.name).join(', ')}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <section>
            <h2 className="font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1" style={{ fontSize: '20pt', fontFamily: 'Arial, sans-serif' }}>
              {titles.languages}
            </h2>
            <div className="space-y-2">
              {languages.map((lang) => (
                <div key={lang.id} className="flex justify-between">
                  <span className="text-gray-900" style={{ fontSize: '10pt' }}>{lang.name}</span>
                  <span className="text-gray-600 capitalize" style={{ fontSize: '10pt' }}>{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1" style={{ fontSize: '20pt', fontFamily: 'Arial, sans-serif' }}>
            {titles.projects}
          </h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-gray-900" style={{ fontSize: '10pt' }}>{project.name}</h3>
                  <span className="text-gray-600" style={{ fontSize: '10pt' }}>
                    {formatDate(project.startDate)} - {formatDate(project.endDate)}
                  </span>
                </div>
                <p className="text-gray-700 mb-1" style={{ fontSize: '10pt' }}>{project.description}</p>
                <p className="text-gray-600" style={{ fontSize: '10pt' }}>
                  <strong>Technologies:</strong> {project.technologies.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section>
          <h2 className="font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1" style={{ fontSize: '20pt', fontFamily: 'Arial, sans-serif' }}>
            {titles.certifications}
          </h2>
          <div className="space-y-3">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-gray-900" style={{ fontSize: '10pt' }}>{cert.name}</h4>
                  <p className="text-gray-700" style={{ fontSize: '10pt' }}>{cert.issuer}</p>
                </div>
                <p className="text-gray-600" style={{ fontSize: '10pt' }}>{formatDate(cert.date)}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;