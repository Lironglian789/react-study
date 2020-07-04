import React from 'react';
import ContextPage from './pages/ContextPage'
import MyRCFieldForm from './pages/MyRCFieldForm'
import MyRCForm from './pages/MyRCForm'
import ReduxPage from './pages/ReduxPage'

function App() {
  return (
    <div>
      <ContextPage />
      <MyRCFieldForm />
      <MyRCForm />
      <ReduxPage />
    </div>
  );
}

export default App;
