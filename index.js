var coords = {
    fromSexagesimal: function(x) {
        var deg = 0,
            r = /(\d+)[˚°]\s*(\d+)?[′‘']?\s*(\d+)?[″"]?\s*(S|N|E|W)?/,
            m = x.match(r);
        if (!m) return null;
        if (m[1]) deg += parseFloat(m[1]);
        if (m[2]) deg += parseFloat(m[2]) / 60;
        if (m[3]) deg += parseFloat(m[3]) / 3600;
        if (m[4] && m[4] === 'S' || m[4] === 'E') deg *= -1;
        return deg;
    },

    fromDecimal: function(x) {
        if (x.match(/[˚°]/)) return null;
        var m = parseFloat(x);
        if (!isNaN(m)) return m;
    },

    toSexagesimal: function(x, format) {
        var deg = Math.floor(x);
        var min = (x - Math.floor(x)) * 60;
        var sec = (min - Math.floor(min)) * 60;
        min = Math.floor(min);
        var retVal='';
        if ( !format || format == 'original' ){
            sec = Math.floor(sec);
            retVal = deg + '° ' + min + '′ ' + sec + '″';
        }
        if (format == 'blank'){
            retVal = deg + ' ' + min + ' ' + sec;
        }

        return retVal;
    },

    parse: function(x) {
        return this.fromDecimal(x) || this.fromSexagesimal(x) || 0;
    },

    parsePair: function(x) {
        if (this.fromDecimal(x) !== null) {
            var p = x.split(/\s+/);
            if (p.length !== 2) throw Error('Two numbers are expected in a pair');
            return [
                this.fromDecimal(p[0]),
                this.fromDecimal(p[1])];
        } else {
            var a = this.fromSexagesimal(x);
            return [a, a];
        }
    },

    generate: function(x, format) {
        return this.toSexagesimal(x);
    },

    generatePair: function(x, format) {
        return this.toSexagesimal(x);
    }
};

if (typeof module !== 'undefined') module.exports = coords;
