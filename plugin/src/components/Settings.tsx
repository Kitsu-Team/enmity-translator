import { FormRow, FormSwitch, FormSection, ScrollView, Text, FormLabel, FormCardSection, FormCTAButton, TextInput, FormDivider, FormSelect, Form, Button } from 'enmity/components';
import { Serializable, SettingsStore } from 'enmity/api/settings';
import { React } from 'enmity/metro/common';
import { styles } from '../utils/styles';

import { get_options } from '../utils/get_options';
export interface SettingsProps {
   settings: SettingsStore;
}

export default ({ settings }: SettingsProps) => {
   var apiOptions = settings.get("trans_settings_api_options") ?? [];
   var engines = <><FormSection title={"Engine: " + settings.get("trans_settings_engine") ?? ""}><FormSelect options={apiOptions} onChange={(value) => settings.set("trans_settings_engine", value)} value={settings.get("trans_settings_engine")} /></FormSection></>

   for (var x in apiOptions as String) {
      if (apiOptions[x]["value"] == settings.get("trans_settings_engine")) {
         var engineLangFrom = apiOptions[x]["languages"]
      }
   }

   var transFrom = <><FormSection title={"Translate From: " + settings.get("trans_settings_from") ?? ""}><FormSelect options={engineLangFrom} onChange={(value) => settings.set("trans_settings_from", value)} value={settings.get("trans_settings_from")} /></FormSection></>
   // remove AUTO from engineLangFrom
   let engineLangTo = [] as any
   for (var x in engineLangFrom) {
      if (engineLangFrom[x]["value"] != "auto") {
         // add to engineLangTo
         engineLangTo.push(engineLangFrom[x])
      }
   }
   var transTo = <><FormSection title={"Translate To: " + settings.get("trans_settings_to") ?? ""}><FormSelect options={engineLangTo} onChange={(value) => settings.set("trans_settings_to", value)} value={settings.get("trans_settings_to")} /></FormSection></>

   return(
      <ScrollView>
         <FormSection title="API URL:">
            <TextInput
               keyboardType={"url"}
               autoCorrect={false}
               style={{ padding: 10, color: styles.text.color }}
               placeholder="https://kitsu-team.dev/enmity-translate-api"
               value={settings.get("trans_settings_api")}
               onChangeText={(text) => settings.set("trans_settings_api", text)}
               onEndEditing={() => 
                  get_options(settings.get("trans_settings_api"))
               }
            />
         </FormSection>
         {engines}
         {transFrom}
         {transTo}
      </ScrollView>
   );
};