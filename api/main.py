from flask import jsonify
from quart import Quart, request
import json as JSONImport
from deep_translator import (GoogleTranslator, MyMemoryTranslator, PonsTranslator, LingueeTranslator,
                             YandexTranslator)
from decouple import config


app = Quart(__name__)


@app.route('/translate', methods=['POST'])
async def translate():
    json = await request.json
    # get the data from the reustes json
    trans_from = json["trans_from"]
    trans_to = json["trans_to"]
    trans_text = json["trans_text"]
    trans_engine = json["trans_engine"]

    # Google translator
    if trans_engine == "google":
        if trans_from == "auto":
            translated = GoogleTranslator(
                source='auto', target=trans_to).translate(text=trans_text)
        elif trans_from != "auto":
            translated = GoogleTranslator(
                source=trans_from, target=trans_to).translate(text=trans_text)

    # MyMemory Translator
    elif trans_engine == "mymem":
        if trans_from == "auto":
            translated = MyMemoryTranslator(
                source='auto', target=trans_to).translate(text=trans_text)
        elif trans_from != "auto":
            translated = MyMemoryTranslator(
                source=trans_from, target=trans_to).translate(text=trans_text)

    # Linguee Translator
    elif trans_engine == "ling":
        translated = LingueeTranslator(
            source=trans_from, target=trans_to).translate(text=trans_text)

    # PONS Translator
    elif trans_engine == "pons":
        translated = PonsTranslator(
            source=trans_from, target=trans_to).translate(trans_text)

    # respond JSON
    translated_json = JSONImport.dumps({
        "text": translated
    })

    return translated_json

if __name__ == '__main__':
    app.run(host='0.0.0.0')
