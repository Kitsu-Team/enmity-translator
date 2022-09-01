// todo make post request to the quart api 
//    trans_from = json["trans_from"]
//    trans_to = json["trans_to"]
//    trans_text = json["trans_text"]
//    trans_engine = json["trans_engine"]

//    Translation Engines
//      google = Google
//      mymem = MyMemory 
//      ling = Linguee
//      pons = PONS

var url = "http://192.168.178.65:5000/translate"

export function translateText(from, to, text, engine) {
    var json = {
        trans_from: from,
        trans_to: to,
        trans_text: text,
        trans_engine: engine
    }

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(json),
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    })
    // return json
        .then(res => res.json())
        .then(json => {
            // TODO: patch original message with translated text
            alert(json["text"])
            return json
        })
        .catch(error => alert("Error: " + error + "\n" + "Try selectiong a different translate engine (Google, MyMemory, Linguee, PONS)"));
};