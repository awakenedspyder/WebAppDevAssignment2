/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
console.log("Hello from Kannan's Assignment 02 setup");
function likeIt() {
  alert(
    "Thanks! A lot of effort was made to create this project, so that people like you and I can now come together and make this a success!"
  );
}
function showHide() {
  var readMoreDiv = document.getElementById("readmore");
  readMoreDiv.style.color = "green";
  readMoreDiv.style.cursor = "pointer";
  if (readMoreDiv.style.display === "block") {
    readMoreDiv.style.display = "none";
  } else {
    readMoreDiv.style.display = "block";
  }
}

function getRating() {
  let userRating = parseInt(prompt("Rate this List (from 1 to 5 stars)"));
  if (userRating > 5 || userRating < 1 || isNaN(userRating)) {
    alert("Try again with a number between 1 and 5!");
  } else {
    $("#rating").html("You gave a rating of: ");
    for (let i = 0; i < userRating; i++) {
      $("#rating").append("<i class='yellow star icon'></i>");
    }
  }
}

$(".ui.basic.modal").modal("show");
