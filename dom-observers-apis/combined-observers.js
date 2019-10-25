"use strict";
var run = function () {
    var Utils = /** @class */ (function () {
        function Utils() {
        }
        Utils.randomNumber = function (from, to) {
            return ~~(Math.random() * (to - from)) + from;
        };
        ;
        Utils.getColors = function () {
            var COLORS = [];
            while (COLORS.length < 4) {
                COLORS.push("rgb(" + Utils.randomNumber(0, 255) + ", \n       " + Utils.randomNumber(0, 255) + ", \n       " + Utils.randomNumber(0, 255) + ")");
            }
            return COLORS;
        };
        return Utils;
    }());
    var MyAppSpace = /** @class */ (function () {
        function MyAppSpace() {
            this.COLORS = Utils.getColors();
            this.template = MyAppSpace.initTemplate();
            this.appRef = (document.querySelector('#app'));
            MyAppSpace.attachTemplate(this.appRef, this.template);
            this.counter = (document.querySelector('.counter'));
            // Watchers
            this.setObservers();
        }
        MyAppSpace.initTemplate = function () {
            // View box
            return "<h1>Resize me to see what happens!</h1>\n            <div> counter: <span class=\"counter\"> 0 </span> </div>";
        };
        MyAppSpace.attachTemplate = function (appRef, template) {
            appRef.innerHTML = template;
            appRef.style.width = '60%';
            appRef.classList.add('resizable-box');
        };
        MyAppSpace.prototype.setObservers = function () {
            var _this = this;
            // RESIZE OBSERVER - change the box color on resize!
            // @ts-ignore
            this.resizeObserver = new ResizeObserver(function (entries) {
                for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                    var entry = entries_1[_i];
                    entry.target.style.background = _this.COLORS[Utils.randomNumber(0, 4)];
                }
            });
            // MUTATION OBSERVER - increase counter when the style changed!!
            var times;
            this.mutationObserver = new MutationObserver(function (entries) {
                for (var _i = 0, entries_2 = entries; _i < entries_2.length; _i++) {
                    var entry = entries_2[_i];
                    times = Number(_this.counter.textContent) + 1;
                    _this.counter.textContent = "" + times;
                }
            });
            // INTERSECTION OBSERVER - unobserve the other observers when target isn't in viewport!!
            this.intersectionObserver = new IntersectionObserver(function (entries) {
                for (var _i = 0, entries_3 = entries; _i < entries_3.length; _i++) {
                    var entry = entries_3[_i];
                    if (entry.intersectionRatio !== 0) {
                        _this.startWatching(_this.appRef);
                    }
                    else {
                        _this.cleanupWatchers(_this.appRef);
                    }
                }
            });
        };
        MyAppSpace.prototype.startWatching = function (target) {
            this.resizeObserver.observe(target);
            this.mutationObserver.observe(target, { attributes: true, attributeFilter: ['style'] });
        };
        ;
        MyAppSpace.prototype.cleanupWatchers = function (target) {
            this.resizeObserver.unobserve(target);
            this.mutationObserver.disconnect();
        };
        ;
        MyAppSpace.prototype.start = function () {
            this.intersectionObserver.observe(this.appRef);
        };
        MyAppSpace.prototype.pause = function () {
            this.intersectionObserver.unobserve(this.appRef);
        };
        MyAppSpace.prototype.stop = function () {
            this.intersectionObserver.disconnect(this.appRef);
        };
        return MyAppSpace;
    }());
    var app = new MyAppSpace();
    app.start();
};
run();
// PERFORMANCE OBSERVER - doesn't play well here on stackblitz
var observer = new PerformanceObserver(function (list) {
    for (var _i = 0, _a = list.getEntries(); _i < _a.length; _i++) {
        var entry = _a[_i];
        // `name` will be either 'first-paint' or 'first-contentful-paint'.
        var metricName = entry.name;
        var time = Math.round(entry.startTime + entry.duration);
        console.table({
            eventCategory: 'Performance Metrics',
            eventAction: metricName,
            eventValue: time,
            nonInteraction: true,
        });
    }
});
// Start observing paint entries.
observer.observe({ entryTypes: ['paint'] });
//# sourceMappingURL=combined-observers.js.map