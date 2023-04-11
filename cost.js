
function calculateRes(apartment, floors) {
    
    if (!floorsInputRes) return 0
    
    var z = Math.ceil(apartment / floors);
    let result = Math.ceil(nbElevator / 6);
    var elevatorbank = Math.ceil(floors / 20);
    let finalresult = result * elevatorbank;
    
    return finalresult;
}



module.exports={ calculateRes, calculateTotalExcelium, calculateTotalPremium, calculateTotalStandard };