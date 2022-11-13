const footer = document.querySelector(".footer");
if (window.location.pathname == "/pdf_sign/" || window.location.pathname == '/pdf_sign/index.html') {
  footer.classList.add("d-none");
}

// 下bar 時間軸
const timeline = document.querySelectorAll(".timeline li");
let pages = 0;
if (window.location.pathname == '/pdf_sign/upload.html') {
  timelineCheck();
}

function timelineCheck() {
  timeline.forEach((item, index) => {
    let p = item.firstChild.nextSibling;
    let span = item.lastElementChild;
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
const tag = document.querySelector(".tag-bar");
if (tag) {
  tag.addEventListener("click", function (e) {
    let currentTag = e.target.closest("li");
    let tags = document.querySelectorAll(".tags");
    let tagsBlock = document.querySelectorAll(".tags-block");
    tags.forEach((i) => {
      i.classList.remove("tags-active");
    });
    currentTag.classList.add("tags-active");
    tagsBlock.forEach((i) => {
      i.classList.add("d-none");
      if (`#${i.getAttribute("id")}` === currentTag.dataset.target) {
        i.classList.remove("d-none");
      }
    });
  });
}

// 拖曳檔案上傳
let data = [];
let dropbox = document.querySelector(".outline");
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
  let dt = e.dataTransfer;
  let files = dt.files;
  let fileObj = files[0];
  // console.log(files)
  // console.log(files[0])
  handleFiles(files, fileObj);
}

function handleFiles(files, fileObj) {
  if (files[0].name.split(".")[1] != "pdf") {
    let notFileAlert = new bootstrap.Modal(
      document.querySelector("#notFileAlert")
    );
    notFileAlert.show();
    return;
  }
  if (files[0].size > 10485760) {
    let fileSizeOver = new bootstrap.Modal(
      document.querySelector("#fileSizeOver")
    );
    fileSizeOver.show();
    return;
  }
  
  if (files.length > 0) {
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(fileObj);

    fileReader.addEventListener("load", function () {
      const result = fileReader.result;
      // console.log(result)
      const typedarray = new Uint8Array(fileReader.result);
      // console.log(typedarray)
    });
    
    let obj = {};
    obj.name = files[0].name;
    obj.year = files[0].lastModifiedDate.getFullYear();
    obj.month = files[0].lastModifiedDate.getMonth() + 1;
    obj.date = files[0].lastModifiedDate.getDate();
    data.push(obj);

    noUpload.classList.add("d-none");
    fileTable.classList.remove("d-none");

    // fileReader.readAsText(files[0]); // 讀取上傳的檔案

    renderUpload();
    uploadSuccess.show();
  }
}

// 點擊上傳
let uploadSuccess = new bootstrap.Modal(
  document.querySelector("#uploadSuccess")
);
const fileUploader = document.querySelector(".select");

if (fileUploader) {
  fileUploader.addEventListener("change", (e) => {
    // 副檔名檢查
    if (fileUploader.files[0].name.split(".")[1] != "pdf") {
      let notFileAlert = new bootstrap.Modal(
        document.querySelector("#notFileAlert")
      );
      notFileAlert.show();
      return;
    }
    if (fileUploader.files[0].size > 10485760) {
      let fileSizeOver = new bootstrap.Modal(
        document.querySelector("#fileSizeOver")
      );
      fileSizeOver.show();
      return;
    }


    if (fileUploader.files.length > 0) {
      let reader = new FileReader();
      reader.addEventListener("load", function () {
        let result2 = reader.result;
        const typedarray = new Uint8Array(reader.result);
      });

      let obj = {};
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

const fileTable = document.querySelector(".has-file");
const fileTableBody = document.querySelector(".table-body");
function renderUpload() {
  let str = "";

  data.forEach((i) => {
    str += `<tr data-upload>
    <th scope="row"><a href="#" class="ellipsis">${i.name}</a></th>
    <td><a href="#">${i.year}/${i.month}/${i.date}</a></td>
    <td class="d-none d-md-block"><a href="#">--</a></td>
</tr>`;
  });
  fileTableBody.innerHTML = str;
}

const nextStepBtn = document.querySelector("[data-next]");
const fileName = document.querySelector(".file-name");

const uploadBlock = document.querySelector("#upload");
const signBlock = document.querySelector("#sign");

if (fileTableBody) {
  fileTableBody.addEventListener("click", function (e) {
    let allFiles = document.querySelectorAll("[data-upload]");
    allFiles.forEach((i) => {
      i.classList.remove("bg-light");
    });
    e.target.closest("tr").classList.add("bg-light");
    console.log(e.target.closest('tr').firstChild.nextSibling.firstChild.textContent
    );
    let file = e.target.closest('tr').firstChild.nextSibling.firstChild.textContent;
    nextStepBtn.classList.remove("disabled", "btn-disabled");
    nextStepBtn.classList.add("btn-secondary");
  fileName.textContent = file;
  });
  
}
if (nextStepBtn) {
  nextStepBtn.addEventListener("click", function () {
    uploadBlock.classList.add("d-none");
    signBlock.classList.remove("d-none");
    nextStepBtn.textContent = `創建文件`;
    nextStepBtn.classList.add("disabled", "btn-disabled");
    nextStepBtn.classList.remove("btn-secondary");
    pages++
    timelineCheck()
  });
}

const noUpload = document.querySelector(".no-file");
if (noUpload) {
  if (data.length == 0) {
    noUpload.classList.remove("d-none");
    fileTable.classList.add("d-none");
  }
}


// 簽名
const signCanvas = document.querySelector("#sign-canvas");
if (signCanvas) {
  const signCtx = signCanvas.getContext("2d");
  const signImg = document.querySelector(".sign-img");
  const saveBtn = document.querySelector(".saveBtn");
  const backBtn = document.querySelector(".backBtn");
  const clearBtn = document.querySelector(".clearBtn");

  // 設定線條相關數值
  signCtx.lineWidth = 4;
  signCtx.lineCap = "round";

  let isPainting = false;

  // 取得滑鼠or手指在畫布上的位置
  function getPointPosition(e) {
    const canvaSize = signCanvas.getBoundingClientRect();
    if (e.type == "mousemove") {
      return {
        x: e.clientX - canvaSize.left,
        y: e.clientY - canvaSize.top,
      };
    } else {
      return {
        x: e.touches[0].clientX - canvaSize.left,
        y: e.touches[0].clientY - canvaSize.top,
      };
    }
  }

  // 開始繪圖時，將狀態開啟
  function startPosition(e) {
    e.preventDefault();
    isPainting = true;
  }

  // 紀錄繪圖歷史
  let step = -1;
  let historyStep = [];
  let push = function () {
    step++;
    if (step <= historyStep.length - 1) {
      historyStep.length = step;
    }
    historyStep.push(signCanvas.toDataURL());
  };

  // 繪圖結束，將狀態關閉，並產生新路徑
  function finishedPosition() {
    isPainting = false;
    signCtx.beginPath();
    push();
  }

  // 繪製過程
  function draw(e) {
    if (!isPainting) return;
    const paintPosition = getPointPosition(e);
    signCtx.lineTo(paintPosition.x, paintPosition.y);
    signCtx.stroke();
  }

  function save() {
    signImg.parentElement.classList.remove("d-none");
    const newImg = signCanvas.toDataURL("image/png");
    signImg.src = newImg;
    localStorage.setItem("img", newImg);
  }

  function back() {
    let lastDraw = new Image();
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
  }

  function reset(e) {
    signCtx.clearRect(0, 0, signCanvas.width, signCanvas.height);
    historyStep = [];
    step = -1;
  }

  // 電腦版
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

const Base64Prefix = "data:application/pdf;base64,";
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://mozilla.github.io/pdf.js/build/pdf.worker.js";

// 使用原生 FileReader 轉檔
function readBlob(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", reject);
    reader.readAsDataURL(blob);
  });
}

async function printPDF(pdfData) {
  // 將檔案處理成 base64
  pdfData = await readBlob(pdfData);

  // 將 base64 中的前綴刪去，並進行解碼
  const data = atob(pdfData.substring(Base64Prefix.length));

  // 利用解碼的檔案，載入 PDF 檔及第一頁
  const pdfDoc = await pdfjsLib.getDocument({ data }).promise;
  const pdfPage = await pdfDoc.getPage(1);

  // 設定尺寸及產生 canvas
  const viewport = pdfPage.getViewport({
  scale: window.devicePixelRatio
  });
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  // 設定 PDF 所要顯示的寬高及渲染
  canvas.height = viewport.height;
  canvas.width = viewport.width;
  const renderContext = {
    canvasContext: context,
    viewport
  };
  const renderTask = pdfPage.render(renderContext);
  return renderTask.promise.then(() => canvas);
}

async function pdfToImage(pdfData) {
  const scale = 1 / window.devicePixelRatio;
  return new fabric.Image(pdfData, {
    scaleX: scale,
    scaleY: scale,
  });
}

// 此處 canvas 套用 fabric.js
const canvas = new fabric.Canvas("canvas");

document.querySelector(".testBtn").addEventListener("change", async (e) => {
  canvas.requestRenderAll();
  const pdfData = await printPDF(e.target.files[0]);
  const pdfImage = await pdfToImage(pdfData);

  canvas.setWidth(pdfImage.width / window.devicePixelRatio);
  canvas.setHeight(pdfImage.height / window.devicePixelRatio);
  canvas.setBackgroundImage(pdfImage, canvas.renderAll.bind(canvas));
});