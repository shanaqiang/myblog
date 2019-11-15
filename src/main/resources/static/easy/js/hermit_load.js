"use strict";
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (a) {
    return typeof a
} : function (a) {
    return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a
};

function cloneObject(a) {
    if (null == a || "object" != ("undefined" == typeof a ? "undefined" : _typeof(a))) return a;
    if (a instanceof Date) {
        var b = new Date(a.getDate());
        return b
    }
    if (a instanceof Array) {
        for (var b = [], c = 0, d = a.length; c < d; c++) b[c] = a[c];
        return b
    }
    if (a instanceof Object) {
        var b = {};
        for (var f in a) a.hasOwnProperty(f) && (b[f] = cloneObject(a[f]));
        return b
    }
}

function hermitInit() {
    var a = document.getElementsByClassName("aplayer");
    ap = [];
    for (var c = [], d = [], f = function (j) {
        if (a[j].dataset.songs) {
            d[j] = cloneObject(a[j].dataset), d[j].element = a[j], c[j] = new XMLHttpRequest, c[j].onreadystatechange = function () {
                var l = c.indexOf(this), m = d[l];
                if (m.storageName = "HxAP-Setting", 4 === this.readyState) if (200 <= this.status && 300 > this.status || 304 === this.status) {
                    var n = JSON.parse(this.responseText);
                    if (m.music = n.msg.songs, void 0 === m.music) return console.warn("Hermit-X failed to load " + d[l].songs), !1;
                    void 0 === m.showlrc && (m.music[0].lrc ? m.lrcType = 3 : m.lrcType = 0), 1 === m.music.length && (m.music = m.music[0]), m.autoplay && (m.autoplay = "true" === m.autoplay), m.listfolded && (m.listFolded = "true" === m.listfolded), m.mutex && (m.mutex = "true" === m.mutex), m.narrow && (m.narrow = "true" === m.narrow), ap[j] = new APlayer(m), ap[j].parseRespons = n, window.APlayerCall && window.APlayerCall[j] && window.APlayerCall[j](), window.APlayerloadAllCall && a.length != ap.length && window.APlayerloadAllCall()
                } else console.error("Request was unsuccessful: " + this.status)
            };
            var k = HermitX.ajaxurl + "?action=hermit&musicset=" + escape(d[j].songs) + "&_nonce=" + d[j]._nonce;
            c[j].open("get", k, !0), c[j].send(null)
        }
    }, g = 0; g < a.length; g++) f(g)
}

function reloadHermit() {
    for (var a = 0; a < ap.length; a++) try {
        ap[a].destroy()
    } catch (b) {
    }
    hermitInit()
}

var ap = [];
document.addEventListener("DOMContentLoaded", reloadHermit);