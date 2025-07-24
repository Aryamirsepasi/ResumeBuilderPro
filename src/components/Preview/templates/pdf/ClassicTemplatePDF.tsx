import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from '@react-pdf/renderer';
import { Resume } from '../../../../types/resume';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Times-Roman',
    fontSize: 11,
    lineHeight: 1.4,
    color: '#1a1a1a',
  },
  header: { textAlign: 'center', marginBottom: 20 },
  name: { fontSize: 28, fontFamily: 'Times-Bold', marginBottom: 8 },
  contactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 12,
    fontSize: 10,
    color: '#333',
  },
  link: { color: '#333', textDecoration: 'none' },
  summary: { textAlign: 'justify', marginHorizontal: 20, fontStyle: 'italic' },
  section: { marginBottom: 16 },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Times-Bold',
    marginBottom: 8,
    borderBottomWidth: 1.5,
    borderBottomColor: '#000',
    paddingBottom: 3,
    textTransform: 'uppercase',
  },
  entry: { marginBottom: 12 },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  position: { fontFamily: 'Times-Bold' },
  company: {},
  dateLocation: { textAlign: 'right', color: '#444', fontStyle: 'italic' },
  listItem: { flexDirection: 'row', marginBottom: 3, paddingLeft: 10 },
  bullet: { marginRight: 5, fontFamily: 'Times-Bold' },
  twoColumn: { flexDirection: 'row', gap: 20 },
  column: { flex: 1 },
});

const formatDate = (dateString: string, lang: 'en' | 'de') => {
  if (!dateString) return '';
  const [year, month] = dateString.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return lang === 'de'
    ? date.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })
    : date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

const ClassicTemplatePDF: React.FC<{ resume: Resume; language: 'en' | 'de' }> =
  ({ resume, language }) => {
    const titles =
      language === 'de'
        ? {
            experience: 'BERUFSERFAHRUNG',
            education: 'BILDUNG',
            skills: 'FÄHIGKEITEN',
            languages: 'SPRACHEN',
          }
        : {
            experience: 'PROFESSIONAL EXPERIENCE',
            education: 'EDUCATION',
            skills: 'SKILLS',
            languages: 'LANGUAGES',
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
                      <Text style={styles.company}>
                        {exp.company}, {exp.location}
                      </Text>
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

          <View style={styles.twoColumn}>
            <View style={styles.column}>
              {resume.skills.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>{titles.skills}</Text>
                  <Text>
                    {resume.skills.map((skill) => skill.name).join(', ')}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.column}>
              {resume.languages.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>{titles.languages}</Text>
                  {resume.languages.map((lang) => (
                    <Text key={lang.id}>
                      {lang.name} ({lang.proficiency})
                    </Text>
                  ))}
                </View>
              )}
            </View>
          </View>
        </Page>
      </Document>
    );
  };

export default ClassicTemplatePDF;