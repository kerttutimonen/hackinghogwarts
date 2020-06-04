"use strict";

window.addEventListener("DOMContentLoaded", start);

let allStudents = [];

// design the prototype for the new object

const Student = {
  firstname: "",
  nickname: "",
  middlename: "",
  lastname: "",
  house: "",
  photo: null,
};

function start() {
  console.log("ready");

  document
    .querySelector("body > main > p > button:nth-child(1)")
    .addEventListener("click", filterGryffindor);
  document
    .querySelector("body > main > p > button:nth-child(2)")
    .addEventListener("click", filterRavenclaw);
  document
    .querySelector("body > main > p > button:nth-child(3)")
    .addEventListener("click", filterSlytherin);
  document
    .querySelector("body > main > p > button:nth-child(4)")
    .addEventListener("click", filterHufflepuff);
  document
    .querySelector("body > main > p > button:nth-child(5)")
    .addEventListener("click", filterAll);

  document
    .querySelector("[data-sort='firstName']")
    .addEventListener("click", sortFirst);

  document
    .querySelector("[data-sort='lastName']")
    .addEventListener("click", sortLast);

  document
    .querySelector("[data-sort='house']")
    .addEventListener("click", sortHouse);

  loadJSON();
}

// FILTERING

function isGryffindor(student) {
  if (student.house == "Gryffindor") {
    return true;
  } else {
    return false;
  }
}

function isRavenclaw(student) {
  if (student.house == "Ravenclaw") {
    return true;
  } else {
    return false;
  }
}

function isSlytherin(student) {
  if (student.house == "Slytherin") {
    return true;
  } else {
    return false;
  }
}

function isHufflepuff(student) {
  if (student.house == "Hufflepuff") {
    return true;
  } else {
    return false;
  }
}

function filterAll() {
  const everyStudent = allStudents.filter(all);
  displayList(everyStudent);
}

function filterGryffindor() {
  const onlyGryffindor = allStudents.filter(isGryffindor);
  displayList(onlyGryffindor);
}

function filterRavenclaw() {
  const onlyRavenclaw = allStudents.filter(isRavenclaw);
  displayList(onlyRavenclaw);
}

function filterSlytherin() {
  const onlySlytherin = allStudents.filter(isSlytherin);
  displayList(onlySlytherin);
}

function filterHufflepuff() {
  const onlyHufflepuff = allStudents.filter(isHufflepuff);
  displayList(onlyHufflepuff);
}

function all(student) {
  return true;
}

// SORTING

function sortFirst() {
  const sortFirstname = allStudents.sort(compareFirstname);
  displayList(sortFirstname);

  console.log(sortFirst);
}

function compareFirstname(a, b) {
  if (a.firstname < b.firstname) {
    return -1;
  } else {
    return 1;
  }
}

function sortLast() {
  const sortLastname = allStudents.sort(compareLastname);
  displayList(sortLastname);

  console.log(sortLast);
}

function compareLastname(a, b) {
  if (a.lastname < b.lastname) {
    return -1;
  } else {
    return 1;
  }
}

function sortHouse() {
  const sortHouse = allStudents.sort(compareHouse);
  displayList(sortHouse);

  console.log(sortHouse);
}

function compareHouse(a, b) {
  if (a.house < b.house) {
    return -1;
  } else {
    return 1;
  }
}

// load json

async function loadJSON() {
  const response = await fetch(
    "https://petlatkea.dk/2020/hogwarts/students.json"
  );
  const jsonData = await response.json();
  console.log(jsonData);

  // when loaded, prepare data objects
  prepareObjects(jsonData);
}

// prepare data

function prepareObjects(jsonData) {
  allStudents = jsonData.map(prepareObject);

  displayList(allStudents);
}

