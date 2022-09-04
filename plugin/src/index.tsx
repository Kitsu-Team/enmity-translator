import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import manifest from '../manifest.json';
import { React } from 'enmity/metro/common';

import Settings from './components/Settings';

// translatePatch
import { addTranslateToAction } from './components/MessageLongPress';
interface TranslatorPluginState {
   message: string;
}

const Translator: Plugin = {
   ...manifest,


   onStart() {
      addTranslateToAction();
},

   onStop() {
   },

   getSettingsPanel({ settings }) {
      return <Settings settings={settings} />;
   }
};

registerPlugin(Translator);