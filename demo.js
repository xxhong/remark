"use strict";

var nebulas = require("nebulas"),
    Account = nebulas.Account,
    Utils = nebulas.Utils,
    neb = new nebulas.Neb(),
    globalParams = {
        account: null
    },
    validateTab2 = uiBlock.validate("#tab2"),
    validateTab3 = uiBlock.validate("#tab3");

var WALL_ADDRESS = "n1ujAF6ArsdFREzBcEBaVeZpdcj915kZB3p";//contract address

neb.setRequest(new nebulas.HttpRequest(localSave.getItem("apiPrefix") || "https://api.nasscan.io"));

uiBlock.insert({
    footer: ".footer",
    header: ".header",
    iconAddress: ".icon-address",
    logoMain: ".logo-main",
    numberComma: ".number-comma",
    selectWalletFile: [".select-wallet-file", onUnlockFile]
});



// prompt（function，args）
$("#prompt").mouseover(function(){
    $("#prompt_contenner").removeClass("active1");
});

$("#prompt").mouseout(function(){
    $("#prompt_contenner").addClass("active1");
});

$("#call_prompt").mouseover(function(){
    $("#call_prompt_contenner").removeClass("active1");
});

$("#call_prompt").mouseout(function(){
    $("#call_prompt_contenner").addClass("active1");
});

$("#function_prompt").mouseover(function(){
    $("#function_prompt_contenner").removeClass("active1");
});

$("#function_prompt").mouseout(function(){
    $("#function_prompt_contenner").addClass("active1");
});

$("#call_test").on("click", getAutoText);
$("#call").on("click", onClickCall);

function activeSubmit() {
    $("#call").attr("disabled", false);
}

function canvasUpda"use strict";

var nebulas = require("nebulas"),
    Account = nebulas.Account,
    Utils = nebulas.Utils,
    neb = new nebulas.Neb(),
    globalParams = {
        account: null
    },
    validateTab2 = uiBlock.validate("#tab2"),
    validateTab3 = uiBlock.validate("#tab3");

var WALL_ADDRESS = "n1ujAF6ArsdFREzBcEBaVeZpdcj915kZB3p";//contract address

neb.setRequest(new nebulas.HttpRequest(localSave.getItem("apiPrefix") || "https://api.nasscan.io"));

uiBlock.insert({
    footer: ".footer",
    header: ".header",
    iconAddress: ".icon-address",
    logoMain: ".logo-main",
    numberComma: ".number-comma",
    selectWalletFile: [".select-wallet-file", onUnlockFile]
});



// prompt（function，args）
$("#prompt").mouseover(function(){
    $("#prompt_contenner").removeClass("active1");
});

$("#prompt").mouseout(function(){
    $("#prompt_contenner").addClass("active1");
});

$("#call_prompt").mouseover(function(){
    $("#call_prompt_contenner").removeClass("active1");
});

$("#call_prompt").mouseout(function(){
    $("#call_prompt_contenner").addClass("active1");
});

$("#function_prompt").mouseover(function(){
    $("#function_prompt_contenner").removeClass("active1");
});

$("#function_prompt").mouseout(function(){
    $("#function_prompt_contenner").addClass("active1");
});

$("#call_test").on("click", getAutoText);
$("#call").on("click", onClickCall);

function activeSubmit() {
    $("#call").attr("disabled", false);
}

function canvasUpdate(data) {
    var res = data.result;
    console.log(data);
    var number = 10;
    if (res) {
        var arr = [];
        res = JSON.parse(res);
        console.log("before:", res);
        if (res.length > number) {
            res = res.slice(res.length - number, res.length);
        }
        console.log("after:", res);

        for (var key in res) {
            var obj = res[key];
            arr.push(obj.words);
        }
        window.textList = arr;
    }
}
function getAutoText() {
//            validateTab3() &&
    innerCall(function (params) {
        neb.api
            .call({
                from: params.from,
                to: params.to,
                value: params.value,
                nonce: params.nonce,
                gasPrice: params.gasPrice,
                gasLimit: params.gasLimit,
                contract: params.contract
            })
            .then(function (resp) {
                //
                canvasUpdate(resp);
            })
            .catch(function (err) {
                $("#call_test_result").text(JSON.stringify(err));
                $("#call").attr("disabled", true);
                $("#call_result").text("");
                $(".next").removeClass("active1");
            });
    });
}
function addTextToScreen() {
    var txt = $("#wall_content").val().trim();
    if (txt && txt.length > 0) {
        window.textList = window.textList.concat(txt);
    }
}

