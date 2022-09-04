import { FormRow } from 'enmity/components';

import { React } from 'enmity/metro/common';
import { create } from 'enmity/patcher';
import { bulk, filters } from 'enmity/metro';
import { findInTree, findInReactTree } from 'enmity/utilities';
import { getIDByName } from 'enmity/api/assets';

import { translateText } from '../utils/translator';

const [
    ActionSheets,
] = bulk(
    filters.byProps('openLazy', 'hideActionSheet'),
)

const Patcher = create('translator');


export function addTranslateToAction() {
    let txt = "";

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
                                leading={<FormRow.Icon source={getIDByName('ic_public')} />}
                                onPress={() => {
                                    try {
                                        translateText('en','de', txt, 'google')
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
        unpatchOpener();
        });
    }
);}