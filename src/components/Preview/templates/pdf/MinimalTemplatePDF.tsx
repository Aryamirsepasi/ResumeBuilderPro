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
    padding: 50,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.5,
    color: '#333',
    backgroundColor: '#fdfdfd',
  },
  header: { marginBottom: 30 },
  name: {
    fontSize: 26,
    fontFamily: 'Helvetica-Light',
    letterSpacing: 2,
    marginBottom: 10,
  },
  contactInfo: {
    flexDirection: 'row',
    gap: 15,
    fontSize: 9,
    color: '#666',
  },
  section: { marginBottom: 20 },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 1,
    color: '#444',
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    paddingBottom: 3,
    textTransform: 'uppercase',
  },
  entry: { marginBottom: 15 },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  position: { fontFamily: 'Helvetica-Bold' },
  company: { color: '#555' },
  date: { color: '#777', fontSize: 9 },
  description: { color: '#444' },
});

const MinimalTemplatePDF: React.FC<{ resume: Resume; language: 'en' | 'de' }> =
  ({ resume, language }) => {
    const titles =
      language === 'de'
        ? { experience: 'ERFAHRUNG', education: 'BILDUNG', skills: 'FÄHIGKEITEN' }
        : { experience: 'EXPERIENCE', education: 'EDUCATION', skills: 'SKILLS' };

    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.name}>
              {resume.personalInfo.firstName.toUpperCase()}{' '}
              {resume.personalInfo.lastName.toUpperCase()}
            </Text>
            <View style={styles.contactInfo}>
              <Text>{resume.personalInfo.email}</Text>
              <Text>{resume.personalInfo.phone}</Text>
              <Text>{resume.personalInfo.location}</Text>
            </View>
          </View>

          <Text style={{ marginBottom: 20, fontStyle: 'italic', color: '#555' }}>
            {resume.personalInfo.summary}
          </Text>

          {resume.workExperience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{titles.experience}</Text>
              {resume.workExperience.map((exp) => (
                <View key={exp.id} style={styles.entry}>
                  <View style={styles.entryHeader}>
                    <Text style={styles.position}>{exp.position}</Text>
                    <Text style={styles.date}>
                      {exp.startDate.substring(0, 4)} -{' '}
                      {exp.current ? 'Present' : exp.endDate.substring(0, 4)}
                    </Text>
                  </View>
                  <Text style={styles.company}>
                    {exp.company} | {exp.location}
                  </Text>
                  {exp.responsibilities.map((r, i) => (
                    <Text key={i} style={styles.description}>
                      - {r}
                    </Text>
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
                    <Text style={styles.position}>{edu.degree}</Text>
                    <Text style={styles.date}>
                      {edu.startDate.substring(0, 4)} -{' '}
                      {edu.endDate.substring(0, 4)}
                    </Text>
                  </View>
                  <Text style={styles.company}>{edu.institution}</Text>
                </View>
              ))}
            </View>
          )}

          {resume.skills.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{titles.skills}</Text>
              <Text>
                {resume.skills.map((skill) => skill.name).join(' · ')}
              </Text>
            </View>
          )}
        </Page>
      </Document>
    );
  };

export default MinimalTemplatePDF;