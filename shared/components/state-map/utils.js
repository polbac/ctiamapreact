import { jsPDF } from 'jspdf';
import OpenSansBold from './assets/pdf-fonts/open-sans-bold';
import OpenSans from './assets/pdf-fonts/open-sans';
import FirstPageImage from './assets/images/pdf/first_page_header.png';
import BoxState from './assets/images/pdf/box_state.png';
import BoxJobs from './assets/images/pdf/box_jobs.png';
import Shape1 from './assets/images/pdf/shape-1.png';
import Shape2 from './assets/images/pdf/shape-2.png';
import Logo from './assets/images/pdf/ctia-logo.png';

export const isServer = () => typeof process === 'object';

const PAGE_WIDTH = 1048;
const PAGE_HEIGHT = 1298;
const FORMAT_ORIENTATION = 'portrait';
const MARGIN_VERTICAL = 86
const MARGIN_HORIZONTAL = 92
let firstPage = true;
const CANVAS_WIDTH = PAGE_WIDTH - (MARGIN_HORIZONTAL*2)

function getBase64Image(imageData, type) {
  // Create canvas
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Set width and height
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  // Draw the image
  ctx.drawImage(imageData, 0, 0);
  return canvas.toDataURL(type);
}

function loadFonts(doc) {
  doc.addFileToVFS('SourceSansBold.ttf', OpenSansBold);
  doc.addFont('SourceSansBold.ttf', 'SourceSansBold', 'normal');

  doc.addFileToVFS('SourceSans.ttf', OpenSans);
  doc.addFont('SourceSans.ttf', 'SourceSans', 'normal');
}

function addFirstPage(doc) {
  return new Promise((resolve) => {
    const img = new Image();

    img.setAttribute('crossorigin', 'anonymous');
    img.addEventListener('load', (event) => {
      const dataUrl = getBase64Image(event.currentTarget, 'PNG');
      const imageSize = CANVAS_WIDTH;
      const imageRes = 1738 / 422;

      doc.addImage(dataUrl, 'PNG', (PAGE_WIDTH / 2) - (imageSize / 2), MARGIN_VERTICAL + 50, imageSize, imageSize / imageRes);
      resolve();
    });
    img.src = FirstPageImage;
    
  });
}

function addSecondBlock(doc, data) {
  return new Promise(resolve => {
    const img = new Image();

    img.setAttribute('crossorigin', 'anonymous');
    img.addEventListener('load', (event) => {
      const dataUrl = getBase64Image(event.currentTarget, 'PNG');
      const imageSize = (CANVAS_WIDTH - 20) / 2;
      const imageRes = 828 / 674;

      doc.addImage(dataUrl, 'PNG', MARGIN_HORIZONTAL + 20 + imageSize, MARGIN_VERTICAL + 290, imageSize, imageSize / imageRes);

      doc.setFont('SourceSansBold');
      doc.setTextColor(182,199,0)
      doc.setFontSize(100);
      doc.text(data.job.sum_format, MARGIN_HORIZONTAL + imageSize + 20 + (imageSize / 2), MARGIN_VERTICAL + 290 + 190, {
        align: 'center'
    });
      resolve();
    });
    img.src = BoxJobs;
  })
}

function addFirstBlock(doc, data) {
  return new Promise(resolve => {
    const img = new Image();

    img.setAttribute('crossorigin', 'anonymous');
    img.addEventListener('load', (event) => {
      const dataUrl = getBase64Image(event.currentTarget, 'PNG');
      const imageSize = (CANVAS_WIDTH - 20) / 2;
      const imageRes = 828 / 674;

      doc.addImage(dataUrl, 'PNG', MARGIN_HORIZONTAL, MARGIN_VERTICAL + 290, imageSize, imageSize / imageRes);

      doc.setFont('SourceSansBold');
      doc.setTextColor(67,159,161)
      doc.setFontSize(100);
      doc.text(data.gdp.sum_format, MARGIN_HORIZONTAL + (imageSize / 2), MARGIN_VERTICAL + 290 + 190, {
        align: 'center'
      });
      resolve();
    });
    img.src = BoxState;
  })
}

function addHeader(doc, title, y) {
  doc.setFont('SourceSansBold');
  doc.setTextColor(0,0,0)
  doc.setFontSize(25);
  doc.text(title, MARGIN_HORIZONTAL, y);

  doc.setFontSize(16);
  doc.text('GDP Growth', MARGIN_HORIZONTAL + 611, y);

  doc.setFontSize(16);
  doc.text('New Jobs', MARGIN_HORIZONTAL + 811, y);

  doc.setDrawColor(67,159,161);
  doc.line(MARGIN_HORIZONTAL - 20, y + 17, MARGIN_HORIZONTAL + CANVAS_WIDTH + 20, y + 17)
}

