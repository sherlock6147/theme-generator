class User{
    constructor() {
        this.primaryColor = new Color();
        this.selectedShades = new Set();
        this.selectedShadesHex = [];
        this.selectedAlertColors = new Set();
        this.selectedAlertColorsHex = [];
        this.selectedTextColor = new Shades(0,0,0);
        this.selectedBgColors = new Shades(0,0,0);
    }
}