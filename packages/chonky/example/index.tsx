// import 'react-app-polyfill/ie11';
import * as React from 'react';
import {FullFileBrowser, setChonkyDefaults, IconFA} from '../.';
import {createRoot} from "react-dom/client";

const files = [
    { id: "lht", name: "Projects", isDir: true },
    {
        id: "mcd",
        name: "chonky-sphere-v2.png",
        thumbnailUrl: "https://chonky.io/chonky-sphere-v2.png",
    },
];
setChonkyDefaults({ iconComponent: IconFA });
const App = () => {
  return (
    <div style={{ height: 400 }}>
      <FullFileBrowser files={files} />
    </div>
  );
};


createRoot(document.getElementById('root')!, {
    // hydrate: true,
}).render(<App />);
