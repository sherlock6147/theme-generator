class Shades{
    //  A class to hold the shades' hex, rgb and hsl values
    constructor(h,s,l) {
        this.h = h;
        this.s = s;
        this.l = l;
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.hslToRgb();
        this.hex = "";
        this.rgbToHex();
        // this.rgb = "rgb(" + this.r.toString() + ", " + this.g.toString() + ", " + this.b.toString() + ")";
    }
    get rgb() {
        return "rgb(" + this.r.toString() + ", " + this.g.toString() + ", " + this.b.toString() + ")";
    }
    get hsl() {
        return "hsl(" + this.h.toString() + ", " + this.s.toString() + ", " + this.l.toString() + ")";
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
}