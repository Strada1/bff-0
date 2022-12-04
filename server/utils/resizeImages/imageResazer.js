import { Worker } from 'node:worker_threads';

// USE IN ANOTHER SCRIPT
// await imageResizer(
//   './utils/resizeImages/_src/nodejs.jpg',
//   { w: 800, h: 600 },
//   './utils/resizeImages/modified/'
// );

function imageResizer(imagePath, size, outputPath) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./workers/imageResizeWorker.js', {
      workerData: { imagePath, size, outputPath }
    });

    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', code  => {
      if (code  !==  0)
        reject(new  Error(`Worker stopped with exit code ${code}`));
      });
  });
}

export default imageResizer;