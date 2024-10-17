// Function to ping the server and check if it's awake
function pingServer() {
  fetch('http://localhost:3000/ping')
      .then(response => response.json())
      .then(data => {
          document.getElementById('server-status').innerHTML = `Server Status: ${data.message}`;
          console.log('Ping successful:', data.message);
      })
      .catch(error => {
          document.getElementById('server-status').innerHTML = 'Server Status: Ping failed. Server might be down.';
          console.error('Ping error:', error);
      });
}

// Automatically ping the server when the page loads
window.onload = pingServer;