const LINE_HEIGHT = 35

function addField(f, sw, y, doc) {
  if (sw) {
    doc.setDrawColor(0)
    doc.setFillColor(240,240,240)
    doc.rect(MARGIN_HORIZONTAL - 20, y, CANVAS_WIDTH + 40, LINE_HEIGHT, 'F')
  }

  doc.setFont('SourceSansBold');
  doc.setTextColor(0,0,0)
  doc.setFontSize(16);
  doc.text(f.name, MARGIN_HORIZONTAL, y + 20);

  doc.setFont('SourceSans');
  doc.setFontSize(16);
  doc.text(f.gdp.sum_format, MARGIN_HORIZONTAL + 611, y + 20);

  doc.setFontSize(16);
  doc.text(f.job.sum_format, MARGIN_HORIZONTAL + 811, y+ 20);
}

function addShape1(doc) {
  return new Promise(resolve => {
    const img = new Image();
    img.setAttribute('crossorigin', 'anonymous');
    img.addEventListener('load', (event) => {
      const dataUrl = getBase64Image(event.currentTarget, 'PNG');
      doc.addImage(dataUrl, 'PNG', 40, 365, 58, 198);

      resolve();
    });
    img.src = Shape2;
  })
}

function addShape2(doc) {
  return new Promise(resolve => {
    const img = new Image();
    img.setAttribute('crossorigin', 'anonymous');
    img.addEventListener('load', (event) => {
      const dataUrl = getBase64Image(event.currentTarget, 'PNG');
      doc.addImage(dataUrl, 'PNG', 939, 931, 58, 220);
      resolve();
    });
    img.src = Shape1;
  })
}

function addLogo(doc) {
  return new Promise(resolve => {
    const img = new Image();
    img.setAttribute('crossorigin', 'anonymous');
    img.addEventListener('load', (event) => {
      const dataUrl = getBase64Image(event.currentTarget, 'PNG');
      doc.addImage(dataUrl, 'PNG', 847, 111, 124, 66);
      resolve();
    });
    img.src = Logo;
  })
}

function addMark(doc) {
  return new Promise(async resolve => {
    if (firstPage) {
      firstPage = false
      await addShape1(doc)
      await addShape2(doc)
      resolve()
      return
    }

    await addLogo(doc)
    await addShape2(doc)
    resolve()
  })
}

export async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
      await callback(array[index], index);
  }
}

function addTable(doc, title, fields, _y) {
  return new Promise(async resolve => {
    let y = _y
    addHeader(doc, title, y)
    y += 17
    let sw = true
    
    await asyncForEach(Object.keys(fields), async(key, index) => {
      const f = fields[key]
        addField(f, sw, y, doc)
        y += LINE_HEIGHT

        sw = !sw

        if (y > PAGE_HEIGHT - 100 && index < Object.keys(fields).length -1) {
          await addMark(doc)
          const { newY, newDoc } = addNewPage(doc)
          y = newY
          doc = newDoc
          addHeader(doc, title, y)
          y += 17
        }
    })
    
    resolve(y)
  })
}

function addNewPage(doc) {
  const newDoc = doc.addPage({
    unit: 'px',
    format: [PAGE_WIDTH, PAGE_HEIGHT],
    orientation: FORMAT_ORIENTATION,
  })

  return {newDoc, newY : MARGIN_VERTICAL + 150}
}

export const printDocument = async (data) => {
  firstPage = true
  console.log(data)
  let doc = new jsPDF({
    unit: 'px',
    format: [PAGE_WIDTH, PAGE_HEIGHT],
    orientation: FORMAT_ORIENTATION,
  });

  loadFonts(doc);

  await addFirstPage(doc);
  
  doc.setFont('SourceSansBold');
  doc.setFontSize(72);
  doc.setTextColor(0,0,0)
  doc.text(data.name, MARGIN_HORIZONTAL, MARGIN_VERTICAL + 125);

  await addFirstBlock(doc, data);
  
  if (data.job && data.job.sum_format) {
    await addSecondBlock(doc, data);
  }
  let districtsY = 800
  
  if ( data.districts && Object.keys(data.districts).length > 0) {
    districtsY = await addTable(doc, 'Congressional Districts', data.districts, 800);

  }

  if (Object.keys(data.metro_areas).length > 0) {
    if (districtsY > PAGE_HEIGHT - 100) {
      await addMark(doc)
      const { newY, newDoc} = addNewPage(doc)
      doc = newDoc
      districtsY = newY
    }
    const metroAreasY = await addTable(doc, 'Metro Areas', data.metro_areas, districtsY + 50);
   }

   await addMark(doc)  

  const filename = `CTIA_${data.name}.pdf`;

  doc.save(filename);

};
