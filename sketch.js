let video;
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/kObSU00d3/';
let label = "waiting...";
let penstandImage;
let ikeaImage;

function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
  penstandImage = loadImage('Penstand.jpg'); // Load the penstand image
  ikeaImage = loadImage('IKEA.jpg'); // Load the IKEA image
}

function setup() {
  createCanvas(300, 580); // Adjust the width and height for a rectangular canvas
  // Access the back camera using getUserMedia()
  const constraints = {
    video: {
      facingMode: {
        exact: 'environment'
      }
    }
  };

  video = createCapture(constraints, function(stream) {
    video.style('transform', 'scaleX(-1)'); // Flip the video horizontally to mirror the view
  });
  video.size(640, 480);
  video.hide();
  classifyVideo();
}

function classifyVideo() {
  classifier.classify(video, gotResults);
}

function draw() {
  background(0);
  image(video, 0, 0, width, height); // Draw the video with full canvas dimensions

  let emoji = "";
  if (label == "penstand") {
    // Draw the penstand image when the label is detected
    image(penstandImage, -65, height - penstandImage.height / 9, height / 1.3, penstandImage.height / 9);
  } else if (label == "IKEA") {
    // Draw the IKEA image when the label is detected
    image(ikeaImage, -65, height - ikeaImage.height / 9, height / 1.3, ikeaImage.height / 9);
  } else {
    // Draw the white rectangle box when any other object or no object is detected
    noStroke(); // Remove the border of the rectangle
    fill(255);
    rect(0, 453, 300, 160);
  }

  textSize(256);
  text(emoji, width / 2, height / 2);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  classifyVideo();
}
