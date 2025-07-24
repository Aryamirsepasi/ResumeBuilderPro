import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useResume } from '../../../contexts/ResumeContext';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Skill, Language as LanguageSkill } from '../../../types/resume';

const SkillsForm: React.FC = () => {
  const { state, addSkill, deleteSkill, addLanguage, deleteLanguage } = useResume();
  const { t } = useLanguage();
  const [newSkill, setNewSkill] = useState({ name: '', category: 'technical' as 'technical' | 'soft', proficiency: 'intermediate' as const });
  const [newLanguage, setNewLanguage] = useState({ name: '', proficiency: 'conversational' as const });

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.name.trim()) {
      addSkill({
        id: Date.now().toString(),
        ...newSkill
      });
      setNewSkill({ name: '', category: 'technical', proficiency: 'intermediate' });
    }
  };

  const handleAddLanguage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLanguage.name.trim()) {
      addLanguage({
        id: Date.now().toString(),
        ...newLanguage
      });
      setNewLanguage({ name: '', proficiency: 'conversational' });
    }
  };

  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency) {
      case 'beginner':
      case 'basic':
        return 'bg-red-100 text-red-800';
      case 'intermediate':
      case 'conversational':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
      case 'fluent':
        return 'bg-blue-100 text-blue-800';
      case 'expert':
      case 'native':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const technicalSkills = state.resume.skills.filter(skill => skill.category === 'technical');
  const softSkills = state.resume.skills.filter(skill => skill.category === 'soft');

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('skills.title')}</h2>

      {/* Technical Skills */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('skills.technical')}</h3>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {technicalSkills.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-full px-3 py-1"
            >
              <span className="text-sm font-medium text-blue-900">{skill.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${getProficiencyColor(skill.proficiency)}`}>
                {t(`skills.proficiency.${skill.proficiency}`)}
              </span>
              <button
                onClick={() => deleteSkill(skill.id)}
                className="text-blue-600 hover:text-red-600 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        <form onSubmit={handleAddSkill} className="flex flex-wrap gap-2 items-end">
          <div>
            <input
              type="text"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              placeholder="Add technical skill..."
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <select
              value={newSkill.proficiency}
              onChange={(e) => setNewSkill({ ...newSkill, proficiency: e.target.value as any })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="beginner">{t('skills.proficiency.beginner')}</option>
              <option value="intermediate">{t('skills.proficiency.intermediate')}</option>
              <option value="advanced">{t('skills.proficiency.advanced')}</option>
              <option value="expert">{t('skills.proficiency.expert')}</option>
            </select>
          </div>
          <button
            type="submit"
            className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>{t('button.add')}</span>
          </button>
        </form>
      </div>

      {/* Soft Skills */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('skills.soft')}</h3>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {softSkills.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center space-x-2 bg-green-50 border border-green-200 rounded-full px-3 py-1"
            >
              <span className="text-sm font-medium text-green-900">{skill.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${getProficiencyColor(skill.proficiency)}`}>
                {t(`skills.proficiency.${skill.proficiency}`)}
              </span>
              <button
                onClick={() => deleteSkill(skill.id)}
                className="text-green-600 hover:text-red-600 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        <form 
          onSubmit={(e) => {
            e.preventDefault();
            if (newSkill.name.trim()) {
              addSkill({
                id: Date.now().toString(),
                name: newSkill.name,
                category: 'soft',
                proficiency: newSkill.proficiency
              });
              setNewSkill({ name: '', category: 'technical', proficiency: 'intermediate' });
            }
          }} 
          className="flex flex-wrap gap-2 items-end"
        >
          <div>
            <input
              type="text"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              placeholder="Add soft skill..."
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <select
              value={newSkill.proficiency}
              onChange={(e) => setNewSkill({ ...newSkill, proficiency: e.target.value as any })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="beginner">{t('skills.proficiency.beginner')}</option>
              <option value="intermediate">{t('skills.proficiency.intermediate')}</option>
              <option value="advanced">{t('skills.proficiency.advanced')}</option>
              <option value="expert">{t('skills.proficiency.expert')}</option>
            </select>
          </div>
          <button
            type="submit"
            className="flex items-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>{t('button.add')}</span>
          </button>
        </form>
      </div>

      {/* Languages */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('languages.title')}</h3>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {state.resume.languages.map((lang) => (
            <div
              key={lang.id}
              className="flex items-center space-x-2 bg-purple-50 border border-purple-200 rounded-full px-3 py-1"
            >
              <span className="text-sm font-medium text-purple-900">{lang.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${getProficiencyColor(lang.proficiency)}`}>
                {t(`languages.proficiency.${lang.proficiency}`)}
              </span>
              <button
                onClick={() => deleteLanguage(lang.id)}
                className="text-purple-600 hover:text-red-600 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        <form onSubmit={handleAddLanguage} className="flex flex-wrap gap-2 items-end">
          <div>
            <input
              type="text"
              value={newLanguage.name}
              onChange={(e) => setNewLanguage({ ...newLanguage, name: e.target.value })}
              placeholder="Add language..."
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <select
              value={newLanguage.proficiency}
              onChange={(e) => setNewLanguage({ ...newLanguage, proficiency: e.target.value as any })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="basic">{t('languages.proficiency.basic')}</option>
              <option value="conversational">{t('languages.proficiency.conversational')}</option>
              <option value="fluent">{t('languages.proficiency.fluent')}</option>
              <option value="native">{t('languages.proficiency.native')}</option>
            </select>
          </div>
          <button
            type="submit"
            className="flex items-center space-x-1 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>{t('button.add')}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SkillsForm;