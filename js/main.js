function password (length, special) {
        var iteration = 0;
        var password = "";
        var randomNumber;
        if(special == undefined){
            var special = false;
        }
        while(iteration < length){
            randomNumber = (Math.floor((Math.random() * 100)) % 94) + 33;
            if(!special){
                if ((randomNumber >=33) && (randomNumber <=47)) { continue; }
                if ((randomNumber >=58) && (randomNumber <=64)) { continue; }
                if ((randomNumber >=91) && (randomNumber <=96)) { continue; }
                if ((randomNumber >=123) && (randomNumber <=126)) { continue; }
            }
            iteration++;
            password += String.fromCharCode(randomNumber);
        }
        return password;
    }

function getMessage(id) {
    return chrome.i18n.getMessage(id);
}

window.onload = function(){
    init();
};

function init() {
    document.title = getMessage('appName');
    html('lab-passwords', getMessage('passwords'));
    html('lab-length', getMessage('length'));
    html('lab-special', getMessage('special'));
    html('submit', getMessage('submit'));

    initSelect('number',1,10);
    initSelect('length',8,25);

    document.getElementById('submit').onclick = function() {
        generate();
    }

    chrome.storage.local.get('result',function(items){
        if (items['result'] !== undefined) {
            html('result',items['result']);
        }
    })

}

function initSelect(obj, start, end) {
    var str = '';
    for (var i = start; i <= end; i++) {
        str += '<option>' + i +'</option>';
    }
    html(obj,str);
}

function HtmlEncode(s)
{
    var el = document.createElement("div");
    el.innerText = el.textContent = s;
    s = el.innerHTML;
    return s;
}

function html(id, str) {
    document.getElementById(id).innerHTML = str;
}

function generate() {
    var number = parseInt(document.getElementById('number').value),
        length = parseInt(document.getElementById('length').value),
        str = '<br/>';
    special = document.getElementById('special').checked === true;
    for (var i = 0; i < number; i++) {
        str += HtmlEncode(password(length,special)) + '<br/>';
    }
    chrome.storage.local.set({'result': str},function(){
        html('result',str);
    })
}