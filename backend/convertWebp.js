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

// Step 1: Read all images and overwrite them
fs.readdirSync(inputFolder).forEach((file) => {
  const inputPath = path.join(inputFolder, file);

  // Check if file is an image (optional but safer)
  if (/\.(jpe?g|png|webp)$/i.test(file)) {
    sharp(inputPath)
      .resize({ width: 1200 }) // Optional resize
      .toFormat("jpeg") // Force to jpeg format (or use original file's ext)
      .jpeg({ quality: 75 }) // Compression quality
      .toBuffer()
      .then((data) => {
        fs.writeFileSync(inputPath, data); // Overwrite original
        console.log(`✅ Optimized: ${file}`);
      })
      .catch((err) => {
        console.error(`❌ Error optimizing ${file}:`, err);
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


