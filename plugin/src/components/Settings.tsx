import { FormRow, FormSwitch, ScrollView, Text, View, FormCardSection } from 'enmity/components';
import { SettingsStore } from 'enmity/api/settings';
import { React, Theme } from 'enmity/metro/common';

import { styles } from '../utils/styles';

interface SettingsProps {
   settings: SettingsStore;
   trans_in: boolean;
   trans_out: boolean;
}

export default ({ settings }: SettingsProps) => {
   console.log(Theme);
   return (
      <View>
         <FormCardSection>
            <Text style={{ color: styles.text.color ,padding: 5}}>HI</Text>
         </FormCardSection>
         <ScrollView style={{height: '100vh'}}>

         <FormRow
            label='Translate incoming messages'
            trailing={
               <FormSwitch
                  value={settings.get('trans_in')}
                  onValueChange={(value) => settings.set('trans_in', value)}
               />
            }
         />

      </ScrollView>
      </View>)
};