const sharp = require('sharp');
const fs = require('fs');

const outputDirectory = 'output'; // Replace with your desired output directory

// Create the output directory if it doesn't exist
if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory);
}

// Check if a file name was provided as a command-line argument
if (process.argv.length < 3) {
  console.error('Usage: node myScript.js <filename>');
  console.error('What file do you want me to chop?');
  process.exit(1);
}

// Access the file name from the command-line arguments
const inputFile = process.argv[2];
try {
  // Check if the file exists
  fs.accessSync(inputFile, fs.constants.F_OK);
} catch (error) {
  console.error(`File not found: ${inputFile}`);
  process.exit(1);
}

var y = 0 ;
var h = 4000;

const metadata = sharp(inputFile).metadata().then((metadata) => {
  console.log(`That image is ${metadata.height}px high.`);
  const quotient = Math.floor(metadata.height/4000);
  const remainder = metadata.height%4000;

  console.log(`Chopping into ${quotient+1} parts.`);
  console.log(`${quotient}x 4000px high + 1x ${remainder}px high.`);
  console.log(`- - - `);
  
  let i;
  for (i = 0; i < quotient; i++) {
    grab(y,4000,i);
    y += 4000;
  }
  grab(y,remainder,i)
});

function grab(start_y,grab_h,name)
{
  // Load the input image
  sharp(inputFile)
    .toBuffer()
    .then((data) => {
      
      console.log(`Grabbing ${start_y} to ${start_y+grab_h} pixels.`);
      const image = sharp(data);
      return image.metadata().then((metadata) => 
      {
          image.extract({
            left: 0,
            top: start_y,
            width: metadata.width,
            height: grab_h,
          })
          .toFile(`${outputDirectory}/tile_${name}.jpg`, (err) => {
            if (err) { console.error(err); }
          });
      });
    })
    .catch((err) => {
      console.error(err);
    });
}