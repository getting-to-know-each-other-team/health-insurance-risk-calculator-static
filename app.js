// declare constant variable to hold the website link 
const url = "https://health-insurance-calculator-hqgthkfhb5cxgwcz.centralus-01.azurewebsites.net"
// const url = "http://localhost:3000"

// Function to ping the server and check if it's awake
async function pingServer() {
    try {
        const response = await fetch(url + "/ping")
        const data = await response.text();
        console.log('Ping response: ', data);
    } catch (error) {
        console.error('Failed to ping the server: ', error)
    }
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
    const responseText = await response.json()

    // this will then display the value of the bmi in the html 
    document.getElementById("button-results-bmi").innerHTML = responseText.bmiResult
}

async function calculateInsurancePoints() {
    // gets the values from the input html elements
    let systolic = document.getElementById("systolic").value;
    let diastolic = document.getElementById("diastolic").value;
    let age = document.getElementById("age").value;
    let diabetes = document.getElementById("diabetes-select").value;
    let cancer = document.getElementById("cancer-select").value;
    let alzheimers = document.getElementById("alzheimers-select").value;

    // numeric variable values for the diabetes, cancer, and alzheimers
    let ageNum, diabetesNum, cancerNum, alzheimersNum;

    if (age < 30) {
        ageNum = 0;
    } else if (age >= 30 && age < 45) {
        ageNum = 10;
    } else if (age >= 46 && age < 60) {
        ageNum = 20;
    } else {
        ageNum = 30;
    }

    // set number values for the diabetes, cancer, and alzheimers
    if (diabetes == "yes") {
        diabetesNum = 10;
    } else {
        diabetesNum = 0;
    }

    if (cancer == "yes") {
        cancerNum = 10;
    } else {
        cancerNum = 0;
    }

    if (alzheimers == "yes") {
        alzheimersNum = 10;
    } else {
        alzheimersNum = 0;
    }

    // create a variable to hold the JSON data
    const jsonData = {
        systolic: systolic,
        diastolic: diastolic,
        age: ageNum,
        diabetes: diabetesNum,
        cancer: cancerNum,
        alzheimers: alzheimersNum
    }

    // this will send the JSON data to the server
    fetch(url, {
        method: 'POST',
        header: {'Content-Type': 'application/json'},
        body: JSON.stringify(jsonData),
    }).then(response => response.json())
    .then(jsonData => {
        if (jsonData.overallPoints <= 20) {
            document.getElementById('overall-health-results').innerHTML = 
            `Your health insurance points: ${jsonData.overallPoints}\nYou are at low risk.`
        } else if (jsonData.overallPoints <= 50) {
            document.getElementById('overall-health-results').innerHTML = 
            `Your health insurance points: ${jsonData.overallPoints}\nYou are at moderate risk.`
        } else if (jsonData.overallPoints <= 75) {
            document.getElementById('overall-health-results').innerHTML = 
            `Your health insurance points: ${jsonData.overallPoints}\nYou are at high risk.`
        } else {
            document.getElementById('overall-health-results').innerHTML = 
            `Your health insurance points: ${jsonData.overallPoints}\nYou are Uninsurable.`
        }
    })

    // const response = await fetch(url)
    // const responseText = await response.json()
    // const healthPoints = responseText.overallPoints;

    
}