function onClickCall() {
    $(".modal.loading").modal("show");

    previousInnerCall(function (params) {
        var gTx = new nebulas.Transaction(parseInt(localSave.getItem("chainId")),
            globalParams.account,
            params.to, params.value, params.nonce, params.gasPrice, params.gasLimit, params.contract);

        gTx.signTransaction();
        console.log("onClickCall",parseInt(localSave.getItem("chainId")),
            globalParams.account,
            params.to, params.value, params.nonce, params.gasPrice, params.gasLimit, params.contract);
        neb.api
            .sendRawTransaction(gTx.toProtoString())
            .then(function (resp) {
                console.log(JSON.stringify(resp));
                $("#call_result").text(JSON.stringify(resp));
                $(".result").removeClass("active1");
                $(".next").removeClass("active1");
                $("#receipt_call").text(resp.txhash).prop("href", "check.html?" + resp.txhash);
                $(".modal.loading").modal("hide");

                addTextToScreen();


                $(".modal.success").modal("show");

                setTimeout(function() {
                    $(".modal.success").modal("hide");
                },2000);
            })
            .catch(function (err) {
                $("#call_result").text(JSON.stringify(err));
                $(".result").removeClass("active1");
                $(".next").removeClass("active1");
                $(".modal.loading").modal("hide");
            });
    });
}

function onUnlockFile(swf, fileJson, account, password) {
    var balance_nas, state,
        fromAddr = account.getAddressString(),
        $tab = $(swf).closest(".tab");

    $(".modal.loading").modal("show");

    if ($tab.prop("id") == "tab2") {
        $("#from_addr").val(fromAddr).trigger("input");
        $("#to_addr").val(account.getAddressString()).trigger("input");
    } else if ($tab.prop("id") == "tab3")
        $("#run_from_addr").val(fromAddr).trigger("input");

    try {
        account.fromKey(fileJson, password);
        globalParams.account = account;
        $("#unlock").hide();
        $("#send").show();
        neb.api.gasPrice()
            .then(function (resp) {
                $("#gas_price").val(resp.gas_price);
                $("#run_gas_price").val(resp.gas_price);

                return neb.api.getAccountState(fromAddr);
            })
            .then(function (resp) {
                var balance = nebulas.Unit.fromBasic(resp.balance, "nas");

                if ($tab.prop("id") == "tab2")
                    $("#balance").val(balance + " NAS");
                else if ($tab.prop("id") == "tab3")
                    $("#run_balance").val(balance + " NAS");
                console.log("balance2,",balance);

                $(".modal.loading").modal("hide");

                activeSubmit();
            })
            .catch(function (e) {
                // this catches e thrown by nebulas.js!neb

                bootbox.dialog({
                    backdrop: true,
                    onEscape: true,
                    message: i18n.apiErrorToText(e.message),
                    size: "large",
                    title: "Error"
                });

                $(".modal.loading").modal("hide");
            });
    } catch (e) {
        // this catches e thrown by nebulas.js!account

        bootbox.dialog({
            backdrop: true,
            onEscape: true,
            message: localSave.getItem("lang") == "en" ? e : "keystore 文件错误, 或者密码错误",
            size: "large",
            title: "Error"
        });

        $(".modal.loading").modal("hide");
    }
}



