import { FormRow, FormSwitch, ScrollView, Text, FormLabel, FormCardSection, FormCTAButton, TextInput } from 'enmity/components';
import { SettingsStore } from 'enmity/api/settings';
import { React } from 'enmity/metro/common';
import { styles } from '../utils/styles';

export interface SettingsProps {
   settings: SettingsStore;
}

export default ({ settings }: SettingsProps) => {

   return (
      <ScrollView>
         <FormRow
            label='Translate from:'
         />
         <TextInput
            style={{ margin: 10, borderRadius: 10, color: styles.text.color}}
            placeholder="en"
            value={settings.get("trans_settings_from")}
            onChangeText={(text) => settings.set("trans_settings_from", text)}
         />
         <FormRow
            label='Translate to:'
         />
         <TextInput
            style={{ margin: 10, borderRadius: 10, color: styles.text.color, backgroundColor: styles.background.color }}
            placeholder="de"
            value={settings.get("trans_settings_to")}
            onChangeText={(text) => settings.set("trans_settings_to", text)}
         />
         <FormRow
            label='Translate engine:'
         />
         <TextInput
            style={{ margin: 10, borderRadius: 10, color: styles.text.color, backgroundColor: styles.background.color }}
            placeholder="google"
            value={settings.get("trans_settings_engine")}
            onChangeText={(text) => settings.set("trans_settings_engine", text)}
         />
         <FormRow
            label='Translate API:'
         />
         <TextInput
            style={{ margin: 10, borderRadius: 10, color: styles.text.color, backgroundColor: styles.background.color }}
            placeholder="https://kitsu-team.dev/api/translate"
            value={settings.get("trans_settings_api")}
            onChangeText={(text) => settings.set("trans_settings_api", text)}
         />
      </ScrollView>
   )
};