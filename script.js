const Apiurl =
  "https://api.spoonacular.com/food/ingredients/9040/information?amount=100&unit=grams&apiKey=df150d1925174045a287922c56a2a01c";

const button = document.querySelector(".button");
const mainForm = document.querySelector(".mainform");
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

async function foodid(food, amount) {
  const response = await fetch(
    `https://api.spoonacular.com/food/ingredients/search?query=${food}&number=1&sortDirection=desc&apiKey=df150d1925174045a287922c56a2a01c`
  );
  const data = await response.json();
  const id = data.results[0].id;
  const response2 = await fetch(
    `https://api.spoonacular.com/food/ingredients/${id}/information?amount=${amount}&unit=grams&apiKey=df150d1925174045a287922c56a2a01c`
  );
  const data2 = await response2.json();
  const nutritionfacts = data2.nutrition.nutrients;
  ctx.beginPath();

  for (let i = 0; i < nutritionfacts.length; i++) {
    ctx.arc(100, 75, nutritionfacts[i].amount, 0, 2 * Math.PI);
    // mainForm.insertAdjacentText(
    //   "afterend",
    //   `${nutritionfacts[i].name}: ${nutritionfacts[i].amount}${nutritionfacts[i].unit} `
    // );
    // if (nutritionfacts[i].title === "Calories") {
    //   var calories = nutritionfacts[i].amount;
    //   //   console.log(calories);
    // }
  }
  ctx.stroke();
  //   console.log(typeof calories);
  //   console.log(calories);
  //   document.getElementById("cal").textContent = calories;
}

// async function findFromId(id, amount) {
//   const response = await fetch(
//     `https://api.spoonacular.com/food/ingredients/${id}/information?amount=${amount}&unit=grams&apiKey=df150d1925174045a287922c56a2a01c`
//   );
//   const data = await response.json();
//   console.log(data);
// }

button.addEventListener("click", function (e) {
  e.preventDefault();
  const food = document.getElementById("food").value;
  const amount = document.getElementById("amount").value;
  foodid(food, amount);
});

// const canvas = document.getElementById("canvas");
// const context = canvas.getContext("2d");

// window.addEventListener("resize", resizeCanvas, false);

// function resizeCanvas() {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;

//   drawStuff();
// }

// resizeCanvas();

// function drawStuff() {
//   // do your drawing stuff here
// }
