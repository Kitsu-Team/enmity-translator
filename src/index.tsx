import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import manifest from '../manifest.json';
import { FormRow, FormSwitch, ScrollView, Text, Button } from 'enmity/components';
import { registerCommands } from "enmity/api/commands";
import { React, Toasts } from 'enmity/metro/common';
import { create } from 'enmity/patcher';
import { bulk, filters } from 'enmity/metro';
import { findInTree, findInReactTree } from 'enmity/utilities';
import { getIDByName } from 'enmity/api/assets';

import Settings from './components/Settings';

const [
   ActionSheets,
] = bulk(
   filters.byProps('openLazy', 'hideActionSheet'),
)

const Patcher = create('translator');


const Translator: Plugin = {
   ...manifest,

   onStart() {
      const unpatchOpener = Patcher.before(ActionSheets, 'openLazy', (_, [component, sheet], res) => {
         if (sheet !== 'MessageLongPressActionSheet') return;

         component.then(instance => {
            Patcher.after(instance, 'default', (_, [{ message }], res) => { 
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
                              alert('sorry PyWhy? i still have to do this :)\n- KitsuneYokai');
                              console.log(res)
                           }} />,
                        <FormRow
                              label='Translate Settings'
                              leading={<FormRow.Icon source={getIDByName('ic_public')} />}
                           onPress={(settings) => {
                              return (<Settings settings={settings} trans_in={false} trans_out={false} />);
                           }} />
                        );
                  return res;
               };
               return res;
            };
         });
         unpatchOpener();
         });
      }
   );
},

   onStop() {
      Patcher.unpatchAll();
   },

   getSettingsPanel({ settings }) {
      return <Settings settings={settings} trans_in={false} trans_out={false} />;
   }
};

registerPlugin(Translator);