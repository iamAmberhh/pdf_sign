"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// 下bar 時間軸
var timeline = document.querySelectorAll(".timeline li");
var pages = 0;
if (window.location.pathname == "/pdf_sign/upload.html") {
  timelineCheck();
}
function timelineCheck() {
  timeline.forEach(function (item, index) {
    var p = item.firstChild.nextSibling;
    var span = item.lastElementChild;
    if (index < pages) {
      p.classList.remove("text-primary", "timeline-bar-current");
      p.classList.add("text-secondary", "timeline-bar-done");
      span.classList.remove("timeline-spot-current");
      span.classList.add("timeline-spot-done");
    }
    if (index == pages) {
      p.classList.remove("text-darkgray");
      p.classList.add("text-primary");
      span.classList.add("timeline-spot-current");
    }
  });
}

// 上傳文件切換
var tag = document.querySelector(".tag-bar");
if (tag) {
  tag.addEventListener("click", function (e) {
    var currentTag = e.target.closest("li");
    var tags = document.querySelectorAll(".tags");
    var tagsBlock = document.querySelectorAll(".tags-block");
    tags.forEach(function (i) {
      i.classList.remove("tags-active");
    });
    currentTag.classList.add("tags-active");
    tagsBlock.forEach(function (i) {
      i.classList.add("d-none");
      if ("#".concat(i.getAttribute("id")) === currentTag.dataset.target) {
        i.classList.remove("d-none");
      }
    });
  });
}

// 拖曳檔案上傳
var data = [];
var dropbox = document.querySelector(".outline");
if (dropbox) {
  dropbox.addEventListener("dragenter", dragenter, false);
  dropbox.addEventListener("dragover", dragover, false);
  dropbox.addEventListener("drop", drop, false);
}
function dragenter(e) {
  e.stopPropagation();
  e.preventDefault();
}
function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
}
function drop(e) {
  e.stopPropagation();
  e.preventDefault();
  var dt = e.dataTransfer;
  var files = dt.files;
  var fileObj = files[0];
  handleFiles(files, fileObj);
}
function handleFiles(files, fileObj) {
  if (files[0].name.split(".")[1] != "pdf") {
    var notFileAlert = new bootstrap.Modal(document.querySelector("#notFileAlert"));
    notFileAlert.show();
    return;
  }
  if (files[0].size > 10485760) {
    var fileSizeOver = new bootstrap.Modal(document.querySelector("#fileSizeOver"));
    fileSizeOver.show();
    return;
  }
  if (files.length > 0) {
    var fileReader = new FileReader();
    fileReader.readAsArrayBuffer(fileObj);
    fileReader.addEventListener("load", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var pdfData, pdfImage;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              canvas.requestRenderAll();
              _context.next = 3;
              return printPDF(files[0]);
            case 3:
              pdfData = _context.sent;
              _context.next = 6;
              return pdfToImage(pdfData);
            case 6:
              pdfImage = _context.sent;
              canvas.setWidth(pdfImage.width / window.devicePixelRatio);
              canvas.setHeight(pdfImage.height / window.devicePixelRatio);
              canvas.setBackgroundImage(pdfImage, canvas.renderAll.bind(canvas));
            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    // let obj = {};
    // obj.name = files[0].name;
    // obj.year = files[0].lastModifiedDate.getFullYear();
    // obj.month = files[0].lastModifiedDate.getMonth() + 1;
    // obj.date = files[0].lastModifiedDate.getDate();
    // data.push(obj);

    noUpload.classList.add("d-none");
    fileTable.classList.remove("d-none");

    // fileReader.readAsText(files[0]); // 讀取上傳的檔案
    // renderUpload();
    uploadSuccess.show();
    nextStepBtn[0].classList.remove("disabled", "btn-disabled");
    nextStepBtn[0].classList.add("btn-secondary");
    fileName.textContent = files[0].name;
  }
}

// 點擊上傳
var uploadSuccess = new bootstrap.Modal(document.querySelector("#uploadSuccess"));
var fileUploader = document.querySelector(".select");
if (fileUploader) {
  fileUploader.addEventListener("change", function (e) {
    // 副檔名檢查
    if (fileUploader.files[0].name.split(".")[1] != "pdf") {
      var notFileAlert = new bootstrap.Modal(document.querySelector("#notFileAlert"));
      notFileAlert.show();
      return;
    }
    if (fileUploader.files[0].size > 10485760) {
      var fileSizeOver = new bootstrap.Modal(document.querySelector("#fileSizeOver"));
      fileSizeOver.show();
      return;
    }
    if (fileUploader.files.length > 0) {
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        var result2 = reader.result;
        var typedarray = new Uint8Array(reader.result);
      });

      //   let obj = {};
      //   obj.name = fileUploader.files[0].name;
      //   obj.year = fileUploader.files[0].lastModifiedDate.getFullYear();
      //   obj.month = fileUploader.files[0].lastModifiedDate.getMonth() + 1;
      //   obj.date = fileUploader.files[0].lastModifiedDate.getDate();
      //   data.push(obj);

      reader.readAsText(fileUploader.files[0]);
    }
    noUpload.classList.add("d-none");
    fileTable.classList.remove("d-none");
    // renderUpload();
    uploadSuccess.show();
    nextStepBtn[0].classList.remove("disabled", "btn-disabled");
    nextStepBtn[0].classList.add("btn-secondary");
    fileName.textContent = fileUploader.files[0].name;
  });
}
var fileTable = document.querySelector(".has-file");
var fileTableBody = document.querySelector(".table-body");
// function renderUpload() {
//   let str = "";

