const express = require('express');
const path = require('path');
const app = express();

// Serve the dashboard HTML
app.use(express.static(path.join(__dirname, '../public')));

// Example API endpoint, returns simulated stats
app.get('/api/stats', (req, res) => {
  res.json({
    memory: Math.floor(30 + Math.random() * 65),     // %
    cpu: Math.floor(10 + Math.random() * 80),         // %
    disk: Math.floor(32 + Math.random() * 40),        // %
    network: (50 + Math.random() * 400).toFixed(1),   // Mbps
    download: (8 + Math.random() * 92).toFixed(1),    // Mbps
    upload: (2 + Math.random() * 48).toFixed(1)       // Mbps
  });
});

// Example API for users
app.get('/api/users', (req, res) => {
  const roles = ['Admin','Staff','User','Viewer'];
  const statuses = ['Active','Idle','Busy','Offline'];
  let users = [];
  for(let i=0; i<5; i++) {
    users.push({
      name:`User${100+i+Math.floor(Math.random()*900)}`,
      role: roles[Math.floor(Math.random()*roles.length)],
      status: statuses[Math.floor(Math.random()*statuses.length)]
    });
  }
  res.json(users);
});

// Example API for alerts
app.get('/api/alerts', (req, res) => {
  const types = [
    {icon:'⚠️',text:'High CPU usage detected'},
    {icon:'🔔',text:'User login: admin'},
    {icon:'🌐',text:'Network disconnected'},
    {icon:'✅',text:'Backup completed'},
    {icon:'🧑‍💻',text:'New user registered'},
    {icon:'🖥️',text:'Disk nearly full'},
    {icon:'🎯',text:'Update finished'},
    {icon:'🚨',text:'Unauthorized access attempt'},
  ];
  // Return 5 random alerts
  let alerts = [];
  for(let i=0; i<5; i++) alerts.push(types[Math.floor(Math.random()*types.length)]);
  res.json(alerts);
});

const PORT = process.env.PORT || 30000;
app.listen(PORT, () => {
  console.log(`Dashboard running at http://localhost:${PORT}`);
});
