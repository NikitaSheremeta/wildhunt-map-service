require('newrelic');
const dotenv = require('dotenv');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cluster = require('cluster');
const os = require('os');
const routes = require('./routes');

dotenv.config();

process.env.ROOT_DIRECTORY = process.cwd();

const app = express();

const PORT = 80;

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use('/api/v1', routes);

(function startServer() {
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
