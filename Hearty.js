// Copyright Ionut Alexandru Parau. 2020. All Rights Reserved.
// Library Module: Hearty.js
// This file is licensed under the GPL-3 License.
// License text available at LICENSE

var canvas = document.getElementById("hearty-canvas");
var keys = Array(256).fill(false);
var mouseButtons = Array(6).fill(false);
var mouseX = 0;
var mouseY = 0;
var ctx;

BootHearty();

/** Activates the library and instantiates values. */
function BootHearty() {
    canvas = document.getElementById("hearty-canvas");
    if(canvas == null) {
      canvas = document.getElementById('hearty-canvas');
      if(canvas == null) {
        canvas = document.querySelector('canvas')
      }
    }

    ctx = canvas.getContext("2d");

    document.body.addEventListener('keydown', (keyEvent) => {

        keys[keyEvent.keyCode] = true;

    });

    document.body.addEventListener('keyup', (keyEvent) => {

        keys[keyEvent.keyCode] = false;

    });

    document.body.addEventListener('mouseout', (mouse) => {
        mouseX = mouse.clientX;
        mouseY = mouse.clientY;
    });

    document.body.addEventListener('mouseover', (mouse) => {
        mouseX = mouse.clientX;
        mouseY = mouse.clientY;
    });

    document.body.addEventListener('mouseleave', (mouse) => {
        mouseX = mouse.clientX;
        mouseY = mouse.clientY;
    });

    document.body.addEventListener('mouseenter', (mouse) => {
        mouseX = mouse.clientX;
        mouseY = mouse.clientY;
    });

    document.body.addEventListener('mouseup', (mouse) => {
        mouseButtons[mouse.button] = false;
    });

    document.body.addEventListener('mousedown', (mouse) => {
        mouseButtons[mouse.button] = true;
    });

    document.body.addEventListener('mousemove', (mouse) => {
        mouseX = mouse.clientX;
        mouseY = mouse.clientY;
    });
}

/** Class used for storing a position in a 2D space */
class Vector {
  /** The constructor of the class */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  /** Adds a vector to another vector */
  add(pos) {
    this.x += pos.x;
    this.y += pos.y;
  }
  /** Subtracts a vector by another vector */
  sub(pos) {
    this.x -= pos.x;
    this.y -= pos.y;
  }
  /** Multiplies the vector by a number */
  multiply(num) {
    this.x *= num;
    this.y *= num;
  }
  /** Devides the vector by a number */
  devide(num) {
    this.x /= num;
    this.y /= num;
  }
  /** Gets the magnitude */
  mag() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }
  /** Sets the magnitude to 1 */
  unit() {
    var mag = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    var newX = this.x / mag;
    var newY = this.y / mag;
    this.x = newX;
    this.y = newY;
  }
  /** Sets the magnitude of the vector */
  setMag(newMag) {
    var mag = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    var newX = this.x / mag;
    var newY = this.y / mag;
    this.x = newX * newMag;
    this.y = newY * newMag;
  }
  /** Makes a copy of the vector */
  copy() {
    return new Vector(this.x, this.y);
  }
}

/** A alternative way of making a vector */
function makeVector(x, y) {
  return new Vector(x, y);
}

/** Gets the distance between 2 vectors */
function distance(pos1, pos2) {
    return Math.sqrt( Math.pow((pos1.x - pos2.x), 2) + Math.pow((pos1.y - pos2.y), 2) );
}

/** Clamps a number in between 2 values */
function clamp(num, min, max) {
  if(num > max) {
    num = max;
  }
  if(num < min) {
    num = min;
  }

  return num;
}

/** Clears the console */
function clearConsole() {
  console.clear();
}

/** Converts radians to degrees */
function convertToDegrees(radians) {
  return radians * 57.2957795;
}

/** Converts degrees to radians */
function convertToRadians(degrees) {
  return degrees * 0.0174532925;
}

/** Returns a random number between min and max */
function random(min, max) {
  max++;
  return Math.floor(Math.random() * (max - min)) + min;
}

/** Returns a random element from a array */
function randomObjectFrom(arr) {
  var index = random(0, arr.length - 1);
  return arr[index];
}

function angleOffset(angle) {
  return makeVector(cos(convertToRadians(angle)), sin(convertToRadians(angle)));
}

/** The atan2 mathmatical function */
function atan2(y, x) {
  return Math.atan2(y, x);
}

/** The sin mathmatical function */
function sin(r) {
  return Math.sin(r);
}

/** The cos mathmatical function */
function cos(r) {
  return Math.cos(r);
}

/** Rounds the number. */
function round(num) {
  return Math.round(num);
}

/** Returns the square root of the number */
function sqrt(num) {
  return Math.sqrt(num);
}

/** Returns the number raised by the exponent */
function pow(num, expo) {
  return Math.pow(num, expo);
}

/** Returns the absolute of the number */
function abs(num) {
  if(num < 0) {
    num *= -1;
  }
  return num;
}

/** Sets the line thiccness */
function lineThiccnes(value) {
  ctx.lineWidth = value;
}

/** Makes the canvas full screen */
function canvasFullScreen() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}

/** Gets the mouse X */
function getMouseX() {
  return mouseX;
}

/** Gets the mouse Y */
function getMouseY() {
  return mouseY;
}

/** Gets the mouse position as a vector */
function getMousePos() {
  return makeVector(mouseX, mouseY);
}

/** Returns if the key is currently pressed */
function isKey(keyCode) {
    return keys[keyCode];
}

