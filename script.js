//bill=input form for the bill amount
const billAmount = document.getElementById("bill");
//people=input form for number of people
const numberOfPeople = document.getElementById("people");
//custom=input form for the custom tip %
const customTipPercentage = document.getElementById("custom");
//tipAmount=h2 set to $0.00
const billTipAmount = document.getElementById("tipAmount");
//total=h2 set to $0.00
const billTotalPerPerson = document.getElementById("total");
//resetBtn=Literally, the reset button
const resetButton = document.getElementById("resetBtn");
//btns for all the tip% btns (5,10,15,25%)
const buttons = document.querySelectorAll(".tip-btns button");

//Loop over the tip% btns
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    //tipvalue gets the innertext of the btns (5%,10%,15%,25%)
    let tipvalue = e.target.innerText;
    //substr() extracts a part of a string (-1 to get everything but the % )
    tipvalue = tipvalue.substr(0, tipvalue.length - 1);

    if (billAmount.value === "") return;
    //if there's no entry in numberOfPeople, use 1 as the multiplier
    if (numberOfPeople.value === "") numberOfPeople.value = 1;

    //Every form value is inherently a string
    //use parseFloat/Int to get the number value out of the string
    //function calculatetip() will use the converted numbers to calculate an answer
    calculateTip(
      parseFloat(billAmount.value),
      parseInt(tipvalue),
      parseInt(numberOfPeople.value)
    );
  });
});
//if custom% is entered
customTipPercentage.addEventListener("blur", (e) => {
  //reset if bill form has no number
  if (billAmount.value === "") {
    resetEverything();
    return;
  }
  //if there's no entry in numberOfPeople, use 1 as the multiplier
  if (numberOfPeople.value === "") numberOfPeople.value = 1;
  calculateTip(
    parseFloat(billAmount.value),
    parseFloat(e.target.value),
    parseInt(numberOfPeople.value)
  );
});

//function calculateTip takes in billAmount, tipValue & numberOfPeople for the equation
function calculateTip(billAmount, tipValue, numberOfPeople) {
  //formula for the tipamount (per person)
  let tipAmount = (billAmount * (tipValue / 100)) / numberOfPeople;
  //toFixed(2) only displays the last two decimals .xx
  totalTip = tipAmount.toFixed(2);

  let totalAmount = (tipAmount * numberOfPeople + billAmount) / numberOfPeople;
  totalAmount = totalAmount.toFixed(2);

  billTipAmount.innerHTML = `$${totalTip}`;
  billTotalPerPerson.innerHTML = `$${totalAmount}`;
}

//addEventListener for the reset button
resetButton.addEventListener("click", resetEverything);
//function for resetting everything
function resetEverything() {
  billTipAmount.innerHTML = "$0.00";
  billTotalPerPerson.innerHTML = "$0.00";
  billAmount.value = "";
  numberOfPeople.value = "";
  customTipPercentage.value = "";
}
