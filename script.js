// Update colors when the color picker value changes
function updateColors(hex) {
    const hexValue = hex.substring(1);
    document.getElementById('hex').value = hexValue;
    const rgb = hexToRgb(hex);
    updateRgbFields(rgb);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    updateHslFields(hsl);
    updateColorDisplay(hex);

    // Copy the HEX code to the clipboard
    copyToClipboard(hexValue);
}

// Convert from HEX
function convertFromHex(hex) {
    if (!isValidHex(hex)) return;
    const rgb = hexToRgb('#' + hex);
    updateRgbFields(rgb);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    updateHslFields(hsl);
    updateColorDisplay('#' + hex);
}

// Convert from RGB
function convertFromRgb() {
    const r = parseInt(document.getElementById('r').value);
    const g = parseInt(document.getElementById('g').value);
    const b = parseInt(document.getElementById('b').value);

    if (!isValidRgb(r, g, b)) return;

    const hex = rgbToHex(r, g, b);
    document.getElementById('hex').value = hex.substring(1);
    const hsl = rgbToHsl(r, g, b);
    updateHslFields(hsl);
    updateColorDisplay(hex);
}

// Convert from HSL
function convertFromHsl() {
    const h = parseInt(document.getElementById('h').value);
    const s = parseInt(document.getElementById('s').value);
    const l = parseInt(document.getElementById('l').value);

    if (!isValidHsl(h, s, l)) return;

    const rgb = hslToRgb(h, s, l);
    updateRgbFields(rgb);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    document.getElementById('hex').value = hex.substring(1);
    updateColorDisplay(hex);
}

// HEX to RGB conversion
function hexToRgb(hex) {
    let r = 0, g = 0, b = 0;

    // 3 digits
    if (hex.length == 4) {
        r = "0x" + hex[1] + hex[1];
        g = "0x" + hex[2] + hex[2];
        b = "0x" + hex[3] + hex[3];
    // 6 digits
    } else if (hex.length == 7) {
        r = "0x" + hex[1] + hex[2];
        g = "0x" + hex[3] + hex[4];
        b = "0x" + hex[5] + hex[6];
    }
    
    return {r: +r, g: +g, b: +b};
}

// RGB to HEX conversion
function rgbToHex(r, g, b) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);

    if (r.length == 1) r = "0" + r;
    if (g.length == 1) g = "0" + g;
    if (b.length == 1) b = "0" + b;

    return "#" + r + g + b;
}

// RGB to HSL conversion
function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return {h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100)};
}

// HSL to RGB conversion
function hslToRgb(h, s, l) {
    let r, g, b;

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return {r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255)};
}

// Update RGB fields
function updateRgbFields(rgb) {
    document.getElementById('r').value = rgb.r;
    document.getElementById('g').value = rgb.g;
    document.getElementById('b').value = rgb.b;
}

// Update HSL fields
function updateHslFields(hsl) {
    document.getElementById('h').value = hsl.h;
    document.getElementById('s').value = hsl.s;
    document.getElementById('l').value = hsl.l;
}

// Validate HEX
function isValidHex(hex) {
    return /^#?[0-9A-F]{3,6}$/i.test(hex);
}

// Validate RGB
function isValidRgb(r, g, b) {
    return (r >= 0 && r <= 255) && (g >= 0 && g <= 255) && (b >= 0 && b <= 255);
}

// Validate HSL
function isValidHsl(h, s, l) {
    return (h >= 0 && h <= 360) && (s >= 0 && s <= 100) && (l >= 0 && l <= 100);
}

// Update color display
function updateColorDisplay(color) {
    document.getElementById('colorDisplay').style.backgroundColor = color;
}

// Copy
// ... existing functions ...

function copyHexToClipboard() {
    const hexValue = document.getElementById('hex').value;
    if (hexValue) {
        navigator.clipboard.writeText('#' + hexValue).then(() => {
            console.log('HEX code copied to clipboard: #' + hexValue);
            // Optionally, display a message to the user
        }).catch(err => {
            console.error('Error in copying text: ', err);
        });
    }
}

function resetColors() {
    document.getElementById('colorPicker').value = '#000000';
    updateColors('#000000');
}