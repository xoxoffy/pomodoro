import { FunctionComponent, useState } from 'react';
import AudioPlayer from './audioplayer/components/AudioPlayer';
import Header from './header/Header';
import Query from './query/components/Query';
import Settings from './settings/components/Settings';
import SettingsButton from './settings/components/SettingsButton';
import Timer from './timer/components/Timer';

const App: FunctionComponent = () => {
  const [showSettings, setShowSettings] = useState<boolean>(false);

  return (
    <div className="App">
      <Header />
      <Query />
      <Timer />
      <SettingsButton />
      <Settings />
      <AudioPlayer />
    </div>
  );
};

export default App;
