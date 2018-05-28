var Sortable = require('sortablejs');

var List = (function() {
    var List = function(el) {
        this._el = el;
        this._changeHandlers = [];
        this._list = [];

        var _this = this;
        this._sortable = new Sortable(el, {
            // Element dragging ended
            onEnd: function(e) {
                var l = _this._list;
                var a = l[e.oldIndex];
                for (var i = e.oldIndex; i < e.newIndex; i++) l[i] = l[i+1];
                for (var i = e.oldIndex; i > e.newIndex; i--) l[i] = l[i-1];
                l[e.newIndex] = a;
                _this._hasChanged();
            }
        });
    }
    List.prototype.add = function(nfs) {
        for (var i = 0; i < nfs.length; i++) {
            var nf = nfs[i];
            this._list.push(nf);
            var li = document.createElement('li');
            li.innerText = nf.name;
            this._el.appendChild(li);

            var _this = this;
            li.addEventListener('click', function(e) { 
                var target = e.target;
                var curr = target;
                var ind = 0;
                while (curr = curr.previousSibling) ind++;
                _this.remove(ind);
                console.log(ind);
            });
        }
        this._hasChanged();
    }
    List.prototype.remove = function(i) {
        $('#items li')[i].remove();
        for (var j = i; j < this._list.length-1; j++) {
            this._list[j] = this._list[j+1];
        }
        this._list.pop();
        this._hasChanged();
    }
    List.prototype._hasChanged = function() {
        for (var i = 0; i < this._changeHandlers.length; i++) {
            this._changeHandlers[i]();
        }
    }
    List.prototype.getList = function() {
        return this._list;
    }
    List.prototype.addChangeHandler = function(handle) {
        this._changeHandlers.push(handle);
    }
    return List;
})();

module.exports = List;