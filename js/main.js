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

let primaryColor = new Color();
var user = new User();
function hexFieldChanged() {
    console.log("changed "+hexInput.value);
    if (hexInput.value.length == 3) {
        // TODO convert to rgb
        // TODO convert to hsl
        // TODO change the primaryColor of the primaryColor-block
        let temp = hexInput.value;
        if (parseInt(temp[0] + temp[0], 16) < 256 && parseInt(temp[1] + temp[1], 16) < 256 && parseInt(temp[2] + temp[2], 16) < 256) {
            primaryColor.hex = "#" + temp[0] + temp[0] + temp[1] + temp[1] + temp[2] + temp[2];
            console.log(primaryColor.hex);
            primaryColor.updateFromHex();
            colorBg.style.backgroundColor = primaryColor.hex;
            colorValue.innerHTML = primaryColor.hex;
            rInput.value = primaryColor.r;
            gInput.value = primaryColor.g;
            bInput.value = primaryColor.b;
            hInput.value = primaryColor.h;
            sInput.value = primaryColor.s;
            lInput.value = primaryColor.l;
            showShades();
        }
    } else if (hexInput.value.length == 6) {
        // TODO convert to rgb
        // TODO convert to hsl
        // TODO change the primaryColor of the primaryColor-block
        let temp = hexInput.value;
        if (parseInt(temp[0] + temp[1], 16) < 256 && parseInt(temp[2] + temp[3], 16) < 256 && parseInt(temp[4] + temp[5], 16) < 256) {
            primaryColor.hex = "#" + temp[0] + temp[1] + temp[2] + temp[3] + temp[4] + temp[5];
            console.log(primaryColor.hex);
            primaryColor.updateFromHex();
            colorBg.style.backgroundColor = primaryColor.hex;
            colorValue.innerHTML = primaryColor.hex;
            rInput.value = primaryColor.r;
            gInput.value = primaryColor.g;
            bInput.value = primaryColor.b;
            hInput.value = primaryColor.h;
            sInput.value = primaryColor.s;
            lInput.value = primaryColor.l;
            showShades();
        }
    }
    else {
        // do nothing
    }
}
function rgbFieldChanged() {
    primaryColor.r = parseInt(rInput.value);
    primaryColor.g = parseInt(gInput.value);
    primaryColor.b = parseInt(bInput.value);
    primaryColor.updateFromRGB();
    colorBg.style.backgroundColor = primaryColor.hex;
    colorValue.innerHTML = primaryColor.hex;
    let te = primaryColor.hex.split("#");
    hexInput.value = te[1];
    hInput.value = primaryColor.h;
    sInput.value = primaryColor.s;
    lInput.value = primaryColor.l;
    showShades();
}
function hslFieldChanged() {
    primaryColor.h = parseInt(hInput.value);
    primaryColor.s = parseInt(sInput.value);
    primaryColor.l = parseInt(lInput.value);
    primaryColor.updateFromHSL();
    colorBg.style.backgroundColor = primaryColor.hex;
    colorValue.innerHTML = primaryColor.hex;
    let te = primaryColor.hex.split("#");
    hexInput.value = te[1];
    rInput.value = primaryColor.r;
    gInput.value = primaryColor.g;
    bInput.value = primaryColor.b;
    showShades();
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
function showShades() {
    var setOfShades = primaryColor.shades;
    var shadesHTML = '';
    setOfShades.forEach(shade => {
        shadesHTML += '<button class="shade-btn" onclick="onClickShade(this)" style="background-color: ' + shade.hex + '">';
        shadesHTML += '<p class="shade-value">' + shade.hex + '</p>';
        shadesHTML += '</button>';
    });
    var shadeBlock = document.getElementById('primary-shade-block');
    shadeBlock.innerHTML = shadesHTML;
}
function onClickShade(element){
    console.log(element.classList);
    user.primaryColor = primaryColor;
    if (element.classList.contains('selected')) {
        // remove color
        element.classList.remove('selected');
        var count = 0, indexToDelete = 0;
        console.log("removing");
        user.selectedShadesHex.forEach(shadeHex => {
            if (shadeHex == element.children[0].innerHTML) {
                indexToDelete = count;
                console.log(indexToDelete);
                removeFromArray(indexToDelete);
            } else {
                ++count;
            }
        });

        console.log(user.selectedShades);
    } else {
        // add color
        element.classList.add('selected');
        console.log("adding");
        user.selectedShadesHex.push(element.children[0].innerHTML);
        user.selectedShades.add(generateShadeHsl(element.children[0].innerHTML));
        console.log(user.selectedShades);
    }
}
function generateShadeHsl(hex) {
    let r = 0, g = 0, b = 0;
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    if (delta == 0)
        h = 0;
    else if (cmax == r)
        h = ((g - b) / delta) % 6;
    else if (cmax == g)
        h = (b - r) / delta + 2;
    else
        h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0)
        h += 360;

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    var result = new Shades(h, s, l);
    return result;
}
function removeFromArray(i) {
    var newArr = [];
    for (let index = 0; index < i; index++) {
        const element = user.selectedShadesHex[index];
        if (index < i||index>i) {
            newArr.push(element);
        }
    }
    user.selectedShadesHex = newArr;
    rebuildShadesFromHex();
}
function rebuildShadesFromHex() {
    var newSet = new Set();
    user.selectedShadesHex.forEach(shadeHex => {
        var temp = generateShadeHsl(shadeHex);
        newSet.add(temp);
    })
    user.selectedShades = newSet;
}