//   data.forEach((i) => {
//     str += `<tr data-upload>
//     <th scope="row"><a href="#" class="ellipsis">${i.name}</a></th>
//     <td><a href="#">${i.year}/${i.month}/${i.date}</a></td>
//     <td class="d-none d-md-block"><a href="#">--</a></td>
// </tr>`;
//   });
//   fileTableBody.innerHTML = str;
// }

var nextStepBtn = document.querySelectorAll("[data-next]");
var cancelBtn = document.querySelector("[data-cancel]");
var fileName = document.querySelector(".file-name");
var uploadBlock = document.querySelector("#upload");
var signBlock = document.querySelector("#sign");
if (fileTableBody) {
  fileTableBody.addEventListener("click", function (e) {
    var allFiles = document.querySelectorAll("[data-upload]");
    allFiles.forEach(function (i) {
      i.classList.remove("bg-light");
    });
    e.target.closest("tr").classList.add("bg-light");
    console.log(e.target.closest("tr").firstChild.nextSibling.firstChild.textContent);
    var file = e.target.closest("tr").firstChild.nextSibling.firstChild.textContent;
    nextStepBtn[0].classList.remove("disabled", "btn-disabled");
    nextStepBtn[0].classList.add("btn-secondary");
    fileName.textContent = file;
  });
}
var asideBar = document.querySelector('.aside-bar');
// 步驟推進
if (nextStepBtn) {
  nextStepBtn[0].addEventListener("click", function (e) {
    uploadBlock.classList.add("d-none");
    signBlock.classList.remove("d-none");
    nextStepBtn[0].classList.add("d-none");
    nextStepBtn[1].classList.remove("d-none");
    pages++;
    timelineCheck();
  });
  nextStepBtn[1].addEventListener("click", function (e) {
    nextStepBtn[1].classList.add("d-none");
    nextStepBtn[2].classList.remove("d-none");
    asideBar.classList.add("d-none");
    nextStepBtn[2].classList.remove("disabled", "btn-disabled");
    nextStepBtn[2].classList.add("btn-secondary");
    cancelBtn.textContent = "回首頁";
    pages++;
    timelineCheck();
  });
}
var noUpload = document.querySelector(".no-file");
if (noUpload) {
  if (data.length == 0) {
    noUpload.classList.remove("d-none");
    fileTable.classList.add("d-none");
  }
}

// 簽名
var signCanvas = document.querySelector("#sign-canvas");
if (signCanvas) {
  // 取得滑鼠or手指在畫布上的位置
  var getPointPosition = function getPointPosition(e) {
    var canvaSize = signCanvas.getBoundingClientRect();
    if (e.type == "mousemove") {
      return {
        x: e.clientX - canvaSize.left,
        y: e.clientY - canvaSize.top
      };
    } else {
      return {
        x: e.touches[0].clientX - canvaSize.left,
        y: e.touches[0].clientY - canvaSize.top
      };
    }
  }; // 開始繪圖時，將狀態開啟
  var startPosition = function startPosition(e) {
    e.preventDefault();
    isPainting = true;
  }; // 紀錄繪圖歷史
  // 繪圖結束，將狀態關閉，並產生新路徑
  var finishedPosition = function finishedPosition() {
    isPainting = false;
    signCtx.beginPath();
    push();
  }; // 繪製過程
  var draw = function draw(e) {
    if (!isPainting) return;
    var paintPosition = getPointPosition(e);
    signCtx.lineTo(paintPosition.x, paintPosition.y);
    signCtx.stroke();
  };
  var save = function save() {
    signImg.parentElement.classList.remove("d-none");
    var newImg = signCanvas.toDataURL("image/png");
    signImg.src = newImg;
    localStorage.setItem("img", newImg);
  };
  var back = function back() {
    var lastDraw = new Image();
    // 確定有上一步我們才回到上一步
    if (step > 0) {
      step--;
    } else if (step == 0) {
      reset();
    }
    // 把上一部的base64設定給圖像物件
    lastDraw.src = historyStep[step];
    // 把圖片載入後用畫布選染出來
    lastDraw.onload = function () {
      signCtx.clearRect(0, 0, signCanvas.width, signCanvas.height);
      signCtx.drawImage(lastDraw, 0, 0);
    };
  };
  var reset = function reset(e) {
    signCtx.clearRect(0, 0, signCanvas.width, signCanvas.height);
    historyStep = [];
    step = -1;
  }; // 電腦版
  var signCtx = signCanvas.getContext("2d");
  var signImg = document.querySelector(".sign-img");
  var saveBtn = document.querySelector(".saveBtn");
  var backBtn = document.querySelector(".backBtn");
  var clearBtn = document.querySelector(".clearBtn");

  // 設定線條相關數值
  signCtx.lineWidth = 4;
  signCtx.lineCap = "round";
  var isPainting = false;
  var step = -1;
  var historyStep = [];
  var push = function push() {
    step++;
    if (step <= historyStep.length - 1) {
      historyStep.length = step;
    }
    historyStep.push(signCanvas.toDataURL());
  };
  signCanvas.addEventListener("mousedown", startPosition);
  signCanvas.addEventListener("mouseup", finishedPosition);
  // signCanvas.addEventListener("mouseleave", finishedPosition);
  signCanvas.addEventListener("mousemove", draw);

  // 手機版
  signCanvas.addEventListener("touchstart", startPosition);
  signCanvas.addEventListener("touchend", finishedPosition);
  signCanvas.addEventListener("touchcancel", finishedPosition);
  signCanvas.addEventListener("touchmove", draw);
  clearBtn.addEventListener("click", reset);
  backBtn.addEventListener("click", back);
  saveBtn.addEventListener("click", save);
}

