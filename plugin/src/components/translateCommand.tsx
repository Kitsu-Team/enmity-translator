import { Command, CommandChoice, ApplicationCommandOptionType, ApplicationCommandType, ApplicationCommandInputType, registerCommands } from 'enmity/api/commands'
import { Messages } from 'enmity/metro/common'
import { get, set } from 'enmity/api/settings';


// var apiOptions = get("enmity-translator", "trans_settings_api_options") ?? [];

// var langOptions = [] as any
// for (var x in apiOptions as String) {
//     if (apiOptions[x]["value"] == get("enmity-translator", "trans_settings_engine")) {
//         var engineLangFrom = apiOptions[x]["languages"]
//     }
// }
// for (var x in engineLangFrom) {
//     if (engineLangFrom[x]["value"] != "auto") {
//         // add to engineLangTo
//         langOptions.push({"value": engineLangFrom[x]["value"], "name": engineLangFrom[x]["label"]})
//     }
// }
// console.log(langOptions)

export const transCmd: Command = {
    id: "enmity-translate",

    name: "translate",
    displayName: "translate",

    description: "Translate your message on the fly!",
    displayDescription: "Translate your message on the fly!",

    type: ApplicationCommandType.Chat,
    inputType: ApplicationCommandInputType.BuiltInText,

    options: [
        {
            name: "from",
            displayName: "from",
            description: "The language to translate from (e.g de,en,fr,es,ru)",
            displayDescription: "The language to translate from (e.g de,en,fr,es,ru)",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "to",
            displayName: "to",
            description: "The language to translate to (e.g de,en,fr,es,ru)",
            displayDescription: "The language to translate to (e.g de,en,fr,es,ru)",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],

    execute: async function (args, context) {
        Messages.sendMessage(context!.channel.id, {
            content: "Hello world!",
        });
    },

}