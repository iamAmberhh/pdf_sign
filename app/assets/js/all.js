const footer = document.querySelector(".footer");
if (window.location.pathname == "/index.html") {
  footer.classList.add("d-none");
}

// 下bar 時間軸
const timeline = document.querySelectorAll(".timeline li");
let pages = 0;
if (window.location.pathname == "/signup.html") {
  pages = 1;
  timelineCheck();
}
if (window.location.pathname == "/download.html") {
  pages = 2;
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
  handleFiles(files,fileObj);
}


function handleFiles(files,fileObj) {
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

    let fileReader = new FileReader();

    fileReader.readAsArrayBuffer(fileObj);

    fileReader.addEventListener("load", function () {
      const result = fileReader.result;
      // console.log(result)
      const typedarray = new Uint8Array(fileReader.result);
      // console.log(typedarray)
      localStorage.setItem("pdf", `${result}`);
      localStorage.setItem("test", `${typedarray}`);
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

    // Swal.fire({
    //   title: "success!",
    //   text: "上傳成功",
    //   icon: "success",
    //   confirmButtonText: "繼續上傳",
    // });
    renderUpload();
  }
}
// const fileUploader = document.querySelector(".select");
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

const fileTable = document.querySelector(".has-file");
const fileTableBody = document.querySelector(".table-body");
function renderUpload() {
  let str = "";
  data.forEach((i) => {
    str += `<tr>
    <th scope="row"><a href="#">${i.name}</a></th>
    <td><a href="#">${i.year}/${i.month}/${i.date}</a></td>
    <td class="d-none d-md-block"><a href="#">--</a></td>
</tr>`;
  });
  fileTableBody.innerHTML = str;
}

const nextStepBtn = document.querySelector("[data-next]");
if (fileTableBody) {
  fileTableBody.addEventListener("click", function (e) {
    e.target.closest("tr").classList.add("bg-light");
    nextStepBtn.classList.remove("disabled", "btn-disabled");
    nextStepBtn.classList.add("btn-secondary");
    nextStepBtn.setAttribute("href", "signup.html");
  });
}

const noUpload = document.querySelector(".no-file");
if (noUpload) {
  if (data.length == 0) {
    noUpload.classList.remove("d-none");
    fileTable.classList.add("d-none");
  }
}





// PDF渲染成畫布

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

const Base64Prefix = "data:application/pdf;base64,";
const add = document.querySelector(".add");
pdfjsLib.GlobalWorkerOptions.workerSrc = "https://mozilla.github.io/pdf.js/build/pdf.worker.js";

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
  const viewport = pdfPage.getViewport({ scale: window.devicePixelRatio });
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  // 設定 PDF 所要顯示的寬高及渲染
  canvas.height = viewport.height;
  canvas.width = viewport.width;
  const renderContext = {
    canvasContext: context,
    viewport,
  };
  const renderTask = pdfPage.render(renderContext);

  // 回傳做好的 PDF canvas
  return renderTask.promise.then(() => canvas);
}

async function pdfToImage(pdfData) {

  // 設定 PDF 轉為圖片時的比例
  const scale = 1 / window.devicePixelRatio;

  // 回傳圖片
  return new fabric.Image(pdfData, {
    id: "renderPDF",
    scaleX: scale,
    scaleY: scale,
  });
}

// 此處 canvas 套用 fabric.js
const canvas = new fabric.Canvas("canvas");

document.querySelector(".select").addEventListener("change", async function(e){
  canvas.requestRenderAll();
  const pdfData = await printPDF(e.target.files[0]).promise;
  const pdfImage = await pdfToImage(pdfData).promise;

  // 透過比例設定 canvas 尺寸
  canvas.setWidth(pdfImage.width / window.devicePixelRatio);
  canvas.setHeight(pdfImage.height / window.devicePixelRatio);

  // 將 PDF 畫面設定為背景
  canvas.setBackgroundImage(pdfImage, canvas.renderAll.bind(canvas));
});
