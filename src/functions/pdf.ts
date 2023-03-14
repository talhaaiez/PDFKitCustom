import * as doc from "./pdf_abstractions";

const DEFUALT_IMAGE_PATH = "src/images/";

const IMAGES = [
  DEFUALT_IMAGE_PATH + "1302425.jpg",
  DEFUALT_IMAGE_PATH + "1305182.jpg",
  DEFUALT_IMAGE_PATH + "1305184.jpg",
  DEFUALT_IMAGE_PATH + "1305185.jpg",
];

let refText = "Notice Ref: B-432";

export default function createPDF() {
  doc.startDocument();
  PageOne();
  PageTwo();
  PageThree();
  PageFour();
  doc.endDocument();
}

function PageOne() {
  doc.headerText(refText, {
    align: "right",
    size: 10,
  });
  doc.moveDown(2);

  doc.enableSameLine();
  doc.image(DEFUALT_IMAGE_PATH + "x-mark.png", {
    height: 10,
    width: 10,
    move: {
      down: 4.3,
    },
  });

  doc.text(refText, {
    align: "center",
    size: 10,
    move: {
      down: 6,
      left: 10,
    },
  });

  doc.image(DEFUALT_IMAGE_PATH + "logo.png", {
    align: "right",
    height: 70,
    width: 200,
  });
  doc.disableSameLine();
  doc.moveDown(8);

  doc.text("SITE CLEANLINESS / HEALTH & SAFETY NOTICE", {
    align: "center",
    size: 14,
    bold: true,
    width: 350,
    move: {
      right: 4,
    },
  });
  doc.moveDown(1);

  doc.text(
    "The following Non Conformance of the Site Cleanliness / Health and Safety requirements have been noted. Please rectify this Non Conformance by the required deadline. Failure to comply with the requirements of this notice by the stated deadline will result in works being carried out on your behalf with the costs incurred being set off against your account. No further notices will be issued.",
    {
      width: "full",
    }
  );
  doc.moveDown(4);

  doc.text("DETAILS OF NON CONFORMANCE", {
    size: 12,
    bold: true,
    width: 200,
  });
  doc.moveDown(3);

  doc.enableSameLine();
  doc.text("Issued to: ", {
    bold: true,
    width: 200,
  });
  doc.text("28/06/2021", {
    width: 200,
    move: {
      right: 12,
    },
  });
  doc.disableSameLine();
  doc.moveDown(0.7);

  doc.enableSameLine();
  doc.text("Date of Issue: ", {
    bold: true,
    width: 200,
  });
  doc.text("28/06/2021", {
    width: 200,
    move: {
      right: 16,
    },
  });

  doc.text("Time of Issue: ", {
    align: "right",
    bold: true,
    width: 200,
  });
  doc.text("14:07:24", {
    align: "right",
    width: 200,
    move: {
      right: 16,
    },
  });
  doc.disableSameLine();
  doc.moveDown(0.7);

  doc.enableSameLine();
  doc.text("Location:", {
    bold: true,
    width: 200,
  });
  doc.text("Block 1 Core B plot 62", {
    width: 200,
    move: {
      right: 12,
    },
  });
  doc.disableSameLine();
  doc.moveDown(0.7);

  doc.enableSameLine();
  doc.text("Level:", {
    bold: true,
    width: 200,
  });
  doc.text("4", {
    width: 200,
    move: {
      right: 8,
    },
  });
  doc.disableSameLine();
  doc.moveDown(4);

  doc.text("Details of Non Conformance", {
    bold: true,
    width: 200,
  });
  doc.moveDown(0.7);

  doc.text("Cleared out by O&B at your own cost", {
    width: 200,
  });
  doc.moveDown(0.7);

  doc.text("Photo", {
    bold: true,
    width: 200,
  });

  doc.consecutiveImages(IMAGES, {
    limit: 2,
  });
  doc.moveDown(4);

  doc.text("Compliance with this Notice is Required By", {
    bold: true,
    width: 250,
  });
  doc.moveDown(0.7);

  doc.text("Clear Within 4 Hours", {
    width: 200,
  });
  doc.moveDown(4);

  doc.text("Signed By Waste Manager:", {
    bold: true,
    width: 200,
  });
  doc.image(IMAGES[0]);
  doc.moveDown(4);


  doc.text("Signed As Received By Trade Contractor:", {
    bold: true,
    width: 250,
  });
}

