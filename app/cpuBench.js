const { dist } = require('cpu-benchmark');

process.on('message', function(msg) {
  console.log('Executing benchmark on core for: ' + msg.benchTime + 'ms');
  console.log(dist(msg.benchTime));
});
