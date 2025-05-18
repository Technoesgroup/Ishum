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





const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './uploads';   // Jahaan SVG files hain
const outputDir = './uploads';  // Wahin save karna hai PNG/WebP mein

// Agar output directory nahi hai to bana do (optional, yahan same folder mein save kar rahe hain)
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

fs.readdir(inputDir, (err, files) => {
  if (err) throw err;

  files.forEach(file => {
    if (path.extname(file).toLowerCase() === '.svg') {
      const inputPath = path.join(inputDir, file);
      const outputNamePNG = file.replace('.svg', '.png');
      const outputNameWebP = file.replace('.svg', '.webp');
      const outputPathPNG = path.join(outputDir, outputNamePNG);
      const outputPathWebP = path.join(outputDir, outputNameWebP);

      // PNG mein convert karna
      sharp(inputPath)
        .png({ quality: 70 })  // quality adjust kar sakte ho, 0-100
        .toFile(outputPathPNG)
        .then(() => console.log(`✅ Converted ${file} → ${outputNamePNG}`))
        .catch(err => console.error('Error PNG:', err));

      // WebP mein convert karna (jo zyada compression deta hai)
      sharp(inputPath)
        .webp({ quality: 70 })
        .toFile(outputPathWebP)
        .then(() => console.log(`✅ Converted ${file} → ${outputNameWebP}`))
        .catch(err => console.error('Error WebP:', err));
    }
  });
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


