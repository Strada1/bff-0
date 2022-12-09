import { parentPort, workerData } from 'node:worker_threads';
import sharp from 'sharp';

async function resize() {
  const { imagePath, size, outputPath } = workerData;

  await sharp(imagePath)
    .resize(size.w, size.h, { fit:  'cover' })
    .toFile(`${outputPath}/resize-${Date.now()}.jpg`);

  parentPort.postMessage({ done: true });
}
resize();