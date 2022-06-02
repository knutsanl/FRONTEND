// format the date and time
export function formatDateAndTime(stringToFormat) {
  let unFormattedDate = new Date(stringToFormat);
  let formattedDate = unFormattedDate.toUTCString();
  return formattedDate;
}

// using the watering interval, calculates when the plant should be watered
export function calculateNeedsWaterBefore(plantToCalculate) {
  let dateObject = new Date(plantToCalculate.lastTimeWatered);
  //wateringIntervall set to day, so *24 to give hours to add
  let addedHours = dateObject.setHours(
       dateObject.getHours() + (plantToCalculate.wateringInterval*24)
  );
  let formattedDate = formatDateAndTime(addedHours);
  return formattedDate;
}

// denne funkjsonen trenger å telle ned og vise en fin format. noe slikt: 10 days,  10:30:50 som tikker nedover
export function calculateNeedsWaterIn(plantToCalculate) {
  console.log(calculateNeedsWaterBefore);
  return plantToCalculate.wateringInterval + " Days";
}

//creating a function checking time between two dates needsWaterBefore and todays date
export function findDifferenceInDates(plantToCalculate){
  //defining dates needed (unformatted need water before and todays date)
  let dateObject = new Date(plantToCalculate.lastTimeWatered);
  let needsWaterBefore = dateObject.setHours(
       dateObject.getHours() + (plantToCalculate.wateringInterval*24)
  );
  let today = Date.now();
 // let needsWaterBefore = calculateNeedsWaterBefore(plantToCalculate);
  //finding difference and returning in days
  let difference = Math.floor((needsWaterBefore - today)/86400000);
  return difference;
}

//Function for fetilization
export function findDifferenceInFertilizationDates(plantToCalculate){
  let dateObject = new Date(plantToCalculate.lastTimeFertilized);
  let needsFertilizationBefore = dateObject.setHours(
    dateObject.getHours() + (plantToCalculate.fertilizationInterval*24)
  );
  let today = Date.now();
  let difference = Math.floor((needsFertilizationBefore - today)/86400000);
  return difference;
}

//Calculating next time it needs fertilization
export function calculateNeedsFertilizationIn(plantToCalculate) {
    let dateObject = new Date(plantToCalculate.lastTimeFertilized);
    //fertilizationIntervall set to day, so *24 to give hours to add
    let addedHours = dateObject.setHours(
         dateObject.getHours() + (plantToCalculate.fertilizationInterval*24)
    );
    let formattedDate = formatDateAndTime(addedHours);
    return formattedDate;
  }