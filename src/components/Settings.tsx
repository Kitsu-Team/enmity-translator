import { FormRow, FormSwitch, ScrollView, Text } from 'enmity/components';
import { SettingsStore } from 'enmity/api/settings';
import { React } from 'enmity/metro/common';

interface SettingsProps {
   settings: SettingsStore;
}

export default ({ settings }: SettingsProps) => {
   return (
      <ScrollView>

         <FormRow
            label='Translate incoming messages'
            trailing={
               <FormSwitch
                  value={settings.get('trans_in')}
                  onValueChange={(value) => settings.set('trans_in', value)}
               />
            }
         />
      </ScrollView>);
};


