let GETTING_TIMEOUT = 5000;
//Zamanlama için kullanılır.
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

String.prototype.turkishToEnglishLower = function () {
    var string = this;
    var letters = { "İ": "i", "I": "i", "Ş": "s", "Ğ": "g", "Ü": "u", "Ö": "o", "Ç": "c", "ı": "i", "ş": "s", "ğ": "g", "ü": "u", "ö": "o", "ç": "c" };
    string = string.replace(/(([İIŞĞÜÇÖışğüçö]))/g, function (letter) { return letters[letter]; })
    return string.toLowerCase();
}

function fetchFunc(resource, method, options = {}, body) {
    const { timeout = GETTING_TIMEOUT } = options;
    const controller = new AbortController();
    const AbortTimer = setTimeout(() => controller.abort(), timeout);
    let headers = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token'),
            ...options.headers
        },
        signal: controller.signal
    };
    if (method == "POST" || method == "PUT") {
        headers.body = JSON.stringify(body);
    }
    const response = new Promise((resolve, reject) => {
        fetch(resource, headers)
            .then(response => response.json())
            .then(data => {
                resolve(data);
            })
            .catch((error) => {
                reject();
            })
            .finally(() => {
                clearTimeout(AbortTimer);
            });
    });
    return response;
}


/****** İmleç Pozisyonunu Ayarlama-Biter ******/
String.prototype.turkishToLower = function () {
    var string = this;
    var letters = {
        "İ": "i",
        "I": "ı",
        "Ş": "ş",
        "Ğ": "ğ",
        "Ü": "ü",
        "Ö": "ö",
        "Ç": "ç"
    };
    string = string.replace(/(([İIŞĞÜÇÖ]))/g, function (letter) {
        return letters[letter];
    })
    return string.toLowerCase();
}

String.prototype.turkishToUpper = function () {
    var string = this;
    var letters = {
        "i": "İ",
        "ş": "Ş",
        "ğ": "Ğ",
        "ü": "Ü",
        "ö": "Ö",
        "ç": "Ç",
        "ı": "I"
    };
    string = string.replace(/(([iışğüçö]))/g, function (letter) {
        return letters[letter];
    })
    return string.toUpperCase();
}