function innerCall(callback, func) {
    let params = {};

//            if (!globalParams.account) {
//                console.log("====");
//                // TODO 提示钱包信息不正确
//                return;
//            }
//            params.from = globalParams.account.getAddressString();
    params.from  = localSave.getItem("initAddress");

    // prepare to
    let toAddr = WALL_ADDRESS;

    params.to = toAddr;

    // prepare gasLimit
    let gasLimit = Utils.toBigNumber(0);
    try {
//                gasLimit = Utils.toBigNumber($("#run_gas_limit").val());
        gasLimit = Utils.toBigNumber("200000");
    } catch (err) {
        console.log(err);
    }
    if (gasLimit.cmp(Utils.toBigNumber(0)) <= 0) {
        $("#run_gas_limit").addClass("err");
        setTimeout(function () {
            $("#run_gas_limit").removeClass("err");
        }, 5000);
        return;
    }
    params.gasLimit = gasLimit.toNumber();

    // prepare gasPrice
    let gasPrice = Utils.toBigNumber(0);
    try {
        gasPrice = Utils.toBigNumber("1000000");
    } catch (err) {
        console.log(err);
    }
    if (gasPrice.cmp(Utils.toBigNumber(0)) <= 0) {
        $("#run_gas_price").addClass("err");
        setTimeout(function () {
            $("#run_gas_price").removeClass("err");
        }, 5000);
        return;
    }
    params.gasPrice = gasPrice.toNumber();

    // prepare value
    let value = Utils.toBigNumber(0);
    try {
//                value = nebulas.Unit.toBasic(Utils.toBigNumber($("#run_value").val()), "nas");
        value = nebulas.Unit.toBasic(Utils.toBigNumber(0), "nas");
    } catch (err) {
        console.log(err);
    }
    if (value.cmp(Utils.toBigNumber(0)) < 0) {
        // TODO 添加提示value输入不对
        console.log("invalid value");
        return;
    }
    params.value = value;

    params.contract = {
        "function": func || "list",
        "args": ""
    };

    // prepare nonce
    // needs refresh data on every 'test' and 'commit' call, because data update may slow,
    // you can get different result by hit 'test' multiple times
    console.log(JSON.stringify(params));
    neb.api.getAccountState(params.from).then(function (resp) {
        console.log("getacount");
        var balance = nebulas.Unit.fromBasic(resp.balance, "nas"),
            $tab = $(".show.tab");

        params.nonce = parseInt(resp.nonce) + 1;


        console.log("balance,",balance);

        callback(params);
    }).catch(function (err) {
        // console.log("prepare nonce error: " + err);
        bootbox.dialog({
            backdrop: true,
            onEscape: true,
            message: i18n.apiErrorToText(err.message),
            size: "large",
            title: "Error"
        });

        console.log(6667777);
        clearInterval(window.mainInter);

    });
}

function previousInnerCall(callback) {
    let params = {};

    if (!globalParams.account) {
        // TODO 提示钱包信息不正确
        return;
    }
    params.from = globalParams.account.getAddressString();

    // prepare to
    let toAddr = WALL_ADDRESS;

    params.to = toAddr;

    // prepare gasLimit
    let gasLimit = Utils.toBigNumber(0);
    try {
        gasLimit = Utils.toBigNumber($("#run_gas_limit").val());
    } catch (err) {
        console.log(err);
    }
    if (gasLimit.cmp(Utils.toBigNumber(0)) <= 0) {
        $("#run_gas_limit").addClass("err");
        setTimeout(function () {
            $("#run_gas_limit").removeClass("err");
        }, 5000);
        return;
    }
    params.gasLimit = gasLimit.toNumber();

    // prepare gasPrice
    let gasPrice = Utils.toBigNumber(0);
    try {
        gasPrice = Utils.toBigNumber($("#run_gas_price").val());
    } catch (err) {
        console.log(err);
    }
    if (gasPrice.cmp(Utils.toBigNumber(0)) <= 0) {
        $("#run_gas_price").addClass("err");
        setTimeout(function () {
            $("#run_gas_price").removeClass("err");
        }, 5000);
        return;
    }
    params.gasPrice = gasPrice.toNumber();

    // prepare value
    let value = Utils.toBigNumber(0);
    try {
        value = nebulas.Unit.toBasic(Utils.toBigNumber($("#run_value").val()), "nas");
    } catch (err) {
        console.log(err);
    }
    if (value.cmp(Utils.toBigNumber(0)) < 0) {
        // TODO 添加提示value输入不对
        console.log("invalid value");
        return;
    }
    params.value = value;


    // set content to args
    var arr = [];
    var content = $("#wall_content").val().trim();
    if (content.length == 0) {
        alert("大虾，写点东西呗！");
        $(".modal.loading").modal("hide");
        return false;
    }
    arr.push(content);
    arr.push(new Date());
    params.contract = {
        "function": "save",
        "args": JSON.stringify(arr)
    };

    // prepare nonce
    // needs refresh data on every 'test' and 'commit' call, because data update may slow,
    // you can get different result by hit 'test' multiple times
    console.log("submit",JSON.stringify(params));
    neb.api.getAccountState(params.from).then(function (resp) {
        var balance = nebulas.Unit.fromBasic(resp.balance, "nas"),
            $tab = $(".show.tab");

        params.nonce = parseInt(resp.nonce) + 1;

        $("#run_balance").val(balance + " NAS");


        callback(params);
    }).catch(function (err) {
        // console.log("prepare nonce error: " + err);
        bootbox.dialog({
            backdrop: true,
            onEscape: true,
            message: i18n.apiErrorToText(err.message),
            size: "large",
            title: "Error"
        });
    });
}

