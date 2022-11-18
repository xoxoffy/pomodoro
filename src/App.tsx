import { FunctionComponent, useState } from 'react';
import AudioPlayer from './audioplayer/components/AudioPlayer';
import Header from './header/Header';
import Query from './query/components/Query';
import Settings from './settings/components/Settings';
import Timer from './timer/components/Timer';
import './App.css';

const App: FunctionComponent = () => {
  const [showSettings, setShowSettings] = useState<boolean>(false);

  return (
    <div className="App">
      <Header />
      <Query />
      <Timer />
      <AudioPlayer />
      {
        // <button
        //   className="settings-button"
        //   onClick={() => setShowSettings(!showSettings)}
        // >
        //   Show Timer Settings
        // </button>
        // {showSettings && <Settings />}
      }
    </div>
  );
};

export default App;
