import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { CleftLipInfoPage } from './components/CleftLipInfoPage';
import { PredictionPage } from './components/PredictionPage';
import { ExpertOpinionPage } from './components/ExpertOpinionPage';
import { ChatbotPage } from './components/ChatbotPage';
import { EmergencyPage } from './components/EmergencyPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';

type View =
  | 'home'
  | 'info'
  | 'predict'
  | 'get-expert-advice'
  | 'ask-ai'
  | 'emergency'
  | 'about'
  | 'contact';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const renderView = () => {
    switch (view) {
      case 'info':
        return <CleftLipInfoPage onExpertOpinionClick={() => setView('get-expert-advice')} />;
      case 'predict':
        return <PredictionPage
                  onLearnMore={() => setView('info')}
               />;
      case 'get-expert-advice':
        return <ExpertOpinionPage />;
      case 'ask-ai':
        return <ChatbotPage />;
      case 'emergency':
        return <EmergencyPage />;
      case 'about':
        return <AboutPage onPredictClick={() => setView('predict')} onExpertOpinionClick={() => setView('get-expert-advice')} />;
      case 'contact':
        return <ContactPage />;
      case 'home':
      default:
        return <HomePage
            onKnowMoreClick={() => setView('info')}
            onPredictClick={() => setView('predict')}
            onExpertOpinionClick={() => setView('get-expert-advice')}
            onAskAIClick={() => setView('ask-ai')} />;
    }
  };

  return (
    <div className="min-h-screen w-full font-sans">
      <Navbar
        onHomeClick={() => setView('home')}
        onPredictClick={() => setView('predict')}
        onEmergencyClick={() => setView('emergency')}
        onAboutClick={() => setView('about')}
        onContactClick={() => setView('contact')}
      />
      <main key={view} className="animate-page-fade-in">
        {renderView()}
      </main>
    </div>
  );
};

export default App;