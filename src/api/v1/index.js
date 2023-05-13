const dotenv = require('dotenv');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const cluster = require('cluster');
const os = require('os');
const routes = require('./routes');
const PathHelper = require('./helpers/path-helper');

dotenv.config();

const app = express();

const PORT = 80;

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use('/api/v1', routes);

(async function startServer() {
  // @TODO: Think about how you can optimize / improve the handling of a file not found
  const rootDirectory = await PathHelper.getRootDirectory();

  app.use('/chunks', express.static(path.join(rootDirectory, 'public', 'chunks')), (req, res, next) => {
    try {
      res.sendFile(path.join(rootDirectory, 'public', 'chunks', 'missed_chunk.png'));
    } catch (err) {
      next(err);
    }
  });

  if (cluster.isPrimary) {
    const cpusCount = os.cpus().length;

    for (let i = 0; i < cpusCount - 1; i++) {
      const worker = cluster.fork();

      worker.on('exit', () => {
        console.log(`Worker died! Pid: ${worker.process.pid}`);

        cluster.fork();
      });
    }
  } else {
    app.listen(PORT, () => console.log(`Server started on port: ${PORT}, Pid: ${process.pid}`));
  }
})();
