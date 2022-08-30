import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { React } from 'enmity/metro/common';
import manifest from '../manifest.json';

import Settings from './components/Settings';

// translator
const Translator: Plugin = {
   ...manifest,
   onStart() {
   },
   onStop() {
   },

   getSettingsPanel({ settings }) {
      return <Settings settings={settings} />;
   }
};


registerPlugin(Translator);
