/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

/**
 * 作者：罗学
 * */
var CanvasRun = /** @class */ (function () {
    function CanvasRun() {
        var _this = this;
        this.timer = 0;
        this.speed = { x: 0, y: 0 };
        this.VDomTree = [];
        this.moveDistance = 0;
        this.classList = {};
        this.gain = 1;
        // 生成粒子
        this.particleStore = {};
        this.particlePics = [];
        this.envents = {
            click: [],
            touchmove: [],
            touchstart: [],
            touchend: [],
            translateTop: [],
            translateleft: [],
            slowDown: []
        };
        // 事件只注册一次
        this.SimpleInterest = true;
        // 吧用户手机的尺寸数据转化成 750
        this.paramsTranslateUnit = function (num) {
            return parseInt(num * 750 / _this.gain / document.body.clientWidth + '');
        };
        console.log('注册成功');
    }
    // 初始化
    CanvasRun.prototype.init = function (_a) {
        var canvas = _a.canvas, ctx = _a.ctx, config = _a.config, _b = _a.gain, gain = _b === void 0 ? 1 : _b, _c = _a.noNeedOff, _d = _a.mounted, mounted = _d === void 0 ? function () { } : _d, _e = _a.created, created = _e === void 0 ? function () { } : _e;
        return __awaiter(this, void 0, void 0, function () {
            var lastMoveX;
            var _this = this;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        lastMoveX = 0;
                        this.canvas = canvas;
                        this.ctx = ctx;
                        this.gain = gain;
                        created && typeof created === 'function' && created();
                        return [4 /*yield*/, this.compile(config)];
                    case 1:
                        _f.sent();
                        this.draw();
                        mounted && typeof mounted === 'function' && mounted();
                        if (this.SimpleInterest) {
                            this.SimpleInterest = false;
                            this.touchstart(function (e) {
                                _this.startClientX = e.changedTouches[0].clientX;
                                _this.startClientY = e.changedTouches[0].clientY;
                                _this.endClientX = 0;
                                _this.endClientY = 0;
                                _this.moveClientX = 0;
                                _this.moveClientY = 0;
                                _this.moveDistance = 0;
                                _this.dispatchTouchstart(e);
                            });
                            this.touchend(function (e) {
                                _this.endClientX = e.changedTouches[0].clientX;
                                _this.endClientY = e.changedTouches[0].clientY;
                                _this.moveClientX = 0;
                                _this.moveClientY = 0;
                                var diffTime = _this.endTime - _this.startTime;
                                var diffX = _this.endClientX - _this.startClientX;
                                var diffY = _this.endClientY - _this.startClientY;
                                if (diffTime > 30 && diffTime < 150 && Math.abs(diffX) < 10 && Math.abs(diffY) < 10) {
                                    _this.dispatchClick(e);
                                }
                                _this.speed = {
                                    x: parseInt(diffX / diffTime * 1000 + ''),
                                    y: parseInt(diffY / diffTime * 1000 + ''),
                                };
                                _this.dispatchEnd(e);
                            });
                            this.touchmove(function (e) {
                                _this.moveClientX = e.changedTouches[0].clientX;
                                _this.moveClientY = e.changedTouches[0].clientY;
                                _this.dispatchMove(e);
                                _this.moveSlide(lastMoveX - e.changedTouches[0].clientX);
                                _this.draw();
                                lastMoveX = e.changedTouches[0].clientX;
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CanvasRun.prototype.destroyed = function () {
        this.clear();
        this.VDomTree = [{}];
    };
    // 更新画布
    CanvasRun.prototype.$apply = function () {
        this.init({ canvas: this.canvas, ctx: this.ctx, config: this.VDomTree });
    };
    // 编译步骤 
    CanvasRun.prototype.compile = function (VDomTree) {
        return __awaiter(this, void 0, void 0, function () {
            var defaultEvent, events, canInheritAttr, openParentAttr, inherit, openAttr, combination, addClass;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.classList = {};
                        defaultEvent = function () { };
                        events = ['click', 'touchmove', 'touchstart', 'touchend'];
                        canInheritAttr = ['w', 'fontSize', 'color', 'opcity'];
                        openParentAttr = ['w', 'h'];
                        inherit = function (child, parent) {
                            canInheritAttr.forEach(function (i) {
                                if (!child[i] && parent && parent[i])
                                    child[i] = parent[i];
                            });
                        };
                        openAttr = function (parent) {
                            if (!parent)
                                return;
                            openParentAttr.forEach(function (i) {
                                if (parent.whiteSpace === 'nowrap')
                                    parent[i] = _this.computedWidth(parent)[i] || parent[i];
                            });
                        };
                        combination = function (arr, parent) {
                            if (arr === void 0) { arr = VDomTree; }
                            if (parent === void 0) { parent = null; }
                            return __awaiter(_this, void 0, void 0, function () {
                                var _loop_1, this_1, i;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (parent)
                                                parent.childX = 0;
                                            _loop_1 = function (i) {
                                                var _a, _b;
                                                return __generator(this, function (_c) {
                                                    switch (_c.label) {
                                                        case 0:
                                                            // 注册class
                                                            arr[i].class && this_1.analysisString(arr[i].class).forEach(function (element) { return addClass(element, arr[i]); });
                                                            _a = arr[i].children && arr[i].children.length > 0;
                                                            if (!_a) return [3 /*break*/, 2];
                                                            return [4 /*yield*/, combination(arr[i].children, arr[i])];
                                                        case 1:
                                                            _a = (_c.sent());
                                                            _c.label = 2;
                                                        case 2:
                                                            // 建立父子关系
                                                            arr[i].parent = parent;
                                                            arr[i].index = i;
                                                            if (!(typeof arr[i].backgroundImage === 'string')) return [3 /*break*/, 4];
                                                            _b = arr[i];
                                                            return [4 /*yield*/, this_1.createdImg(arr[i].backgroundImage)];
                                                        case 3:
                                                            _b.backgroundImage = _c.sent();
                                                            _c.label = 4;
                                                        case 4:
                                                            // 继承关系
                                                            inherit(arr[i], parent);
                                                            // 放大倍数
                                                            this_1.objectkeys(arr[i]).forEach(function (key) {
                                                                var limits = ['zIndex', 'index', 'maxLine', 'scale', 'opcity', 'rotate'];
                                                                if (limits.indexOf(key) > -1)
                                                                    return;
                                                                if (typeof arr[i][key] === 'number')
                                                                    arr[i][key] *= _this.gain;
                                                                if (_this.isPlainObject(arr[i][key]) && key !== 'parent') {
                                                                    var keys = _this.objectkeys(arr[i][key]);
                                                                    keys.forEach(function (item) {
                                                                        arr[i][key][item] *= _this.gain;
                                                                    });
                                                                }
                                                            });
                                                            // 注册事件
                                                            events.forEach(function (e) {
                                                                if (!arr[i][e])
                                                                    arr[i][e] = defaultEvent;
                                                            });
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            };
                                            this_1 = this;
                                            i = 0;
                                            _a.label = 1;
                                        case 1:
                                            if (!(i < arr.length)) return [3 /*break*/, 4];
                                            return [5 /*yield**/, _loop_1(i)];
                                        case 2:
                                            _a.sent();
                                            _a.label = 3;
                                        case 3:
                                            i++;
                                            return [3 /*break*/, 1];
                                        case 4:
                                            openAttr(parent);
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        };
                        addClass = function (attr, dom) {
                            !_this.classList[attr] ? _this.classList[attr] = [dom] : _this.classList[attr].push(dom);
                        };
                        return [4 /*yield*/, combination()];
                    case 1:
                        _a.sent();
                        this.VDomTree = VDomTree;
                        return [2 /*return*/, true];
                }
            });
        });
    };
    Object.defineProperty(CanvasRun.prototype, "getClassList", {
        get: function () { return this.classList; },
        enumerable: true,
        configurable: true
    });
    // 滑动监听，计算并设置移动距离
    CanvasRun.prototype.moveSlide = function (moveDistance) {
        if (Math.abs(moveDistance) < 30)
            this.moveDistance = moveDistance;
    };
    CanvasRun.prototype.dispatchMove = function (e) {
        var events = this.envents.touchmove;
        var ex = this.moveClientX;
        var ey = this.moveClientY;
        this.dispatchEvent(events, ex, ey, 'touchmove');
    };
    // 事件派发 click
    CanvasRun.prototype.dispatchClick = function (e) {
        var _this = this;
        var events = this.envents.click;
        var ex = this.endClientX;
        var ey = this.endClientY;
        setTimeout(function () {
            _this.dispatchEvent(events, ex, ey, 'click');
        }, 300);
    };
    // 事件派发 click
    CanvasRun.prototype.dispatchTouchstart = function (e) {
        var events = this.envents.touchstart;
        var ex = this.startClientX;
        var ey = this.startClientY;
        this.dispatchEvent(events, ex, ey, 'touchstart');
    };
    CanvasRun.prototype.dispatchEvent = function (events, ex, ey, type) {
        if (type === void 0) { type = 'click'; }
        for (var i = 0; i < events.length; i++) {
            if (ex >= events[i].area.l && ex <= events[i].area.r && ey >= events[i].area.t && ey <= events[i].area.b) {
                events[i] && typeof events[i][type] === 'function' && events[i][type].bind(this)(events[i]);
                this.draw();
                // 只允许同时触发一个事件，阻止向下传递
                return;
            }
        }
    };
    CanvasRun.prototype.dispatchEnd = function (e) {
        var events = this.envents.touchend;
        var ex = this.endClientX;
        var ey = this.endClientY;
        this.dispatchEvent(events, ex, ey, 'touchend');
    };
    // 清理上次绘画
    CanvasRun.prototype.clear = function () {
        this.envents = {
            click: [],
            touchmove: [],
            touchstart: [],
            touchend: [],
            translateTop: [],
            translateleft: [],
            slowDown: [],
        };
    };
    // 
    CanvasRun.prototype.offCanvas = function () {
        var _this = this;
        var files = this.getFile;
        var arr = [];
        for (var i = 0; i < files.length; i++) {
            if (files[i].particle)
                arr.push(files[i]);
        }
        arr.map(function (VCANVASDOM) {
            _this.ctx.save();
            _this.drwaView(VCANVASDOM);
            _this.ctx.restore();
            var x = VCANVASDOM.x, y = VCANVASDOM.y, w = VCANVASDOM.w, h = VCANVASDOM.h, particle = VCANVASDOM.particle;
            var grainSize = particle.size || 5;
            // const diameter =  particle.d || 0;
            // const getRandom = () => {
            //   return 0.5 * diameter * (Math.random() > 0.5 ? Math.random() : -Math.random()); 
            // };
            var storeArr = [];
            var store = function () {
                for (var i = x; i <= x + w; i += grainSize) {
                    for (var j = y; j <= y + h; j += grainSize) {
                        storeArr.push({
                            file: _this.ctx.getImageData(i, j, grainSize, grainSize),
                            x: i,
                            y: j,
                            w: grainSize,
                            h: grainSize
                        });
                    }
                }
                _this.particleStore[VCANVASDOM.class] = storeArr;
                // this.getClassList[VCANVASDOM.class][0].opcity = 0;
            };
            store();
            // const put = () => {
            //   let arr = this.particleStore[VCANVASDOM.class];
            //   for(let i = 0; i < arr.length; i++) {
            //     arr[i] && arr[i].file && this.ctx.putImageData(
            //       arr[i].file,
            //       arr[i].x + getRandom(),
            //       arr[i].y + getRandom(),
            //     );
            //   }
            // };
            var arr = [];
            _this.ctx.save();
            _this.drwaView(VCANVASDOM);
            _this.ctx.restore();
            var getData = _this.ctx.getImageData(0, 0, 500, 500);
            arr.push(getData);
            _this.particlePics[VCANVASDOM.class] = arr;
            console.log(getData);
        });
        console.log('============================', arr, '============================');
    };
    // 绘图
    CanvasRun.prototype.draw = function () {
        var _this = this;
        this.clear();
        var files = this.getFile;
        var i = 0;
        var draw = function () {
            var VCANVASDOM = Object.assign({}, files[i], { self: files[i] });
            _this.warp(VCANVASDOM);
            i++;
            if (files.length === i)
                return;
            draw();
        };
        draw();
    };
    // 事件储存，把层级高的事件放在上面
    CanvasRun.prototype.eventStoreArea = function (type, envent) {
        this.envents[type] && this.envents[type].unshift(envent);
    };
    // 把px转化成适合屏幕大小尺寸
    CanvasRun.prototype.rpxToFix = function (rpx) {
        if (rpx === void 0) { rpx = '10rpx'; }
        rpx = rpx + '';
        if (!/^[\d]+(rpx)$/.test(rpx))
            return rpx;
        return this.trasnslateUnit(parseInt(rpx)) * this.gain;
    };
    CanvasRun.prototype.errorLog = function (msg) {
        console.error(msg);
        return true;
    };
    // 画圆角矩形
    CanvasRun.prototype.drwaRoundRect = function (_a) {
        var _b = _a.x, x = _b === void 0 ? 0 : _b, _c = _a.y, y = _c === void 0 ? 0 : _c, _d = _a.w, w = _d === void 0 ? 0 : _d, _e = _a.h, h = _e === void 0 ? 0 : _e, _f = _a.borderRadius, borderRadius = _f === void 0 ? 0 : _f, _g = _a.border, border = _g === void 0 ? '1rpx solid transparent' : _g;
        border = border || '1rpx solid transparent';
        var strArr = this.analysisString(border);
        if (strArr.length < 3)
            return this.errorLog('您设置的border缺少参数');
        var borderSize = this.rpxToFix(strArr[0]);
        var borderColor = this.rpxToFix(strArr[2]);
        var borderType = this.analysisString(strArr[1], ':');
        var r = borderRadius;
        if (w < 2 * r)
            r = w / 2;
        if (h < 2 * r)
            r = h / 2;
        this.ctx.strokeStyle = borderColor;
        borderType[0] === 'dashed' && this.ctx.setLineDash([borderType[1] || 10, borderType[2] || 3]);
        this.ctx.lineWidth = borderSize;
        this.ctx.beginPath();
        this.ctx.moveTo(x + r, y);
        this.ctx.arcTo(x + w, y, x + w, y + h, r);
        this.ctx.arcTo(x + w, y + h, x, y + h, r);
        this.ctx.arcTo(x, y + h, x, y, r);
        this.ctx.arcTo(x, y, x + w, y, r);
        this.ctx.closePath();
        return this.ctx;
    };
    CanvasRun.prototype.drawFont = function (_a) {
        var _this = this;
        var fontSize = _a.fontSize, _b = _a.color, color = _b === void 0 ? '#000000' : _b, lineHeight = _a.lineHeight, maxLine = _a.maxLine, text = _a.text, _c = _a.textAlign, textAlign = _c === void 0 ? 'start' : _c, overText = _a.overText, overTextColor = _a.overTextColor, fontWeight = _a.fontWeight, x = _a.x, y = _a.y, w = _a.w, h = _a.h;
        this.ctx.save();
        lineHeight = lineHeight || fontSize;
        this.ctx.font = "" + (fontWeight ? fontWeight + ' ' : '') + fontSize + "px Arial";
        if (textAlign === 'center')
            x = x + w / 2;
        if (textAlign === 'end')
            x = x + w;
        this.ctx.textAlign = textAlign;
        var computedTextArr = this.computedText(text, fontSize, w);
        computedTextArr.forEach(function (item, index) {
            text = item.resText;
            if (index >= maxLine)
                return;
            if (index === maxLine - 1 && Math.abs(w - item.tw) < fontSize) {
                if (overText) {
                    text = text.substr(0, text.length - (1 + overText.length)) + ('...');
                    _this.ctx.fillStyle = overTextColor || color;
                    _this.ctx.fillText(overText, x + _this.ctx.measureText(text).width, y + lineHeight);
                }
                else {
                    text = text.substr(0, text.length - 1) + '...';
                }
            }
            y += lineHeight;
            _this.ctx.fillStyle = color;
            _this.ctx.fillText(text, x, y);
        });
        this.ctx.restore();
        return this.ctx;
    };
    // 粒子化
    CanvasRun.prototype.getParticle = function (VCANVASDOM) {
        var _this = this;
        this.drwaView(VCANVASDOM);
        var arr = [];
        var x = VCANVASDOM.x, y = VCANVASDOM.y, w = VCANVASDOM.w, h = VCANVASDOM.h, particle = VCANVASDOM.particle;
        var grainSize = particle.size || 5;
        var diameter = particle.d || 0;
        var getRandom = function () {
            return 0.5 * diameter * (Math.random() > 0.5 ? Math.random() : -Math.random());
        };
        var store = function () {
            for (var i = x; i <= x + w; i += grainSize) {
                for (var j = y; j <= y + h; j += grainSize) {
                    arr.push({
                        file: _this.ctx.getImageData(i, j, grainSize, grainSize),
                        x: i,
                        y: j,
                        w: grainSize,
                        h: grainSize
                    });
                }
            }
            _this.particleStore[VCANVASDOM.class] = arr;
            _this.getClassList[VCANVASDOM.class][0].opcity = 0;
        };
        var put = function () {
            var arr = _this.particleStore[VCANVASDOM.class];
            for (var i = 0; i < arr.length; i++) {
                arr[i] && arr[i].file && _this.ctx.putImageData(arr[i].file, arr[i].x + getRandom(), arr[i].y + getRandom());
            }
        };
        !this.particleStore[VCANVASDOM.class] ? store() : put();
    };
    CanvasRun.prototype.drwaView = function (VCANVASDOM) {
        var backgroundImage = VCANVASDOM.backgroundImage, _a = VCANVASDOM.backgroundColor, backgroundColor = _a === void 0 ? 'transparent' : _a, x = VCANVASDOM.x, y = VCANVASDOM.y, w = VCANVASDOM.w, h = VCANVASDOM.h, text = VCANVASDOM.text, backgroundSize = VCANVASDOM.backgroundSize, backgroundPosition = VCANVASDOM.backgroundPosition, scale = VCANVASDOM.scale, opcity = VCANVASDOM.opcity, rotate = VCANVASDOM.rotate;
        if (opcity >= 0)
            this.ctx.globalAlpha = opcity;
        if (scale) {
            this.ctx.translate(x + w / 2, y + h / 2);
            this.ctx.scale(scale.x, scale.y);
            this.ctx.translate(-(x + w / 2), -(y + h / 2));
        }
        if (rotate) {
            this.ctx.translate(x + w / 2, y + h / 2);
            this.ctx.rotate(parseInt(rotate) * Math.PI / 180);
            this.ctx.translate(-(x + w / 2), -(y + h / 2));
        }
        this.drwaRoundRect(VCANVASDOM).stroke();
        this.ctx.clip();
        this.ctx.fillStyle = backgroundColor;
        this.ctx.fillRect(x, y, w, h);
        if (backgroundPosition) {
            x = x + backgroundPosition.x;
            y = y + backgroundPosition.y;
        }
        if (backgroundSize) {
            w = backgroundSize.w;
            h = backgroundSize.h;
        }
        this.ctx
            && backgroundImage
            && this.ctx.drawImage(backgroundImage, x, y, w, h);
        this.ctx && text && this.drawFont(VCANVASDOM);
    };
    // 视图包裹器
    CanvasRun.prototype.viewWrap = function (VCANVASDOM) {
        this.ctx.save();
        // 粒子化单独渲染
        VCANVASDOM.particle
            ? this.getParticle(VCANVASDOM)
            : this.drwaView(VCANVASDOM);
        this.ctx.restore();
    };
    // 事件包裹器
    CanvasRun.prototype.eventWrap = function (_a) {
        var _this = this;
        var self = _a.self, x = _a.x, y = _a.y, w = _a.w, h = _a.h, click = _a.click, touchstart = _a.touchstart, touchmove = _a.touchmove, touchend = _a.touchend;
        x /= this.gain;
        y /= this.gain;
        w /= this.gain;
        h /= this.gain;
        [click, touchstart, touchmove, touchend].forEach(function (e) {
            if (e && e.name === 'defaultEvent')
                return;
            if (e && typeof e === 'function') {
                var params = {
                    area: {
                        t: y,
                        b: y + h,
                        l: x,
                        r: x + w,
                    },
                    self: self
                };
                params[e.name] = e;
                _this.eventStoreArea(e.name, params);
            }
        });
    };
    // 将事件跟绘图区分开，分别处理
    CanvasRun.prototype.warp = function (VCANVASDOM) {
        var w = this.canvas.width;
        var h = this.canvas.height;
        // 如果元素在canvas外则不绘制
        if (VCANVASDOM.x + w < 0
            || VCANVASDOM.y + h < 0
            || VCANVASDOM.x > w
            || VCANVASDOM.y > h)
            return;
        this.viewWrap(VCANVASDOM);
        this.eventWrap(VCANVASDOM);
    };
    Object.defineProperty(CanvasRun.prototype, "getFile", {
        // 递归遍历得到所有dom， 并排序文件，后续可能会增加功能
        get: function () {
            var _this = this;
            var returnArr = [];
            if (this.VDomTree && this.VDomTree.length > 0) {
                var combination_1 = function (arr, parent) {
                    if (arr === void 0) { arr = _this.VDomTree; }
                    if (parent === void 0) { parent = null; }
                    if (parent)
                        parent.childX = 0;
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i].zIndex < 0 || arr[i].display === 'none')
                            continue;
                        returnArr.push(_this.modify(arr[i], parent));
                        if (arr[i].children && arr[i].children.length > 0) {
                            combination_1(arr[i].children, arr[i]);
                        }
                    }
                };
                combination_1();
            }
            return this.sort(returnArr);
        },
        enumerable: true,
        configurable: true
    });
    // 计算父级宽度
    CanvasRun.prototype.computedWidth = function (parent) {
        if (!parent.children)
            return { w: 0, h: 0 };
        var w = 0, h = 0;
        w += fixUndefind(parent.paddingLeft) + fixUndefind(parent.paddingRight);
        parent.children.forEach(function (element) {
            h = (element.h > h ? element.h : h);
            w += fixUndefind(element.w) + fixUndefind(element.maginLeft) + fixUndefind(element.marginRight);
        });
        // 矫正计算宽度，后续改良现在不准确，临时方案
        w -= 800 / parent.children.length;
        // w = (parent.children.length - 1) * 168;
        return { w: w, h: h };
        function fixUndefind(num) {
            return num ? num : 0;
        }
    };
    // 滑动边界
    CanvasRun.prototype.slideSide = function (type, file, max, min) {
        if (file[type] > max) {
            file[type] = max;
            cancelAnimationFrame(this.timer);
        }
        else if (file[type] < min) {
            file[type] = min;
            cancelAnimationFrame(this.timer);
        }
    };
    // 能够左右滑动
    CanvasRun.prototype.canLRSlide = function (parent) {
        var _this = this;
        var x = parent.x || 0, y = parent.y || 0, w = parent.computedW || 0, h = parent.computedH || 0, maxMaginLeft = parent.children[0] ? parent.children[0].maginLeft || 0 : 0, minMaginLeft = (document.body.clientWidth - parent.w / this.gain);
        parent.computedW = parent.w / this.gain;
        parent.computedH = parent.h / this.gain;
        x /= this.gain;
        y /= this.gain;
        w /= this.gain;
        h /= this.gain;
        var area = {
            t: y,
            b: y + h,
            l: x,
            r: x + w,
        };
        this.eventStoreArea('touchmove', {
            area: area,
            touchmove: function () {
                _this.clear();
                cancelAnimationFrame(_this.timer);
                parent.marginLeft = -1 * _this.moveDistance + fixUndefind(parent.marginLeft);
            },
        });
        this.eventStoreArea('touchend', {
            area: area,
            touchend: function () {
                _this.clear();
                clearInterval(_this.timer);
                var speed = _this.speed.x * _this.gain;
                if (Math.abs(speed) < 300)
                    return;
                var run = function () {
                    if (speed > 0)
                        speed -= 10 * _this.gain;
                    else
                        speed += 10 * _this.gain;
                    parent.marginLeft = 1 * speed / 100 + fixUndefind(parent.marginLeft);
                    _this.draw();
                    if (Math.abs(speed) <= 10 * _this.gain)
                        return;
                    _this.timer = requestAnimationFrame(run);
                };
                run();
            },
        });
        this.slideSide('marginLeft', parent, maxMaginLeft, minMaginLeft);
        function fixUndefind(num) {
            return num ? num : 0;
        }
    };
    CanvasRun.prototype.slideTop = function (child, parent) {
        this.translateSlide(child, parent);
    };
    CanvasRun.prototype.translateSlide = function (child, parent) {
        var _this = this;
        var timer = 0;
        var speed = child.slideSpeed || 3;
        var ifAddSpeed = child.slideTop < 0;
        if (parent.slideRunning && Math.abs(child.slideTop) > speed)
            return;
        parent.slideRunning = true;
        var slide = function () {
            child.slideTop = ifAddSpeed ? child.slideTop + speed : child.slideTop - speed;
            if (!parent.marginTop)
                parent.marginTop = 0;
            parent.marginTop = ifAddSpeed ? parent.marginTop + speed : parent.marginTop - speed;
            _this.draw();
            if (Math.abs(child.slideTop) <= speed) {
                parent.slideRunning = false;
                window.cancelAnimationFrame(timer);
                return;
            }
            timer = window.requestAnimationFrame(slide);
        };
        timer = window.requestAnimationFrame(slide);
    };
    // 修饰动作
    CanvasRun.prototype.modify = function (child, parent) {
        if (!parent)
            return child;
        if (child.canLRSlide)
            this.canLRSlide(parent);
        if (child.slideTop)
            this.slideTop(child, parent);
        // 使用定位 不会影响到拖拽
        if (child.position) {
            child.x = child.position.x;
            child.y = child.position.y;
            return child;
        }
        // 不使用相对定位
        child.x = fixUndefind(parent.x) + fixUndefind(parent.paddingLeft) + fixUndefind(child.marginLeft);
        child.y = fixUndefind(parent.y) + fixUndefind(parent.paddingTop) + fixUndefind(child.marginTop);
        if (parent.whiteSpace === 'nowrap') {
            child.x = fixUndefind(parent.childX) + fixUndefind(parent.paddingLeft) + fixUndefind(child.marginLeft) + fixUndefind(parent.marginLeft);
            parent.childX = fixUndefind(parent.childX) + child.w + fixUndefind(child.marginLeft);
            return child;
        }
        function fixUndefind(num) {
            return num ? num : 0;
        }
        return child;
    };
    // 封装 touchstart 事件
    CanvasRun.prototype.touchstart = function (cb) {
        var _this = this;
        this.canvas.addEventListener('touchstart', function (e) {
            _this.startTime = Date.now();
            cb(e);
        });
    };
    // 封装 touchend 事件
    CanvasRun.prototype.touchend = function (cb) {
        var _this = this;
        this.canvas.addEventListener('touchend', function (e) {
            _this.endTime = Date.now();
            cb(e);
        });
    };
    // 封装 touchmove事件
    CanvasRun.prototype.touchmove = function (cb) {
        this.canvas.addEventListener('touchmove', function (e) {
            cb(e);
        });
    };
    // ============================工具方法===========================================
    /**
     * 解析字符串
     * '1rpx solid red' return ['1rpx','solid','red'];
     */
    CanvasRun.prototype.analysisString = function (str, type) {
        if (type === void 0) { type = ' '; }
        var arr = [];
        if (!str)
            return arr;
        str.trim().split(type).forEach(function (item) {
            arr.push(item.trim());
        });
        return arr;
    };
    CanvasRun.prototype.computedText = function (text, fontSize, w) {
        if (text === void 0) { text = ''; }
        if (fontSize === void 0) { fontSize = 28; }
        if (w === void 0) { w = 200; }
        var textArr = text.split('\n');
        var resTextArr = [];
        var map = function (t) {
            var textArr = t.split('');
            var tw = 0;
            var lineIndex = 0;
            var resTextArr = [];
            var resText = '';
            textArr.map(function (char) {
                var len = /[\w|\d|,|.]/.test(char) ? fontSize / 2 : fontSize;
                if (tw > w - fontSize) {
                    resText = '';
                    tw = 0;
                    lineIndex++;
                }
                tw += len;
                resText += char;
                resTextArr[lineIndex] = {
                    resText: resText,
                    tw: tw
                };
            });
            return resTextArr;
        };
        for (var i = 0; i < textArr.length; i++) {
            resTextArr.push.apply(resTextArr, map(textArr[i]));
        }
        return resTextArr;
    };
    // 见图片转为canvas可用的img对象
    CanvasRun.prototype.createdImg = function (url) {
        return new Promise(function (resovle, reject) {
            var img = new Image();
            // 解决跨域问题
            img.crossOrigin = 'anonymous';
            img.onload = function () {
                resovle(img);
            };
            img.onerror = function (e) {
                reject(e);
            };
            img.src = url;
        });
    };
    Object.defineProperty(CanvasRun.prototype, "createdImageUrl", {
        // 生成图片,此方法需要在所有canvas绘制完成后调用
        get: function () {
            return this.canvas.toDataURL("image/png");
        },
        enumerable: true,
        configurable: true
    });
    // 把数据转化呈用户适配用户屏幕  
    CanvasRun.prototype.trasnslateUnit = function (num) {
        return parseInt(num * document.body.clientWidth / 750 + '');
    };
    // 排序
    CanvasRun.prototype.sort = function (arr) {
        function sequence(a, b) {
            a = a.zIndex || 0;
            b = b.zIndex || 0;
            return a > b ? 1 : a < b ? -1 : 0;
        }
        return arr.sort(sequence);
    };
    // 下载资源，并返回进度
    CanvasRun.prototype.downloadFile = function (files, cb) {
        try {
            var j_1 = 0;
            var _loop_2 = function (i) {
                files[i].then(function (res) {
                    files[i] = res;
                    j_1++;
                    cb(files, j_1 / files.length);
                });
            };
            for (var i = 0; i < files.length; i++) {
                _loop_2(i);
            }
            ;
        }
        catch (error) {
        }
    };
    CanvasRun.prototype.isPlainObject = function (obj) {
        var _toString = Object.prototype.toString;
        return _toString.call(obj) === '[object Object]';
    };
    CanvasRun.prototype.objectkeys = function (obj) {
        if (this.isPlainObject(obj))
            return Object.keys(obj);
        return [];
    };
    return CanvasRun;
}());

export default CanvasRun;
