
const {dataBase,costs,percentage} = require("./data.js");

function elevatorCostRes(apartment,floors,tier){
    if(!['standard', 'premium', 'excelium'].includes(tier)){
        throw new Error('No tier was chosen');
    }
    if (isNaN(apartment) || isNaN(floors)) {
        throw new Error('Apartments and floors require to be numbers');
      }
      if (!Number.isInteger(+apartment) || !Number.isInteger(+floors)) {
        throw new Error('Parameter entered is not an integer');
      }
      if ((apartment) <= 0 || (floors) <= 0) {
        throw new Error('The number of apartments and floors needs to be higher than 0');
      }
    //calcul elevator et cost
const nbElevator = Math.ceil(apartment / (floors*6))
const elevatorblock = Math.ceil(nbElevator / 20)
const totalRes = nbElevator*elevatorblock
const totalCost = totalRes*costs[tier];
const percentFee = totalCost*percentage[tier];
const finalCost = percentFee+totalCost;
return {nbElevator,totalCost};

}



module.exports={ elevatorCostRes, costs };