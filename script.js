let originalImg = null;
const canvas = document.getElementById("canva");

function clearCanvas() {
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function display(img) {
  clearCanvas();
  img.drawTo(canvas);
}

function createNewImage() {
  clearCanvas();
  const fileInput = document.getElementById("file-input");
  originalImg = new SimpleImage(fileInput);
  display(originalImg);
}

function getAvg(pixel) {
  const r = pixel.getRed();
  const g = pixel.getGreen();
  const b = pixel.getBlue();
  return (r + g + b) / 3;
}

function setAvg(pixel) {
  pixel.setRed(avg);
  pixel.setGreen(avg);
  pixel.setBlue(avg);
  return pixel;
}

function doRed() {
  const image = originalImg;
  if (checkImg(image)) {
    for (let pixel of image.values()) {
      pixel.setRed(255);
    }
    display(image);
  }
}

function grayScale() {
  const image = originalImg;
  if (checkImg(image)) {
    for (let pixel of image.values()) {
      avg = getAvg(pixel);
      pixel = setAvg(pixel, avg);
    }
    display(image);
  }
}

function checkImg(image) {
  if (image == null || !image.complete()) {
    alert("Image not found");
    return false;
  } else return true;
}

function setBlack(pixel) {
  pixel.setRed(0);
  pixel.setGreen(0);
  pixel.setBlue(0);
  return pixel;
}

function addBorder() {
  const image = originalImg;
  const bdr = 7.5;
  if (checkImg(image)) {
    const height = image.getHeight();
    const width = image.getWidth();
    for (let px of image.values()) {
      if (px.getY() > height - bdr) {
        pixel = setBlack(px);
      }
      if (px.getX() > width - bdr) {
        pixel = setBlack(px);
      }
      if (px.getY() < bdr) {
        pixel = setBlack(px);
      }
      if (px.getX() < bdr) {
        pixel = setBlack(px);
      }
    }
    display(image);
  }
}

function strips() {
  const img = originalImg;
  if (checkImg(img)) {
    const width = img.getWidth();
    for (let px of img.values()) {
      if (px.getX() < width / 3) {
        px.setRed(255);
      } else if (px.getX() < width * 0.7) {
        px.setGreen(255);
      } else {
        px.setBlue(255);
      }
    }
    display(img);
  }
}

function removeRed() {
  const image = originalImg;
  if (checkImg(image)) {
    for (let pixel of image.values()) {
      pixel.setRed(0);
    }
    display(image);
  }
}
function removeGreen() {
  const image = originalImg;
  if (checkImg(image)) {
    for (let pixel of image.values()) {
      pixel.setGreen(0);
    }
    display(image);
  }
}
function removeBlue() {
  const image = originalImg;
  if (checkImg(image)) {
    for (let pixel of image.values()) {
      pixel.setBlue(0);
    }
    display(image);
  }
}

function filterRainbow(image) {
  var height = image.getHeight();
  for (var pixel of image.values()) {
    var y = pixel.getY();
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (y < height / 7) {
      //red
      if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(0);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < (height * 2) / 7) {
      //orange
      if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(0.8 * avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(1.2 * avg - 51);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < (height * 3) / 7) {
      //yellow
      if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(2 * avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < (height * 4) / 7) {
      //green
      if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(2 * avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(2 * avg - 255);
        pixel.setGreen(255);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < (height * 5) / 7) {
      //blue
      if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(0);
        pixel.setBlue(2 * avg);
      } else {
        pixel.setRed(2 * avg - 255);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(255);
      }
    } else if (y < (height * 6) / 7) {
      //indigo
      if (avg < 128) {
        pixel.setRed(0.8 * avg);
        pixel.setGreen(0);
        pixel.setBlue(2 * avg);
      } else {
        pixel.setRed(1.2 * avg - 51);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(255);
      }
    } else {
      //violet
      if (avg < 128) {
        pixel.setRed(1.6 * avg);
        pixel.setGreen(0);
        pixel.setBlue(1.6 * avg);
      } else {
        pixel.setRed(0.4 * avg + 153);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(0.4 * avg + 153);
      }
    }
  }
  return image;
}

function rainbow() {
  const image = originalImg;
  if (checkImg(image)) {
    filterRainbow(image);
    display(image);
  }
}

function ensureInImage(coordinate, size) {
  // coordinate cannot be negative
  if (coordinate < 0) {
    return 0;
  }
  // coordinate must be in range [0 .. size-1]
  if (coordinate >= size) {
    return size - 1;
  }
  return coordinate;
}

function getPixelNearby(image, x, y, diameter) {
  var dx = Math.random() * diameter - diameter / 2;
  var dy = Math.random() * diameter - diameter / 2;
  var nx = ensureInImage(x + dx, image.getWidth());
  var ny = ensureInImage(y + dy, image.getHeight());
  return image.getPixel(nx, ny);
}

function blurImg() {
  const image = originalImg;
  const output = new SimpleImage(image.getWidth(), image.getHeight());
  if (checkImg(image)) {
    for (let pixel of image.values()) {
      const x = pixel.getX();
      const y = pixel.getY();
      if (Math.random() > 0.5) {
        const other = getPixelNearby(image, x, y, 10);
        output.setPixel(x, y, other);
      } else {
        output.setPixel(x, y, pixel);
      }
    }
    display(output);
  }
}