function prepareObject(jsonObject) {
  //console.log(jsonObject);
  const student = Object.create(Student);

  // FULL NAME

  const fullnames = jsonObject.fullname.trim().toLowerCase();
  const house = jsonObject.house.trim().toLowerCase();
  const splitfullnames = fullnames.split(" ");

  // first name

  const first = splitfullnames[0];
  const firstLetter = first[0].toUpperCase();
  const firstLower = first.slice(1).toLowerCase();
  const firstName = firstLetter + firstLower;
  student.firstname = firstName;

  // last name

  const theLastSpace = fullnames.lastIndexOf(" ");
  const last = fullnames.substring(theLastSpace + 1, fullnames.length);
  const lastName = last[0].toUpperCase() + last.slice(1).toLowerCase();
  let nameWithhyphen;
  if (lastName.includes("-") === true) {
    nameWithhyphen =
      lastName[6].toUpperCase() + lastName.slice(7).toLowerCase();
    student.lastname = lastName.substring(0, 6) + nameWithhyphen;
  } else if (lastName === "Leanne") {
    student.lastname = "";
  } else {
    student.lastname = lastName;
  }

  // middle/nick name

  const theFirstSpace = fullnames.indexOf(" ");
  const middleName = fullnames.substring(theFirstSpace + 1, theLastSpace);
  let ernie;
  let james;
  let lucius;
  if (middleName.includes("er") === true) {
    ernie =
      middleName[0] +
      middleName[1].toUpperCase() +
      middleName.slice(2).toLowerCase();
    student.middlename = ernie;
  } else if (middleName.includes("luci") === true) {
    lucius = middleName[0].toUpperCase() + middleName.slice(1).toLowerCase();
    student.middlename = lucius;
  } else if (middleName.includes("jam") === true) {
    james = middleName[0].toUpperCase() + middleName.slice(1).toLowerCase();
    student.middlename = james;
  } else {
    student.middlename = middleName;
  }

  // HOUSE
  const firstletterHouse =
    house[0].toUpperCase() + house.slice(1).toLowerCase();
  student.house = firstletterHouse;

  // IMAGE

  const photo =
    lastName.toLowerCase() + "_" + firstName[0].toLowerCase() + ".png";
  let patilsPhoto =
    lastName.toLowerCase() + "_" + firstName.toLowerCase() + ".png";

  if (photo === "patil_p.png") {
    student.photo = patilsPhoto;
  } else {
    student.photo = photo;
  }

  return student;
}

// display data from the new student objects

function displayList(students) {
  console.log(student);

  // clear the list

  document.querySelector("#list tbody").innerHTML = "";

  const onlyGryffindor = students.filter(isGryffindor);
  const onlyRavenclaw = students.filter(isRavenclaw);
  const onlySlytherin = students.filter(isSlytherin);
  const onlyHufflepuff = students.filter(isHufflepuff);
  const everyStudent = students.filter(all);

  // build a new list

  students.forEach(displayStudent);
}
function displayStudent(student) {
  // create clone

  const template = document.querySelector("#student").content;
  const clone = document
    .querySelector("template#student")
    .content.cloneNode(true);

  // set clone data

  clone.querySelector(".studentAvatar").src = "hogwartsimages/" + student.photo;
  clone.querySelector("[data-field=firstname]").textContent = student.firstname;

  clone.querySelector("[data-field=lastname]").textContent = student.lastname;

  clone.querySelector("[data-field=house]").textContent = student.house;

  const modal = document.querySelector("#modaali");

  clone.querySelector("button").addEventListener("click", () => {
    modal.querySelector(".studentAvatar").src =
      "hogwartsimages/" + student.photo;
    modal.querySelector("#modal-name .firstname").textContent =
      student.firstname;
    modal.querySelector("#modal-name .middlename").textContent =
      student.middlename;
    modal.querySelector("#modal-name .lastname").textContent = student.lastname;

    modal.querySelector("#modal-name .house").textContent = student.house;

    // themes based on the house

    if (student.house === "Gryffindor") {
      modal.dataset.theme = "theme1";
    } else if (student.house === "Ravenclaw") {
      modal.dataset.theme = "theme2";
    } else if (student.house === "Slytherin") {
      modal.dataset.theme = "theme3";
    } else if (student.house === "Hufflepuff") {
      modal.dataset.theme = "theme4";
    }

    modal.classList.remove("hide");

    changeTheme(modal);
  });

  // append clone to list

  document.querySelector("#list tbody").appendChild(clone);
}

// CLOSE MODAL

const modal = document.querySelector("#modaali");
modal.addEventListener("click", () => {
  modal.classList.add("hide");
});

function changeTheme(house) {
  const theme = this.value;
  console.log(house);
  document.querySelector("#modaali").dataset.theme = theme;
}
