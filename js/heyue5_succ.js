//传入的必须是json的FzInfo对象
'use strict';
var FzInfo = function(text) {

};
var SampleContract = function () {
    LocalContractStorage.defineMapProperty(this, "usermap");
};

SampleContract.prototype = {
    init: function () {
    },

    set: function (name, money,cause,date,mark,type) {
        var userads = Blockchain.transaction.from;
        // var obj = JSON.parse(value)
        var fzq = {};
        fzq.name = name;
        fzq.money = money;
        fzq.cause = cause;
        fzq.date = date;
        fzq.mark = mark;
        fzq.type = type;
        var alldata = this.usermap.get(userads)
        if(alldata){
            alldata.push(fzq);
            this.usermap.put(userads, alldata)
        }else{
            var arr = [];
            arr.push(fzq);
            this.usermap.put(userads, arr)
        }

    },
    get: function () {
        var userads = Blockchain.transaction.from;
        var data = this.usermap.get(userads)
        return data;
    },

};
module.exports = SampleContract;