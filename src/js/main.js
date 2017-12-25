var Pdf = require('./pdf');
var Dropbox = require('./dropbox');
var List = require('./list');

document.addEventListener('DOMContentLoaded', function(){
    var drop = new Dropbox(document.getElementById('dropbox'));
    var pdf = new Pdf(document.getElementById('preview'));
    var list = new List(document.getElementById('items'));
    
    list.addChangeHandler(function() {
        pdf.makePDF(list.getList());
    });
    drop.addDropHandler(function(nfs) {
        list.add(nfs);
    });
});