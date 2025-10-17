import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { CleftLipInfoPage } from './components/CleftLipInfoPage';
import { PredictionPage } from './components/PredictionPage';
import { ExpertOpinionPage } from './components/ExpertOpinionPage';
import { ChatbotPage } from './components/ChatbotPage';
import { EmergencyPage } from './components/EmergencyPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';

type View = 'home' | 'info' | 'predict' | 'expert' | 'chat' | 'emergency' | 'about' | 'contact';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');

  const handleHomeClick = () => setView('home');
  const handleKnowMoreClick = () => setView('info');
  const handlePredictClick = () => setView('predict');
  const handleExpertOpinionClick = () => setView('expert');
  const handleAskAIClick = () => setView('chat');
  const handleEmergencyClick = () => setView('emergency');
  const handleAboutClick = () => setView('about');
  const handleContactClick = () => setView('contact');

  const renderView = () => {
    switch (view) {
      case 'info':
        return <CleftLipInfoPage onExpertOpinionClick={handleExpertOpinionClick} />;
      case 'predict':
        return <PredictionPage />;
      case 'expert':
        return <ExpertOpinionPage />;
      case 'chat':
        return <ChatbotPage />;
      case 'emergency':
        return <EmergencyPage />;
      case 'about':
        return <AboutPage onPredictClick={handlePredictClick} onExpertOpinionClick={handleExpertOpinionClick} />;
      case 'contact':
        return <ContactPage />;
      case 'home':
      default:
        return <HomePage onKnowMoreClick={handleKnowMoreClick} onPredictClick={handlePredictClick} onExpertOpinionClick={handleExpertOpinionClick} onAskAIClick={handleAskAIClick} />;
    }
  };

  return (
    <div className="min-h-screen w-full font-sans">
      <Navbar onHomeClick={handleHomeClick} onPredictClick={handlePredictClick} onEmergencyClick={handleEmergencyClick} onAboutClick={handleAboutClick} onContactClick={handleContactClick} />
      <main key={view} className="animate-page-fade-in">
        {renderView()}
      </main>
    </div>
  );
};

export default App;