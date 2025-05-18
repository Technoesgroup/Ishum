// const fs = require("fs");
// const path = require("path");
// const sharp = require("sharp");

// const inputFolder = path.join(__dirname, "uploads");

// fs.readdir(inputFolder, (err, files) => {
//   if (err) return console.error("❌ Error reading folder:", err);

//   files.forEach(async (file) => {
//     const ext = path.extname(file).toLowerCase();
//     const baseName = path.basename(file, ext);

//     // Skip if already webp
//     if (ext === ".webp") return;

//     const inputPath = path.join(inputFolder, file);
//     const outputPath = path.join(inputFolder, `${baseName}.webp`);

//     try {
//       await sharp(inputPath)
//         .resize({ width: 800 }) // Optional: Resize for compression
//         .webp({ quality: 70 })  // Compression quality
//         .toFile(outputPath);

//       console.log(`✅ Converted: ${file} → ${baseName}.webp`);
//     } catch (e) {
//       console.error(`❌ Failed to convert ${file}:`, e);
//     }
//   });
// });




const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputFolder = path.join(__dirname, "../EcommerceSite/src/images");

// Function to remove underscores from filenames
function removeUnderscores(filename) {
  return filename.replace(/_/g, '');  // Yahan '' ki jagah ' ' bhi kar sakte ho agar space chahiye
}

// Step 1: Read all images and overwrite them
fs.readdirSync(inputFolder).forEach((file) => {
  const cleanFile = removeUnderscores(file);
  const inputPath = path.join(inputFolder, file);
  const cleanPath = path.join(inputFolder, cleanFile);

  // Rename file if underscores removed
  if (file !== cleanFile) {
    fs.renameSync(inputPath, cleanPath);
  }

  // Optimize image file
  if (/\.(jpe?g|png|webp)$/i.test(cleanFile)) {
    sharp(cleanPath)
      .resize({ width: 1200 })
      .toFormat("jpeg")
      .jpeg({ quality: 75 })
      .toBuffer()
      .then((data) => {
        fs.writeFileSync(cleanPath, data);
        console.log(`✅ Optimized: ${cleanFile}`);
      })
      .catch((err) => {
        console.error(`❌ Error optimizing ${cleanFile}:`, err);
      });
  }
});









// const imagemin = require('imagemin');
// const webp = require('imagemin-webp');
// const svgo = require('imagemin-svgo');

// (async () => {
//   await imagemin(['images/*.svg'], {
//     destination: 'output',
//     plugins: [
//       svgo(),
//       webp({ quality: 90 })
//     ]
//   });

//   console.log("✅ Done with CommonJS (require)");
// })();


