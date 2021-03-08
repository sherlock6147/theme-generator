// input elements
var hexInput = document.getElementById('hex-input');
var rInput = document.getElementById('r-input');
var gInput = document.getElementById('g-input');
var bInput = document.getElementById('b-input');
var hInput = document.getElementById('h-input');
var sInput = document.getElementById('s-input');
var lInput = document.getElementById('l-input');
var colorBg = document.getElementById('color-box');
var colorValue = document.getElementById('hex-code-output');

let color = new Color();
function hexFieldChanged() {
    console.log("changed "+hexInput.value);
    if (hexInput.value.length == 3) {
        // TODO convert to rgb
        // TODO convert to hsl
        // TODO change the color of the color-block
        let temp = hexInput.value;
        if (parseInt(temp[0] + temp[0], 16) < 256 && parseInt(temp[1] + temp[1], 16) < 256 && parseInt(temp[2] + temp[2], 16) < 256) {
            color.hex = "#" + temp[0] + temp[0] + temp[1] + temp[1] + temp[2] + temp[2];
            console.log(color.hex);
            color.updateFromHex();
            colorBg.style.backgroundColor = color.hex;
            colorValue.innerHTML = color.hex;
            rInput.value = color.r;
            gInput.value = color.g;
            bInput.value = color.b;
            hInput.value = color.h;
            sInput.value = color.s;
            lInput.value = color.l;
        }
    } else if (hexInput.value.length == 6) {
        // TODO convert to rgb
        // TODO convert to hsl
        // TODO change the color of the color-block
        let temp = hexInput.value;
        if (parseInt(temp[0] + temp[1], 16) < 256 && parseInt(temp[2] + temp[3], 16) < 256 && parseInt(temp[4] + temp[5], 16) < 256) {
            color.hex = "#" + temp[0] + temp[1] + temp[2] + temp[3] + temp[4] + temp[5];
            console.log(color.hex);
            color.updateFromHex();
            colorBg.style.backgroundColor = color.hex;
            colorValue.innerHTML = color.hex;
            rInput.value = color.r;
            gInput.value = color.g;
            bInput.value = color.b;
            hInput.value = color.h;
            sInput.value = color.s;
            lInput.value = color.l;
        }
    }
    else {
        // do nothing
    }
}
function rgbFieldChanged() {
    color.r = parseInt(rInput.value);
    color.g = parseInt(gInput.value);
    color.b = parseInt(bInput.value);
    color.updateFromRGB();
    colorBg.style.backgroundColor = color.hex;
    colorValue.innerHTML = color.hex;
    let te = color.hex.split("#");
    hexInput.value = te[1];
    hInput.value = color.h;
    sInput.value = color.s;
    lInput.value = color.l;
}
function hslFieldChanged() {
    color.h = parseInt(hInput.value);
    color.s = parseInt(sInput.value);
    color.l = parseInt(lInput.value);
    color.updateFromHSL();
    colorBg.style.backgroundColor = color.hex;
    colorValue.innerHTML = color.hex;
    let te = color.hex.split("#");
    hexInput.value = te[1];
    rInput.value = color.r;
    gInput.value = color.g;
    bInput.value = color.b;
}
$('#hex-input').on('input', function (e) {
    hexFieldChanged();
});
// RGB part
$('#r-input').on('input', function (e) {
    if (rInput.value != "" || gInput.value != "" || bInput.value != "") {
        if (parseInt(rInput.value) < 256 && parseInt(gInput.value) < 256 && parseInt(bInput.value) < 256) {
            rgbFieldChanged();
        }
    }    
});
$('#g-input').on('input', function (e) {
    if (rInput.value != "" || gInput.value != "" || bInput.value != "") {
        if (parseInt(rInput.value) < 256 && parseInt(gInput.value) < 256 && parseInt(bInput.value) < 256) {
            rgbFieldChanged();
        }
    }    
});
$('#b-input').on('input', function (e) {
    if (rInput.value != "" || gInput.value != "" || bInput.value != "") {
        if (parseInt(rInput.value) < 256 && parseInt(gInput.value) < 256 && parseInt(bInput.value) < 256) {
            rgbFieldChanged();
        }
    }    
});
// HSL
$('#h-input').on('input', function (e) {
    if (hInput.value != "" || sInput.value != "" || lInput.value != "") {
        if (parseInt(hInput.value) >0 && parseInt(sInput.value) > 0 && parseInt(lInput.value) >0) {
            hslFieldChanged();
        }
    }    
});
$('#s-input').on('input', function (e) {
    if (hInput.value != "" || sInput.value != "" || lInput.value != "") {
        if (parseInt(hInput.value) >0 && parseInt(sInput.value) > 0 && parseInt(lInput.value) >0) {
            hslFieldChanged();
        }
    }    
});
$('#l-input').on('input', function (e) {
    if (hInput.value != "" || sInput.value != "" || lInput.value != "") {
        if (parseInt(hInput.value) >0 && parseInt(sInput.value) > 0 && parseInt(lInput.value) >0) {
            hslFieldChanged();
        }
    }    
});