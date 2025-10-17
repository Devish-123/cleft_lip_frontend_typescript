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
import { AuthPage } from './components/AuthPage';
import { AccountPage } from './components/AccountPage';

type View = 'home' | 'info' | 'predict' | 'expert' | 'chat' | 'emergency' | 'about' | 'contact' | 'auth' | 'account';

interface User {
  email: string;
  name: string;
}

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const activeUserEmail = localStorage.getItem('cleftixUser');
    if (activeUserEmail) {
      const allUsers = JSON.parse(localStorage.getItem('cleftixUsers') || '{}');
      const userData = allUsers[activeUserEmail];
      if (userData) {
        setCurrentUser({ email: activeUserEmail, name: userData.name });
      } else {
        // Data inconsistency, clear active user
        localStorage.removeItem('cleftixUser');
      }
    }
  }, []);

  const handleHomeClick = () => setView('home');
  const handleKnowMoreClick = () => setView('info');
  
  const handlePredictClick = () => {
    setView('predict');
  };

  const handleExpertOpinionClick = () => setView('expert');
  const handleAskAIClick = () => setView('chat');
  const handleEmergencyClick = () => setView('emergency');
  const handleAboutClick = () => setView('about');
  const handleContactClick = () => setView('contact');
  
  const handleLoginSuccess = (email: string) => {
    localStorage.setItem('cleftixUser', email);
    const allUsers = JSON.parse(localStorage.getItem('cleftixUsers') || '{}');
    const userData = allUsers[email];
    if (userData) {
        setCurrentUser({ email, name: userData.name });
        setView('predict');
    } else {
        console.error("Logged in user data not found.");
        setView('auth');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('cleftixUser');
    setCurrentUser(null);
    setView('home');
  };

  const handleAuthRequired = () => setView('auth');

  const renderView = () => {
    switch (view) {
      case 'info':
        return <CleftLipInfoPage onExpertOpinionClick={handleExpertOpinionClick} />;
      case 'predict':
        return <PredictionPage 
                  currentUser={currentUser} 
                  onLogout={handleLogout} 
                  onAuthRequired={handleAuthRequired} 
               />;
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
      case 'auth':
        return <AuthPage onLoginSuccess={handleLoginSuccess} />;
      case 'account':
        return <AccountPage currentUser={currentUser} onLogout={handleLogout} />;
      case 'home':
      default:
        return <HomePage onKnowMoreClick={handleKnowMoreClick} onPredictClick={handlePredictClick} onExpertOpinionClick={handleExpertOpinionClick} onAskAIClick={handleAskAIClick} />;
    }
  };

  return (
    <div className="min-h-screen w-full font-sans">
      <Navbar 
        onHomeClick={handleHomeClick} 
        onPredictClick={handlePredictClick} 
        onEmergencyClick={handleEmergencyClick} 
        onAboutClick={handleAboutClick} 
        onContactClick={handleContactClick}
      />
      <main key={view} className="animate-page-fade-in">
        {renderView()}
      </main>
    </div>
  );
};

export default App;
