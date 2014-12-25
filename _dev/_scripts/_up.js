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

    function BtnUp(options) {
        var
            default_options = {};

        if (!options.btn) {
            return false;
        }
        extend(options, default_options);

        this.options = options;
        this.btn = getElementsByClassName(document.body, options.btn)[0];
        this.btn.onclick = function () {
            getElementsByClassName(document.body, options.contentScroll)[0].scrollIntoView(true);
        };

        this.btnUpArrowTop = getElementsByClassName(this.btn, options.arrow.top)[0];
        this.btnUpArrowBottom = getElementsByClassName(this.btn, options.arrow.bottom)[0];

        this.intervalShow = 0;
        this.intervalHide = 0;
    }

    BtnUp.prototype.position = function (position) {
        if ('left' in position) this.btn.style.left = position.left;
        if ('right' in position) this.btn.style.right = position.right;
        if ('top' in position) this.btn.style.top = position.top;
        if ('bottom' in position) this.btn.style.bottom = position.bottom;
    };

    BtnUp.prototype.fadeIn = function (duration) {
        var
            opacity = 0,
            deltaOpacity = 1 / (duration / 40),
            supportOpacity = supports_opacity(),
            self = this;

        if (supportOpacity) {
            opacity = +this.btn.style.opacity
        } else {
            /alpha\(.*opacity\s*=\s*(\d+\.?\d*).*\)/i.test(this.btn.currentStyle.filter);
            opacity = parseFloat(RegExp.$1) / 100;
        }

        clearInterval(this.intervalHide);
        this.intervalShow = setInterval(function () {
            if (opacity < 1) {
                opacity += deltaOpacity;
                if (supportOpacity) {
                    self.btn.style.opacity = opacity;
                } else {
                    self.btn.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + (opacity * 100) + ')';
                    self.btnUpArrowTop.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + (opacity * 100) + ')';
                    self.btnUpArrowBottom.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + (opacity * 100) + ')';
                }
            } else {
                clearInterval(self.intervalShow);
            }
        }, 40);
        this.visibleBtnUp = true;
    };

    BtnUp.prototype.fadeOut = function (duration) {
        var
            deltaOpacity = 1 / (duration / 40),
            supportOpacity = supports_opacity(),
            opacity = 0,
            self = this;

        if (supportOpacity) {
            opacity = this.btn.style.opacity
        } else {
            /alpha\(.*opacity\s*=\s*(\d+\.?\d*).*\)/i.test(this.btn.currentStyle.filter);
            opacity = parseFloat(RegExp.$1) / 100;
        }

        this.visibleBtnUp = false;
        clearInterval(this.intervalShow);
        this.intervalHide = setInterval(function () {
            if (opacity > 0.1) {
                opacity -= deltaOpacity;
                if (supportOpacity) {
                    self.btn.style.opacity = opacity;
                } else {
                    self.btn.style.filter = self.btnUpArrowTop.style.filter = self.btnUpArrowTop.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + (opacity * 100) + ')';
                }
            } else {
                self.btn.style.opacity = 0;
                self.btn.style.filter = self.btnUpArrowTop.style.filter = self.btnUpArrowTop.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=0)';
                clearInterval(self.intervalHide);
            }
        }, 40);
    };

    var
        html,
        body,
        btnUp,
        content,
        footer;

    window.onload = function () {
        html = document.documentElement;
        body = document.body;
        btnUp = new BtnUp({
            btn: 'b-up',
            arrow: {
                top: 'b-up__arrow-top',
                bottom: 'b-up__arrow-bottom'
            },
            contentScroll: 'content-wrapper'
        });

        content = getElementsByClassName(body, 'b-head')[0];
        footer = getElementsByClassName(body, 'b-footer')[0];

        window.onscroll = function () {
            var
                scrollV = 147,
                scrolled = window.pageYOffset || html.scrollTop,
                btnTop = html.clientHeight - btnUp.btn.offsetHeight - 20,
                restScroll = html.scrollHeight - scrolled - html.clientHeight,
                btnPos = {};


            if (scrolled > scrollV) {
                btnPos.right = (html.clientWidth - content.offsetWidth) / 2 + 10 + 'px';
                if (restScroll > footer.offsetHeight) {
                    btnPos.top = btnTop + 'px';
                } else {
                    btnPos.top = btnTop - (footer.offsetHeight - restScroll) + 'px';
                }
                btnUp.position(btnPos);

                if (!btnUp.visibleBtnUp) {
                    btnUp.fadeIn(500);
                }
            } else if (scrolled <= scrollV && btnUp.visibleBtnUp) {
                btnUp.fadeOut(500);
            }
        };
    }
})();
