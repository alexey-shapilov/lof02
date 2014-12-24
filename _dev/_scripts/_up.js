(function () {

    function extend(Child, Parent) {
        var F = function () {
        };
        F.prototype = Parent.prototype;
        Child.prototype = new F();
        Child.prototype.constructor = Child;
        Child.superclass = Parent.prototype
    }

    function getElementsByClassName(node, classname) {
        if (node.getElementsByClassName) {
            return node.getElementsByClassName(classname);
        }
        var
            elements = [],
            els = node.getElementsByTagName("*"),
            re = new RegExp('(^| )' + classname + '( |$)');

        for (var i = 0, j = els.length; i < j; i++)
            if (re.test(els[i].className))elements.push(els[i]);
        return elements;
    }

    function supports_opacity() {
        var i = document.createElement('div');
        i.style.cssText = 'opacity:.5';
        return i.style.opacity === "0.5";
    }

    function Up(prop) {
        return this
    }

    var
        html,
        body,
        btnUp,
        btnUpArrowTop,
        btnUpArrowBottom,
        content,
        footer,
        htmlWidth,
        visibleUp,
        intervalShow,
        intervalHide;

    window.onload = function () {
        html = document.documentElement;
        body = document.body;
        btnUp = getElementsByClassName(body, 'b-up')[0];
        btnUpArrowTop = getElementsByClassName(btnUp, 'b-up__arrow-top')[0];
        btnUpArrowBottom = getElementsByClassName(btnUp, 'b-up__arrow-bottom')[0];
        content = getElementsByClassName(body, 'b-head')[0];
        footer = getElementsByClassName(body, 'b-footer')[0];
        htmlWidth = html.clientWidth;
        visibleUp = false;

        window.onscroll = function () {
            var
                scrollV = 147,
                scrolled = window.pageYOffset || html.scrollTop,
                btnTop = html.clientHeight - btnUp.offsetHeight - 20,
                restScroll = html.scrollHeight - scrolled - html.clientHeight,
                supportOpacity = supports_opacity();

            if (scrolled > scrollV) {
                //btnUp.style.display = 'block';
                btnUp.style.right = (htmlWidth - content.offsetWidth) / 2 + 10 + 'px';
                if (restScroll > footer.offsetHeight) {
                    btnUp.style.top = btnTop + 'px';
                } else {
                    btnUp.style.top = btnTop - (footer.offsetHeight - restScroll) + 'px';
                }

                if (!visibleUp) {
                    var
                        duration = 500,
                        opacity = 0,
                        deltaOpacity = 1 / (duration / 40);

                    if (supportOpacity) {
                        opacity = +btnUp.style.opacity
                    } else {
                        /alpha\(.*opacity\s*=\s*(\d+\.?\d*).*\)/i.test(btnUp.currentStyle.filter);
                        opacity = parseFloat(RegExp.$1) / 100;
                    }

                    clearInterval(intervalHide);
                    intervalShow = setInterval(function () {
                        if (opacity < 1) {
                            opacity += deltaOpacity;
                            if (supportOpacity) {
                                btnUp.style.opacity = opacity;
                            } else {
                                btnUp.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + (opacity * 100) + ')';
                                btnUpArrowTop.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + (opacity * 100) + ')';
                                btnUpArrowBottom.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + (opacity * 100) + ')';
                            }
                        } else {
                            clearInterval(intervalShow);
                        }
                    }, 40);
                    visibleUp = true;
                }

            } else if (scrolled <= scrollV && visibleUp) {
                var
                    duration = 500,
                    deltaOpacity = 1 / (duration / 40);

                if (supportOpacity) {
                    opacity = +btnUp.style.opacity
                } else {
                    /alpha\(.*opacity\s*=\s*(\d+\.?\d*).*\)/i.test(btnUp.currentStyle.filter);
                    opacity = parseFloat(RegExp.$1) / 100;
                }

                visibleUp = false;
                clearInterval(intervalShow);
                intervalHide = setInterval(function () {
                    //console.log(opacity);
                    if (opacity > 0.1 ) {
                        opacity -= deltaOpacity;
                        if (supportOpacity) {
                            btnUp.style.opacity = opacity;
                        } else {
                            btnUp.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + (opacity * 100) + ')';
                            btnUpArrowTop.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + (opacity * 100) + ')';
                            btnUpArrowBottom.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + (opacity * 100) + ')';
                        }
                        //console.log(opacity);
                    } else {
                        btnUp.style.opacity = 0;
                        btnUp.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=0)';
                        btnUpArrowTop.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=0)';
                        btnUpArrowBottom.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=0)';
                        clearInterval(intervalHide);
                    }
                }, 40);
            }
        };

        btnUp.onclick = function () {
            getElementsByClassName(body,'content-wrapper')[0].scrollIntoView(true);
        }
    }
})();
