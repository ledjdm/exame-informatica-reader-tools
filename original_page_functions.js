var page = 1, pageactual, anon, vprex = "#ctl00_cph_viewer1_", lprex = "#ctl00_lv1_", modTxt, modCrop, help, player, crop, zoom = false, smode = false, pendingcut = false, pw = 1500, ph = 1899, rsztmr, gst = false, timeId = 0, timeAId = 0;
function ResizeViewer() {
    var b = Math.max(400, document.documentElement.clientHeight) - 142, a = Math.round(pw * b / ph);
    ResizeMenu();
    if (zoom) {
        a = Math.max(1000, Math.min(1502, document.documentElement.clientWidth - 20));
        $("#bvdPage div.pages").width(a).height(b).children(".panviewport").width(a).height(b)
    }
    if ((zoom || crop != null)) {
        return
    }
    RszImgs(a, b)
}
function ResizeMenu() {
    var a = document.documentElement.clientHeight;
    if (a < 270) {
        return
    }
    $("#bvdMenuInner").height(a - 195);
    $("#bvdMenu").height(a - 150)
}
function RszImgs(j, e) {
    var f = $("#imgDL"), a = $("#bvdPage .pages"), g = GetPage(), b;
    if (g == null) {
        return
    }
    b = g.p;
    if (!smode) {
        a.height(e);
        var i = ZCalc(j), d = $("#bvdPage img.page").each(function() {
            this.src = "/imgs/" + g.id + "/f" + (b++) + "/s" + i + "/k" + g.k
        }).length;
        setTimeout("$('#bvdPage img.page').height(" + (e - 2) + ").width(" + j + ")", 10);
        $(vprex + "hfS").val(i);
        a.width(j * d);
        f.height(e)
    } else {
        var c = Math.round(ph * 1000 / pw);
        if (!zoom) {
            $("#bvdPage img.page").attr("src", "/imgs/" + g.id + "/f" + b + "/k" + g.k)
        }
        setTimeout("$('#bvdPage img.page').width(1000).height(" + c + ")", 1);
        a.width(1000);
        if (!zoom) {
            a.height(c)
        }
        f.height(c)
    }
}
function GoZoom(h) {
    h.stopPropagation();
    if (zoom) {
        return
    }
    zoom = true;
    CancelCut();
    $("#bvdMenu").hide();
    var b = $("#bvdPage .pages"), i = b.find("img.page"), c = document.documentElement.clientHeight, a = document.documentElement.clientWidth, d = GetPage(), g = d.p, f = (i.length == 1 || a / 2 > h.pageX);
    HdRec(false);
    b.width(Math.min(1502, a - 20));
    if (smode) {
        b.height(c - 138)
    }
    i.eq(f ? 0 : 1).attr("src", "/imgs/" + d.id + "/f" + (f ? g : g + 1) + "/s5/k" + d.k);
    setTimeout("$('#bvdPage img.page').height(" + ph + ").width(" + pw + ")", 10);
    if (i.length > 1) {
        i.eq(f ? 1 : 0).hide()
    }
    b.find("img.page,.bvdHighlight,.bvdAd").panImage(b.width(), b.height());
    b.find(".panmover").width(1500).height(1500 * ph / pw);
    help = $("<div class='help hidden'>Clique e arraste para movimentar<br />Duplo-clique para sair</div>");
    if (i.length > 1) {
        i.eq(1).removeClass("fright");
        $(".bvdHighlight,.bvdAd").each(function() {
            var e = {l: parseFloat(this.style.left.substr(0, this.style.left.length - 1)),w: parseFloat(this.style.width.substr(0, this.style.width.length - 1))};
            if ((e.l > 50 && f) || (e.l < 50 && !f)) {
                $(this).hide()
            } else {
                this.style.left = (e.l - (f ? 0 : 50)) * 2 + "%";
                this.style.width = e.w * 2 + "%"
            }
            $(this).append("<span class='hidden' style='left:" + e.l + "%;width:" + e.w + "%'/>")
        })
    }
    b.dblclick(CancelZoom).append(help);
    ScrollZoom(h, f, b)
}
function CancelZoom() {
    $("#imgDL").click(GoZoom);
    zoom = false;
    var b = $("#bvdPage"), c = b.find("div.pages"), a = b.find(".help"), e, d = $(".bvdHighlight,.bvdAd").show();
    if (a.length == 0) {
        return false
    }
    a.remove();
    c.find(".panviewport").remove().children().children().prependTo(c);
    d = $(".bvdHighlight,.bvdAd");
    if ((e = c.find("img.page")).length > 1) {
        e.eq(1).addClass("fright");
        d.each(function() {
            var f = $(this).children("span").get(0);
            this.style.left = f.style.left;
            this.style.width = f.style.width;
            $(f).remove()
        })
    }
    HdRec(true);
    e.show();
    $(window).trigger("resize");
    return false
}
function ScrollZoom(f, d, b) {
    var j = b.find("img.page"), g = b.find("div.panviewport"), a = b.width() / j.length, c = b.height(), i = {l: 0,t: 0};
    if (!smode) {
        i.l = Math.round(((f.pageX - (d ? 0 : a)) * 2 * 10) / a) / 10;
        i.t = Math.round((f.pageY - 112) * 10 / c) / 10;
        g.scrollLeft(Math.max(pw * i.l - a, 0)).scrollTop(Math.max(ph * i.t - c / 2, 0))
    } else {
        i.t = Math.round((f.pageY - 112) * 10 / (ph * 1000 / pw)) / 10;
        g.scrollLeft(0).scrollTop(Math.max(i.t * ph - c / 2, 0))
    }
}
function HandleSearch() {
    $("#dvsearchresultslist").html("");
    $("#ctl00_dvsearchresults").show()
}
function handleSearchKeyPress(a) {
    if (!a) {
        a = window.event
    }
    if (a.keyCode == 13) {
        HandleSearch();
        $("#ctl00_ibSearch").focus();
        setTimeout("$('#ctl00_ibSearch').click()", 500);
        return false
    } else {
        $("#ctl00_dvsearchresults").hide();
        return true
    }
}
function ZCalc(a) {
    if (a > 1100) {
        return 5
    }
    if (a > 850) {
        return 4
    }
    if (a > 650) {
        return 3
    }
    if (a > 450) {
        return 2
    }
    return 1
}
function HdRec(a) {
    var b = $("#imgDL").add("#bvdPage .pages:not(.first) a.topleft").add("#bvdPage .pages:not(.first) a.bottomleft").add("#bvdPage .pages:not(.last) a.topright").add("#bvdPage .pages:not(.last) a.bottomright");
    if (a) {
        b.css("display", "")
    } else {
        b.hide()
    }
}
function GetPage() {
    var b = new RegExp("/imgs/(\\d+\\.\\d+\\.\\d+)/[fl](\\d+)(/s\\d)?/?(k.*)?"), a = b.exec($(vprex + "imgPage").attr("src"));
    if (a == null) {
        return null
    }
    return {id: a[1],p: parseInt(a[2]),k: a[4].substring(1)}
}
function Recorte() {
    if (crop != null) {
        CancelCut();
        return
    }
    if (zoom) {
        CancelZoom()
    }
    if (!smode) {
        if (page > 1) {
            modCrop.dialog("open");
            var b = modCrop.find("input[type='image']"), a = GetPage();
            if (a == null) {
                return
            }
            b.eq(0).attr("src", "/imgs/" + a.id + "/t" + a.p + "/x2").val(a.p);
            b.eq(1).attr("src", "/imgs/" + a.id + "/t" + (a.p + 1) + "/x2").val(a.p + 1);
            b.unbind().click(function() {
                pendingcut = true;
                $("#ctl00_cph_hfCropImg").val(this.value);
                __doPostBack("ctl00$ibSwitch", "");
                modCrop.dialog("close")
            })
        } else {
            pendingcut = true;
            __doPostBack("ctl00$ibSwitch", "")
        }
        return
    }
    HdRec(false);
    $("#bvdPage .bvdAd").hide();
    $(vprex + "imgPage").width(1000).height(ph * 1000 / pw);
    setTimeout("StartCut()", 100)
}
function StartCut() {
    $("#bvdMenu").hide();
    crop = $.Jcrop($(vprex + "imgPage"), {minSize: (gst ? [30, 30] : [100, 100]),keySupport: false,onChange: function(a) {
            if (gst) {
                $("#bvdPage .jcrop-tracker").eq(0).parent().attr("title", "(" + a.x + "," + a.y + ")->(" + a.x2 + "," + a.y2 + ")[1000," + $(vprex + "imgPage").height() + "]")
            }
        }});
    if (gst) {
        crop.setSelect([50, 50, 250, 200])
    } else {
        crop.animateTo([50, 50, 250, 200])
    }
    $("#bvdPage .jcrop-tracker").eq(0).parent().append('<div class="cropOp" style="text-align:left;padding:5px;background:#777;position:absolute;bottom:0px;z-index:2000"><img src="/imgs/tick.gif" onclick="DoCut()" alt="recortar" title="recortar" class="bFFF pntr" style="border:solid 1px #eee;" /><img src="/imgs/errorbullet.gif" alt="cancelar" title="cancelar" onclick="Recorte()" class="bFFF pntr" style="border:solid 1px #eee;" /></div>')
}
function DoCut() {
    var a = crop.tellSelect();
    __doPostBack("ctl00$cph$lbR", a.x + "," + a.y + "," + a.w + "," + a.h + "," + $(vprex + "imgPage").height())
}
function CancelCut() {
    if (crop != null) {
        HdRec(true);
        crop.destroy();
        crop = null;
        $("#bvdEx").html("").hide();
        $("#bvdPage .bvdAd").show();
        return true
    }
    return false
}
function PageChange() {
    CancelCut();
    Tag();
    TagAd();
    if (!smode) {
        $(window).trigger("resize")
    }
    if (player) {
        $("#jqp").jPlayer("play")
    }
}
function Tag() {
    var a = GetPage(), b;
    if (a == null) {
        return
    }
    b = a.p;
    $.getScript("/data/?op=js&i=" + a.id + "&p=" + (b++))
}
function TagAd() {
    $("#bvdPage .bvdAd").each(function() {
        $.getJSON("/data/?op=ad&i=" + this.id.substring(5))
    })
}
function SetupCSS() {
    CancelZoom();
    var a = GetPage();
    if (a != null) {
        pageactual = a.p
    }
    smode = $("div.pages.m1").length > 0;
    if (smode) {
        $("#ctl00_ibSwitch").removeClass("single").addClass("double");
        $("div.pages.m1").width(998);
        ResizeViewer()
    } else {
        $("#ctl00_ibSwitch").removeClass("double").addClass("single");
        ResizeViewer()
    }
    if (pageactual != page) {
        PageChange();
        page = pageactual
    }
    if (pendingcut) {
        pendingcut = false;
        Recorte()
    }
    $("#imgHome").hoverSrc("home-on.gif", "home.gif");
    $("#imgSearch").hoverSrc("searchbutton-on.gif", "searchbutton.gif");
    $("#ctl00_ibPDF").hoverSrc("downloadpubl-on.gif", "downloadpubl.gif");
    $("#ctl00_ibAddFavPage").hoverSrc("favorite-on.gif", "favorite.gif");
    $("#ctl00_ibCrop").hoverSrc("scissor-on.gif", "scissor.gif");
    $("#ibTxt").click(GetTxt).hoverSrc("text-on.gif", "text.gif");
    $("#ctl00_ibPrint").hoverSrc("print-on.gif", "print.gif");
    $("#imgMenu").hoverSrc("indice-on.gif", "indice.gif");
    $("#imgForgot").hoverSrc("forgot-on.gif", "forgot.gif");
    $("#dvSearch").onEnterPress("ctl00_ibSearch");
    $("#lbModalClose img").hoverSrc("modalcloseOn.gif", "modalclose.gif");
    SetupAuth();
    $("#imgDL").click(GoZoom).css("cursor", "pointer")
}
function SetupAuth() {
    if (anon) {
        $(lprex + "txtLogin, " + lprex + "txtPass").defaultVal("e-mail", "palavra-chave");
        $("#dvHLogin").onEnterPress(lprex.substr(1) + "ibLogin");
        $("#dvMLogin").onEnterPress("ctl00_cph_lbModalOk");
        $(lprex + "ibLogin").hoverSrc("toolbarok-on.gif", "toolbarok.gif")
    } else {
        $(lprex + "ibLogout").hoverSrc("logout-on.gif", "logout.gif");
        $("#dvMPass").onEnterPress("ctl00_cph_lbPdf")
    }
}
function GetTxt() {
    CancelZoom();
    var c = GetPage();
    if (c == null) {
        return
    }
    modTxt.dialog("open").find("div").html('<img src="/imgs/loading.gif" alt="a carregar" />');
    var b = (smode ? 1 : $("#bvdPage img.page").length), a = "";
    $.getJSON("/data/?op=pt&i=" + c.id + "&p=" + c.p, function(d) {
        if (b > 1) {
            if (d.text) {
                a = "<p><span>página " + c.p + "</span></p>" + d.text
            }
            $.getJSON("/data/?op=pt&i=" + c.id + "&p=" + (c.p + 1), function(e) {
                if (e.text) {
                    a += "<br /><p><span>página " + (c.p + 1) + "</span></p>" + e.text
                }
                modTxt.find("div").html(a != "" ? a : "Não há texto disponível para estas páginas.")
            })
        } else {
            modTxt.find("div").html(d.text ? "<p><span>página " + c.p + "</span></p>" + d.text : "Não há texto disponível para esta página.")
        }
    })
}
$(document).ready(function() {
    if (typeof (Sys) !== "undefined" && Sys.Browser.agent === Sys.Browser.InternetExplorer && Sys.Browser.version === 10) {
        Sys.WebForms.PageRequestManager.getInstance()._onFormElementActive = function a(d, b, f) {
            if (d.disabled) {
                return
            }
            this._activeElement = d;
            this._postBackSettings = this._getPostBackSettings(d, d.name);
            if (d.name) {
                var c = d.tagName.toUpperCase();
                if (c === "INPUT") {
                    var e = d.type;
                    if (e === "submit") {
                        this._additionalInput = encodeURIComponent(d.name) + "=" + encodeURIComponent(d.value)
                    } else {
                        if (e === "image") {
                            this._additionalInput = encodeURIComponent(d.name) + ".x=" + Math.floor(b) + "&" + encodeURIComponent(d.name) + ".y=" + Math.floor(f)
                        }
                    }
                } else {
                    if ((c === "BUTTON") && (d.name.length !== 0) && (d.type === "submit")) {
                        this._additionalInput = encodeURIComponent(d.name) + "=" + encodeURIComponent(d.value)
                    }
                }
            }
        }
    }
    $(this).bind("contextmenu", function(b) {
        b.preventDefault()
    });
    SetupCSS();
    Tag();
    TagAd();
    Sys.WebForms.PageRequestManager.getInstance().add_endRequest(SetupCSS);
    $(vprex + "imgPage").css("visibility", "hidden").one("load", null, function() {
        $(this).css("visibility", "visible");
        $(this).parent().find(".bvdAd").css("visibility", "visible")
    }).parent().find(".bvdAds").css("visibility", "hidden");
    $(window).bind("resize", function() {
        clearTimeout(timeId);
        timeId = setTimeout(ResizeViewer, 500)
    }).trigger("resize");
    if (!gst && DetectFlashVer(8, 0, 0)) {
        player = $("#jqp").jPlayer({ready: function() {
                $(this).jPlayer("setMedia", {mp3: "/imgs/page-flip-4.mp3"})
            },solution: "html, flash",supplied: "mp3",swfPath: "/js"})
    }
    modTxt = $("#modTxt").removeClass("hidden").dialog({modal: true,autoOpen: false,width: 620,height: 390,title: "Texto",overlay: {opacity: 0.6,background: "#fff"}});
    modCrop = $("#modCrop").removeClass("hidden").dialog({modal: true,autoOpen: false,width: 250,height: 170,title: "Recortar página",overlay: {opacity: 0.6,background: "#fff"}});
    BVLdTbs()
});
