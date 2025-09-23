import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { LanguageProvider } from './contexts/LanguageContext';
import { TranslationProvider } from './components/TranslationProvider';

createRoot(document.getElementById("root")!).render(
  <LanguageProvider>
    <TranslationProvider>
      <App />
    </TranslationProvider>
  </LanguageProvider>
);
