import React from 'react';

const LanguageSelector = ({ selectedLanguage, setSelectedLanguage }) => {
  const languages = [
    { code: 'en-US', label: 'English (US)' },
    { code: 'hi-IN', label: 'Hindi' },
    // Add more languages as needed
  ];

  return (
    <select
      className="p-2 bg-orange-500 text-white border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
      value={selectedLanguage}
      onChange={(e) => setSelectedLanguage(e.target.value)}
    >
      {languages.map((lang) => (
        <option
          key={lang.code}
          value={lang.code}
          className={`${
            selectedLanguage === lang.code ? 'bg-orange-500 text-white' : 'bg-orange-200 text-black'
          }`}
        >
          {lang.label}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
