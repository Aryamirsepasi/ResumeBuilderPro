import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Link,
} from '@react-pdf/renderer';
import { Resume } from '../../../../types/resume';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.4,
    color: '#333',
  },
  header: { textAlign: 'center', marginBottom: 20 },
  name: { fontSize: 24, fontFamily: 'Helvetica-Bold', marginBottom: 8 },
  contactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 12,
    fontSize: 9,
    color: '#4a4a4a',
  },
  link: { color: '#4a4a4a', textDecoration: 'none' },
  summary: { textAlign: 'justify', marginHorizontal: 20 },
  section: { marginBottom: 16 },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    paddingBottom: 3,
  },
  entry: { marginBottom: 12 },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  position: { fontFamily: 'Helvetica-Bold' },
  company: { fontFamily: 'Helvetica-Oblique' },
  dateLocation: { textAlign: 'right', color: '#555' },
  listItem: { flexDirection: 'row', marginBottom: 3 },
  bullet: { marginRight: 5, fontFamily: 'Helvetica-Bold' },
  skillCategory: { fontFamily: 'Helvetica-Bold', marginBottom: 4 },
  skillList: { marginBottom: 8 },
  langItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
});

const formatDate = (dateString: string, lang: 'en' | 'de') => {
  if (!dateString) return '';
  const [year, month] = dateString.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return lang === 'de'
    ? date.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })
    : date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

const ModernTemplatePDF: React.FC<{ resume: Resume; language: 'en' | 'de' }> =
  ({ resume, language }) => {
    const titles =
      language === 'de'
        ? {
            experience: 'BERUFSERFAHRUNG',
            education: 'BILDUNG',
            skills: 'FÄHIGKEITEN',
            languages: 'SPRACHEN',
            projects: 'PROJEKTE',
            certifications: 'ZERTIFIZIERUNGEN',
          }
        : {
            experience: 'PROFESSIONAL EXPERIENCE',
            education: 'EDUCATION',
            skills: 'SKILLS',
            languages: 'LANGUAGES',
            projects: 'PROJECTS',
            certifications: 'CERTIFICATIONS',
          };

    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.name}>
              {resume.personalInfo.firstName} {resume.personalInfo.lastName}
            </Text>
            <View style={styles.contactInfo}>
              <Text>{resume.personalInfo.email}</Text>
              <Text> | </Text>
              <Text>{resume.personalInfo.phone}</Text>
              <Text> | </Text>
              <Text>{resume.personalInfo.location}</Text>
              {resume.personalInfo.linkedin && (
                <>
                  <Text> | </Text>
                  <Link src={resume.personalInfo.linkedin} style={styles.link}>
                    LinkedIn
                  </Link>
                </>
              )}
              {resume.personalInfo.website && (
                <>
                  <Text> | </Text>
                  <Link src={resume.personalInfo.website} style={styles.link}>
                    Website
                  </Link>
                </>
              )}
            </View>
            <Text style={styles.summary}>{resume.personalInfo.summary}</Text>
          </View>

          {resume.workExperience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{titles.experience}</Text>
              {resume.workExperience.map((exp) => (
                <View key={exp.id} style={styles.entry}>
                  <View style={styles.entryHeader}>
                    <View>
                      <Text style={styles.position}>{exp.position}</Text>
                      <Text style={styles.company}>{exp.company}</Text>
                    </View>
                    <View style={styles.dateLocation}>
                      <Text>
                        {formatDate(exp.startDate, language)} -{' '}
                        {exp.current
                          ? language === 'de'
                            ? 'Heute'
                            : 'Present'
                          : formatDate(exp.endDate, language)}
                      </Text>
                      <Text>{exp.location}</Text>
                    </View>
                  </View>
                  {exp.responsibilities.map((resp, i) => (
                    <View key={i} style={styles.listItem}>
                      <Text style={styles.bullet}>•</Text>
                      <Text>{resp}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}

          {resume.education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{titles.education}</Text>
              {resume.education.map((edu) => (
                <View key={edu.id} style={styles.entry}>
                  <View style={styles.entryHeader}>
                    <View>
                      <Text style={styles.position}>
                        {edu.degree} in {edu.field}
                      </Text>
                      <Text style={styles.company}>
                        {edu.institution}, {edu.location}
                      </Text>
                    </View>
                    <View style={styles.dateLocation}>
                      <Text>
                        {formatDate(edu.startDate, language)} -{' '}
                        {formatDate(edu.endDate, language)}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}

          {resume.skills.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{titles.skills}</Text>
              <View style={styles.skillList}>
                <Text style={styles.skillCategory}>
                  {language === 'de'
                    ? 'Technische Fähigkeiten'
                    : 'Technical Skills'}
                </Text>
                <Text>
                  {resume.skills
                    .filter((s) => s.category === 'technical')
                    .map((s) => s.name)
                    .join(', ')}
                </Text>
              </View>
              <View style={styles.skillList}>
                <Text style={styles.skillCategory}>
                  {language === 'de'
                    ? 'Soziale Kompetenzen'
                    : 'Soft Skills'}
                </Text>
                <Text>
                  {resume.skills
                    .filter((s) => s.category === 'soft')
                    .map((s) => s.name)
                    .join(', ')}
                </Text>
              </View>
            </View>
          )}

          {resume.languages.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{titles.languages}</Text>
              {resume.languages.map((lang) => (
                <View key={lang.id} style={styles.langItem}>
                  <Text>{lang.name}</Text>
                  <Text style={{ textTransform: 'capitalize' }}>
                    {lang.proficiency}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </Page>
      </Document>
    );
  };

export default ModernTemplatePDF;