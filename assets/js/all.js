"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var footer = document.querySelector(".footer");

if (window.location.pathname == "/index.html") {
  footer.classList.add("d-none");
} // 下bar 時間軸


var timeline = document.querySelectorAll(".timeline li");
var pages = 0;

if (window.location.pathname == "/signup.html") {
  pages = 1;
  timelineCheck();
}

if (window.location.pathname == "/download.html") {
  pages = 2;
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
    // Swal.fire("您的檔案類型不是PDF檔!");
    return;
  }

  if (files[0].size > 10485760) {
    // Swal.fire({
    //   title: "error!",
    //   text: "您的檔案太大了!",
    //   icon: "error",
    //   confirmButtonText: "重新上傳",
    // });
    return;
  }

  if (files.length > 0) {
    var fileReader = new FileReader();
    fileReader.readAsArrayBuffer(fileObj);
    fileReader.addEventListener("load", function () {
      var result = fileReader.result; // console.log(result)

      var typedarray = new Uint8Array(fileReader.result); // console.log(typedarray)

      localStorage.setItem("pdf", "".concat(result));
      localStorage.setItem("test", "".concat(typedarray));
    });
    var obj = {};
    obj.name = files[0].name;
    obj.year = files[0].lastModifiedDate.getFullYear();
    obj.month = files[0].lastModifiedDate.getMonth() + 1;
    obj.date = files[0].lastModifiedDate.getDate();
    data.push(obj);
    noUpload.classList.add("d-none");
    fileTable.classList.remove("d-none"); // fileReader.readAsText(files[0]); // 讀取上傳的檔案
    // Swal.fire({
    //   title: "success!",
    //   text: "上傳成功",
    //   icon: "success",
    //   confirmButtonText: "繼續上傳",
    // });

    renderUpload();
  }
} // const fileUploader = document.querySelector(".select");
// let result2;
// fileUploader.addEventListener("change", (e) => {
//     // 副檔名檢查
//     if (fileUploader.files[0].name.split(".")[1] != "pdf") {
//         return;
//     }
//     if (fileUploader.files.length > 0) {
//         let reader = new FileReader();
//         reader.addEventListener("load", function () {
//             // result2 為讀檔的結果
//             result2 = reader.result;
//             console.log(result2);
//             // 資料處理
//         });
//         reader.readAsText(fileUploader.files[0]);
//     }
// });


var fileTable = document.querySelector(".has-file");
var fileTableBody = document.querySelector(".table-body");

function renderUpload() {
  var str = "";
  data.forEach(function (i) {
    str += "<tr>\n    <th scope=\"row\"><a href=\"#\">".concat(i.name, "</a></th>\n    <td><a href=\"#\">").concat(i.year, "/").concat(i.month, "/").concat(i.date, "</a></td>\n    <td class=\"d-none d-md-block\"><a href=\"#\">--</a></td>\n</tr>");
  });
  fileTableBody.innerHTML = str;
}

var nextStepBtn = document.querySelector("[data-next]");

if (fileTableBody) {
  fileTableBody.addEventListener("click", function (e) {
    e.target.closest("tr").classList.add("bg-light");
    nextStepBtn.classList.remove("disabled", "btn-disabled");
    nextStepBtn.classList.add("btn-secondary");
    nextStepBtn.setAttribute("href", "signup.html");
  });
}

var noUpload = document.querySelector(".no-file");

if (noUpload) {
  if (data.length == 0) {
    noUpload.classList.remove("d-none");
    fileTable.classList.add("d-none");
  }
} // PDF渲染成畫布
// const selectFile = document.querySelector(".select");
// pdfjsLib.GlobalWorkerOptions.workerSrc = "https://mozilla.github.io/pdf.js/build/pdf.worker.js";
// const canvas = document.querySelector("#canvas");
// const ctx = canvas.getContext("2d");
// function renderPDF(data) {
//   //  非同步 取得PDF檔案 進到then
//   pdfjsLib.getDocument(data).promise.then((doc) => {
//     //  選擇檔案的第一頁，成功再進到then
//     doc.getPage(1).then((page) => {
//       //  取得檔案的大小，並設為視口大小
//       const viewport = page.getViewport({ scale: 1 });
//       //   讓畫布和視口(檔案)大小一樣
//       canvas.width = viewport.width;
//       canvas.height = viewport.height;
//       //   渲染頁面
//       page.render({
//         canvasContext: ctx,
//         viewport: viewport
//       });
//     });
//   });
// }
// if(selectFile){
//   selectFile.addEventListener("change", (e) => {
//     if (e.target.files[0] === undefined) return;
//     const file = e.target.files[0];
//     const fileReader = new FileReader();
//     fileReader.readAsArrayBuffer(file);
//     fileReader.addEventListener("load", () => {
//       // 獲取readAsArrayBuffer產生的結果，並用來渲染PDF
//       const typedarray = new Uint8Array(fileReader.result);
//       renderPDF(typedarray);
//     });
//   });
// }


var Base64Prefix = "data:application/pdf;base64,";
var add = document.querySelector(".add");
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
            renderTask = pdfPage.render(renderContext); // 回傳做好的 PDF canvas

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
            // 設定 PDF 轉為圖片時的比例
            scale = 1 / window.devicePixelRatio; // 回傳圖片

            return _context3.abrupt("return", new fabric.Image(pdfData, {
              id: "renderPDF",
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
document.querySelector(".select").addEventListener("change", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
    var pdfData, pdfImage;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            canvas.requestRenderAll();
            _context.next = 3;
            return printPDF(e.target.files[0]).promise;

          case 3:
            pdfData = _context.sent;
            _context.next = 6;
            return pdfToImage(pdfData).promise;

          case 6:
            pdfImage = _context.sent;
            // 透過比例設定 canvas 尺寸
            canvas.setWidth(pdfImage.width / window.devicePixelRatio);
            canvas.setHeight(pdfImage.height / window.devicePixelRatio); // 將 PDF 畫面設定為背景

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
