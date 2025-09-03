import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'tabs.autoFormulation': 'Auto-Formulation',
    'tabs.autoDomains': 'Auto-Domains',
    'tabs.autoVerification': 'Auto-Verification',
    'tabs.hypothesisGenerator': 'Hypothesis Generator',
    'tabs.problemFormulation': 'Problem Formulation',
    'tabs.resonanceAnalyzer': 'Resonance Analyzer',
    'tabs.ethicalAnalyzer': 'Ethical Analyzer',
    'tabs.enhanced3D': 'Enhanced 3D',
    'tabs.interdomainLearning': 'Interdomain Learning',
    'tabs.publicationIntegration': 'Publication Integration',
    
    // Auto Formulation
    'autoFormulation.title': 'Automatic Problem Formulation',
    'autoFormulation.description': 'Transform natural language descriptions into structured research problems',
    'autoFormulation.inputLabel': 'Problem Description',
    'autoFormulation.inputPlaceholder': 'Describe your research problem in natural language...',
    'autoFormulation.analyzeButton': 'Analyze Problem',
    'autoFormulation.analyzing': 'Analyzing...',
    'autoFormulation.results': 'Analysis Results',
    'autoFormulation.objectives': 'Research Objectives',
    'autoFormulation.constraints': 'Constraints',
    'autoFormulation.domains': 'Research Domains',
    'autoFormulation.metrics': 'Success Metrics',
    'autoFormulation.ethical': 'Ethical Requirements',
    
    // Auto Domains
    'autoDomains.title': 'Automatic Domain Selection',
    'autoDomains.description': 'AI-powered domain discovery through resonance analysis',
    'autoDomains.inputLabel': 'Research Topic',
    'autoDomains.inputPlaceholder': 'Enter your research topic or problem statement...',
    'autoDomains.analyzeButton': 'Analyze Domains',
    'autoDomains.analyzing': 'Analyzing resonance patterns...',
    'autoDomains.mindFoam': 'Mind Foam Visualization',
    'autoDomains.resonanceMap': 'Resonance Map',
    'autoDomains.domainClusters': 'Domain Clusters',
    'autoDomains.selectedDomains': 'Selected Research Domains',
    
    // Auto Verification
    'autoVerification.title': 'Automatic Hypothesis Verification',
    'autoVerification.description': 'AI-powered hypothesis testing and validation system',
    'autoVerification.inputLabel': 'Hypothesis',
    'autoVerification.inputPlaceholder': 'Enter your research hypothesis...',
    'autoVerification.verifyButton': 'Verify Hypothesis',
    'autoVerification.verifying': 'Running verification analysis...',
    'autoVerification.resonanceAnalysis': 'Resonance Analysis',
    'autoVerification.virtualExperiments': 'Virtual Experiments',
    'autoVerification.ethicalAssessment': 'Ethical Assessment',
    'autoVerification.confidence': 'Confidence Level',
    'autoVerification.evidence': 'Supporting Evidence',
    'autoVerification.recommendations': 'Recommendations',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error occurred',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.create': 'Create',
    'common.update': 'Update',
  },
  ru: {
    // Navigation
    'tabs.autoFormulation': 'Авто-постановка',
    'tabs.autoDomains': 'Авто-домены',
    'tabs.autoVerification': 'Авто-верификация',
    'tabs.hypothesisGenerator': 'Генератор гипотез',
    'tabs.problemFormulation': 'Постановка задач',
    'tabs.resonanceAnalyzer': 'Анализатор резонанса',
    'tabs.ethicalAnalyzer': 'Этический анализ',
    'tabs.enhanced3D': 'Улучшенная 3D',
    'tabs.interdomainLearning': 'Междоменное обучение',
    'tabs.publicationIntegration': 'Интеграция публикаций',
    
    // Auto Formulation
    'autoFormulation.title': 'Автоматическая постановка задач',
    'autoFormulation.description': 'Преобразование описаний на естественном языке в структурированные исследовательские задачи',
    'autoFormulation.inputLabel': 'Описание задачи',
    'autoFormulation.inputPlaceholder': 'Опишите вашу исследовательскую задачу на естественном языке...',
    'autoFormulation.analyzeButton': 'Анализировать задачу',
    'autoFormulation.analyzing': 'Анализируем...',
    'autoFormulation.results': 'Результаты анализа',
    'autoFormulation.objectives': 'Цели исследования',
    'autoFormulation.constraints': 'Ограничения',
    'autoFormulation.domains': 'Области исследования',
    'autoFormulation.metrics': 'Метрики успеха',
    'autoFormulation.ethical': 'Этические требования',
    
    // Auto Domains
    'autoDomains.title': 'Автоматический выбор доменов',
    'autoDomains.description': 'ИИ-поиск доменов через резонансный анализ',
    'autoDomains.inputLabel': 'Тема исследования',
    'autoDomains.inputPlaceholder': 'Введите тему исследования или постановку задачи...',
    'autoDomains.analyzeButton': 'Анализировать домены',
    'autoDomains.analyzing': 'Анализируем резонансные паттерны...',
    'autoDomains.mindFoam': 'Визуализация пены разума',
    'autoDomains.resonanceMap': 'Карта резонанса',
    'autoDomains.domainClusters': 'Кластеры доменов',
    'autoDomains.selectedDomains': 'Выбранные области исследования',
    
    // Auto Verification
    'autoVerification.title': 'Автоматическая верификация гипотез',
    'autoVerification.description': 'ИИ-система проверки и валидации гипотез',
    'autoVerification.inputLabel': 'Гипотеза',
    'autoVerification.inputPlaceholder': 'Введите вашу исследовательскую гипотезу...',
    'autoVerification.verifyButton': 'Верифицировать гипотезу',
    'autoVerification.verifying': 'Запускаем анализ верификации...',
    'autoVerification.resonanceAnalysis': 'Резонансный анализ',
    'autoVerification.virtualExperiments': 'Виртуальные эксперименты',
    'autoVerification.ethicalAssessment': 'Этическая оценка',
    'autoVerification.confidence': 'Уровень уверенности',
    'autoVerification.evidence': 'Подтверждающие доказательства',
    'autoVerification.recommendations': 'Рекомендации',
    
    // Common
    'common.loading': 'Загрузка...',
    'common.error': 'Произошла ошибка',
    'common.success': 'Успешно',
    'common.cancel': 'Отмена',
    'common.save': 'Сохранить',
    'common.edit': 'Редактировать',
    'common.delete': 'Удалить',
    'common.create': 'Создать',
    'common.update': 'Обновить',
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ru');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};