import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { Messages, React } from 'enmity/metro/common';

import { FormRow } from 'enmity/components';
import * as Assets from "enmity/api/assets";

import { create } from 'enmity/patcher';
import { bulk, filters, getByProps } from 'enmity/metro';
import { findInTree, findInReactTree } from 'enmity/utilities';
import { getIDByName } from 'enmity/api/assets';
import { get, set } from 'enmity/api/settings';
import { registerCommands } from 'enmity/api/commands'

import { translateText } from '../utils/translator';


const MessageStore = getByProps("getMessage", "getMessages");
const ChannelStore = getByProps("getChannel", "getDMFromUserId");
const Opener = getByProps("openLazy");

const FluxDispatcher = getByProps(
    "_currentDispatchActionType",
    "_subscriptions",
    "_waitQueue"
);

const Patcher = create('translator');

export function translateMessagePatcher() {
    let dirtyEdit = false;
    Patcher.before(Opener, "openLazy", (_, [component, sheet]) => {
        if (sheet === "MessageLongPressActionSheet") {
            component.then((instance) => {
                let func = instance.default;
                instance.default = function ({
                    message, user, channel, canAddNewReactions
                }, _) {
                    let og = func({
                        message, user, channel, canAddNewReactions
                    }, _);
                    if (og.props.children.props.children.props.children[1][0].key == "69")
                        return og;

                    let ButtonRow = og.props.children.props.children.props.children[1][0].type;

                    let myIdol = (
                        <ButtonRow
                            key="69"
                            onPressRow={(_) => {
                                // TODO: error handling
                                let from = get("enmity-translator", "trans_settings_from");
                                let to = get("enmity-translator", "trans_settings_to");
                                let engine = get("enmity-translator", "trans_settings_engine");
                                let api = get("enmity-translator", "trans_settings_api");
                                    var json = {
                                        trans_from: from,
                                        trans_to: to,
                                        trans_text: message.content,
                                        trans_engine: engine,
                                    }
                                    fetch(api + "/translate", {
                                        method: 'POST',
                                        body: JSON.stringify(json),
                                        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
                                    })
                                    .then(res => res.json())
                                        .then(json => {
                                            Opener.hideActionSheet();
                                            Messages.startEditMessage(
                                                `dirty-${channel.id}`,
                                                message.id,
                                                message.content,
                                                json["text"]
                                            );
                                        })
                            }}
                            message="Translate Message"
                            iconSource={Assets.getIDByName("ic_message_retry")}
                        />
                    );
                    og.props.children.props.children.props.children[1].unshift(myIdol);

                    return og;
                };
                return instance;
            });
        }
    });

    Patcher.before(Messages, "startEditMessage", (a0, a1, a2) => {
        if (a1[0].startsWith("dirty-")) {
            
            console.log("a3: " + a1[3])
            a1[2] = a1[3];

            a1[0] = a1[0].replace("dirty-", "");
            dirtyEdit = true;
        } else {
            dirtyEdit = false;
        }
    });

    Patcher.before(Messages, "editMessage", (a0, a1, a2) => {
        if (dirtyEdit) {
            const originalMessage = MessageStore.getMessage(a1[0], a1[1]);
            FluxDispatcher.dispatch({
                type: "MESSAGE_UPDATE",
                message: {
                    ...originalMessage,
                    ...a1[2],
                    edited_timestamp: originalMessage.editedTimestamp,
                    mention_roles: originalMessage.mentionRoles,
                    mention_everyone: originalMessage.mentionEveryone,
                    member: originalMessage.author,
                    guild_id: ChannelStore.getChannel(
                        originalMessage.channel_id
                    ).guild_id,
                },
                log_edit: false
            });
            a1 = {} as any;
        }
    });
}

export function unPatch() {
    Patcher.unpatchAll();
}