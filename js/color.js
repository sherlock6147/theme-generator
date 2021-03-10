class Color{
    // Setup
    constructor() {
        this.hex = "#EDEDED";
        this.r = parseInt(this.hex[1] + this.hex[2], 16);
        this.g = parseInt(this.hex[3] + this.hex[4], 16);
        this.b = parseInt(this.hex[5] + this.hex[6], 16);
        this.h = 0;
        this.s = 0;
        this.l = 94;
        this.shades = new Set();
        this.backgroundL = 10;
        this.textColorL = 98;
    }
    setupColor(hex) {
        this.hex = hex;
        this.r = parseInt(this.hex[1] + this.hex[2], 16);
        this.g = parseInt(this.hex[3] + this.hex[4], 16);
        this.b = parseInt(this.hex[5] + this.hex[6], 16);
        this.rgbToHsl();
    }
    rgbToHsl() {
        let r = this.r, g = this.g, b = this.b;
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
        this.h = h;
        this.s = s;
        this.l = l;
    }
    updateFromHex() {
        this.r = parseInt(this.hex[1] + this.hex[2], 16);
        this.g = parseInt(this.hex[3] + this.hex[4], 16);
        this.b = parseInt(this.hex[5] + this.hex[6], 16);
        this.rgbToHsl();
        this.generateShades();
    }
    rgbToHex() {
        let r = 0, g = 0, b = 0;
        r = this.r.toString(16);
        g = this.g.toString(16);
        b = this.b.toString(16);
        if (r.length == 1)
            r = "0" + r;
        if (g.length == 1)
            g = "0" + g;
        if (b.length == 1)
            b = "0" + b;
        this.hex = "#" + r + g + b;
        console.log(this.hex);
    }
    hslToRgb() {
        let s = 0, l = 0, h = 0;
        s = this.s/100;
        l = this.l/100;
        h = this.h;
        let c = (1 - Math.abs(2 * l - 1)) * s,
            x = c * (1 - Math.abs((h / 60) % 2 - 1)),
            m = l - c/2,
            r = 0,
            g = 0,
            b = 0;
        if (0 <= h && h < 60) {
            r = c; g = x; b = 0;  
            } else if (60 <= h && h < 120) {
            r = x; g = c; b = 0;
            } else if (120 <= h && h < 180) {
            r = 0; g = c; b = x;
            } else if (180 <= h && h < 240) {
            r = 0; g = x; b = c;
            } else if (240 <= h && h < 300) {
            r = x; g = 0; b = c;
            } else if (300 <= h && h < 360) {
            r = c; g = 0; b = x;
            }
        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);
        this.r = r;
        this.g = g;
        this.b = b;
    }
    updateFromRGB() {
        this.rgbToHex();
        this.rgbToHsl();
        this.generateShades();
    }
    updateFromHSL() {
        this.hslToRgb();
        this.rgbToHex();
        this.generateShades();
    }
    getRGBOut() {
        return "rgb(" + this.r.toString() + "," + this.g.toString() + "," + this.b.toString() + ")";
    }
    getHSLOut() {
        return "hsl(" + this.h.toString() + "," + this.s.toString() + "," + this.l.toString() + ")";
    }
    generateShades() {
        this.shades.clear();
        let tempL = this.l%10;
        while (tempL <= 100) {
            tempL += 10;
            if (tempL <= 100) {
                var shade = new Shades(this.h, this.s, tempL);
                this.shades.add(shade);    
            }
        }

    }
    get bgColor() {
        var temp = new Shades(this.h, this.s, this.backgroundL);
        return temp;
    }
    get textColor() {
        var temp = new Shades(this.h, this.s, this.textColorL);
        return temp;
    }
    generateShadesForAlert() {
        this.shades.clear();
        let tempL = 3,count=0;
        while (count <=5) {
            if (this.l - tempL > 0) {
                var newShade = new Shades(this.h, this.s, this.l-tempL);
                this.shades.add(newShade);
                ++count;
                tempL += 3;
            }
            if (this.l + tempL < 100) {
                var newShade = new Shades(this.h, this.s, this.l+tempL);
                this.shades.add(newShade);
                ++count;
                tempL += 3;
            }
        }
    }
}