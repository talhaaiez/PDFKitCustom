import { NONAME } from "dns";

const PDFDocument = require("pdfkit");
const fs = require("fs");

const DEFAULT_MARGIN = { top: 32, bottom: 32, left: 38, right: 38 };
const DEFAULT_TEXT = {
  align: "left",
  bold: false,
  size: 11,
  width: 150,
};

const DEFAULT_IMAGE = {
  width: 150,
  height: 112,
  align: "left",
  gap: { x: 5, y: 5 },
  in_a_row: 4,
};

let DOCUMENT: any = null;
let FONT = {
  normal: "Helvetica",
  bold: "Helvetica-Bold",
};
let SAME_LINE = {
  check: false,
  x: 0,
  y: 0,
  align: "none",
  index: 0,
};

function setDefualtFont(normal?: string, bold?: string) {
  FONT.normal = normal ? normal : FONT.normal;
  FONT.bold = bold ? bold : FONT.bold;
}

function enableSameLine(align: string = "none") {
  SAME_LINE = {
    check: true,
    x: DOCUMENT.x,
    y: DOCUMENT.y,
    align: align,
    index: 0,
  };
}

function disableSameLine() {
  SAME_LINE = {
    check: false,
    x: 0,
    y: 0,
    align: "none",
    index: 0,
  };
}

function startDocument(
  output: string = "pdfs/output.pdf",
  size: string = "A4",
  margins: object = DEFAULT_MARGIN
) {
  DOCUMENT = new PDFDocument({
    size: size,
    margins: margins,
  });
  DOCUMENT.pipe(fs.createWriteStream(output));
}

function addPage(margins: object = DEFAULT_MARGIN, size: string = "A4") {
  DOCUMENT.addPage({
    size: size,
    margins: margins,
  });
}

function endDocument() {
  DOCUMENT.end();
}

function moveDown(amount: number) {
  if (SAME_LINE.check) {
    SAME_LINE.y += amount * 5;
  } else {
    DOCUMENT.y += amount * 5;
  }
}

function headerText(value: string, options: any = {}) {
  const size = options.size ? options.size : DEFAULT_TEXT.size;
  const font = options.bold ? FONT.bold : FONT.normal;
  const align = options.align ? options.align : DEFAULT_TEXT.align;

  DOCUMENT.font(font, size).text(value, { align: align });
}

function text(value: string, options: any = {}) {
  const size = options.size ? options.size : DEFAULT_TEXT.size;
  const font = options.bold ? FONT.bold : FONT.normal;
  const align = options.align ? options.align : DEFAULT_TEXT.align;
  let width = options.width ? options.width : DEFAULT_TEXT.width;
  if (width == "full") {
    width =
      DOCUMENT.page.width -
      (DOCUMENT.page.margins.right + DOCUMENT.page.margins.left);
  }
  const move = setMove(options.move);

  let { currX, currY } = modifyCoords(align, width, move);

  DOCUMENT.font(font, size).text(value, currX, currY, {
    align: "justify",
    width: width,
  });
}

function line() {
  DOCUMENT.moveTo(DOCUMENT.x, DOCUMENT.y).lineTo(
    DOCUMENT.page.width - DOCUMENT.page.margins.right,
    DOCUMENT.y
  ).stroke();
}

function image(path: string, options: any = {}) {
  const height = options.height ? options.height : DEFAULT_IMAGE.height;
  const width = options.width ? options.width : DEFAULT_IMAGE.width;
  const align = options.align ? options.align : DEFAULT_IMAGE.align;
  const move = setMove(options.move);

  let { currX, currY } = modifyCoords(align, width, move);

  DOCUMENT.image(path, currX, currY, {
    width: width,
    height: height,
  });
}

function consecutiveImages(paths: Array<string>, options: any = {}) {
  const height = options.height ? options.height : DEFAULT_IMAGE.height;
  const width = options.width ? options.width : DEFAULT_IMAGE.width;
  const in_a_row = options.in_a_row ? options.in_a_row : DEFAULT_IMAGE.in_a_row;
  const limit = options.limit ? options.limit : paths.length;

  let imageY = DOCUMENT.y;
  let colIndex = 1;

  for (let i = 0; i < limit; i++) {
    const image = paths[i];
    let imageX = DOCUMENT.x + (colIndex - 1) * (DEFAULT_IMAGE.gap.x + width);

    // After certain number of images or if next image is larger then the width of the document, advance the marker down the page and reset the index
    if (
      colIndex > in_a_row ||
      imageX >
        DOCUMENT.page.width - DOCUMENT.page.margins.right - DEFAULT_IMAGE.width
    ) {
      colIndex = 1;
      imageY += DEFAULT_IMAGE.gap.y + height;
      imageX = DOCUMENT.x + (colIndex - 1) * (DEFAULT_IMAGE.gap.x + width);
    }
    DOCUMENT.image(image, imageX, imageY, {
      width: width,
      height: height,
    }).stroke();
    colIndex++;
  }
  // Set the text flow marker to be below the last image
  DOCUMENT.y = imageY + DEFAULT_IMAGE.gap.y + height;
}

// PRIVATE FUNCTION
function setMove(move: any = {}) {
  const moveConst = 5;
  move = {
    up: move.up ? move.up : 0,
    down: move.down ? move.down : 0,
    left: move.left ? move.left : 0,
    right: move.right ? move.right : 0,
  };
  // Currently assuming only one is given
  let modifier = { x: 0, y: 0 };
  if (move.down) {
    modifier.y = move.down * moveConst;
  } else if (move.up) {
    modifier.y = -move.up * moveConst;
  }

  if (move.right) {
    modifier.x = move.right * moveConst;
  } else if (move.left) {
    modifier.x = -move.left * moveConst;
  }
  return modifier;
}

// PRIVATE FUNCTION
function modifyCoords(align: string, width: number, move: any) {
  let coords = { currX: DOCUMENT.x, currY: DOCUMENT.y };
  if (SAME_LINE.check) {
    coords = { currX: SAME_LINE.x, currY: SAME_LINE.y };
  }
  coords.currX = calculateX(align, width) + move.x;
  coords.currY = coords.currY + move.y;
  return coords;
}

// PRIVATE FUNCTION
function calculateX(align: string, width: number) {
  switch (align) {
    case "left":
      return DOCUMENT.page.margins.left;
      break;
    case "right":
      return DOCUMENT.page.width - DOCUMENT.page.margins.right - width;
      break;
    case "center":
      return DOCUMENT.page.width / 2 - width / 2;
      break;
  }
}

export {
  startDocument,
  addPage,
  endDocument,
  text,
  headerText,
  setDefualtFont,
  moveDown,
  enableSameLine,
  disableSameLine,
  image,
  consecutiveImages,
  line,
};
