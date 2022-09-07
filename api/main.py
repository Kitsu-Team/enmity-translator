from quart import Quart, request
import json as JSONImport
from deep_translator import GoogleTranslator, MyMemoryTranslator, PonsTranslator, LingueeTranslator

app = Quart(__name__)

# TODO: add proxies

# Define all translators
googleTranslator = GoogleTranslator(source="auto", target="en")
myMemoryTranslator = MyMemoryTranslator(source="auto", target="en")
ponsTranslator = PonsTranslator(source="de", target="en")
lingueeTranslator = LingueeTranslator(source="de", target="en")


# route to get all translator engines + the supported languages
@app.route("/get_options", methods=["GET"])
def get_options():
    # return all languages that are supported by the API
    res = []

    # add google translator
    googleLang = googleTranslator.get_supported_languages(as_dict=True)
    googleJson = {"value": "google", "label": "Google",
                  "languages": [{"value": "auto", "label": "Auto"}]}
    for keys, values in googleLang.items():
        googleJson["languages"].append({"value": values, "label": keys})
    res.append(googleJson)

    # add my memory translator
    myMemoryLang = myMemoryTranslator.get_supported_languages(as_dict=True)
    myMemoryJson = {"value": "myMemory", "label": "MyMemory",
                    "languages": [{"value": "auto", "label": "Auto"}]}
    for keys, values in myMemoryLang.items():
        myMemoryJson["languages"].append({"value": values, "label": keys})
    res.append(myMemoryJson)

    # add pons translator
    ponsLang = ponsTranslator.get_supported_languages(as_dict=True)
    ponsJson = {"value": "pons", "label": "Pons", "languages": []}
    for keys, values in ponsLang.items():
        ponsJson["languages"].append({"value": keys, "label": values})
    res.append(ponsJson)

    # add linguee translator
    lingueeLang = lingueeTranslator.get_supported_languages(as_dict=True)
    lingueeJson = {"value": "linguee", "label": "Linguee", "languages": []}
    for keys, values in lingueeLang.items():
        lingueeJson["languages"].append({"value": values, "label": keys})
    res.append(lingueeJson)

    return JSONImport.dumps(res)

# route to translate the discord message


@app.route('/translate', methods=['POST'])
async def translate():
    # get the data from the reustes json
    json = await request.json
    trans_from = json["trans_from"]
    trans_to = json["trans_to"]
    trans_text = json["trans_text"]
    trans_engine = json["trans_engine"]

    # Google translator
    if trans_engine == "google":
        if trans_from == "auto":
            googleTranslator.source = "auto"
            googleTranslator.target = trans_to
            translated = googleTranslator.translate(text=trans_text)
        elif trans_from != "auto":
            googleTranslator.source = trans_from
            googleTranslator.target = trans_to
            translated = googleTranslator.translate(text=trans_text)

    # MyMemory Translator
    elif trans_engine == "mymemory":
        if trans_from == "auto":
            myMemoryTranslator.source = "auto"
            myMemoryTranslator.target = trans_to
            translated = myMemoryTranslator.translate(text=trans_text)
        elif trans_from != "auto":
            myMemoryTranslator.source = trans_from
            myMemoryTranslator.target = trans_to
            translated = myMemoryTranslator.translate(text=trans_text)

    # PONS Translator
    elif trans_engine == "pons":
        ponsTranslator.source = trans_from
        ponsTranslator.target = trans_to
        translated = ponsTranslator.translate(text=trans_text)

    # Linguee Translator
    elif trans_engine == "linguee":
        lingueeTranslator.source = trans_from
        lingueeTranslator.target = trans_to
        translated = lingueeTranslator.translate(text=trans_text)

    # respond JSON
    translated_json = {
        "text": translated
    }

    return JSONImport.dumps(translated_json)

if __name__ == '__main__':
    app.run(host='0.0.0.0')
