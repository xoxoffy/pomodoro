import { FunctionComponent } from 'react';
import AudioPlayer from './audioplayer/components/AudioPlayer';
import Header from './header/Header';
import Query from './query/components/Query';
import Timer from './timer/components/Timer';
import './App.css';

const App: FunctionComponent = () => {
  return (
    <div className="App">
      <Header />
      <Query />
      <Timer />
      <AudioPlayer />
    </div>
  );
};

export default App;
