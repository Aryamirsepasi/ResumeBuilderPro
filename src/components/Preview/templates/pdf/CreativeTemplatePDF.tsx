// src/components/Preview/templates/pdf/CreativeTemplatePDF.tsx
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
  page: { flexDirection: 'row', backgroundColor: '#fff' },
  leftColumn: {
    width: '35%',
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: 20,
  },
  rightColumn: { width: '65%', padding: 20 },
  name: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 10,
    color: '#ecf0f1',
  },
  contactInfo: { fontSize: 9, marginBottom: 20, lineHeight: 1.5 },
  sidebarSection: { marginBottom: 20 },
  sidebarTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#1abc9c',
    marginBottom: 8,
  },
  summary: { fontSize: 10, lineHeight: 1.4, marginBottom: 20 },
  section: { marginBottom: 16 },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: '#2c3e50',
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#1abc9c',
    paddingBottom: 4,
  },
  entry: { marginBottom: 12 },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  position: { fontFamily: 'Helvetica-Bold', fontSize: 11 },
  company: { color: '#34495e' },
  dateLocation: { textAlign: 'right', color: '#555', fontSize: 9 },
  listItem: { flexDirection: 'row', marginBottom: 3, paddingLeft: 10 },
  bullet: { marginRight: 5, color: '#1abc9c' },
  skill: { marginBottom: 5 },
  skillName: { fontSize: 10 },
});

const CreativeTemplatePDF: React.FC<{
  resume: Resume;
  language: 'en' | 'de';
}> = ({ resume, language }) => {
  const titles =
    language === 'de'
      ? {
          experience: 'ERFAHRUNG',
          education: 'BILDUNG',
          skills: 'FÄHIGKEITEN',
          languages: 'SPRACHEN',
          contact: 'KONTAKT',
          summary: 'PROFIL',
        }
      : {
          experience: 'EXPERIENCE',
          education: 'EDUCATION',
          skills: 'SKILLS',
          languages: 'LANGUAGES',
          contact: 'CONTACT',
          summary: 'PROFILE',
        };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.leftColumn}>
          <Text style={styles.name}>
            {resume.personalInfo.firstName} {resume.personalInfo.lastName}
          </Text>
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>{titles.contact}</Text>
            <Text style={styles.contactInfo}>
              {resume.personalInfo.email}
              {'\n'}
              {resume.personalInfo.phone}
              {'\n'}
              {resume.personalInfo.location}
            </Text>
          </View>
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>{titles.skills}</Text>
            {resume.skills.map((skill) => (
              <View key={skill.id} style={styles.skill}>
                <Text style={styles.skillName}>{skill.name}</Text>
              </View>
            ))}
          </View>
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>{titles.languages}</Text>
            {resume.languages.map((lang) => (
              <Text key={lang.id} style={styles.skillName}>
                {lang.name} ({lang.proficiency})
              </Text>
            ))}
          </View>
        </View>
        <View style={styles.rightColumn}>
          <View style={styles.section}>
            <Text style={styles.sidebarTitle}>{titles.summary}</Text>
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
                    <Text style={styles.dateLocation}>{exp.location}</Text>
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
                  <Text style={styles.position}>
                    {edu.degree} in {edu.field}
                  </Text>
                  <Text style={styles.company}>{edu.institution}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default CreativeTemplatePDF;