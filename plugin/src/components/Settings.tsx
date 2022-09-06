import { FormRow, FormSwitch, FormSection, ScrollView, Text, FormLabel, FormCardSection, FormCTAButton, TextInput } from 'enmity/components';
import { SettingsStore } from 'enmity/api/settings';
import { React } from 'enmity/metro/common';
import { styles } from '../utils/styles';

export interface SettingsProps {
   settings: SettingsStore;
}

export default ({ settings }: SettingsProps) => {

   return (
      <ScrollView>
         <FormSection title="Translate From:">
            <TextInput
               style={{ padding: 10, color: styles.text.color}}
               placeholder="en"
               value={settings.get("trans_settings_from")}
               onChangeText={(text) => settings.set("trans_settings_from", text)}
            />
         </FormSection>
         <FormSection title="Translate To:">
            <TextInput
               style={{ padding: 10, color: styles.text.color, backgroundColor: styles.background.color }}
               placeholder="de"
               value={settings.get("trans_settings_to")}
               onChangeText={(text) => settings.set("trans_settings_to", text)}
            />
         </FormSection>
         <FormSection title="Translate Engine:">
            <TextInput
               style={{ padding: 10, color: styles.text.color, backgroundColor: styles.background.color }}
               placeholder="google"
               value={settings.get("trans_settings_engine")}
               onChangeText={(text) => settings.set("trans_settings_engine", text)}
            />
         </FormSection>
         <FormSection title="Translate API:">
            <TextInput
               style={{ padding: 10, color: styles.text.color, backgroundColor: styles.background.color }}
               placeholder="https://kitsu-team.dev/api/translate"
               value={settings.get("trans_settings_api")}
               onChangeText={(text) => settings.set("trans_settings_api", text)}
            />
         </FormSection>
      </ScrollView>
   )
};