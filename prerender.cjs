const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');

console.log('Starting SSR server...');
const server = spawn('node', ['.output/server/index.mjs'], { env: { ...process.env, PORT: '3000' } });

server.stdout.on('data', (data) => console.log(`stdout: ${data}`));
server.stderr.on('data', (data) => console.error(`stderr: ${data}`));

setTimeout(() => {
  console.log('Fetching index.html from SSR server...');
  http.get('http://localhost:3000/', (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      fs.writeFileSync('.output/public/index.html', data);
      console.log('Successfully wrote index.html to .output/public!');
      server.kill();
      process.exit(0);
    });
  }).on('error', (err) => {
    console.error('Error fetching:', err.message);
    server.kill();
    process.exit(1);
  });
}, 2000); // Wait 2s for server to start
