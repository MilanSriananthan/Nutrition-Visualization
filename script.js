const Apiurl =
  "https://api.spoonacular.com/food/ingredients/9040/information?amount=100&unit=grams&apiKey=df150d1925174045a287922c56a2a01c";

const button = document.querySelector(".button");
const mainForm = document.querySelector(".mainform");
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

const removeZeros = function (listofObjects) {
  var notZero = [];
  for (let i = 0; i < listofObjects.length; i++) {
    if (listofObjects[i].amount !== 0) {
      notZero.push(listofObjects[i]);
    }
  }
  return notZero;
};

const FindMax = function (listofObjects) {
  var maxAmount = 0;
  for (let i = 0; i < listofObjects.length; i++) {
    if (listofObjects[i].amount > maxAmount) {
      maxAmount = listofObjects[i].amount;
    }
  }
  return maxAmount;
};

const notLarge = function (listofObjects, maxAmount) {
  const ratio = maxAmount / 300;
  var majorNutrients = [];
  for (let i = 0; i < listofObjects.length; i++) {
    listofObjects[i].size = listofObjects[i].amount / ratio;
    if (listofObjects[i].size > 40) {
      majorNutrients.push(listofObjects[i]);
    }
  }
  return majorNutrients;
};

const draw = function (initialX, initialY, listofObjects) {
  for (let x = 0; x < listofObjects.length - 1; x++) {
    ctx.beginPath();

    ctx.arc(initialX, initialY, listofObjects[x].size, 0, 2 * Math.PI);
    ctx.fillStyle = "#29c5f6";
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "White";
    ctx.font = "20px Arial";
    ctx.fillText(
      listofObjects[x].name +
        ": " +
        listofObjects[x].amount +
        listofObjects[x].unit,
      initialX - 80,
      initialY
    );
    initialX += listofObjects[x].size + listofObjects[x + 1].size;
    // initialY += majorNutrients[x].size + majorNutrients[x + 1].size;
  }
  ctx.beginPath();
  ctx.arc(
    initialX,
    initialY,
    listofObjects[listofObjects.length - 1].size,
    0,
    2 * Math.PI
  );
  ctx.fillStyle = "#29c5f6";
  ctx.fill();
  ctx.stroke();
  ctx.font = "20px Arial";
  ctx.fillStyle = "White";
  ctx.fillText(
    listofObjects[listofObjects.length - 1].name +
      ": " +
      listofObjects[listofObjects.length - 1].amount +
      listofObjects[listofObjects.length - 1].unit,
    initialX - 80,
    initialY
  );
};

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
  console.log(nutritionfacts);

  const notZero = removeZeros(nutritionfacts);

  const maxAmount = FindMax(notZero);

  const majorNutrients = notLarge(notZero, maxAmount);

  draw(300, 350, majorNutrients);
}

button.addEventListener("click", function (e) {
  e.preventDefault();
  ctx.fillStyle = "#f3f3f3";
  ctx.fillRect(0, 0, 1350, 700);
  const food = document.getElementById("food").value;
  const amount = document.getElementById("amount").value;
  foodid(food, amount);
});
