# API
The api is the translation part of the translation plugin.

It recieves those values: `trans_from` `trans_to` `trans_text` `trans_engine` on the `/translate` route as a POST request.

Right now the api only has 4 engines `Google` `MyMemory` `Linguee` and `PONS`.
I will extend those in the future, to also include the yandex translator for example.

### SETUP
If you want to setup the api for whatever reason (for example if the public one is slow or straight up unaviable), you are free to do so.

TODO: write this after im 100% done with the api :P

### START
`hypercorn main:app --workers 6 -b 0.0.0.0:5000`


**The plug-in:** https://ftp.kitsu-team.dev/enmity-translator.js
**GitHub:** <https://github.com/Kitsu-Team/enmity-translator>
**Public API endpoint:** `https://kitsu-team.dev/api/translate`

