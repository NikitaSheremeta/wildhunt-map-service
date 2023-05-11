const dotenv = require('dotenv');
const express = require('express');
const cluster = require('cluster');
const os = require('os');
const helmet = require('helmet');
const cors = require('cors');
const routes = require('./routes');

dotenv.config();

const app = express();

const serverPort = 80;
const oneCpu = 1;

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use('/api/v1', routes);

const start = function startServer() {
  if (cluster.isPrimary) {
    const cpusCount = os.cpus().length;

    for (let i = 0; i < cpusCount - oneCpu; i++) {
      const worker = cluster.fork();

      worker.on('exit', () => {
        console.log(`Worker died! Pid: ${worker.process.pid}`);

        cluster.fork();
      });
    }
  } else {
    app.listen(serverPort, () => console.log(`Server started on port: ${serverPort}, Pid: ${process.pid}`));
  }
};

start();
