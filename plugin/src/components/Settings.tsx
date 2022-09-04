import { FormRow, FormSwitch, ScrollView, Text, FormSelect, FormCardSection } from 'enmity/components';
import { SettingsStore } from 'enmity/api/settings';
import { React } from 'enmity/metro/common';
import { styles } from '../utils/styles';

interface SettingsProps {
   settings: SettingsStore;
}

export default ({ settings }: SettingsProps) => {
   const options = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
   ];

   return (
      <ScrollView>
         <FormCardSection>
            <Text style={{ color: styles.text.color, padding: 5 }}>HI</Text>
         </FormCardSection>

         <FormRow
            label='Translate incoming messages'
            trailing={
               <FormSwitch
                  value={
                     settings.get('trans_in')}
                     onValueChange={(value) => {
                        settings.set('trans_in', value);
                        console.log("settings1: " + settings.get('trans_in'))
                     }
                  }
               />
            }
         />
         <FormSelect
         options={options}/>
      </ScrollView>
   )
};