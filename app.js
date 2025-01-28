//1. flag icon should change with dropdown selected option
//2. POPULATE dropdown selected option
//3. get exchange rate based on the value selected

// 2.) POPULATE drop down options
function populate() {
  const dropdowns = document.querySelectorAll(".dropdown select");
  for (let select of dropdowns) {
    for (let i in countryList) {
      let option = document.createElement("option");
      option.innerText = i;
      option.value = i;
      select.append(option);
    }
  }
}

// 3.) get exchnge rate & update ans based on current selection
let from_drop = document.querySelector(".from #from");
var from_value = from_drop.value.toLowerCase();
let to_drop = document.querySelector(".to #to");
var to_value = to_drop.value.toLowerCase();

let msg = document.getElementById("msg");

let data;
let response;
let rate;

async function get_rates(from, to) {
  response = await fetch(
    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`
  );
  data = await response.json();
  rate = data[from][to].toFixed(2);
}

// function fill_rate() {

//   msg.innerText = `1 ${from_value.toUpperCase()}  = ${rate} ${to_value.toUpperCase()}`;
// }
async function fill_rate() {
    await get_rates(from_value, to_value);
    msg.innerText = `1 ${from_value.toUpperCase()}  = ${rate} ${to_value.toUpperCase()}`;
  }

async function updateAns() {
  await get_rates(from_value, to_value);
  let amt_input = document.querySelector(".amt input");
  let amt = amt_input.value;
  if (amt == 0 || amt < 0) {
    amt = 1;
    finalAmt = rate;
    msg.innerText = `${amt} ${from_value.toUpperCase()}   = ${finalAmt} ${to_value.toUpperCase()}`;
    return;
  }
  finalAmt = amt * rate;
  msg.innerText = `${amt} ${from_value.toUpperCase()}   = ${finalAmt} ${to_value.toUpperCase()}`;
  // ${from_value} ${to_value}
}

// 1.) update flag icon based on option selected
function update_from() {
  from_value = from_drop.value.toLowerCase();
  // update_from_flag
  let img = document.querySelector(".from img");
  img.src = `https://flagsapi.com/${
    countryList[from_value.toUpperCase()]
  }/flat/64.png`;
  // get_rates(from_value, to_value);
  updateAns();
}
function update_to() {
  //  to_drop=document.querySelector(".from #from");
  to_value = to_drop.value.toLowerCase();
  let img = document.querySelector(".to img");
  img.src = `https://flagsapi.com/${
    countryList[to_value.toUpperCase()]
  }/flat/64.png`;
  // get_rates(from_value, to_value);
  updateAns();
}

let get_xch_btn = document.querySelector("form button");

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form submission
  get_xch_btn.click(); // Trigger button click
});

get_xch_btn.addEventListener("click", updateAns);
from_drop.addEventListener("change", update_from);
to_drop.addEventListener("change", update_to);

// initial run
// get_rates(from_value, to_value);
fill_rate();
populate();

// ------------------------------------------------------------------------
const URL = "https://cat-fact.herokuapp.com/facts";
// BASIC Method
// console.log(promise);
// let promise= fetch(URL);

let catPara = document.getElementById("fact");
let i = 0;
let cat_data;
async function getFacts() {
  // fetch
  let response = await fetch(URL);
  cat_data = await response.json();
  // console.log(data[1].text);

  catPara.innerText = cat_data[i].text;
}
getFacts();
function newData() {
  i = (i + 1) % 5;
  catPara.innerText = cat_data[i].text;
}

const btn = document.querySelector("#new-fact-btn");
btn.addEventListener("click", newData);
// ------------------------------------------------
