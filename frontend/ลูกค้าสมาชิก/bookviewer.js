const url = '123.pdf';


let pdfDoc = null,
  pageNum = 1,
  pageIsRendering = false,
  pageNumIsPending = null;

const scale = 1.5,
  canvas = document.querySelector("#pdf-render"),
  ctx = canvas.getContext("2d");

// Render the page
const renderPage = (num) => {
  pageIsRendering = true;

  // Get page
  pdfDoc.getPage(num).then((page) => {
    // Set scale
    const viewport = page.getViewport({ scale });
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderCtx = {
      canvasContext: ctx,
      viewport,
    };

    page.render(renderCtx).promise.then(() => {
      pageIsRendering = false;

      if (pageNumIsPending !== null) {
        renderPage(pageNumIsPending);
        pageNumIsPending = null;
      }
    });

    // Output current page and update placeholder
    const pageInput = document.querySelector("#go-to-page");
    pageInput.placeholder = ` ${num} `;
    document.querySelector("#page-num").textContent = num;
  });
};

// Check for pages rendering
const queueRenderPage = (num) => {
  if (pageIsRendering) {
    pageNumIsPending = num;
  } else {
    renderPage(num);
  }
};

// Show Prev Page
const showPrevPage = () => {
  if (pageNum <= 1) {
    return;
  }
  pageNum--;
  queueRenderPage(pageNum);
};

// Show Next Page
const showNextPage = () => {
  if (pageNum >= pdfDoc.numPages) {
    return;
  }
  pageNum++;
  queueRenderPage(pageNum);
};

// Get Document

pdfjsLib
  .getDocument(url)
  .promise.then((pdfDoc_) => {
    pdfDoc = pdfDoc_;

    document.querySelector("#page-count").textContent = pdfDoc.numPages;

    renderPage(pageNum);
  })

  
  .catch((err) => {
    // Display error
    const div = document.createElement("div");
    div.className = "error";
    div.appendChild(document.createTextNode(err.message));
    document.querySelector("body").insertBefore(div, canvas);
    // Remove top bar
    document.querySelector(".top-bar").style.display = "none";
  });

// Button Events
document.querySelector("#prev-page").addEventListener("click", showPrevPage);
document.querySelector("#next-page").addEventListener("click", showNextPage);

// Handle Enter key press in the input field
document.querySelector("#go-to-page").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    goToPage();
  }
});

// Go to Page
const goToPage = () => {
  const input = document.querySelector("#go-to-page");
  const pageNumber = parseInt(input.value, 10);
  if (pageNumber >= 1 && pageNumber <= pdfDoc.numPages) {
    queueRenderPage(pageNumber);
    pageNum = pageNumber;
    input.value = "";
  }
};

// Disable context menu (right-click menu)
window.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

// Disable printing using Ctrl+P and browser's print button
window.addEventListener("keydown", function (e) {
  if (e.ctrlKey && e.key === "p") {
    e.preventDefault();
  }
});

window.addEventListener("beforeprint", function (e) {
  e.preventDefault();
});
