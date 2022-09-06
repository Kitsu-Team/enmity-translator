import { FormRow, FormSwitch, FormSection, ScrollView, Text, FormLabel, FormCardSection, FormCTAButton, TextInput, FormDivider, FormSelect, Form, Button } from 'enmity/components';
import { SettingsStore } from 'enmity/api/settings';
import { React } from 'enmity/metro/common';
import { styles } from '../utils/styles';

import { get_options } from '../utils/get_options';
export interface SettingsProps {
   settings: SettingsStore;
}

export default ({ settings }: SettingsProps) => {

   if (settings.get("trans_settings_api") != null) {
      var apiOptionsJson = settings.get("trans_settings_api_options") ?? "error";
      var engines = <FormSelect></FormSelect>
      
      for (var x in apiOptionsJson as any) {
         console.log(apiOptionsJson[x].name)
         // TODO: make engines selectable in a formselect
      }
   }

   return (
      <ScrollView>
         <FormSection title="API URL:">
            <TextInput
               keyboardType={"url"}
               autoCorrect={false}
               style={{ padding: 10, color: styles.text.color}}
               placeholder="https://kitsu-team.dev/enmity-translate-api"
               value={settings.get("trans_settings_api")}
               onChangeText={(text) => settings.set("trans_settings_api", text)}
               onEndEditing={() => 
                  get_options(settings.get("trans_settings_api"))
               }
            />
         </FormSection>
         <FormSection title="Engines:">
            <Text> Here engine FormSelect </Text>
         </FormSection>
      </ScrollView>
   );
};