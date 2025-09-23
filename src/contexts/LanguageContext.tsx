import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationService from '@/hooks/useLibreTranslate';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      "nav.getStarted": "Get Started",
      "nav.language": "Language",
      "nav.region": "Region",
      
      // Hero Section
      "hero.title": "Your Perfect Diet Plan Awaits",
      "hero.subtitle": "Get a personalized nutrition plan tailored to your goals, lifestyle, and preferences. Science-backed recommendations for sustainable results.",
      "hero.createPlan": "Create My Plan",
      "hero.learnMore": "Learn More",
      "hero.scienceBased": "Science-Based",
      "hero.personalized": "Personalized", 
      "hero.easyToFollow": "Easy to Follow",
      "hero.successStories": "Success Stories",
      
      // Diet Plans Section
      "plans.title": "Choose Your Preferred Diet Style",
      "plans.subtitle": "Each plan is scientifically designed and can be personalized to match your specific needs and goals.",
      
      // CTA Section
      "cta.title": "Ready to Transform Your Health?",
      "cta.subtitle": "Join thousands who have achieved their health goals with our personalized diet plans.",
      "cta.start": "Start Your Journey",
      
      // Footer
      "footer.tagline": "Your personalized path to better health",
      "footer.rights": "All rights reserved.",
      
      // Form
      "form.title": "Personalize Your Diet Plan",
      "form.subtitle": "Tell us about yourself to get a customized meal plan",
      "form.basicInfo": "Basic Information",
      "form.age": "Age",
      "form.gender": "Gender",
      "form.male": "Male",
      "form.female": "Female",
      "form.heightUnit": "Height Unit",
      "form.height": "Height",
      "form.weight": "Weight",
      "form.regionalPrefs": "Regional Preferences",
      "form.region": "Your Region/Cuisine Preference",
      "form.activityGoals": "Activity & Goals",
      "form.activityLevel": "Activity Level",
      "form.fitnessGoal": "Fitness Goal",
      "form.dietPrefs": "Diet Preferences",
      "form.dietType": "Diet Type",
      "form.allergies": "Allergies & Intolerances",
      "form.generate": "Generate My Personalized Diet Plan"
    }
  },
  es: {
    translation: {
      // Navigation
      "nav.getStarted": "Comenzar",
      "nav.language": "Idioma",
      "nav.region": "Región",
      
      // Hero Section
      "hero.title": "Tu Plan de Dieta Perfecto Te Espera",
      "hero.subtitle": "Obtén un plan de nutrición personalizado adaptado a tus objetivos, estilo de vida y preferencias. Recomendaciones respaldadas por la ciencia para resultados sostenibles.",
      "hero.createPlan": "Crear Mi Plan",
      "hero.learnMore": "Saber Más",
      "hero.scienceBased": "Basado en Ciencia",
      "hero.personalized": "Personalizado",
      "hero.easyToFollow": "Fácil de Seguir",
      "hero.successStories": "Historias de Éxito",
      
      // Diet Plans Section
      "plans.title": "Elige Tu Estilo de Dieta Preferido",
      "plans.subtitle": "Cada plan está diseñado científicamente y puede personalizarse para satisfacer tus necesidades y objetivos específicos.",
      
      // CTA Section
      "cta.title": "¿Listo para Transformar Tu Salud?",
      "cta.subtitle": "Únete a miles que han logrado sus objetivos de salud con nuestros planes de dieta personalizados.",
      "cta.start": "Comenzar Tu Viaje",
      
      // Footer
      "footer.tagline": "Tu camino personalizado hacia una mejor salud",
      "footer.rights": "Todos los derechos reservados.",
      
      // Form
      "form.title": "Personaliza Tu Plan de Dieta",
      "form.subtitle": "Cuéntanos sobre ti para obtener un plan de comidas personalizado",
      "form.basicInfo": "Información Básica",
      "form.age": "Edad",
      "form.gender": "Género",
      "form.male": "Masculino",
      "form.female": "Femenino",
      "form.heightUnit": "Unidad de Altura",
      "form.height": "Altura",
      "form.weight": "Peso",
      "form.regionalPrefs": "Preferencias Regionales",
      "form.region": "Tu Región/Preferencia Culinaria",
      "form.activityGoals": "Actividad y Objetivos",
      "form.activityLevel": "Nivel de Actividad",
      "form.fitnessGoal": "Objetivo de Fitness",
      "form.dietPrefs": "Preferencias Dietéticas",
      "form.dietType": "Tipo de Dieta",
      "form.allergies": "Alergias e Intolerancias",
      "form.generate": "Generar Mi Plan de Dieta Personalizado"
    }
  },
  fr: {
    translation: {
      // Navigation
      "nav.getStarted": "Commencer",
      "nav.language": "Langue",
      "nav.region": "Région",
      
      // Hero Section
      "hero.title": "Votre Plan de Régime Parfait Vous Attend",
      "hero.subtitle": "Obtenez un plan nutritionnel personnalisé adapté à vos objectifs, mode de vie et préférences. Recommandations scientifiques pour des résultats durables.",
      "hero.createPlan": "Créer Mon Plan",
      "hero.learnMore": "En Savoir Plus",
      "hero.scienceBased": "Basé sur la Science",
      "hero.personalized": "Personnalisé",
      "hero.easyToFollow": "Facile à Suivre",
      "hero.successStories": "Histoires de Succès",
      
      // Diet Plans Section
      "plans.title": "Choisissez Votre Style de Régime Préféré",
      "plans.subtitle": "Chaque plan est conçu scientifiquement et peut être personnalisé pour correspondre à vos besoins et objectifs spécifiques.",
      
      // CTA Section
      "cta.title": "Prêt à Transformer Votre Santé?",
      "cta.subtitle": "Rejoignez des milliers de personnes qui ont atteint leurs objectifs de santé avec nos plans de régime personnalisés.",
      "cta.start": "Commencer Votre Voyage",
      
      // Footer
      "footer.tagline": "Votre chemin personnalisé vers une meilleure santé",
      "footer.rights": "Tous droits réservés.",
      
      // Form
      "form.title": "Personnalisez Votre Plan de Régime",
      "form.subtitle": "Parlez-nous de vous pour obtenir un plan de repas personnalisé",
      "form.basicInfo": "Informations de Base",
      "form.age": "Âge",
      "form.gender": "Genre",
      "form.male": "Masculin",
      "form.female": "Féminin",
      "form.heightUnit": "Unité de Taille",
      "form.height": "Taille",
      "form.weight": "Poids",
      "form.regionalPrefs": "Préférences Régionales",
      "form.region": "Votre Région/Préférence Culinaire",
      "form.activityGoals": "Activité et Objectifs",
      "form.activityLevel": "Niveau d'Activité",
      "form.fitnessGoal": "Objectif Fitness",
      "form.dietPrefs": "Préférences Alimentaires",
      "form.dietType": "Type de Régime",
      "form.allergies": "Allergies et Intolérances",
      "form.generate": "Générer Mon Plan de Régime Personnalisé"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export interface LanguageContextType {
  language: string;
  region: string;
  setLanguage: (lang: string) => void;
  setRegion: (region: string) => void;
  t: (key: string) => string;
  translateDynamic: (text: string, sourceLang?: string) => Promise<string>;
  clearTranslationCache: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState('en');
  const [region, setRegionState] = useState('international');

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
  };

  const setRegion = (reg: string) => {
    setRegionState(reg);
    localStorage.setItem('preferredRegion', reg);
  };

  const t = (key: string): string => {
    return i18n.t(key);
  };

  const translateDynamic = async (text: string, sourceLang: string = 'en'): Promise<string> => {
    return translationService.translateText(text, sourceLang, language);
  };

  const clearTranslationCache = () => {
    translationService.clearCache();
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    const savedRegion = localStorage.getItem('preferredRegion');
    
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
    if (savedRegion) {
      setRegion(savedRegion);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ 
      language, 
      region, 
      setLanguage, 
      setRegion, 
      t, 
      translateDynamic, 
      clearTranslationCache 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default i18n;