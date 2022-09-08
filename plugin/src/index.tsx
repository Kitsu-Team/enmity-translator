import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import manifest from '../manifest.json';
import { React } from 'enmity/metro/common';

import Settings from './components/Settings';

import { registerCommands } from 'enmity/api/commands'

import { translateMessagePatcher, unPatch } from './components/translateMessage';
import { transCmd } from './components/translateCommand';

const Translator: Plugin = {
   ...manifest,

   onStart() {
      registerCommands("trans", [transCmd])
      translateMessagePatcher()
   },


   onStop() {
      unPatch();
      this.commands = [];
   },

   getSettingsPanel({ settings }) {
      return <Settings settings={settings} />;
   }
};

registerPlugin(Translator);