function PageTwo() {
  doc.addPage();
  doc.headerText(refText, {
    align: "right",
    size: 10,
  });
  doc.moveDown(2);
  doc.text("Additional Photos", {
    bold: true,
    width: 200,
  });

  doc.consecutiveImages(IMAGES);
}

function PageThree() {
  doc.addPage();
  doc.headerText(refText, {
    align: "right",
    size: 10,
  });
  doc.moveDown(2);

  doc.text("FAILURE TO COMPLY WITH SITE CLEANLINESS / HEALTH & SAFETY NOTICE", {
    align: "center",
    size: 13,
    bold: true,
    width: 'full',
    move: {
      right: 4,
    },
  });
  doc.moveDown(0.5);

  doc.text(
    "The requirements of the above Notice have NOT been complied with. Resources have been employed to rectify this non-conformance on your behalf. Costs will be forwarded in due course.",
    {
      width: "full",
    }
  );
  doc.moveDown(5);

  doc.text("DETAILS OF NON CONFORMANCE", {
    bold: true,
    width: 300,
  });
  doc.moveDown(4);

  doc.enableSameLine();
  doc.text("Issued to: ", {
    bold: true,
    width: 200,
  });
  doc.text("28/06/2021", {
    width: 200,
    move: {
      right: 12,
    },
  });
  doc.disableSameLine();
  doc.moveDown(4);

  doc.enableSameLine();
  doc.text("Closeout Date:", {
    bold: true,
    width: 300,
  });
  doc.text("28/06/2021", {
    width: 200,
    move: {
      right: 18,
    },
  });
  
  doc.text("Closeout Time:", {
    align: "right",
    bold: true,
    width: 200,
  });
  doc.text("14:07:24", {
    align: "right",
    width: 200,
    move: {
      right: 18,
    },
  });
  doc.disableSameLine();
  doc.moveDown(4);

  doc.enableSameLine();
  doc.text("Location:", {
    bold: true,
    width: 200,
  });
  doc.text("Block 1 Core B plot 62", {
    width: 200,
    move: {
      right: 12,
    },
  });
  doc.disableSameLine();
  doc.moveDown(4);

  doc.enableSameLine();
  doc.text("Level:", {
    bold: true,
    width: 200,
  });
  doc.text("4", {
    width: 200,
    move: {
      right: 8,
    },
  });
  doc.disableSameLine();
  doc.moveDown(4);


  doc.text("Closeout Comments", {
    bold: true,
    width: 300,
  });
  doc.text("Comments", {
    width: 'full',
  });
  doc.moveDown(2);

  doc.text("Closeout Photo", {
    bold: true,
    width: 200,
  });
  doc.consecutiveImages(IMAGES, {
    limit: 2,
  });
  doc.moveDown(5);


  doc.text("Signed By Waste Manager:", {
    bold: true,
    width: 200,
  });
  doc.image(IMAGES[0]);
  doc.moveDown(5);
  doc.line();
}

function PageFour() {
  doc.addPage();
  doc.headerText(refText, {
    align: "right",
    size: 10,
  });
  doc.moveDown(2);

  doc.text("DETAILS OF NON CONFORMANCE", {
    bold: true,
    width: 300,
  });
  doc.moveDown(0.5);
  doc.text("The requirements of the above Notice have NOT been complied with. Resources have been employed to rectify this non-conformance on your behalf. Costs will be forwarded in due course.", {
    width: 'full',
  });
  doc.moveDown(4);

  doc.text("Actioned Photos", {
    bold: true,
    width: 200,
  });
  doc.moveDown(0.5);
  doc.consecutiveImages(IMAGES, {
    limit: 2,
  });
  doc.moveDown(4);

  doc.text("Comments", {
    bold: true,
    width: 300,
  });
  doc.moveDown(0.5);
  doc.text("Non Conformance has not been rectified satisfactorily. The following resources have been employed to carry out the works on your behalf. Costs will be forwarded in due course", {
    width: 'full',
  });
  doc.moveDown(4);

  doc.text("Non Compliance with Notice:", {
    width: 'full',
  });
  doc.moveDown(4);

  doc.text("Total Cost of Trades: 0£", {
    align: 'right',
    bold: true,
    width: 140,
  });
  doc.moveDown(1);

  doc.text("Total Cost of Container Types: 0£", {
    align: 'right',
    bold: true,
    width: 190,
  });
}