// next area show



$(document).ready(function() {
    getAutoText();
    console.log(678);

    window.mainInter = setInterval(function() {
        console.log(678);
        try {
            getAutoText();

        } catch (err) {
            clearInterval(window.mainInter);
        }
    },30000);

    $("#next_show_button").bind("click", function() {

        var content = $("#wall_content").val().trim();
        if (content.length == 0) {
            $(".modal.wordneed").modal("show");

            setTimeout(function() {
                $(".modal.wordneed").modal("hide");
            }, 2000);
            return false;
        } else if (content.length > 100) {
            alert("大侠，内容有点长啊，当文章写可不行~~");
        } else {
            $(".next_area").removeClass("next_area_hide");
            $("#next_show_button").addClass("hide");
        }
    });
});

te(data) {
    var res = data.result;
    console.log(data);
    var number = 10;
    if (res) {
        var arr = [];
        res = JSON.parse(res);
        console.log("before:", res);
        if (res.length > number) {
            res = res.slice(res.length - number, res.length);
        }
        console.log("after:", res);

        for (var key in res) {
            var obj = res[key];
            arr.push(obj.words);
        }
        window.textList = arr;
    }
}
function getAutoText() {
//            validateTab3() &&
    innerCall(function (params) {
        neb.api
            .call({
                from: params.from,
                to: params.to,
                value: params.value,
                nonce: params.nonce,
                gasPrice: params.gasPrice,
                gasLimit: params.gasLimit,
                contract: params.contract
            })
            .then(function (resp) {
                //
                canvasUpdate(resp);
            })
            .catch(function (err) {
                $("#call_test_result").text(JSON.stringify(err));
                $("#call").attr("disabled", true);
                $("#call_result").text("");
                $(".next").removeClass("active1");
            });
    });
}
function addTextToScreen() {
    var txt = $("#wall_content").val().trim();
    if (txt && txt.length > 0) {
        window.textList = window.textList.concat(txt);
    }
}

function onClickCall() {
    $(".modal.loading").modal("show");

    previousInnerCall(function (params) {
        var gTx = new nebulas.Transaction(parseInt(localSave.getItem("chainId")),
            globalParams.account,
            params.to, params.value, params.nonce, params.gasPrice, params.gasLimit, params.contract);

        gTx.signTransaction();
        console.log("onClickCall",parseInt(localSave.getItem("chainId")),
            globalParams.account,
            params.to, params.value, params.nonce, params.gasPrice, params.gasLimit, params.contract);
        neb.api
            .sendRawTransaction(gTx.toProtoString())
            .then(function (resp) {
                console.log(JSON.stringify(resp));
                $("#call_result").text(JSON.stringify(resp));
                $(".result").removeClass("active1");
                $(".next").removeClass("active1");
                $("#receipt_call").text(resp.txhash).prop("href", "check.html?" + resp.txhash);
                $(".modal.loading").modal("hide");

                addTextToScreen();


                $(".modal.success").modal("show");

                setTimeout(function() {
                    $(".modal.success").modal("hide");
                },2000);
            })
            .catch(function (err) {
                $("#call_result").text(JSON.stringify(err));
                $(".result").removeClass("active1");
                $(".next").removeClass("active1");
                $(".modal.loading").modal("hide");
            });
    });
}

