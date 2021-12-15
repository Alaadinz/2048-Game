import ReactDOM from 'react-dom';
import { StrictMode } from 'react';

import './index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
