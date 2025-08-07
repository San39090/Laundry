function visible() {
  let curr = document.querySelector(".drop_details");
  let style = window.getComputedStyle(curr).display;
  if (style === "block") {
    curr.style.display = "none";
    document.querySelector("nav").style.height = "10vh";
  } else {
    curr.style.display = "block";
    document.querySelector("nav").style.height = "30vh";
  }
}
let cart = [];
function check(e) {
  if (e.matches) {
    document.querySelector("nav").style.height = "10vh";
    document.querySelector(".drop_details").style.display = "none";
  }
}
const width = window.matchMedia("(min-width:650px)");
width.addEventListener("change", check);
let total = 0;
function add(e) {
  let content = e.textContent.trim();
  if (content === "Add Item") {
    let text = e.previousElementSibling
      .querySelector(".goal")
      .textContent.trim();
    let rate = e.previousElementSibling
      .querySelector(".rate")
      .textContent.trim();
    cart.push([text, rate]);
    e.style.display = "none";
    total += +rate;
    e.nextElementSibling.style.display = "block";
  } else {
    let text = e.previousElementSibling.previousElementSibling
      .querySelector(".goal")
      .textContent.trim();
    for (let i = 0; i < cart.length; i++) {
      if (cart[i][0] === text) {
        total -= +cart[i][1];
        cart.splice(i, 1);
        break;
      }
    }
    e.style.display = "none";
    e.previousElementSibling.style.display = "block";
  }

  if (cart.length != 0) {
    document.querySelector(".nothing").style.display = "none";
    document.querySelector(".data").style.display = "grid";
  } else {
    document.querySelector(".nothing").style.display = "block";
    document.querySelector(".data").style.display = "none";
  }
  let table = document.querySelector(".data");
  while (table.childNodes.length != 0) {
    let make = 0;
    table.childNodes[make].remove();
  }
  for (let it = 0; it < cart.length; it++) {
    let new_line = document.createElement("p");
    new_line.classList.add("s_name");
    new_line.textContent = it + 1;
    table.appendChild(new_line);
    for (let curr of cart[it]) {
      let new_line = document.createElement("p");
      if (!isNaN(curr)) {
        new_line.textContent = "Rs. " + curr;
        new_line.classList.add("ratename");
      } else {
        new_line.textContent = curr;
        new_line.classList.add("taskname");
      }
      table.appendChild(new_line);
    }
  }
  document.querySelector(".money_number").textContent =
    total != NaN ? total + ".00" : 0.0;
}
function isEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function booked() {
  let name = document.querySelector(".fullname").value;
  let phone = document.querySelector(".phone").value;
  let email = document.querySelector(".email").value;
  if (isNaN(+phone) || !isEmail(email) || name.trim().length == 0) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".success").style.display = "none";
  } else {
    document.querySelector(".error").style.display = "none";
    document.querySelector(".success").style.display = "block";
  }
}
var data;
function sendEmail() {
  data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
  };
  const serviceId = "confirm";
  const templateId = "template_mv2995s";

  emailjs
    .send(serviceId, templateId, data)
    .then((res) => {
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      console.log(res);
      alert("message sent successfully");
    })
    .catch((err) => console.log(err));
}
