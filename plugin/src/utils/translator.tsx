// function export as void


export function translateText(from, to, text, engine, api) {
    var json = {
        trans_from: from,
        trans_to: to,
        trans_text: text,
        trans_engine: engine,
    }

    fetch(api + "/translate", {
        method: 'POST',
        body: JSON.stringify(json),
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    })
    // return json
        .then(res => res.json())
        .then(json => {
            var trabslated = json;
            return trabslated
        })
        .catch(error => alert("Error: " + error + "\n" + "There was an error translating your text. Please check your settings and try again."));
};