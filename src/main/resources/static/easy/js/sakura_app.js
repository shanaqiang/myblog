/**
 * Minified by jsDelivr using Terser v3.14.1.
 * Original file: /gh/mashirozx/Sakura@3.2.7/js/sakura-app.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
function setCookie(e, t, o) {
    var a = "";
    if (o) {
        var i = new Date;
        i.setTime(i.getTime() + 24 * o * 60 * 60 * 1e3), a = "; expires=" + i.toUTCString()
    }
    document.cookie = e + mashiro_option.cookie_version_control + "=" + (t || "") + a + "; path=/"
}

function getCookie(e) {
    for (var t = e + mashiro_option.cookie_version_control + "=", o = document.cookie.split(";"), a = 0; a < o.length; a++) {
        for (var i = o[a]; " " == i.charAt(0);) i = i.substring(1, i.length);
        if (0 == i.indexOf(t)) return i.substring(t.length, i.length)
    }
    return null
}

function removeCookie(e) {
    document.cookie = e + mashiro_option.cookie_version_control + "=; Max-Age=-99999999;"
}

function imgError(e, t) {
    switch (t) {
        case 1:
            e.src = "https://view.moezx.cc/images/2017/12/30/Transparent_Akkarin.th.jpg";
            break;
        case 2:
            e.src = "https://gravatar.shino.cc/avatar/?s=80&d=mm&r=g";
            break;
        default:
            e.src = "https://view.moezx.cc/images/2018/05/13/image-404.png"
    }
}

function post_list_show_animation() {
    if ($("article").hasClass("post-list-thumb")) {
        var e = new IntersectionObserver(function (t) {
            t.forEach(t = > {
                t
                .target.classList.contains("post-list-show") ? e.unobserve(t.target) : t.isIntersecting && (t.target.classList.add("post-list-show"), e.unobserve(t.target))
            }
        )
        }, {root: null, threshold: [.66]});
        document.querySelectorAll(".post-list-thumb").forEach(t = > {e.observe(t)}
    )
    }
}

function code_highlight_style() {
    function e(e) {
        var t = {
            autocomplete: "off",
            autocorrect: "off",
            autocapitalize: "off",
            spellcheck: "false",
            contenteditable: "false",
            design: "by Mashiro"
        }, o = $("pre:eq(" + e + ")")[0].children[0].className;
        if ("hljs" == (a = o.substr(0, o.indexOf(" ")).replace("language-", "")).toLowerCase()) var a = "text";
        for (var i in $("pre:eq(" + e + ")").addClass("highlight-wrap"), t) $("pre:eq(" + e + ")").attr(i, t[i]);
        $("pre:eq(" + e + ") code").attr("data-rel", a.toUpperCase())
    }

    $("pre code").each(function (e, t) {
        hljs.highlightBlock(t)
    });
    for (var t = 0; t < $("pre").length; t++) e(t);
    hljs.initLineNumbersOnLoad(), $("pre").on("click", function (e) {
        e.target === this && ($(this).toggleClass("code-block-fullscreen"), $("html").toggleClass("code-block-fullscreen-html-scroll"))
    })
}

mashiro_global.variables = new function () {
    this.skinSecter = !0
}, mashiro_global.ini = new function () {
    this.normalize = function () {
        lazyload(), social_share(), post_list_show_animation(), copy_code_block(), coverVideoIni(), checkskinSecter(), scrollBar()
    }, this.pjax = function () {
        pjaxInit(), social_share(), post_list_show_animation(), copy_code_block(), coverVideoIni(), checkskinSecter()
    }
}, mashiro_global.font_control = new function () {
    this.change_font = function () {
        $("body").hasClass("serif") ? ($("body").removeClass("serif"), $(".control-btn-serif").removeClass("selected"), $(".control-btn-sans-serif").addClass("selected"), setCookie("font_family", "sans-serif", 30)) : ($("body").addClass("serif"), $(".control-btn-serif").addClass("selected"), $(".control-btn-sans-serif").removeClass("selected"), setCookie("font_family", "serif", 30), document.body.clientWidth <= 860 && addComment.createButterbar("将从网络加载字体，流量请注意"))
    }, this.ini = function () {
        document.body.clientWidth > 860 && (getCookie("font_family") && "serif" != getCookie("font_family") || $("body").addClass("serif")), "sans-serif" == getCookie("font_family") && ($("body").removeClass("sans-serif"), $(".control-btn-serif").removeClass("selected"), $(".control-btn-sans-serif").addClass("selected"))
    }
}, mashiro_global.font_control.ini();
try {
    code_highlight_style()
} catch (e) {
}

function attach_image() {
    var e = $(".insert-image-tips");
    $("#upload-img-file").change(function () {
        if (this.files.length > 10) return addComment.createButterbar("每次上传上限为10张.<br>10 files max per request."), 0;
        for (t = 0; t < this.files.length; t++) this.files[t].size >= 5242880 && alert("图片上传大小限制为5 MB.\n5 MB max per file.\n\n「" + this.files[t].name + "」\n\n这张图太大啦~\nThis image is too large~");
        for (var t = 0; t < this.files.length; t++) {
            var o = this.files[t], a = new FormData;
            a.append("smfile", o), $.ajax({
                url: "https://sm.ms/api/upload",
                type: "POST",
                processData: !1,
                contentType: !1,
                data: a,
                beforeSend: function (t) {
                    e.html('<i class="fa fa-spinner rotating" aria-hidden="true"></i>'), addComment.createButterbar("上传中...<br>Uploading...")
                },
                success: function (t) {
                    e.html('<i class="fa fa-check" aria-hidden="true"></i>'), setTimeout(function () {
                        e.html('<i class="fa fa-picture-o" aria-hidden="true"></i>')
                    }, 1e3);
                    var o = t.data.url;
                    $("#upload-img-show").append('<img class="lazyload upload-image-preview" src="https://cdn.jsdelivr.net/gh/moezx/cdn@3.0.2/img/svg/loader/trans.ajax-spinner-preloader.svg" data-src="' + o + '" onclick="window.open(\'' + o + '\')" onerror="imgError(this)" />'), lazyload(), addComment.createButterbar("图片上传成功~<br>Uploaded successfully~"), grin(t.data.url.replace("https://i.loli.net/", "{UPLOAD}"), type = "Img")
                },
                error: function () {
                    e.html('<i class="fa fa-times" aria-hidden="true" style="color:red"></i>'), alert("上传失败，请重试.\nUpload failed, please try again."), setTimeout(function () {
                        e.html('<i class="fa fa-picture-o" aria-hidden="true"></i>')
                    }, 1e3)
                }
            })
        }
    })
}

function clean_upload_images() {
    $("#upload-img-show").html("")
}

function add_upload_tips() {
    $('<div class="insert-image-tips popup"><i class="fa fa-picture-o" aria-hidden="true"></i><span class="insert-img-popuptext" id="uploadTipPopup">上传图片</span></div><input id="upload-img-file" type="file" accept="image/*" multiple="multiple" class="insert-image-button">').insertAfter($(".form-submit #submit")), attach_image(), $("#upload-img-file").hover(function () {
        $(".insert-image-tips").addClass("insert-image-tips-hover"), $("#uploadTipPopup").addClass("show")
    }, function () {
        $(".insert-image-tips").removeClass("insert-image-tips-hover"), $("#uploadTipPopup").removeClass("show")
    })
}

function click_to_view_image() {
    $(".comment_inline_img").click(function () {
        var e = this.src;
        window.open(e)
    })
}

function original_emoji_click() {
    $(".emoji-item").click(function () {
        grin($(this).text(), type = "custom", before = "`", after = "` ")
    })
}

function showPopup(e) {
    e.querySelector("#thePopup").classList.toggle("show")
}

function cmt_showPopup(e) {
    var t = $(e).find("#thePopup");
    t.addClass("show"), $(e).find("input").blur(function () {
        t.removeClass("show")
    })
}

function scrollBar() {
    document.body.clientWidth > 860 && $(window).scroll(function () {
        var e = $(window).scrollTop(), t = $(document).height(), o = $(window).height(),
            a = parseInt(e / (t - o) * 100), i = $("#bar");
        i.css("width", a + "%"), i.css("background", "orange"), $(".toc-container").css("height", $(".site-content").outerHeight()), $(".skin-menu").removeClass("show")
    })
}

function checkskinSecter() {
    !1 === mashiro_global.variables.skinSecter ? ($(".pattern-center").removeClass("pattern-center").addClass("pattern-center-sakura"), $(".headertop-bar").removeClass("headertop-bar").addClass("headertop-bar-sakura")) : ($(".pattern-center-sakura").removeClass("pattern-center-sakura").addClass("pattern-center"), $(".headertop-bar-sakura").removeClass("headertop-bar-sakura").addClass("headertop-bar"))
}

function checkBgImgCookie() {
    var e = getCookie("bgImgSetting");
    e ? $("#" + e).click() : $("#white-bg").click()
}

function no_right_click() {
    $(".post-thumb img").bind("contextmenu", function (e) {
        return !1
    })
}

"new" == Poi.reply_link_version && $("body").on("click", ".comment-reply-link", function () {
    return addComment.moveForm("comment-" + $(this).attr("data-commentid"), $(this).attr("data-commentid"), "respond", $(this).attr("data-postid")), !1
}), click_to_view_image(), original_emoji_click(), document.body.clientWidth > 860 && setTimeout(function () {
    checkBgImgCookie()
}, 100), no_right_click(), $(document).ready(function () {
    function e(e) {
        return "none" == e ? "" : e
    }

    var t;

    function o() {
        $(".skin-menu").removeClass("show"), setTimeout(function () {
            $(".changeSkin-gear").css("visibility", "visible")
        }, 300)
    }

    (t = $(".menu-list")).find("li").each(function () {
        var a = this.id;
        t.on("click", "#" + a, function () {
            switch ("white-bg" == a ? (mashiro_global.variables.skinSecter = !0, checkskinSecter()) : (mashiro_global.variables.skinSecter = !1, checkskinSecter()), "dark-bg" == a ? $("#night-mode-cover").css("visibility", "visible") : $("#night-mode-cover").css("visibility", "hidden"), a) {
                case"white-bg":
                    $("body").css("background-image", "url(" + e(mashiro_option.skin_bg0) + ")");
                    break;
                case"sakura-bg":
                    $("body").css("background-image", "url(" + e(mashiro_option.skin_bg1) + ")");
                    break;
                case"gribs-bg":
                    $("body").css("background-image", "url(" + e(mashiro_option.skin_bg2) + ")");
                    break;
                case"pixiv-bg":
                    $("body").css("background-image", "url(" + e(mashiro_option.skin_bg3) + ")");
                    break;
                case"KAdots-bg":
                    $("body").css("background-image", "url(" + e(mashiro_option.skin_bg4) + ")");
                    break;
                case"totem-bg":
                    $("body").css("background-image", "url(" + e(mashiro_option.skin_bg5) + ")");
                    break;
                case"bing-bg":
                    $("body").css("background-image", "url(" + e(mashiro_option.skin_bg6) + ")");
                    break;
                case"dark-bg":
                    $("body").css("background-image", "url(" + e(mashiro_option.skin_bg7) + ")")
            }
            setCookie("bgImgSetting", a, 30), o()
        })
    }), $(".changeSkin-gear").click(function () {
        $(".skin-menu").toggleClass("show")
    }), $(".skin-menu #close-skinMenu").click(function () {
        o()
    }), add_upload_tips()
});
var bgn = 1;

function nextBG() {
    $(".centerbg").css("background-image", "url(" + mashiro_option.cover_api + "?" + bgn + ")"), bgn += 1
}

function preBG() {
    bgn -= 1, $(".centerbg").css("background-image", "url(" + mashiro_option.cover_api + "?" + bgn + ")")
}

if ($(document).ready(function () {
    $("#bg-next").click(function () {
        nextBG()
    }), $("#bg-pre").click(function () {
        preBG()
    })
}), document.body.clientWidth <= 860) {
    function scrollFunction() {
        document.body.scrollTop > 20 || document.documentElement.scrollTop > 20 ? addComment.I("moblieGoTop").style.display = "block" : addComment.I("moblieGoTop").style.display = "none"
    }

    function topFunction() {
        document.body.scrollTop = 0, document.documentElement.scrollTop = 0
    }

    window.onscroll = function () {
        scrollFunction()
    }
}

function timeSeriesReload(e) {
    var t = $("#archives");
    1 == e ? (t.find("span.al_mon").click(function () {
        return $(this).next().slideToggle(400), !1
    }), lazyload()) : function () {
        $("#al_expand_collapse,#archives span.al_mon").css({cursor: "s-resize"}), t.find("span.al_mon").each(function () {
            var e = $(this).next().children("li").length;
            $(this).children("#post-num").text(e)
        });
        var e = t.find("ul.al_post_list"), o = t.find("ul.al_post_list:first");
        e.hide(1, function () {
            o.show()
        }), t.find("span.al_mon").click(function () {
            return $(this).next().slideToggle(400), !1
        }), document.body.clientWidth > 860 && t.find("li.al_li").mouseover(function () {
            return $(this).children(".al_post_list").show(400), !1
        });
        var a = 0;
        $("#al_expand_collapse").click(function () {
            0 == a ? (e.show(), a++) : 1 == a && (e.hide(), a--)
        })
    }()
}

function coverVideo() {
    var e = addComment.I("coverVideo"), t = addComment.I("coverVideo-btn");
    if (e.paused) {
        e.play();
        try {
            t.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>'
        } catch (e) {
        }
    } else {
        e.pause();
        try {
            t.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>'
        } catch (e) {
        }
    }
}

function killCoverVideo() {
    var e = addComment.I("coverVideo"), t = addComment.I("coverVideo-btn");
    if (e.paused) ; else {
        e.pause();
        try {
            t.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>'
        } catch (e) {
        }
    }
}

function coverVideoIni() {
    if ($("video").hasClass("hls")) {
        var e = addComment.I("coverVideo"), t = $("#coverVideo").attr("data-src");
        if (Hls.isSupported()) {
            var o = new Hls;
            o.loadSource(t), o.attachMedia(e), o.on(Hls.Events.MANIFEST_PARSED, function () {
                e.play()
            })
        } else e.canPlayType("application/vnd.apple.mpegurl") && (e.src = t, e.addEventListener("loadedmetadata", function () {
            e.play()
        }))
    }
}

function copy_code_block() {
    $("pre code").each(function (e, t) {
        $(t).attr({id: "hljs-" + e}), $(this).after('<a class="copy-code" href="javascript:" data-clipboard-target="#hljs-' + e + '" title="拷贝代码"><i class="fa fa-clipboard" aria-hidden="true"></i></a>')
    });
    new ClipboardJS(".copy-code")
}

function tableOfContentScroll(e) {
    if (!(document.body.clientWidth <= 1200)) if (0 == $("div").hasClass("have-toc") && 0 == $("div").hasClass("has-toc")) $(".toc-container").remove(); else if (e) {
        var t = 1,
            o = $("article").hasClass("type-post") ? $("div").hasClass("pattern-attachment-img") ? -75 : 200 : 375;
        $(".entry-content , .links").children("h1,h2,h3,h4,h5").each(function () {
            var e = "toc-head-" + t;
            this.id = e, t++
        }), tocbot.init({
            tocSelector: ".toc",
            contentSelector: [".entry-content", ".links"],
            headingSelector: "h1, h2, h3, h4, h5",
            headingsOffset: o - window.innerHeight / 2
        })
    }
}

timeSeriesReload(), tableOfContentScroll(flag = !0);
var pjaxInit = function () {
    add_upload_tips(), no_right_click(), click_to_view_image(), original_emoji_click(), mashiro_global.font_control.ini(), $("p").remove(".head-copyright");
    try {
        code_highlight_style()
    } catch (e) {
    }
    try {
        getqqinfo()
    } catch (e) {
    }
    if (lazyload(), $("#to-load-aplayer").click(function () {
        try {
            reloadHermit()
        } catch (e) {
        }
        $("div").remove(".load-aplayer")
    }), $("div").hasClass("aplayer")) try {
        reloadHermit()
    } catch (e) {
    }
    $(".iconflat").css("width", "50px").css("height", "50px"), $(".openNav").css("height", "50px"), $("#bg-next").click(function () {
        nextBG()
    }), $("#bg-pre").click(function () {
        preBG()
    }), smileBoxToggle(), timeSeriesReload(), add_copyright(), tableOfContentScroll(flag = !0)
};

function motionSwitch(e) {
    var t = [".bili", ".menhera", ".tieba"];
    for (var o in t) $(t[o] + "-bar").removeClass("on-hover"), $(t[o] + "-container").css("display", "none");
    $(e + "-bar").addClass("on-hover"), $(e + "-container").css("display", "block")
}

function smileBoxToggle() {
    $(document).ready(function () {
        $("#emotion-toggle").click(function () {
            $(".emotion-toggle-off").toggle(0), $(".emotion-toggle-on").toggle(0), $(".emotion-box").toggle(160)
        })
    })
}

function grin(e, t, o, a) {
    var i;
    if (e = "custom" == t ? o + e + a : "Img" == t ? "[img]" + e + "[/img]" : "Math" == t ? " {{" + e + "}} " : " :" + e + ": ", !addComment.I("comment") || "textarea" != addComment.I("comment").type) return !1;
    if (i = addComment.I("comment"), document.selection) i.focus(), sel = document.selection.createRange(), sel.text = e, i.focus(); else if (i.selectionStart || "0" == i.selectionStart) {
        var n = i.selectionStart, r = i.selectionEnd, s = r;
        i.value = i.value.substring(0, n) + e + i.value.substring(r, i.value.length), s += e.length, i.focus(), i.selectionStart = s, i.selectionEnd = s
    } else i.value += e, i.focus()
}

function add_copyright() {
    document.body.addEventListener("copy", function (e) {
        window.getSelection().toString().length > 30 && mashiro_option.clipboardCopyright && function (e) {
            e.preventDefault();
            var t = "# 商业转载请联系作者获得授权，非商业转载请注明出处。<br># For commercial use, please contact the author for authorization. For non-commercial use, please indicate the source.<br># 协议(License)：署名-非商业性使用-相同方式共享 4.0 国际 (CC BY-NC-SA 4.0)<br># 作者(Author)：" + mashiro_option.author_name + "<br># 链接(URL)：" + window.location.href + "<br># 来源(Source)：" + mashiro_option.site_name + "<br><br>" + window.getSelection().toString().replace(/\r\n/g, "<br>"),
                o = "# 商业转载请联系作者获得授权，非商业转载请注明出处。\n# For commercial use, please contact the author for authorization. For non-commercial use, please indicate the source.\n# 协议(License)：署名-非商业性使用-相同方式共享 4.0 国际 (CC BY-NC-SA 4.0)\n# 作者(Author)：" + mashiro_option.author_name + "\n# 链接(URL)：" + window.location.href + "\n# 来源(Source)：" + mashiro_option.site_name + "\n\n" + window.getSelection().toString().replace(/\r\n/g, "\n");
            if (e.clipboardData) e.clipboardData.setData("text/html", t), e.clipboardData.setData("text/plain", o); else if (window.clipboardData) window.clipboardData.setData("text", o)
        }(e), addComment.createButterbar("复制成功！<br>Copied to clipboard successfully!", 1e3)
    })
}

if ($(document).on("click", ".sm", function () {
    1 == confirm("您真的要设为私密吗？") ? $(this).commentPrivate() : aler("已取消")
}), $.fn.commentPrivate = function () {
    if ($(this).hasClass("private_now")) return alert("您之前已设过私密评论"), !1;
    $(this).addClass("private_now");
    var e = $(this).data("idp"), t = $(this).data("actionp"), o = $(this).children(".has_set_private"),
        a = {action: "siren_private", p_id: e, p_action: t};
    return $.post("/wp-admin/admin-ajax.php", a, function (e) {
        $(o).html(e)
    }), !1
}, POWERMODE.colorful = !0, POWERMODE.shake = !1, document.body.addEventListener("input", POWERMODE), $(".comt-addsmilies").click(function () {
    $(".comt-smilies").toggle()
}), $(".comt-smilies a").click(function () {
    $(this).parent().hide()
}), smileBoxToggle(), add_copyright(), $(function () {
    getqqinfo()
}), mashiro_option.float_player_on) {
    function aplayerF() {
        "use strict";
        var e = [];
        document.addEventListener("DOMContentLoaded", function () {
            function t(t, o) {
                var a = {
                    container: t,
                    audio: o,
                    mini: null,
                    fixed: null,
                    autoplay: !1,
                    mutex: !0,
                    lrcType: 3,
                    listFolded: !1,
                    preload: "auto",
                    theme: "#2980b9",
                    loop: "all",
                    order: "list",
                    volume: null,
                    listMaxHeight: null,
                    customAudioType: null,
                    storageName: "metingjs"
                };
                if (o.length) {
                    o[0].lrc || (a.lrcType = 0);
                    var i = {};
                    for (var n in a) {
                        var r = n.toLowerCase();
                        (t.dataset.hasOwnProperty(r) || t.dataset.hasOwnProperty(n) || null !== a[n]) && (i[n] = t.dataset[r] || t.dataset[n] || a[n], ("true" === i[n] || "false" === i[n]) && (i[n] = "true" == i[n]))
                    }
                    e.push(new APlayer(i))
                }
                for (r = 0; r < e.length; r++) try {
                    e[r].lrc.hide()
                } catch (t) {
                    console.log(t)
                }
                var s = 1;
                $(".aplayer.aplayer-fixed").click(function () {
                    if (1 == s) for (var t = 0; t < e.length; t++) try {
                        e[t].lrc.show()
                    } catch (e) {
                        console.log(e)
                    }
                    s = 2
                });
                var l = 0, c = $(".aplayer-list");
                c.removeClass("aplayer-list-hide").css({maxHeight: "0px"}), $(".aplayer.aplayer-fixed .aplayer-body").addClass("ap-hover"), $(".aplayer-miniswitcher").click(function () {
                    0 == l ? (c.removeClass("aplayer-list-hide").animate({maxHeight: "250px"}), $(".aplayer.aplayer-fixed .aplayer-body").removeClass("ap-hover"), l = 1) : (c.css({maxHeight: "0px"}), $(".aplayer.aplayer-fixed .aplayer-body").addClass("ap-hover"), l = 0)
                })
            }

            var o = "https://api.i-meto.com/meting/api?server=:server&type=:type&id=:id&r=:r";
            "undefined" != typeof meting_api && (o = meting_api);
            for (var a = 0; a < e.length; a++) try {
                e[a].destroy()
            } catch (t) {
                console.log(t)
            }
            e = [];
            for (var i = document.querySelectorAll(".aplayer"), n = function () {
                var e = i[r];
                if (e.dataset.id) {
                    var a = e.dataset.api || o;
                    a = (a = (a = (a = (a = a.replace(":server", e.dataset.server)).replace(":type", e.dataset.type)).replace(":id", e.dataset.id)).replace(":auth", e.dataset.auth)).replace(":r", Math.random());
                    var n = new XMLHttpRequest;
                    n.onreadystatechange = function () {
                        if (4 === n.readyState && (200 <= n.status && 300 > n.status || 304 === n.status)) {
                            var o = JSON.parse(n.responseText);
                            t(e, o)
                        }
                    }, n.open("get", a, !0), n.send(null)
                } else if (e.dataset.url) {
                    var s = [{
                        name: e.dataset.name || e.dataset.title || "Audio name",
                        artist: e.dataset.artist || e.dataset.author || "Audio artist",
                        url: e.dataset.url,
                        cover: e.dataset.cover || e.dataset.pic,
                        lrc: e.dataset.lrc,
                        type: e.dataset.type || "auto"
                    }];
                    t(e, s)
                }
            }, r = 0; r < i.length; r++) n()
        }, !1)
    }

    document.body.clientWidth > 860 && aplayerF()
}

function getqqinfo() {
    var e = !1, t = $("input");
    getCookie("user_qq") || getCookie("user_qq_email") || getCookie("user_author") || t.filter("#qq,#author,#email,#url").val(""), getCookie("user_avatar") && getCookie("user_qq") && getCookie("user_qq_email") && ($("div.comment-user-avatar img").attr("src", getCookie("user_avatar")), t.filter("#author").val(getCookie("user_author")), t.filter("#email").val(getCookie("user_qq") + "@qq.com"), t.filter("#qq").val(getCookie("user_qq")), mashiro_option.qzone_autocomplete && t.filter("#url").val("https://user.qzone.qq.com/" + getCookie("user_qq")), t.filter("#qq").val() && ($(".qq-check").css("display", "block"), $(".gravatar-check").css("display", "none")));
    var o = t.filter("#email").val();
    t.filter("#author").on("blur", function () {
        var a = t.filter("#author").val();
        $.ajax({
            type: "get",
            url: mashiro_option.qq_api_url + "?type=getqqnickname&qq=" + a,
            dataType: "jsonp",
            jsonp: "callback",
            jsonpCallback: "portraitCallBack",
            success: function (i) {
                t.filter("#author").val(i[a][6]), t.filter("#email").val($.trim(a) + "@qq.com"), mashiro_option.qzone_autocomplete && t.filter("#url").val("https://user.qzone.qq.com/" + $.trim(a)), $("div.comment-user-avatar img").attr("src", "https://q2.qlogo.cn/headimg_dl?dst_uin=" + a + "&spec=100"), e = !0, t.filter("#qq").val($.trim(a)), t.filter("#qq").val() && ($(".qq-check").css("display", "block"), $(".gravatar-check").css("display", "none")), setCookie("user_author", i[a][6], 30), setCookie("user_qq", a, 30), setCookie("is_user_qq", "yes", 30), setCookie("user_qq_email", a + "@qq.com", 30), setCookie("user_email", a + "@qq.com", 30), o = t.filter("#email").val()
            },
            error: function () {
                t.filter("#qq").val(""), $(".qq-check").css("display", "none"), $(".gravatar-check").css("display", "block"), $("div.comment-user-avatar img").attr("src", get_gravatar(t.filter("#email").val(), 80)), setCookie("user_qq", "", 30), setCookie("user_email", t.filter("#email").val(), 30), setCookie("user_avatar", get_gravatar(t.filter("#email").val(), 80), 30)
            }
        }), $.ajax({
            type: "get",
            url: mashiro_option.qq_avatar_api_url + "?type=getqqavatar&qq=" + a,
            dataType: "jsonp",
            jsonp: "callback",
            jsonpCallback: "qqavatarCallBack",
            success: function (e) {
                $("div.comment-user-avatar img").attr("src", e[a]), setCookie("user_avatar", e[a], 30)
            },
            error: function () {
                t.filter("#qq,#email,#url").val(""), t.filter("#qq").val() || ($(".qq-check").css("display", "none"), $(".gravatar-check").css("display", "block"), setCookie("user_qq", "", 30), $("div.comment-user-avatar img").attr("src", get_gravatar(t.filter("#email").val(), 80)), setCookie("user_avatar", get_gravatar(t.filter("#email").val(), 80), 30))
            }
        })
    }), getCookie("user_avatar") && getCookie("user_email") && "no" == getCookie("is_user_qq") && !getCookie("user_qq_email") && ($("div.comment-user-avatar img").attr("src", getCookie("user_avatar")), t.filter("#email").val(getCookie("user_email")), t.filter("#qq").val(""), t.filter("#qq").val() || ($(".qq-check").css("display", "none"), $(".gravatar-check").css("display", "block"))), t.filter("#email").on("blur", function () {
        var a = t.filter("#email").val();
        0 != e && o == a || ($("div.comment-user-avatar img").attr("src", get_gravatar(a, 80)), setCookie("user_avatar", get_gravatar(a, 80), 30), setCookie("user_email", a, 30), setCookie("user_qq_email", "", 30), setCookie("is_user_qq", "no", 30), t.filter("#qq").val(""), t.filter("#qq").val() || ($(".qq-check").css("display", "none"), $(".gravatar-check").css("display", "block")))
    }), getCookie("user_url") && t.filter("#url").val(getCookie("user_url")), t.filter("#url").on("blur", function () {
        var e = t.filter("#url").val();
        t.filter("#url").val(e), setCookie("user_url", e, 30)
    }), getCookie("user_author") && t.filter("#author").val(getCookie("user_author")), t.filter("#author").on("blur", function () {
        var e = t.filter("#author").val();
        t.filter("#author").val(e), setCookie("user_author", e, 30)
    })
}

function mail_me() {
    var e = "mailto:" + mashiro_option.email_name + "@" + mashiro_option.email_domain;
    window.open(e)
}

mashiro_global.ini.normalize(), loadCSS(mashiro_option.jsdelivr_css_src), loadCSS(mashiro_option.entry_content_theme_src), loadCSS("https://at.alicdn.com/t/font_679578_qyt5qzzavdo39pb9.css"), loadCSS("https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.css"), loadCSS("https://fonts.googleapis.com/css?family=Noto+SerifMerriweather|Merriweather+Sans|Source+Code+Pro|Ubuntu:400,700|Noto+Serif+SC"), function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.POWERMODE = t() : e.POWERMODE = t()
}(this, function () {
    return function (e) {
        var t = {};

        function o(a) {
            if (t[a]) return t[a].exports;
            var i = t[a] = {exports: {}, id: a, loaded: !1};
            return e[a].call(i.exports, i, i.exports, o), i.loaded = !0, i.exports
        }

        return o.m = e, o.c = t, o.p = "", o(0)
    }([function (e, t, o) {
        var a = document.createElement("canvas");
        a.width = window.innerWidth, a.height = window.innerHeight, a.style.cssText = "position:fixed;top:0;left:0;pointer-events:none;z-index:999999", window.addEventListener("resize", function () {
            a.width = window.innerWidth, a.height = window.innerHeight
        }), document.body.appendChild(a);
        var i = a.getContext("2d"), n = [], r = 0;

        function s(e, t) {
            return Math.random() * (t - e) + e
        }

        function l(e) {
            if (d.colorful) {
                var t = s(0, 360);
                return "hsla(" + s(t - 10, t + 10) + ", 100%, " + s(50, 80) + "%, 1)"
            }
            return window.getComputedStyle(e).color
        }

        function c(e, t, o) {
            return {x: e, y: t, alpha: 1, color: o, velocity: {x: 2 * Math.random() - 1, y: 2 * Math.random() - 3.5}}
        }

        function d() {
            for (var e = function () {
                var e, t = document.activeElement;
                if ("TEXTAREA" === t.tagName || "INPUT" === t.tagName && "text" === t.getAttribute("type")) {
                    var a = o(1)(t, t.selectionStart);
                    return e = t.getBoundingClientRect(), {x: a.left + e.left, y: a.top + e.top, color: l(t)}
                }
                var i = window.getSelection();
                if (i.rangeCount) {
                    var n = i.getRangeAt(0), r = n.startContainer;
                    return r.nodeType === document.TEXT_NODE && (r = r.parentNode), {
                        x: (e = n.getBoundingClientRect()).left,
                        y: e.top,
                        color: l(r)
                    }
                }
                return {x: 0, y: 0, color: "transparent"}
            }(), t = 5 + Math.round(10 * Math.random()); t--;) n[r] = c(e.x, e.y, e.color), r = (r + 1) % 500;
            if (d.shake) {
                var a = 1 + 2 * Math.random(), i = a * (Math.random() > .5 ? -1 : 1),
                    s = a * (Math.random() > .5 ? -1 : 1);
                document.body.style.marginLeft = i + "px", document.body.style.marginTop = s + "px", setTimeout(function () {
                    document.body.style.marginLeft = "", document.body.style.marginTop = ""
                }, 75)
            }
        }

        d.shake = !0, d.colorful = !1, requestAnimationFrame(function e() {
            requestAnimationFrame(e), i.clearRect(0, 0, a.width, a.height);
            for (var t = 0; t < n.length; ++t) {
                var o = n[t];
                o.alpha <= .1 || (o.velocity.y += .075, o.x += o.velocity.x, o.y += o.velocity.y, o.alpha *= .96, i.globalAlpha = o.alpha, i.fillStyle = o.color, i.fillRect(Math.round(o.x - 1.5), Math.round(o.y - 1.5), 3, 3))
            }
        }), e.exports = d
    }, function (e, t) {
        !function () {
            var t = ["direction", "boxSizing", "width", "height", "overflowX", "overflowY", "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth", "borderStyle", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "fontStyle", "fontVariant", "fontWeight", "fontStretch", "fontSize", "fontSizeAdjust", "lineHeight", "fontFamily", "textAlign", "textTransform", "textIndent", "textDecoration", "letterSpacing", "wordSpacing", "tabSize", "MozTabSize"],
                o = null != window.mozInnerScreenX;

            function a(e, a, i) {
                var n = i && i.debug || !1;
                if (n) {
                    var r = document.querySelector("#input-textarea-caret-position-mirror-div");
                    r && r.parentNode.removeChild(r)
                }
                var s = document.createElement("div");
                s.id = "input-textarea-caret-position-mirror-div", document.body.appendChild(s);
                var l = s.style, c = window.getComputedStyle ? getComputedStyle(e) : e.currentStyle;
                l.whiteSpace = "pre-wrap", "INPUT" !== e.nodeName && (l.wordWrap = "break-word"), l.position = "absolute", n || (l.visibility = "hidden"), t.forEach(function (e) {
                    l[e] = c[e]
                }), o ? e.scrollHeight > parseInt(c.height) && (l.overflowY = "scroll") : l.overflow = "hidden", s.textContent = e.value.substring(0, a), "INPUT" === e.nodeName && (s.textContent = s.textContent.replace(/\s/g, " "));
                var d = document.createElement("span");
                d.textContent = e.value.substring(a) || ".", s.appendChild(d);
                var u = {
                    top: d.offsetTop + parseInt(c.borderTopWidth),
                    left: d.offsetLeft + parseInt(c.borderLeftWidth)
                };
                return n ? d.style.backgroundColor = "#aaa" : document.body.removeChild(s), u
            }

            void 0 !== e && void 0 !== e.exports ? e.exports = a : window.getCaretCoordinates = a
        }()
    }])
});
var home = location.href, s = $("#bgvideo")[0], Siren = {
    MN: function () {
        $(".iconflat").on("click", function () {
            $("#main-container").hasClass("open") ? ($(".iconflat").css("width", "50px").css("height", "50px"), $(".openNav").css("height", "50px")) : ($(".iconflat").css("width", "100%").css("height", "100%"), $(".openNav").css("height", "100%")), $("body").toggleClass("navOpen"), $("#main-container,#mo-nav,.openNav").toggleClass("open")
        })
    }, MNH: function () {
        $("body").hasClass("navOpen") && ($("body").toggleClass("navOpen"), $("#main-container,#mo-nav,.openNav").toggleClass("open"))
    }, splay: function () {
        $("#video-btn").addClass("video-pause").removeClass("video-play").show(), $(".video-stu").css({bottom: "-100px"}), $(".focusinfo").css({top: "-999px"});
        try {
            for (var e = 0; e < ap.length; e++) try {
                ap[e].destroy()
            } catch (e) {
            }
        } catch (e) {
        }
        try {
            hermitInit()
        } catch (e) {
        }
        s.play()
    }, spause: function () {
        $("#video-btn").addClass("video-play").removeClass("video-pause"), $(".focusinfo").css({top: "49.3%"}), s.pause()
    }, liveplay: function () {
        null != s.oncanplay && $(".haslive").length > 0 && $(".videolive").length > 0 && Siren.splay()
    }, livepause: function () {
        null != s.oncanplay && $(".haslive").length > 0 && (Siren.spause(), $(".video-stu").css({bottom: "0px"}).html("已暂停 ..."))
    }, addsource: function () {
        $(".video-stu").html("正在载入视频 ...").css({bottom: "0px"});
        var e = Poi.movies.name.split(","), t = e[Math.floor(Math.random() * e.length)];
        $("#bgvideo").attr("src", Poi.movies.url + "/" + t + ".mp4"), $("#bgvideo").attr("video-name", t)
    }, LV: function () {
        var e = $("#video-btn");
        e.on("click", function () {
            $(this).hasClass("loadvideo") ? ($(this).addClass("video-pause").removeClass("loadvideo").hide(), Siren.addsource(), s.oncanplay = function () {
                Siren.splay(), $("#video-add").show(), e.addClass("videolive").addClass("haslive")
            }) : $(this).hasClass("video-pause") ? (Siren.spause(), e.removeClass("videolive"), $(".video-stu").css({bottom: "0px"}).html("已暂停 ...")) : (Siren.splay(), e.addClass("videolive")), s.onended = function () {
                $("#bgvideo").attr("src", ""), $("#video-add").hide(), e.addClass("loadvideo").removeClass("video-pause").removeClass("videolive").removeClass("haslive"), $(".focusinfo").css({top: "49.3%"})
            }
        }), $("#video-add").on("click", function () {
            Siren.addsource()
        })
    }, AH: function () {
        if ("auto" == Poi.windowheight) {
            if ($("h1.main-title").length > 0) {
                var e = $(window).height() + "px";
                $("#centerbg").css({height: e}), $("#bgvideo").css({"min-height": e}), window.resizeFlag = null, $(window).resize(function () {
                    (resizeFlag = null) && clearTimeout(resizeFlag), resizeFlag = setTimeout(function () {
                        Siren.AH()
                    }, 1e3)
                })
            }
        } else $(".headertop").addClass("headertop-bar")
    }, PE: function () {
        $(".headertop").length > 0 && ($("h1.main-title").length > 0 ? ($(".blank").css({"padding-top": "0px"}), $(".headertop").css({height: "auto"}).show(), "open" == Poi.movies.live && Siren.liveplay()) : ($(".blank").css({"padding-top": "75px"}), $(".headertop").css({height: "0px"}).hide(), Siren.livepause()))
    }, CE: function () {
        $(".comments-hidden").show(), $(".comments-main").hide(), $(".comments-hidden").click(function () {
            $(".comments-main").slideDown(500), $(".comments-hidden").hide()
        }), $(".archives").hide(), $(".archives:first").show(), $("#archives-temp h3").click(function () {
            return $(this).next().slideToggle("fast"), !1
        }), mashiro_option.baguetteBoxON && baguetteBox.run(".entry-content", {
            captions: function (e) {
                return e.getElementsByTagName("img")[0].alt
            }, ignoreClass: "fancybox"
        }), $(".js-toggle-search").on("click", function () {
            if ($(".js-toggle-search").toggleClass("is-active"), $(".js-search").toggleClass("is-visible"), $("html").css("overflow-y", "hidden"), mashiro_option.live_search) {
                var e = [];
                !function (a) {
                    if (null != sessionStorage.getItem("search")) s(e = JSON.parse(sessionStorage.getItem("search")), $("#search-input").val(), o), n(); else {
                        var i = new XMLHttpRequest;
                        i.open("GET", a, !0), i.send(), i.onreadystatechange = function () {
                            4 == i.readyState && 200 == i.status && (json = i.responseText, "" != json && (sessionStorage.setItem("search", json), s(e = JSON.parse(json), t.value, o), n()))
                        }
                    }
                }("https://" + document.domain + "/wp-json/cache_search/v1/json/");
                var t = addComment.I("search-input"), o = addComment.I("PostlistBox").innerHTML, a = null;

                function n() {
                    $(".ins-selectable").each(function () {
                        $(this).click(function () {
                            $("#Ty").attr("href", $(this).attr("href")), $("#Ty").click(), $(".search_close").click()
                        })
                    })
                }

                function r(e, t, o, a, i, n, r) {
                    if (e) {
                        var s = e.trim().split(" "), l = a.indexOf(s[s.length - 1]), c = r.indexOf(s[s.length - 1]);
                        a = (a = l < 60 ? a.slice(0, 80) : a.slice(l - 30, l + 30)).replace(s[s.length - 1], '<mark class="search-keyword"> ' + s[s.length - 1].toUpperCase() + " </mark>"), r = (r = c < 60 ? r.slice(0, 80) : r.slice(c - 30, c + 30)).replace(s[s.length - 1], '<mark class="search-keyword"> ' + s[s.length - 1].toUpperCase() + " </mark>")
                    }
                    return '<div class="ins-selectable ins-search-item" href="' + t + '"><header><i class="fa fa-' + o + '" aria-hidden="true"></i>' + a + '<i class="iconfont icon-' + i + '"> ' + n + '</i></header><p class="ins-search-preview">' + r + "</p></div>"
                }

                function s(e, t, o) {
                    var a, n, s, l = "", c = "", d = "", u = "", m = "", p = "", h = "",
                        f = '<section class="ins-section"><header class="ins-section-header">', g = "</section>",
                        v = "</header>",
                        b = (n = e, s = (s = t.trim()).replace(s, "^(?=.*?" + s + ").+$").replace(/\s/g, ")(?=.*?"), i = n.filter(e = > Object.values(e).some(e = > new RegExp(s + "").test(e))
                ),
                    i
                )
                    ;
                    for (a = 0; a < Object.keys(b).length; a++) switch ((h = b[a]).type) {
                        case"post":
                            c += r(t, h.link, "file", h.title, "mark", h.comments, h.text);
                            break;
                        case"tag":
                            m += r("", h.link, "tag", h.title, "none", "", "");
                            break;
                        case"category":
                            u += r("", h.link, "folder", h.title, "none", "", "");
                            break;
                        case"page":
                            d += r(t, h.link, "file", h.title, "mark", h.comments, h.text);
                            break;
                        case"comment":
                            p += r(t, h.link, "comment", h.title, "none", "", h.text)
                    }
                    c && (l = l + f + "文章" + v + c + g), d && (l = l + f + "页面" + v + d + g), u && (l = l + f + "分类" + v + u + g), m && (l = l + f + "标签" + v + m + g), p && (l = l + f + "评论" + v + p + g), addComment.I("PostlistBox").innerHTML = l
                }

                t.oninput = function () {
                    (a = null) && clearTimeout(a), a = setTimeout(function () {
                        s(e, t.value, o), n()
                    }, 250)
                }, Object.values || (Object.values = function (e) {
                    if (e !== Object(e)) throw new TypeError("Object.values called on a non-object");
                    var t, o = [];
                    for (t in e) Object.prototype.hasOwnProperty.call(e, t) && o.push(e[t]);
                    return o
                })
            }
        }), $(".search_close").on("click", function () {
            $(".js-search").hasClass("is-visible") && ($(".js-toggle-search").toggleClass("is-active"), $(".js-search").toggleClass("is-visible"), $("html").css("overflow-y", "unset"))
        }), $("#show-nav").on("click", function () {
            $("#show-nav").hasClass("showNav") ? ($("#show-nav").removeClass("showNav").addClass("hideNav"), $(".site-top .lower nav").addClass("navbar")) : ($("#show-nav").removeClass("hideNav").addClass("showNav"), $(".site-top .lower nav").removeClass("navbar"))
        }), $("#loading").click(function () {
            $("#loading").fadeOut(500)
        })
    }, NH: function () {
        $(window).scroll(function () {
            var e = $(document).scrollTop(), t = $(".site-header");
            0 == e && t.removeClass("yya"), e > 0 && t.addClass("yya")
        })
    }, XLS: function () {
        var e;

        function t() {
            return $("#pagination a").addClass("loading").text(""), $.ajax({
                type: "POST",
                url: $("#pagination a").attr("href") + "#main",
                success: function (e) {
                    if (result = $(e).find("#main .post"), nextHref = $(e).find("#pagination a").attr("href"), $("#main").append(result.fadeIn(500)), $("#pagination a").removeClass("loading").text("Previous"), $("#add_post span").removeClass("loading").text(""), lazyload(), post_list_show_animation(), null != nextHref) {
                        $("#pagination a").attr("href", nextHref);
                        var t = $(window).scrollTop();
                        $(window).scrollTop(t), $body.animate({scrollTop: t + 300}, 666)
                    } else $("#pagination").html("<span>很高兴你翻到这里，但是真的没有了...</span>")
                }
            }), !1
        }

        $body = window.opera ? "CSS1Compat" == document.compatMode ? $("html") : $("body") : $("html,body"), new IntersectionObserver(function (o) {
            if (!(o[0].intersectionRatio <= 0)) {
                var a = $("#pagination a").attr("href"), i = addComment.I("add_post_time");
                if (null != a && i) {
                    var n = addComment.I("add_post_time").title;
                    "233" != n && (console.log("%c 自动加载时倒计时 %c", "background:#9a9da2; color:#ffffff; border-radius:4px;", "", "", n), e = setTimeout(function () {
                        t()
                    }, 1e3 * n))
                }
            }
        }).observe(document.querySelector(".footer-device")), $("body").on("click", "#pagination a", function () {
            return clearTimeout(e), t(), !1
        })
    }, XCS: function () {
        var e = jQuery("#cancel-comment-reply-link"), t = e.text(), o = "commentwrap";
        jQuery(document).on("submit", "#commentform", function () {
            return jQuery.ajax({
                url: Poi.ajaxurl,
                data: jQuery(this).serialize() + "&action=ajax_comment",
                type: jQuery(this).attr("method"),
                beforeSend: addComment.createButterbar("提交中(Commiting)...."),
                error: function (e) {
                    addComment.createButterbar(e.responseText)
                },
                success: function (e) {
                    jQuery("textarea").each(function () {
                        this.value = ""
                    });
                    var t = addComment, a = t.I("cancel-comment-reply-link"), i = t.I("wp-temp-form-div"),
                        n = t.I(t.respondId);
                    t.I("comment_post_ID").value;
                    "0" != t.I("comment_parent").value ? jQuery("#respond").before('<ol class="children">' + e + "</ol>") : jQuery("." + o).length ? "asc" == Poi.order ? jQuery("." + o).append(e) : jQuery("." + o).prepend(e) : "bottom" == Poi.formpostion ? jQuery("#respond").before('<ol class="' + o + '">' + e + "</ol>") : jQuery("#respond").after('<ol class="' + o + '">' + e + "</ol>"), t.createButterbar("提交成功(Succeed)"), lazyload(), code_highlight_style(), click_to_view_image(), clean_upload_images(), a.style.display = "none", a.onclick = null, t.I("comment_parent").value = "0", i && n && (i.parentNode.insertBefore(n, i), i.parentNode.removeChild(i))
                }
            }), !1
        }), addComment = {
            moveForm: function (o, a, i) {
                var n, r = this, s = r.I(o), l = r.I(i), c = r.I("cancel-comment-reply-link"),
                    d = r.I("comment_parent");
                r.I("comment_post_ID");
                e.text(t), r.respondId = i, r.I("wp-temp-form-div") || ((n = document.createElement("div")).id = "wp-temp-form-div", n.style.display = "none", l.parentNode.insertBefore(n, l)), s ? s.parentNode.insertBefore(l, s.nextSibling) : (temp = r.I("wp-temp-form-div"), r.I("comment_parent").value = "0", temp.parentNode.insertBefore(l, temp), temp.parentNode.removeChild(temp)), jQuery("body").animate({scrollTop: jQuery("#respond").offset().top - 180}, 400), d.value = a, c.style.display = "", c.onclick = function () {
                    var e = addComment, t = e.I("wp-temp-form-div"), o = e.I(e.respondId);
                    return e.I("comment_parent").value = "0", t && o && (t.parentNode.insertBefore(o, t), t.parentNode.removeChild(t)), this.style.display = "none", this.onclick = null, !1
                };
                try {
                    r.I("comment").focus()
                } catch (e) {
                }
                return !1
            }, I: function (e) {
                return document.getElementById(e)
            }, clearButterbar: function (e) {
                jQuery(".butterBar").length > 0 && jQuery(".butterBar").remove()
            }, createButterbar: function (e, t) {
                this.clearButterbar(), jQuery("body").append('<div class="butterBar butterBar--center"><p class="butterBar-message">' + e + "</p></div>"), t > 0 ? setTimeout("jQuery('.butterBar').remove()", t) : setTimeout("jQuery('.butterBar').remove()", 6e3)
            }
        }
    }, XCP: function () {
        $body = window.opera ? "CSS1Compat" == document.compatMode ? $("html") : $("body") : $("html,body"), $("body").on("click", "#comments-navi a", function (e) {
            e.preventDefault(), $.ajax({
                type: "GET", url: $(this).attr("href"), beforeSend: function () {
                    $("#comments-navi").remove(), $("ul.commentwrap").remove(), $("#loading-comments").slideDown(), $body.animate({scrollTop: $("#comments-list-title").offset().top - 65}, 800)
                }, dataType: "html", success: function (e) {
                    result = $(e).find("ul.commentwrap"), nextlink = $(e).find("#comments-navi"), $("#loading-comments").slideUp("fast"), $("#loading-comments").after(result.fadeIn(500)), $("ul.commentwrap").after(nextlink), lazyload(), code_highlight_style(), click_to_view_image()
                }
            })
        })
    }, IA: function () {
        POWERMODE.colorful = !0, POWERMODE.shake = !1, document.body.addEventListener("input", POWERMODE)
    }, GT: function () {
        var e = $(".cd-top");
        $(window).scroll(function () {
            $(this).scrollTop() > 100 ? (e.addClass("cd-is-visible"), $(".changeSkin-gear").css("bottom", "0"), $(window).height() > 950 ? $(".cd-top.cd-is-visible").css("top", "0") : $(".cd-top.cd-is-visible").css("top", $(window).height() - 950 + "px")) : ($(".changeSkin-gear").css("bottom", "-999px"), $(".cd-top.cd-is-visible").css("top", "-900px"), e.removeClass("cd-is-visible cd-fade-out")), $(this).scrollTop() > 1200 && e.addClass("cd-fade-out")
        }), e.on("click", function (e) {
            return e.preventDefault(), $("body,html").animate({scrollTop: 0}, 700), !1
        })
    }
};
$(function () {
    Siren.AH(), Siren.PE(), Siren.NH(), Siren.GT(), Siren.XLS(), Siren.XCS(), Siren.XCP(), Siren.CE(), Siren.MN(), Siren.IA(), Siren.LV(), Poi.pjax && ($(document).pjax("a[target!=_top]", "#page", {
        fragment: "#page",
        timeout: 8e3
    }).on("pjax:beforeSend", () = > {$(".normal-cover-video").each(function () {
        this.pause(), this.src = "", this.load = ""
    })
}).
    on("pjax:send", function () {
        $("#bar").css("width", "0%"), mashiro_option.NProgressON && NProgress.start(), Siren.MNH()
    }).on("pjax:complete", function () {
        Siren.AH(), Siren.PE(), Siren.CE(), mashiro_option.NProgressON && NProgress.done(), mashiro_global.ini.pjax(), $("#loading").fadeOut(500), "open" == Poi.codelamp && self.Prism.highlightAll(event), $(".ds-thread").length > 0 && ("undefined" != typeof DUOSHUO ? DUOSHUO.EmbedThread(".ds-thread") : $.getScript("//static.duoshuo.com/embed.js"))
    }).on("submit", ".search-form,.s-search", function (e) {
        e.preventDefault(), $.pjax.submit(e, "#page", {
            fragment: "#page",
            timeout: 8e3
        }), $(".js-search.is-visible").length > 0 && ($(".js-toggle-search").toggleClass("is-active"), $(".js-search").toggleClass("is-visible"), $("html").css("overflow-y", "unset"))
    }), window.addEventListener("popstate", function (e) {
        Siren.AH(), Siren.PE(), Siren.CE(), timeSeriesReload(!0), post_list_show_animation()
    }, !1)
),
    $.fn.postLike = function () {
        if ($(this).hasClass("done")) return !1;
        $(this).addClass("done");
        var e = $(this).data("id"), t = $(this).data("action"), o = $(this).children(".count"),
            a = {action: "specs_zan", um_id: e, um_action: t};
        return $.post(Poi.ajaxurl, a, function (e) {
            $(o).html(e)
        }), !1
    }, $(document).on("click", ".specsZan", function () {
        $(this).postLike()
    })
});
var isWebkit = navigator.userAgent.toLowerCase().indexOf("webkit") > -1,
    isOpera = navigator.userAgent.toLowerCase().indexOf("opera") > -1,
    isIe = navigator.userAgent.toLowerCase().indexOf("msie") > -1;
(isWebkit || isOpera || isIe) && document.getElementById && window.addEventListener && window.addEventListener("hashchange", function () {
    var e, t = location.hash.substring(1);
    /^[A-z0-9_-]+$/.test(t) && (e = addComment.I(t)) && (/^(?:a|select|input|button|textarea)$/i.test(e.tagName) || (e.tabIndex = -1), e.focus())
}, !1);
//# sourceMappingURL=/sm/6e092b9d3aa712bfa40f163ce73f4d556bb74ed7a17fb25c85d723632010e415.map