function onUnlockFile(swf, fileJson, account, password) {
    var balance_nas, state,
        fromAddr = account.getAddressString(),
        $tab = $(swf).closest(".tab");

    $(".modal.loading").modal("show");

    if ($tab.prop("id") == "tab2") {
        $("#from_addr").val(fromAddr).trigger("input");
        $("#to_addr").val(account.getAddressString()).trigger("input");
    } else if ($tab.prop("id") == "tab3")
        $("#run_from_addr").val(fromAddr).trigger("input");

    try {
        account.fromKey(fileJson, password);
        globalParams.account = account;
        $("#unlock").hide();
        $("#send").show();

        neb.api.gasPrice()
            .then(function (resp) {
                $("#gas_price").val(resp.gas_price);
                $("#run_gas_price").val(resp.gas_price);

                return neb.api.getAccountState(fromAddr);
            })
            .then(function (resp) {
                var balance = nebulas.Unit.fromBasic(resp.balance, "nas");

                if ($tab.prop("id") == "tab2")
                    $("#balance").val(balance + " NAS");
                else if ($tab.prop("id") == "tab3")
                    $("#run_balance").val(balance + " NAS");
                console.log("balance2,",balance);

                $(".modal.loading").modal("hide");

                activeSubmit();
            })
            .catch(function (e) {
                // this catches e thrown by nebulas.js!neb

                bootbox.dialog({
                    backdrop: true,
                    onEscape: true,
                    message: i18n.apiErrorToText(e.message),
                    size: "large",
                    title: "Error"
                });

                $(".modal.loading").modal("hide");
            });
    } catch (e) {
        // this catches e thrown by nebulas.js!account

        bootbox.dialog({
            backdrop: true,
            onEscape: true,
            message: localSave.getItem("lang") == "en" ? e : "keystore 文件错误, 或者密码错误",
            size: "large",
            title: "Error"
        });

        $(".modal.loading").modal("hide");
    }
}



function innerCall(callback, func) {
    let params = {};

//            if (!globalParams.account) {
//                console.log("====");
//                // TODO 提示钱包信息不正确
//                return;
//            }
//            params.from = globalParams.account.getAddressString();
    params.from  = localSave.getItem("initAddress");

    // prepare to
    let toAddr = WALL_ADDRESS;

    params.to = toAddr;

    // prepare gasLimit
    let gasLimit = Utils.toBigNumber(0);
    try {
//                gasLimit = Utils.toBigNumber($("#run_gas_limit").val());
        gasLimit = Utils.toBigNumber("200000");
    } catch (err) {
        console.log(err);
    }
    if (gasLimit.cmp(Utils.toBigNumber(0)) <= 0) {
        $("#run_gas_limit").addClass("err");
        setTimeout(function () {
            $("#run_gas_limit").removeClass("err");
        }, 5000);
        return;
    }
    params.gasLimit = gasLimit.toNumber();

    // prepare gasPrice
    let gasPrice = Utils.toBigNumber(0);
    try {
        gasPrice = Utils.toBigNumber("1000000");
    } catch (err) {
        console.log(err);
    }
    if (gasPrice.cmp(Utils.toBigNumber(0)) <= 0) {
        $("#run_gas_price").addClass("err");
        setTimeout(function () {
            $("#run_gas_price").removeClass("err");
        }, 5000);
        return;
    }
    params.gasPrice = gasPrice.toNumber();

    // prepare value
    let value = Utils.toBigNumber(0);
    try {
//                value = nebulas.Unit.toBasic(Utils.toBigNumber($("#run_value").val()), "nas");
        value = nebulas.Unit.toBasic(Utils.toBigNumber(0), "nas");
    } catch (err) {
        console.log(err);
    }
    if (value.cmp(Utils.toBigNumber(0)) < 0) {
        // TODO 添加提示value输入不对
        console.log("invalid value");
        return;
    }
    params.value = value;

    params.contract = {
        "function": func || "list",
        "args": ""
    };

    // prepare nonce
    // needs refresh data on every 'test' and 'commit' call, because data update may slow,
    // you can get different result by hit 'test' multiple times
    console.log(JSON.stringify(params));
    neb.api.getAccountState(params.from).then(function (resp) {
        console.log("getacount");
        var balance = nebulas.Unit.fromBasic(resp.balance, "nas"),
            $tab = $(".show.tab");

        params.nonce = parseInt(resp.nonce) + 1;


        console.log("balance,",balance);

        callback(params);
    }).catch(function (err) {
        // console.log("prepare nonce error: " + err);
        bootbox.dialog({
            backdrop: true,
            onEscape: true,
            message: i18n.apiErrorToText(err.message),
            size: "large",
            title: "Error"
        });

        console.log(6667777);
        clearInterval(window.mainInter);

    });
}

