'use strict';
var FzInfo = function(text) {
    if (text) {
        var obj = JSON.parse(text);
        this.name = obj.name;
        this.money = obj.money;
        this.cause = obj.cause;
        this.date = obj.date;
        this.mark = obj.mark;
        this.type = obj.type;
    } else {
        this.name = "";
        this.money = "";
        this.cause = "";
        this.date = "";
        this.mark = "";
        this.type = "";
    }
};
var SampleContract = function () {
    LocalContractStorage.defineMapProperty(this, "usermap");
};

SampleContract.prototype = {
    init: function () {
    },
    set: function (name, value) {
        var userads = Blockchain.transaction.from;
        var fzq = new FzInfo(value);
        var alldata = this.usermap.get(userads)
        if(alldata){
            var array = JSON.parse(alldata);
            array.push(fzq);
            array = JSON.stringify(array)
            this.usermap.put(userads, array)
        }else{
            var data = new Array();
            data.push(fzq);
            data = JSON.stringify(data)
            this.usermap.put(userads, data)
        }

    },
    getAll: function () {
        var userads = Blockchain.transaction.from;
        var data = this.usermap.get(userads)
        return data;
    },

};

module.exports = SampleContract;