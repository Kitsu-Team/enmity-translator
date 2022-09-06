import { get, set } from 'enmity/api/settings';

// call /get_options api endpoint to get the available languages + engines

export function get_options(api) {
    try {
        fetch(api + "/get_options")
        .then((response) => response.json())
            .then((data) => {
            alert("You successfully connected to the API!\n You can now select the languages and engines you want to use.\n \n Happy translating! \n - KitsuTeam");
            set("enmity-translator", "trans_settings_api_options", data)
        });
    } catch (error) {
        alert("The api isn't available or the url is wrong");
        set("enmity-translator", "trans_settings_api_options", "error")
    }
};