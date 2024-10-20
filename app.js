// declare constant variable to hold the website link 
const url = "https://health-insurance-calculator-hqgthkfhb5cxgwcz.centralus-01.azurewebsites.net"
// const url = "http://localhost:3000"

// Function to ping the server and check if it's awake
async function pingServer() {
   const response = await fetch(url)
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
window.onload = pingServer();

/* This method will calculate the BMI when the user presses a button.  It will pass the 3 values
 that were entered by the user to the API server and then the server will take those and return 
 the value of the BMI calculations
*/
async function calculateBmi() {
    // grabs the values for the bmi calculations
    let heightFeet = document.getElementById("feet").value;
    let heightInches = document.getElementById("inches").value;
    let weight = document.getElementById("pounds").value;

    // calls the server API to calculate the bmi
    const fetchString = url + "/calculate-bmi?feet="+heightFeet+"&inches="+heightInches+"&lbs="+weight;
    const response = await fetch(fetchString)
    const responseText = await response.text()

    // this will then display the value of the bmi in the html 
    document.getElementById("bmiResults").innerHTML = responseText
}

async function calculateInsurancePoints() {
    // gets the values from the input html elements
    let systolic = document.getElementById("systolic").value;
    let diastolic = document.getElementById("diastolic").value;

    
}