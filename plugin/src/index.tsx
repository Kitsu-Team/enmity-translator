import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import manifest from '../manifest.json';
import { FormRow, FormSwitch, ScrollView, Text, Button, Alert } from 'enmity/components';
import { registerCommands } from "enmity/api/commands";
import { React, Toasts } from 'enmity/metro/common';
import { create } from 'enmity/patcher';
import { bulk, filters } from 'enmity/metro';
import { findInTree, findInReactTree } from 'enmity/utilities';
import { getIDByName } from 'enmity/api/assets';

import Settings from './components/Settings';

// import translate function
import { translateText } from './utils/translator';

const [
   ActionSheets,
] = bulk(
   filters.byProps('openLazy', 'hideActionSheet'),
)

const Patcher = create('translator');


const Translator: Plugin = {
   ...manifest,

   onStart() {
      Patcher.before(ActionSheets, 'openLazy', (_, [component, sheet], res) => {
         if (sheet !== 'MessageLongPressActionSheet') return;

         component.then(instance => {
            Patcher.after(instance, 'default', (_, [{ message }], res) => {
               var test = message.content;
               console.log(test)

               const origRender = res.type.render;
               res.type.render = function (...args) {
                  const res = origRender.apply(this, args);

                  const wrapper = findInTree(res, r => r.type?.render?.name === 'Wrapper', { walkable: ['props', 'type', 'children'] });
                  if (!wrapper) return res;

                  const origWrapper = wrapper.type.render;
                  wrapper.type.render = function (...args) {
                     const res = origWrapper.apply(this, args);
                     if (!res) return;

                     const children = findInReactTree(res, r => r.find?.(c => Array.isArray(c)));
                     if (!children || !children[1]) return res;
                     const items = children[1];

                     items.unshift(
                        <FormRow
                           label='Translate Message'
                           leading={<FormRow.Icon source={getIDByName('ic_public')} />}
                           onPress={() => {
                              try {
                                 console.log("content: ");
                                 console.log(this);

                                 // from - to - text - engine
                                 translateText('en', 'de', message.content, 'google')
                              } catch (e) {
                                 console.log(e);
                              }
                           }}
                        />,
                     );
                     return res;
                  };
                  return res;
               };
            });
         });
         Patcher.unpatchAll();
      });
   },

   onStop() {
      Patcher.unpatchAll();
   },

   getSettingsPanel({ settings }) {
      return <Settings settings={settings} trans_in={false} trans_out={false} />;
   }
};

registerPlugin(Translator);
