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

function sanitizeFilename(filename) {
  return filename.replace(/\s+/g, '_');
}

// Step 1: Read all images and overwrite them
fs.readdirSync(inputFolder).forEach((file) => {
  const sanitizedFile = sanitizeFilename(file);
  const inputPath = path.join(inputFolder, file);
  const sanitizedPath = path.join(inputFolder, sanitizedFile);

  // If filename contains spaces, rename the file first
  if (file !== sanitizedFile) {
    fs.renameSync(inputPath, sanitizedPath);
  }

  // Now optimize the sanitized file
  if (/\.(jpe?g|png|webp)$/i.test(sanitizedFile)) {
    sharp(sanitizedPath)
      .resize({ width: 1200 }) // Optional resize
      .toFormat("jpeg") // Convert all to jpeg, change if needed
      .jpeg({ quality: 75 }) // Compression quality
      .toBuffer()
      .then((data) => {
        fs.writeFileSync(sanitizedPath, data); // Overwrite original file
        console.log(`✅ Optimized: ${sanitizedFile}`);
      })
      .catch((err) => {
        console.error(`❌ Error optimizing ${sanitizedFile}:`, err);
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