// PDF渲染成畫布
var Base64Prefix = "data:application/pdf;base64,";
var pdfjsLib = window["pdfjs-dist/build/pdf"];
pdfjsLib.GlobalWorkerOptions.workerSrc = "//mozilla.github.io/pdf.js/build/pdf.worker.js";

// 使用原生 FileReader 轉檔
function readBlob(blob) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.addEventListener("load", function () {
      return resolve(reader.result);
    });
    reader.addEventListener("error", reject);
    reader.readAsDataURL(blob);
  });
}
function printPDF(_x) {
  return _printPDF.apply(this, arguments);
}
function _printPDF() {
  _printPDF = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(pdfData) {
    var data, pdfDoc, pdfPage, viewport, canvas, context, renderContext, renderTask;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return readBlob(pdfData);
          case 2:
            pdfData = _context3.sent;
            // 將 base64 中的前綴刪去，並進行解碼
            data = atob(pdfData.substring(Base64Prefix.length)); // 利用解碼的檔案，載入 PDF 檔及第一頁
            _context3.next = 6;
            return pdfjsLib.getDocument({
              data: data
            }).promise;
          case 6:
            pdfDoc = _context3.sent;
            _context3.next = 9;
            return pdfDoc.getPage(1);
          case 9:
            pdfPage = _context3.sent;
            // 設定尺寸及產生 canvas
            viewport = pdfPage.getViewport({
              scale: window.devicePixelRatio
            });
            canvas = document.createElement("canvas");
            context = canvas.getContext("2d"); // 設定 PDF 所要顯示的寬高及渲染
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            renderContext = {
              canvasContext: context,
              viewport: viewport
            };
            renderTask = pdfPage.render(renderContext);
            return _context3.abrupt("return", renderTask.promise.then(function () {
              return canvas;
            }));
          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _printPDF.apply(this, arguments);
}
function pdfToImage(_x2) {
  return _pdfToImage.apply(this, arguments);
} // 此處 canvas 套用 fabric.js
function _pdfToImage() {
  _pdfToImage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(pdfData) {
    var scale;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            scale = 1 / window.devicePixelRatio;
            return _context4.abrupt("return", new fabric.Image(pdfData, {
              scaleX: scale,
              scaleY: scale
            }));
          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _pdfToImage.apply(this, arguments);
}
var canvas = new fabric.Canvas("canvas");
fileUploader.addEventListener("change", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(e) {
    var pdfData, pdfImage;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            canvas.requestRenderAll();
            _context2.next = 3;
            return printPDF(e.target.files[0]);
          case 3:
            pdfData = _context2.sent;
            _context2.next = 6;
            return pdfToImage(pdfData);
          case 6:
            pdfImage = _context2.sent;
            canvas.setWidth(pdfImage.width / window.devicePixelRatio);
            canvas.setHeight(pdfImage.height / window.devicePixelRatio);
            canvas.setBackgroundImage(pdfImage, canvas.renderAll.bind(canvas));
          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function (_x3) {
    return _ref2.apply(this, arguments);
  };
}());
var sign = document.querySelector(".sign-img");
if (localStorage.getItem("img")) {
  sign.src = localStorage.getItem("img");
}
sign.addEventListener("click", function (e) {
  if (!sign.src) {
    return;
  }
  fabric.Image.fromURL(sign.src, function (img) {
    img.top = 0;
    img.scaleX = 0.5;
    img.scaleY = 0.5;
    canvas.add(img);
  });
  nextStepBtn[1].classList.remove("disabled", "btn-disabled");
  nextStepBtn[1].classList.add("btn-secondary");
});

// 下載PDF
var pdf = new jsPDF();
var download = document.querySelector('.download');
nextStepBtn[2].addEventListener('click', function (e) {
  var image = canvas.toDataURL("image/png");
  var width = pdf.internal.pageSize.width;
  var height = pdf.internal.pageSize.height;
  pdf.addImage(image, "png", 0, 0, width, height);
  pdf.save("download.pdf");
});
//# sourceMappingURL=all.js.map
