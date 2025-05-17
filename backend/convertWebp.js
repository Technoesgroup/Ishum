const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const inputFolder = path.join(__dirname, "uploads");

fs.readdir(inputFolder, (err, files) => {
  if (err) return console.error("❌ Error reading folder:", err);

  files.forEach(async (file) => {
    const ext = path.extname(file).toLowerCase();
    const baseName = path.basename(file, ext);

    // Skip if already webp
    if (ext === ".webp") return;

    const inputPath = path.join(inputFolder, file);
    const outputPath = path.join(inputFolder, `${baseName}.webp`);

    try {
      await sharp(inputPath)
        .resize({ width: 800 }) // Optional: Resize for compression
        .webp({ quality: 70 })  // Compression quality
        .toFile(outputPath);

      console.log(`✅ Converted: ${file} → ${baseName}.webp`);
    } catch (e) {
      console.error(`❌ Failed to convert ${file}:`, e);
    }
  });
});
