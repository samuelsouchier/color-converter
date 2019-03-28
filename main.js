const html = document.querySelector('html');
html.classList.remove('no-js');

// Choose a random color and apply it to #color-feedback, #main-container and as a placeholder of #hex-value and text content of result
applyRandom();

document.addEventListener('keyup', function (event) { 
    if (event.keyCode === 32) {
        applyRandom();
    }
    })
// Handle 'enter' keyup on input : trigger button click
const input = document.getElementById('hex-value');
input.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("btn-convert").click();
    }
});

function convert() {
    const input = document.querySelector("#hex-value").value;
    const feedback = document.querySelector('#color-feedback');
    const calcResult = document.querySelector('#result');
    let result, r, g, b;
    if (isValidInput(input)) {
        if (isHex(input)) {
            r = input.substring(1,3);
            g = input.substring(3,5);
            b = input.substring(5,7);
            result = 'rgba(' + hexToInt(r) + ',' + hexToInt(g) + ',' + hexToInt(b) + ',' + 1 + ')';
        } else {
            let parsed = parseRgb(input);
            console.log(parsed);
            
            result = '#' + intToHex(parsed.r) + intToHex(parsed.g) + intToHex(parsed.b);
        }
        feedback.style.backgroundColor = result;
        document.querySelector('#main-container').style.backgroundColor = result;
        calcResult.textContent = result; 
    } else document.querySelectorAll('.warn')[0].textContent = 'Wrong format. please enter a value as following: #XXXXXX, rgb(X,X,X) or rgba(X,X,X,X.X)';
}

function hexToInt(hex) {
    return parseInt(hex, 16);
}

function intToHex(rgb) { 
    let hex = rgb.toString(16).toUpperCase();
    if (/^[0-9A-F]$/.test(hex)) {
        hex = '0' + hex;
    }

    return hex;
 }

function isHex (value) {
    if (value.substring(0,1) === '#') {
        return true;
    } else return false;
}

function isValidInput(value) {
    const regex = /^((#[a-fA-F0-9]{6})|([rR][gG][bB]\(([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\))|([rR][gG][bB][aA]\(([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\,[01](\.[0-9]{1,})?\)))$/g;
    let isValid = regex.test(value);
    return isValid;
}

function invertColor(color) {
    console.log('invertColor function');
    let rgb = {r: '', g: '', b: ''};
    if (isHex(color)) {
        rgb = parseHex(color);
        rgb.r = 255 - hexToInt(rgb.r);
        rgb.g = 255 - hexToInt(rgb.g);
        rgb.b = 255 - hexToInt(rgb.b);
        return '#' + intToHex(rgb.r) + intToHex(rgb.g) + intToHex(rgb.b);
    } else {
        rgb = splitRgb(color);
        rgb.r = 255 - rgb.r;
        rgb.g = 255 - rgb.g;
        rgb.b = 255 - rgb.b;
        return 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
    }
}

function parseHex (color) {
    const r = color.substring(1,3);
    const g = color.substring(3,5);
    const b = color.substring(5,7);
    return {r: r, g: g, b: b, a: 1};
}

function parseRgb(color) {
    let numbers, r, g, b, a, splitted;
    if (/[aA]/.test(color.substring(3,4))) {
        numbers = color.substring(5, color.length-1);
        splitted = numbers.split(',');
        r = parseInt(splitted[0], 10);
        g = parseInt(splitted[1], 10);
        b = parseInt(splitted[2], 10);
        a = parseFloat(splitted[3], 10);
    } else {
        numbers = color.substring(4, color.length-1);
        splitted = numbers.split(',');
        r = parseInt(splitted[0], 10);
        g = parseInt(splitted[1], 10);
        b = parseInt(splitted[2], 10);
        a = 1
    }
    return {r: r, g: g, b: b, a: a};
}

function randomColor () {
    let r, g, b;
    r = Math.floor(Math.random() * Math.floor(255));
    g = Math.floor(Math.random() * Math.floor(255));
    b = Math.floor(Math.random() * Math.floor(255));
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function applyRandom() {
    const random = randomColor();
    document.querySelector('#color-feedback').style.backgroundColor = random;
    document.querySelector('#main-container').style.backgroundColor = random;
    document.querySelector('#hex-value').value = random;
    document.querySelector('#result').textContent = random;
}

function copyToClipboard() {
    const info = document.querySelector('.btn-copy');
    const txt = document.querySelector('#result').textContent;
    const ta = document.createElement('textarea');
    if (!info.classList.contains('active')) {
        ta.value = txt;
        ta.style.position = 'absolute';
        ta.style.opacity = 0;
        ta.setAttribute('readonly', '');
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        
        info.classList.add('active');
        setTimeout(() => {
            info.classList.remove('active');
        }, 3000);
    }
}