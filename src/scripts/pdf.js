var Pdf = (function() {
    var PDFDocument = require('pdfkit');
    var BlobStream = require('blob-stream');

    var Pdf = function(el) {
        this.el = el;
    }
    Pdf.prototype.makePDF = function(list) {
        // create a document and pipe to a blob
        var doc = new PDFDocument({
            'margin': 0
        });
        var stream = doc.pipe(BlobStream());

        for (var i = 0; i < list.length; i++) {
            doc.addPage({
                'size': [2550, 3501],
                'margin': 0
            });
            var image = list[i].base64;
            doc.image(image, 0, 0);
        }

        // end and display the document in the iframe to the right
        doc.end();
        var _this = this;
        stream.on('finish', function() {
            _this.el.src = stream.toBlobURL('application/pdf');
        });
    }
    return Pdf;
})();

module.exports = Pdf;