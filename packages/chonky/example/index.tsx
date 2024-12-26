// import 'react-app-polyfill/ie11';
import * as React from 'react';
import {FullFileBrowser} from '../dist/index.mjs';
import {createRoot} from "react-dom/client";

const App = () => {
  return (
    <div style={{ height: 400 }}>
      <FullFileBrowser />
    </div>
  );
};


createRoot(document.getElementById('root')!, {
    // hydrate: true,
}).render(<App />);
