// Function to calculate society's carbon footprint
function calculateSocietyFootprint() {
    const salary = parseFloat(document.getElementById('salary').value);
    const userClass = document.getElementById('class').value;
    const renewableInvestment = parseFloat(document.getElementById('renewable-investment').value);

    const electricityBill = parseFloat(document.getElementById('electricity-bill').value);
    const waterBill = parseFloat(document.getElementById('water-bill').value);
    const waste = parseFloat(document.getElementById('waste').value);
    const carQuantity = parseFloat(document.getElementById('car-quantity').value);
    const bikeQuantity = parseFloat(document.getElementById('bike-quantity').value);
    const busQuantity = parseFloat(document.getElementById('bus-quantity').value);

    // Validation
    if (isNaN(salary) || salary < 0) {
        alert("Please enter a valid estimated salary.");
        return;
    }
    if (isNaN(renewableInvestment) || renewableInvestment < 0) {
        alert("Please enter a valid investment amount for renewable energy sources.");
        return;
    }
    if (isNaN(electricityBill) || electricityBill < 0) {
        alert("Please enter a valid electricity bill.");
        return;
    }
    if (isNaN(waterBill) || waterBill < 0) {
        alert("Please enter a valid water bill.");
        return;
    }
    if (isNaN(waste) || waste < 0) {
        alert("Please enter a valid waste generation.");
        return;
    }
    if (isNaN(carQuantity) || carQuantity < 0 || isNaN(bikeQuantity) || bikeQuantity < 0 || isNaN(busQuantity) || busQuantity < 0) {
        alert("Please enter valid quantities for vehicles.");
        return;
    }

    // Conversion factors
    const costPerKWh = 7; // example cost per kWh in Rupees
    const costPerLiter = 15; // example cost per liter of water in Rupees
    const co2PerKWh = 0.9; // example kg CO2e per kWh
    const co2PerLiterWater = 0.001; // kg CO2e per liter of water
    const co2PerKgWaste = 0.5; // kg CO2e per kg of waste
    const co2PerCar = 2.5; // kg CO2e per car per month
    const co2PerBike = 1.0; // kg CO2e per bike per month
    const co2PerBus = 5.0; // kg CO2e per bus per month

    // Convert bills to usage values
    const electricityUsageKWh = electricityBill / costPerKWh;
    const waterUsageLiters = waterBill / costPerLiter;

    // Calculate carbon footprints
    const electricityFootprint = electricityUsageKWh * co2PerKWh;
    const waterFootprint = waterUsageLiters * co2PerLiterWater;
    const wasteFootprint = waste * co2PerKgWaste;
    const vehicleFootprint = (carQuantity * co2PerCar) + (bikeQuantity * co2PerBike) + (busQuantity * co2PerBus);

    // Total carbon footprint for the society
    const totalFootprint = electricityFootprint + waterFootprint + wasteFootprint + vehicleFootprint;

    // Display the result
    document.getElementById('carbon-footprint').innerText = totalFootprint.toFixed(2);

    // Show recommendations based on user input
    showRecommendations(salary, userClass, renewableInvestment);
}

// Function to show recommendations
function showRecommendations(salary, userClass, renewableInvestment) {
    const recommendationList = document.getElementById('recommendation-list');
    const message = document.getElementById('personalized-message');

    // Clear previous recommendations
    recommendationList.innerHTML = '';

    // Add a personalized message
    message.innerText = "Based on your input, here are some personalized recommendations for sustainability:";

    const recommendations = [];

    // Generate recommendations based on salary and class
    if (salary < 40000) {
        recommendations.push("Consider implementing rainwater harvesting to promote sustainability.");
    } else if (salary >= 40000 && salary < 100000) {
        recommendations.push("Invest in solar panels to reduce your energy costs and carbon footprint.");
    } else {
        recommendations.push("Look into advanced renewable energy technologies like wind turbines or solar farms.");
    }

    // Additional recommendations based on class and investment
    if (userClass === 'lower') {
        recommendations.push("Explore community programs that support renewable energy initiatives.");
    } else if (userClass === 'middle') {
        recommendations.push("Consider joining a cooperative for renewable energy investments.");
    } else {
        recommendations.push("Investigate the latest trends in renewable energy investments for higher returns.");
    }

    // Display recommendations
    recommendations.forEach(rec => {
        const li = document.createElement('li');
        li.innerText = rec;
        recommendationList.appendChild(li);
    });

    // Show the recommendations section and Know More button
    document.getElementById('recommendations').style.display = 'block';
    document.getElementById('know-more-btn').style.display = 'inline-block';
}