/** Returns if the mouse button is currently pressed */
function isMouseButton(button) {
    return mouseButtons[button];
}

/** Returns the current canvas */
function getCanvas() {
    return canvas;
}

/** Tells Hearty to use a seperate canvas */
function setCanvas(newCanvas) {
  canvas = newCanvas;
  ctx = newCanvas.getContext("2d");
}

/** Gets the canvas context */
function getCanvasContext() {
  return ctx;
}

/** Clears the canvas */
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#000000";
}

/** Draws a line */
function drawLine(startX, startY, endX, endY, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
}

/** Draws a circle */
function drawCircle(startX, startY, size, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.arc(startX, startY, abs(size / 2), 0, 2 * Math.PI);
    ctx.stroke();
}

/** Draws a rectangle */
function drawRect(startX, startY, endX, endY, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.rect(startX, startY, endX, endY);
    ctx.stroke();
}

function drawSpecialRect(point1, point2, point3, point4, color) {
  ctx.beginPath();
  ctx.moveTo(point1.x, point1.y);
  ctx.lineTo(point2.x, point2.y);
  ctx.lineTo(point3.x, point3.y);
  ctx.lineTo(point4.x, point4.y);
  ctx.closePath();
  ctx.strokeStyle = color;
  ctx.stroke();
}

/** Draws a square at a angle */
function drawRotatedSquare(x, y, size, angle, color) {
  size /= 2;
  var rot = angle;
  var pos = makeVector(x, y);

  var off1 = angleOffset(rot + 45);
  var off2 = angleOffset(rot - 45);
  var off3 = angleOffset(rot + 45);
  var off4 = angleOffset(rot - 45);

  off1.multiply(size);
  off2.multiply(size);
  off3.multiply(-size);
  off4.multiply(-size);

  off1.add(pos);
  off2.add(pos);
  off3.add(pos);
  off4.add(pos);

  drawSpecialRect(off1, off2, off3, off4, color);
}

/** Draws a triangle */
function drawTriangle(point1, point2, point3, color) {
  ctx.beginPath();
  ctx.moveTo(point1.x, point1.y);
  ctx.lineTo(point2.x, point2.y);
  ctx.lineTo(point3.x, point3.y);
  ctx.closePath();
  ctx.strokeStyle = color;
  ctx.stroke();
}

/** Draws a trignale rotated by some angle (degrees) */
function drawRotatedTriangle(x, y, size, angle, color) {
  size /= 2;
  var pos = makeVector(x, y);
  var off1 = makeVector(cos(convertToRadians(angle)) * size, sin(convertToRadians(angle)) * size);
  var off2 = makeVector(cos(convertToRadians(angle + 120)) * size, sin(convertToRadians(angle + 120)) * size);
  var off3 = makeVector(cos(convertToRadians(angle - 120)) * size, sin(convertToRadians(angle - 120)) * size);

  off1.add(pos);
  off2.add(pos);
  off3.add(pos);

  drawTriangle(off1, off2, off3, color);
}

/** Draws a filled circle */
function drawFilledCircle(startX, startY, size, color) {
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(startX, startY, abs(size / 2), 0, 2 * Math.PI);
    ctx.fill();
}

/** Draws a filled rect */
function drawFilledRect(startX, startY, endX, endY, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.rect(startX * scale, startY * scale, endX * scale, endY * scale);
    ctx.fill();
}

function drawSpecialFilledRect(point1, point2, point3, point4, color) {
  ctx.beginPath();
  ctx.moveTo(point1.x, point1.y);
  ctx.lineTo(point2.x, point2.y);
  ctx.lineTo(point3.x, point3.y);
  ctx.lineTo(point4.x, point4.y);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

/** Draws a square at a angle */
function drawRotatedFilledSquare(x, y, size, angle, color) {
  size /= 2;
  var rot = angle;
  var pos = makeVector(x, y);

  var off1 = angleOffset(rot + 45);
  var off2 = angleOffset(rot - 45);
  var off3 = angleOffset(rot + 45);
  var off4 = angleOffset(rot - 45);

  off1.multiply(size);
  off2.multiply(size);
  off3.multiply(-size);
  off4.multiply(-size);

  off1.add(pos);
  off2.add(pos);
  off3.add(pos);
  off4.add(pos);

  drawSpecialFilledRect(off1, off2, off3, off4, color);
}

/** Draws a triangle */
function drawFilledTriangle(point1, point2, point3, color) {
  ctx.beginPath();
  ctx.moveTo(point1.x, point1.y);
  ctx.lineTo(point2.x, point2.y);
  ctx.lineTo(point3.x, point3.y);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

/** Draws a trignale rotated by some angle (degrees) */
function drawRotatedFilledTriangle(x, y, size, angle, color) {
  size /= 2;
  var pos = makeVector(x, y);
  var off1 = makeVector(cos(convertToRadians(angle)) * size, sin(convertToRadians(angle)) * size);
  var off2 = makeVector(cos(convertToRadians(angle + 120)) * size, sin(convertToRadians(angle + 120)) * size);
  var off3 = makeVector(cos(convertToRadians(angle - 120)) * size, sin(convertToRadians(angle - 120)) * size);

  off1.add(pos);
  off2.add(pos);
  off3.add(pos);

  drawFilledTriangle(off1, off2, off3, color);
}

/** Draws text */
function drawText(text, x, y, font, color) {
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
}

/** Draws a image, but with a certain width and height */
function drawImage(img, x, y, width, height) {
    ctx.drawImage(img, x, y, width, height);
}
