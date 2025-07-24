import React, { useState } from 'react';
import { Plus, Trash2, Edit, ExternalLink, X } from 'lucide-react';
import { useResume } from '../../../contexts/ResumeContext';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Project, Certification } from '../../../types/resume';

const ProjectsForm: React.FC = () => {
  const { state, addProject, updateProject, deleteProject, addCertification, deleteCertification } = useResume();
  const { t } = useLanguage();
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [isAddingCert, setIsAddingCert] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  
  const [projectData, setProjectData] = useState<Omit<Project, 'id'>>({
    name: '',
    description: '',
    technologies: [],
    url: '',
    startDate: '',
    endDate: ''
  });

  const [certData, setCertData] = useState<Omit<Certification, 'id'>>({
    name: '',
    issuer: '',
    date: '',
    url: ''
  });

  const [newTech, setNewTech] = useState('');

  const resetProjectForm = () => {
    setProjectData({
      name: '',
      description: '',
      technologies: [],
      url: '',
      startDate: '',
      endDate: ''
    });
    setIsAddingProject(false);
    setEditingProjectId(null);
  };

  const resetCertForm = () => {
    setCertData({
      name: '',
      issuer: '',
      date: '',
      url: ''
    });
    setIsAddingCert(false);
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProjectId) {
      updateProject(editingProjectId, { ...projectData, id: editingProjectId });
    } else {
      addProject({ ...projectData, id: Date.now().toString() });
    }
    
    resetProjectForm();
  };

  const handleCertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCertification({ ...certData, id: Date.now().toString() });
    resetCertForm();
  };

  const handleEditProject = (project: Project) => {
    setProjectData(project);
    setEditingProjectId(project.id);
    setIsAddingProject(true);
  };

  const addTechnology = () => {
    if (newTech.trim()) {
      setProjectData({
        ...projectData,
        technologies: [...projectData.technologies, newTech.trim()]
      });
      setNewTech('');
    }
  };

  const removeTechnology = (index: number) => {
    setProjectData({
      ...projectData,
      technologies: projectData.technologies.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('projects.title')} & {t('certifications.title')}</h2>

      {/* Projects Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">{t('projects.title')}</h3>
          <button
            onClick={() => setIsAddingProject(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>{t('button.add')} Project</span>
          </button>
        </div>

        {/* Existing Projects */}
        <div className="space-y-4 mb-8">
          {state.resume.projects.map((project) => (
            <div key={project.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-gray-900">{project.name}</h4>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <p className="text-gray-600 mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">
                    {project.startDate} - {project.endDate}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditProject(project)}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add/Edit Project Form */}
        {isAddingProject && (
          <form onSubmit={handleProjectSubmit} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('projects.name')}
                </label>
                <input
                  type="text"
                  value={projectData.name}
                  onChange={(e) => setProjectData({ ...projectData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('projects.url')}
                </label>
                <input
                  type="url"
                  value={projectData.url}
                  onChange={(e) => setProjectData({ ...projectData, url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('work.startDate')}
                </label>
                <input
                  type="month"
                  value={projectData.startDate}
                  onChange={(e) => setProjectData({ ...projectData, startDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('work.endDate')}
                </label>
                <input
                  type="month"
                  value={projectData.endDate}
                  onChange={(e) => setProjectData({ ...projectData, endDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('projects.description')}
                </label>
                <textarea
                  value={projectData.description}
                  onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('projects.technologies')}
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {projectData.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      <span>{tech}</span>
                      <button
                        type="button"
                        onClick={() => removeTechnology(index)}
                        className="text-blue-600 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                    placeholder="Add technology..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                  />
                  <button
                    type="button"
                    onClick={addTechnology}
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingProjectId ? t('button.save') : t('button.add')}
              </button>
              <button
                type="button"
                onClick={resetProjectForm}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {t('button.cancel')}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Certifications Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">{t('certifications.title')}</h3>
          <button
            onClick={() => setIsAddingCert(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>{t('button.add')} Certification</span>
          </button>
        </div>

        {/* Existing Certifications */}
        <div className="space-y-4 mb-8">
          {state.resume.certifications.map((cert) => (
            <div key={cert.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-gray-900">{cert.name}</h4>
                    {cert.url && (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-700"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <p className="text-gray-600">{cert.issuer}</p>
                  <p className="text-sm text-gray-500">{cert.date}</p>
                </div>
                <button
                  onClick={() => deleteCertification(cert.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Certification Form */}
        {isAddingCert && (
          <form onSubmit={handleCertSubmit} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('certifications.name')}
                </label>
                <input
                  type="text"
                  value={certData.name}
                  onChange={(e) => setCertData({ ...certData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('certifications.issuer')}
                </label>
                <input
                  type="text"
                  value={certData.issuer}
                  onChange={(e) => setCertData({ ...certData, issuer: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('certifications.date')}
                </label>
                <input
                  type="month"
                  value={certData.date}
                  onChange={(e) => setCertData({ ...certData, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('certifications.url')}
                </label>
                <input
                  type="url"
                  value={certData.url}
                  onChange={(e) => setCertData({ ...certData, url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                {t('button.add')}
              </button>
              <button
                type="button"
                onClick={resetCertForm}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {t('button.cancel')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProjectsForm;
