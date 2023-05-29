import { useState } from 'react';

import './App.css';
import CsvInput from '../CsvInput';
import Results from '../Results';
import Instructions from '../Instructions';
import PrivacyInfo from '../PrivacyInfo';
import { ResultsCombined } from '../../types/types';

const App = () => {
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<ResultsCombined>();

  const renderHomeContent = () => {
    return (
      <>
        <div className='makler-header'>Oblicz swoje wyniki z eMaklera</div>
        <CsvInput setShowResults={setShowResults} setResults={setResults} />
        <Instructions />
        <PrivacyInfo />
        {/* <a className='contact' href="mailto:...">kontakt</a> */}
      </>
    )
  }

  return (
    <div className="app">
      {showResults ? <Results setShowResults={setShowResults} resultsCombined={results} /> : renderHomeContent()}
    </div>
  );
}

export default App;