function previousInnerCall(callback) {
    let params = {};

    if (!globalParams.account) {
        // TODO 提示钱包信息不正确
        return;
    }
    params.from = globalParams.account.getAddressString();

    // prepare to
    let toAddr = WALL_ADDRESS;

    params.to = toAddr;

    // prepare gasLimit
    let gasLimit = Utils.toBigNumber(0);
    try {
        gasLimit = Utils.toBigNumber($("#run_gas_limit").val());
    } catch (err) {
        console.log(err);
    }
    if (gasLimit.cmp(Utils.toBigNumber(0)) <= 0) {
        $("#run_gas_limit").addClass("err");
        setTimeout(function () {
            $("#run_gas_limit").removeClass("err");
        }, 5000);
        return;
    }
    params.gasLimit = gasLimit.toNumber();

    // prepare gasPrice
    let gasPrice = Utils.toBigNumber(0);
    try {
        gasPrice = Utils.toBigNumber($("#run_gas_price").val());
    } catch (err) {
        console.log(err);
    }
    if (gasPrice.cmp(Utils.toBigNumber(0)) <= 0) {
        $("#run_gas_price").addClass("err");
        setTimeout(function () {
            $("#run_gas_price").removeClass("err");
        }, 5000);
        return;
    }
    params.gasPrice = gasPrice.toNumber();

    // prepare value
    let value = Utils.toBigNumber(0);
    try {
        value = nebulas.Unit.toBasic(Utils.toBigNumber($("#run_value").val()), "nas");
    } catch (err) {
        console.log(err);
    }
    if (value.cmp(Utils.toBigNumber(0)) < 0) {
        // TODO 添加提示value输入不对
        console.log("invalid value");
        return;
    }
    params.value = value;


    // set content to args
    var arr = [];
    var content = $("#wall_content").val().trim();
    if (content.length == 0) {
        alert("大虾，写点东西呗！");
        $(".modal.loading").modal("hide");
        return false;
    }
    arr.push(content);
    arr.push(new Date());
    params.contract = {
        "function": "save",
        "args": JSON.stringify(arr)
    };

    // prepare nonce
    // needs refresh data on every 'test' and 'commit' call, because data update may slow,
    // you can get different result by hit 'test' multiple times
    console.log("submit",JSON.stringify(params));
    neb.api.getAccountState(params.from).then(function (resp) {
        var balance = nebulas.Unit.fromBasic(resp.balance, "nas"),
            $tab = $(".show.tab");

        params.nonce = parseInt(resp.nonce) + 1;

        $("#run_balance").val(balance + " NAS");


        callback(params);
    }).catch(function (err) {
        // console.log("prepare nonce error: " + err);
        bootbox.dialog({
            backdrop: true,
            onEscape: true,
            message: i18n.apiErrorToText(err.message),
            size: "large",
            title: "Error"
        });
    });
}

// next area show



$(document).ready(function() {
    getAutoText();
    console.log(678);

    window.mainInter = setInterval(function() {
        console.log(678);
        try {
            getAutoText();

        } catch (err) {
            clearInterval(window.mainInter);
        }
    },30000);

    $("#next_show_button").bind("click", function() {

        var content = $("#wall_content").val().trim();
        if (content.length == 0) {
            $(".modal.wordneed").modal("show");

            setTimeout(function() {
                $(".modal.wordneed").modal("hide");
            }, 2000);
            return false;
        } else if (content.length > 100) {
            alert("大侠，内容有点长啊，当文章写可不行~~");
        } else {
            $(".next_area").removeClass("next_area_hide");
            $("#next_show_button").addClass("hide");
        }
    });
});

