import React from 'react';

interface AccountPageProps {
  currentUser: { email: string; name: string } | null;
  onLogout: () => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({ currentUser, onLogout }) => {
  return (
    <div className="bg-gray-50 min-h-[calc(100vh-5rem)] py-12 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-200 animate-fade-in text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Account</h1>
        <p className="text-gray-600 mb-6">Manage your account details below.</p>
        
        {currentUser ? (
          <div className="bg-gray-100 p-4 rounded-lg text-left mb-8 space-y-2">
            <div>
              <p className="text-sm text-gray-500">Name:</p>
              <p className="font-semibold text-gray-800 break-words">{currentUser.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email:</p>
              <p className="font-semibold text-gray-800 break-words">{currentUser.email}</p>
            </div>
          </div>
        ) : (
          <div className="bg-gray-100 p-4 rounded-lg text-left mb-8">
            <p className="font-semibold text-gray-800">Not logged in</p>
          </div>
        )}

        <button 
          onClick={onLogout}
          className="w-full py-3 bg-destructive text-destructive-foreground font-bold rounded-lg shadow-md hover:bg-destructive/90 transition-all"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};
