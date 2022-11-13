"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var footer = document.querySelector(".footer");

if (window.location.pathname == "/pdf_sign/" || window.location.pathname == '/pdf_sign/index.html') {
  footer.classList.add("d-none");
} // 下bar 時間軸


var timeline = document.querySelectorAll(".timeline li");
var pages = 0;

if (window.location.pathname == '/pdf_sign/upload.html') {
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
} // 上傳文件切換


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
} // 拖曳檔案上傳


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
  var fileObj = files[0]; // console.log(files)
  // console.log(files[0])

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
    fileReader.addEventListener("load", function () {
      var result = fileReader.result; // console.log(result)

      var typedarray = new Uint8Array(fileReader.result); // console.log(typedarray)
    });
    var obj = {};
    obj.name = files[0].name;
    obj.year = files[0].lastModifiedDate.getFullYear();
    obj.month = files[0].lastModifiedDate.getMonth() + 1;
    obj.date = files[0].lastModifiedDate.getDate();
    data.push(obj);
    noUpload.classList.add("d-none");
    fileTable.classList.remove("d-none"); // fileReader.readAsText(files[0]); // 讀取上傳的檔案

    renderUpload();
    uploadSuccess.show();
  }
} // 點擊上傳


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
      var obj = {};
      obj.name = fileUploader.files[0].name;
      obj.year = fileUploader.files[0].lastModifiedDate.getFullYear();
      obj.month = fileUploader.files[0].lastModifiedDate.getMonth() + 1;
      obj.date = fileUploader.files[0].lastModifiedDate.getDate();
      data.push(obj);
      reader.readAsText(fileUploader.files[0]);
    }

    noUpload.classList.add("d-none");
    fileTable.classList.remove("d-none");
    renderUpload();
    uploadSuccess.show();
  });
}

var fileTable = document.querySelector(".has-file");
var fileTableBody = document.querySelector(".table-body");

function renderUpload() {
  var str = "";
  data.forEach(function (i) {
    str += "<tr data-upload>\n    <th scope=\"row\"><a href=\"#\" class=\"ellipsis\">".concat(i.name, "</a></th>\n    <td><a href=\"#\">").concat(i.year, "/").concat(i.month, "/").concat(i.date, "</a></td>\n    <td class=\"d-none d-md-block\"><a href=\"#\">--</a></td>\n</tr>");
  });
  fileTableBody.innerHTML = str;
}

var nextStepBtn = document.querySelector("[data-next]");
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
    console.log(e.target.closest('tr').firstChild.nextSibling.firstChild.textContent);
    var file = e.target.closest('tr').firstChild.nextSibling.firstChild.textContent;
    nextStepBtn.classList.remove("disabled", "btn-disabled");
    nextStepBtn.classList.add("btn-secondary");
    fileName.textContent = file;
  });
}

if (nextStepBtn) {
  nextStepBtn.addEventListener("click", function () {
    uploadBlock.classList.add("d-none");
    signBlock.classList.remove("d-none");
    nextStepBtn.textContent = "\u5275\u5EFA\u6587\u4EF6";
    nextStepBtn.classList.add("disabled", "btn-disabled");
    nextStepBtn.classList.remove("btn-secondary");
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
} // 簽名


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
    var lastDraw = new Image(); // 確定有上一步我們才回到上一步

    if (step > 0) {
      step--;
    } else if (step == 0) {
      reset();
    } // 把上一部的base64設定給圖像物件


    lastDraw.src = historyStep[step]; // 把圖片載入後用畫布選染出來

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
  var clearBtn = document.querySelector(".clearBtn"); // 設定線條相關數值

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
  signCanvas.addEventListener("mouseup", finishedPosition); // signCanvas.addEventListener("mouseleave", finishedPosition);

  signCanvas.addEventListener("mousemove", draw); // 手機版

  signCanvas.addEventListener("touchstart", startPosition);
  signCanvas.addEventListener("touchend", finishedPosition);
  signCanvas.addEventListener("touchcancel", finishedPosition);
  signCanvas.addEventListener("touchmove", draw);
  clearBtn.addEventListener("click", reset);
  backBtn.addEventListener("click", back);
  saveBtn.addEventListener("click", save);
} // PDF渲染成畫布


var Base64Prefix = "data:application/pdf;base64,";
pdfjsLib.GlobalWorkerOptions.workerSrc = "https://mozilla.github.io/pdf.js/build/pdf.worker.js"; // 使用原生 FileReader 轉檔

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
  _printPDF = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(pdfData) {
    var data, pdfDoc, pdfPage, viewport, canvas, context, renderContext, renderTask;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return readBlob(pdfData);

          case 2:
            pdfData = _context2.sent;
            // 將 base64 中的前綴刪去，並進行解碼
            data = atob(pdfData.substring(Base64Prefix.length)); // 利用解碼的檔案，載入 PDF 檔及第一頁

            _context2.next = 6;
            return pdfjsLib.getDocument({
              data: data
            }).promise;

          case 6:
            pdfDoc = _context2.sent;
            _context2.next = 9;
            return pdfDoc.getPage(1);

          case 9:
            pdfPage = _context2.sent;
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
            return _context2.abrupt("return", renderTask.promise.then(function () {
              return canvas;
            }));

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _printPDF.apply(this, arguments);
}

function pdfToImage(_x2) {
  return _pdfToImage.apply(this, arguments);
} // 此處 canvas 套用 fabric.js


function _pdfToImage() {
  _pdfToImage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(pdfData) {
    var scale;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            scale = 1 / window.devicePixelRatio;
            return _context3.abrupt("return", new fabric.Image(pdfData, {
              scaleX: scale,
              scaleY: scale
            }));

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _pdfToImage.apply(this, arguments);
}

var canvas = new fabric.Canvas("canvas");
document.querySelector(".testBtn").addEventListener("change", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
    var pdfData, pdfImage;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            canvas.requestRenderAll();
            _context.next = 3;
            return printPDF(e.target.files[0]);

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
  }));

  return function (_x3) {
    return _ref.apply(this, arguments);
  };
}());
//# sourceMappingURL=all.js.map
