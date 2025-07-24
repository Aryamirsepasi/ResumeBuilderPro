import React from 'react';
import { Resume } from '../../../types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface CreativeTemplateProps {
  resume: Resume;
  language: 'en' | 'de';
}

const CreativeTemplate: React.FC<CreativeTemplateProps> = ({ resume, language }) => {
  const { personalInfo, workExperience, education, skills, languages, projects, certifications } = resume;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return language === 'de' 
      ? date.toLocaleDateString('de-DE', { month: 'short', year: 'numeric' })
      : date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const sectionTitles = {
    en: {
      experience: 'EXPERIENCE',
      education: 'EDUCATION',
      skills: 'SKILLS',
      languages: 'LANGUAGES',
      projects: 'PROJECTS',
      certifications: 'CERTIFICATIONS'
    },
    de: {
      experience: 'ERFAHRUNG',
      education: 'BILDUNG',
      skills: 'FÄHIGKEITEN',
      languages: 'SPRACHEN',
      projects: 'PROJEKTE',
      certifications: 'ZERTIFIZIERUNGEN'
    }
  };

  const titles = sectionTitles[language];

  const getProficiencyWidth = (proficiency: string) => {
    switch (proficiency) {
      case 'beginner':
      case 'basic':
        return 'w-1/4';
      case 'intermediate':
      case 'conversational':
        return 'w-1/2';
      case 'advanced':
      case 'fluent':
        return 'w-3/4';
      case 'expert':
      case 'native':
        return 'w-full';
      default:
        return 'w-1/2';
    }
  };

  return (
    <div className="bg-white min-h-full" style={{ fontFamily: 'Arial, sans-serif', fontSize: '10pt', lineHeight: '1.2' }}>
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="font-bold mb-2" style={{ fontSize: '20pt', fontFamily: 'Arial, sans-serif' }}>
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            
            <div className="flex flex-wrap gap-4 text-purple-100 mb-4" style={{ fontSize: '10pt' }}>
              {personalInfo.email && (
                <div className="flex items-center space-x-1">
                  <Mail className="w-3 h-3" />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center space-x-1">
                  <Phone className="w-3 h-3" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
            </div>

            {personalInfo.summary && (
              <p className="text-purple-100 max-w-2xl" style={{ fontSize: '10pt', lineHeight: '1.3' }}>
                {personalInfo.summary}
              </p>
            )}
          </div>

          <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <div className="text-4xl font-bold">
              {personalInfo.firstName.charAt(0)}{personalInfo.lastName.charAt(0)}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 grid grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Work Experience */}
          {workExperience.length > 0 && (
            <section>
              <h2 className="font-bold text-purple-600 mb-4 flex items-center" style={{ fontSize: '20pt', fontFamily: 'Arial, sans-serif' }}>
                <div className="w-6 h-6 bg-purple-600 rounded-full mr-2"></div>
                {titles.experience}
              </h2>
              <div className="space-y-4">
                {workExperience.map((exp, index) => (
                  <div key={exp.id} className="relative pl-6">
                    <div className="absolute left-0 top-0 w-3 h-3 bg-pink-500 rounded-full"></div>
                    {index < workExperience.length - 1 && (
                      <div className="absolute left-1.5 top-3 w-0.5 h-12 bg-pink-200"></div>
                    )}
                    
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <h3 className="font-bold text-gray-900" style={{ fontSize: '10pt' }}>{exp.position}</h3>
                          <p className="text-purple-600 font-semibold" style={{ fontSize: '10pt' }}>{exp.company}</p>
                        </div>
                        <div className="text-right text-gray-600" style={{ fontSize: '10pt' }}>
                          <p>{formatDate(exp.startDate)} - {exp.current ? (language === 'de' ? 'Heute' : 'Present') : formatDate(exp.endDate)}</p>
                          <p>{exp.location}</p>
                        </div>
                      </div>
                      
                      {exp.responsibilities.length > 0 && (
                        <ul className="list-disc list-inside text-gray-700 space-y-1 mb-2" style={{ fontSize: '10pt' }}>
                          {exp.responsibilities.map((resp, index) => (
                            <li key={index}>{resp}</li>
                          ))}
                        </ul>
                      )}
                      
                      {exp.achievements.length > 0 && (
                        <div className="mt-2">
                          <h4 className="font-semibold text-gray-900 mb-1" style={{ fontSize: '10pt' }}>Key Achievements:</h4>
                          <ul className="list-disc list-inside text-gray-700 space-y-1" style={{ fontSize: '10pt' }}>
                            {exp.achievements.map((achievement, index) => (
                              <li key={index} className="font-semibold text-purple-700">{achievement}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <h2 className="font-bold text-purple-600 mb-4 flex items-center" style={{ fontSize: '20pt', fontFamily: 'Arial, sans-serif' }}>
                <div className="w-6 h-6 bg-purple-600 rounded-full mr-2"></div>
                {titles.projects}
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {projects.map((project) => (
                  <div key={project.id} className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-3 border-l-4 border-pink-500">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-gray-900" style={{ fontSize: '10pt' }}>{project.name}</h3>
                      <span className="text-gray-600" style={{ fontSize: '10pt' }}>
                        {formatDate(project.startDate)} - {formatDate(project.endDate)}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2" style={{ fontSize: '10pt' }}>{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-purple-200 text-purple-800 rounded-full"
                          style={{ fontSize: '8pt' }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="font-bold text-purple-600 mb-3" style={{ fontSize: '20pt', fontFamily: 'Arial, sans-serif' }}>
                {titles.education}
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="bg-purple-50 rounded-lg p-2">
                    <h3 className="font-bold text-gray-900" style={{ fontSize: '10pt' }}>{edu.degree}</h3>
                    <p className="text-gray-700" style={{ fontSize: '10pt' }}>{edu.field}</p>
                    <p className="text-purple-600 font-semibold" style={{ fontSize: '10pt' }}>{edu.institution}</p>
                    <p className="text-gray-600" style={{ fontSize: '10pt' }}>
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                    {edu.gpa && <p className="text-gray-600" style={{ fontSize: '10pt' }}>GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className="font-bold text-purple-600 mb-3" style={{ fontSize: '20pt', fontFamily: 'Arial, sans-serif' }}>
                {titles.skills}
              </h2>
              <div className="space-y-3">
                {['technical', 'soft'].map((category) => {
                  const categorySkills = skills.filter(skill => skill.category === category);
                  if (categorySkills.length === 0) return null;
                  
                  return (
                    <div key={category}>
                      <h4 className="font-bold text-gray-900 mb-2" style={{ fontSize: '10pt' }}>
                        {category === 'technical' ? (language === 'de' ? 'Technisch' : 'Technical') : (language === 'de' ? 'Sozial' : 'Soft Skills')}
                      </h4>
                      <div className="space-y-1">
                        {categorySkills.map((skill) => (
                          <div key={skill.id}>
                            <div className="flex justify-between mb-1" style={{ fontSize: '8pt' }}>
                              <span className="text-gray-900">{skill.name}</span>
                              <span className="text-gray-600 capitalize">{skill.proficiency}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div className={`bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full ${getProficiencyWidth(skill.proficiency)}`}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <section>
              <h2 className="font-bold text-purple-600 mb-3" style={{ fontSize: '20pt', fontFamily: 'Arial, sans-serif' }}>
                {titles.languages}
              </h2>
              <div className="space-y-1">
                {languages.map((lang) => (
                  <div key={lang.id}>
                    <div className="flex justify-between mb-1" style={{ fontSize: '8pt' }}>
                      <span className="text-gray-900">{lang.name}</span>
                      <span className="text-gray-600 capitalize">{lang.proficiency}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className={`bg-gradient-to-r from-pink-500 to-purple-500 h-1.5 rounded-full ${getProficiencyWidth(lang.proficiency)}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section>
              <h2 className="font-bold text-purple-600 mb-3" style={{ fontSize: '20pt', fontFamily: 'Arial, sans-serif' }}>
                {titles.certifications}
              </h2>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id} className="bg-pink-50 rounded-lg p-2">
                    <h4 className="font-bold text-gray-900" style={{ fontSize: '10pt' }}>{cert.name}</h4>
                    <p className="text-purple-600" style={{ fontSize: '10pt' }}>{cert.issuer}</p>
                    <p className="text-gray-600" style={{ fontSize: '10pt' }}>{formatDate(cert.date)}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Contact Links */}
          <section>
            <h2 className="font-bold text-purple-600 mb-3" style={{ fontSize: '20pt', fontFamily: 'Arial, sans-serif' }}>Contact</h2>
            <div className="space-y-1">
              {personalInfo.linkedin && (
                <div className="flex items-center space-x-1" style={{ fontSize: '10pt' }}>
                  <Linkedin className="w-3 h-3 text-purple-600" />
                  <span className="text-gray-700">LinkedIn</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center space-x-1" style={{ fontSize: '10pt' }}>
                  <Globe className="w-3 h-3 text-purple-600" />
                  <span className="text-gray-700">Portfolio</span>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;