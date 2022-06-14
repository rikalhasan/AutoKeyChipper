$(document).ready(function() {

    $("#encode").click(function() {
        var text = $("#input_text").val();
        var key = $("#input_key").val();
        text = text.toUpperCase();
        key = key.toUpperCase();
        key = MakeLength(key, text);


        if (text == "") {
            $("#error").html("Text belum di isi");
            $("#resdiv").hide();
            $("#collapse").hide();
            $("#tabel").html("");
            
        } else {
            var output = encode(text, key);
            var encodedtext = output[0];
            var tabel = output[1];
            $("#collapse").show();
            $("#inputstring").html("Text Inputan");
            $("#resultstring").html("Bentuk Enkripsi");
            $("#error").html("");
            $("#plaintext").html("<h5>" + text + "</h5>");
            $("#tabel").html(tabel);
            $("#encodedtext").html("<h5>" + encodedtext + "</h5>");
            $("#resdiv").show();
        }

    });
    
    $("#decode").click(function() {
        var text = $("#input_text").val();
        var key = $("#input_key").val();
        text = text.toUpperCase();
        key = key.toUpperCase();
        key = MakeLength(key, text);

        if (text == "") {
            $("#error").html("Text belum di isi");
            $("#resdiv").hide();
            $("#collapse").hide();
        } else {
            var output = decode(text, key);
            var decodedtext = output[0];
            var tabel = output[1];
            $("#collapse").show();
            $("#inputstring").html("Text Inputan");
            $("#resultstring").html("Bentuk Dekripsi");
            $("#error").html("");
            $("#tabel").html(tabel);
            $("#plaintext").html("<h5>" + text + "</h5>");
            $("#encodedtext").html("<h5>" + decodedtext + "</h5>");
            $("#resdiv").show();
        }

    });

});

// Jika Key kurang dari plaintext
function MakeLength(key, text) {
    var panjang = key.length;
    var panjang2 = text.length;
    var m = 0;
    for (var i = panjang; i < panjang2; i++) {
        key += text[m];
        m++;
    }
    return key;
}
// buat tabel
function buatTabel(matrix, x, y, z) {
    var ui = "<table class='mt-3 table table-bordered table-hover table-stripped' style='font-size:12px;'>";
    for (var i = 0; i < matrix.length; i++) {
        ui += "<tr>";
        for (var t = 0; t < matrix[0].length; t++) {
            if (i == x && t == y && z == 1)
                ui += "<td class='btn-primary'>" + matrix[i][t] + "</td>";
            else if (z == 0 && t == 0 && i == x)
                ui += "<td class='btn-primary'>" + matrix[i][t] + "</td>";
            else if (i == x || t == y)
                ui += "<td style='background-color:#a4ccf7;'>" + matrix[i][t] + "</td>";

            else

                ui += "<td>" + matrix[i][t] + "</td>";
        }
        ui += "</tr>";
    }
    ui += "</table>";
    return ui;
}
// enkripsi
function encode(text, key) {
    var sub = [];
    var matrix = [];
    for (i = 0; i < 26; i++) {
        sub = [];
        for (j = 0; j < 26; j++) {
            m = 65 + i + j;
            if (m > 90) {
                m = m - 26;
            }
            sub.push(String.fromCharCode(m));
        }
        matrix.push(sub);
    }
    var out = [];
    var s = "";
    var tabel = "<table class='mt-3 table table-bordered'><tr><td><h5>Input: </h5></td><td><h5>" + text + "</h5></td></tr><tr><td><h5>Key: </h5></td><td><h5>" + key + "</h5></td></tr></table>";
    for (i = 0; i < text.length; i++) {
        var t = text.charCodeAt(i);
        var k = key.charCodeAt(i);
        tabel += "<h4 class='mt-3'>Memilih kolom yang mengandung Plaintext " + text[i] + " dan Key " + key[i] + "</h4>";
        tabel += buatTabel(matrix, t - 65, k - 65, 1); 
        s += matrix[t - 65][k - 65];
    }
    out.push(s);
    out.push(tabel);
    return out;
}

// dekripsi
function decode(text, key) {
    var sub = [];
    var matrix = [];
    for (i = 0; i < 26; i++) {
        sub = [];
        for (j = 0; j < 26; j++) {
            m = 65 + i + j;
            if (m > 90) {
                m = m - 26;
            }
            sub.push(String.fromCharCode(m));
        }
        matrix.push(sub);
    }
    var out = [];
    var s = "";
    var matrixUi = "<table class='mt-3 table table-bordered'><tr><td><h5>Input: </h4></td><td><h5>" + text + "</h5></td></tr><tr><td><h5>Key: </h5></td><td><h5>" + key + "</h5></td></tr></table>";
    for (i = 0; i < text.length; i++) {
        var t = text.charCodeAt(i);
        var k = key.charCodeAt(i);
        matrixUi += "<h4 class='mt-3'>Memilih kolom yang mengandung Key " + key[i] + " di Bris " + text[i] + "</h4>";
        matrixUi += buatTabel(matrix, matrix[k - 65].indexOf(text[i]), k-65, 0);
        s += String.fromCharCode(matrix[k - 65].indexOf(text[i]) + 65);
    }
    out.push(s);
    out.push(matrixUi);
    return out;
}


