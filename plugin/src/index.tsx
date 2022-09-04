import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import manifest from '../manifest.json';
import { React } from 'enmity/metro/common';

import Settings from './components/Settings';
import { FormRow } from 'enmity/components';

import { create } from 'enmity/patcher';
import { bulk, filters } from 'enmity/metro';
import { findInTree, findInReactTree } from 'enmity/utilities';
import { getIDByName } from 'enmity/api/assets';
import { get } from 'enmity/api/settings';

import { translateText } from './utils/translator';

const [
   ActionSheets,
] = bulk(
   filters.byProps('openLazy', 'hideActionSheet'),
);

const Patcher = create('translator');
// translatePatch

const Translator: Plugin = {
   ...manifest,


   onStart() {
      let txt = ""
      const unpatchOpener = Patcher.before(ActionSheets, 'openLazy', (_, [component, sheet], res) => {
         if (sheet !== 'MessageLongPressActionSheet') return;

         component.then(instance => {            
            Patcher.after(instance, 'default', (_, [{ message }], res) => {
               txt = message.content;

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
                           leading={
                              <FormRow.Icon source={getIDByName('ic_public')} />
                           }
                           onPress={() => {
                              try {
                                 // settings values
                                 let translateFrom = get("enmity-translator", "trans_settings_from")
                                 let translateTo = get("enmity-translator", "trans_settings_to")
                                 let translateEngine = get("enmity-translator", "trans_settings_engine")
                                 let translateAPI = get("enmity-translator", "trans_settings_api")
                                 
                                 // call the translate function (FROM -> TO -> TEXT -> ENGINE)
                                 // TODO: check for empty API value
                                 translateText(translateFrom, translateTo, txt, translateEngine, translateAPI);
                              } catch (e) {
                                 console.log(e);
                              }
                           }}
                        />,
                     );
                     return res
                  };
                  return res
               };
            });
         unpatchOpener();
         });
      })
   },

   onStop() {
   },

   getSettingsPanel({ settings }) {
      return <Settings settings={settings} />;
   }
};

registerPlugin(Translator);