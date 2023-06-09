// "use strict";

const registerForm = document.querySelector(".register-form");
const allInputs = registerForm.querySelectorAll("INPUT");
const addBtn = document.querySelector(".add-btn");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close-icon");
let registerBtn = document.querySelector("#register-btn");
const updateBtn = document.querySelector("#update-btn");
/////////////////////// ID SELECTOR 👇🏼///////////////////////

////////////////////// ADD EVENT LISTENER///////////////
addBtn.addEventListener("click", function () {
  modal.classList.remove("hidden");
});
closeBtn.addEventListener("click", function () {
  modal.classList.add("hidden");
  let i;
  for (i = 0; i < allInputs.length; i++) {
    allInputs[i].value = "";
  }
});

let allData = [];
var profile_Pic = document.querySelector("#profile-pic");
var uploadPic = document.querySelector("#upload-field");
const idEl = document.getElementById("identity");
const nameEl = document.getElementById("name");
const lastNameEl = document.getElementById("l-name");
const emailEl = document.getElementById("email");
const officeEl = document.getElementById("office");
const jobEl = document.getElementById("job");
let imgUrl;

if (localStorage.getItem("allData") != null) {
  allData = JSON.parse(localStorage.getItem("allData"));
  console.log(allData);
}
// Register button
registerBtn.addEventListener("click", function (e) {
  e.preventDefault();

  newRegister();
  registerForm.reset("");
  modal.classList.add("hidden");
});

function newRegister() {
  allData.push({
    id: idEl.value,
    name: nameEl.value,
    lastname: lastNameEl.value,
    email: emailEl.value,
    office: officeEl.value,
    job: jobEl.value,
    profilePic: imgUrl == undefined ? "/img/IMG_6494.JPG" : imgUrl,
  });
  const userString = JSON.stringify(allData);
  localStorage.setItem("allData", userString);
  Swal.fire("Good job!", "Registeration Success!", "success");
}

const tableData = document.querySelector(".table-data");
const getDataFromLocal = function () {
  tableData.innerHTML = "";
  allData.forEach((data, index) => {
    tableData.innerHTML += `
    <tr index="${index}">
          <td>${index + 1}</td>
          <td><img src="${
            data.profilePic
          }" border-radius="5px" width="40" height="45"/></td>
          <td>${data.id}</td>
          <td>${data.name}</td>
          <td>${data.lastname}</td>
          <td>${data.email}</td>
          <td>${data.office}</td>
          <td>${data.job}</td>
          <td>
            <button class="edit-btn"><i class="fa fa-eye"></i></button>
            <button class="delete-btn" style="background-color: #ee534f">
              <i class="fa fa-trash "></i>
            </button>
          </td>
        </tr>
    `;
  });
  let i;
  const deleteBtn = document.querySelectorAll(".delete-btn");

  for (i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener("click", function () {
      const tr = this.parentElement.parentElement;
      const id = tr.getAttribute("index");
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          allData.splice(id, 1);
          localStorage.setItem("allData", JSON.stringify(allData));
          tr.remove();
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    });
  }
  // Update button
  const editBtn = document.querySelectorAll(".edit-btn");
  for (i = 0; i < editBtn.length; i++) {
    editBtn[i].addEventListener("click", function () {
      const tr = this.parentElement.parentElement;
      const td = tr.querySelectorAll("TD");
      const index = tr.getAttribute("index");
      const imgTag = td[1].getElementsByTagName("IMG");
      const profileImg = imgTag[0].src;
      const id = td[2].innerHTML;
      const name = td[3].innerHTML;
      const lastname = td[4].innerHTML;
      const email = td[5].innerHTML;
      const office = td[6].innerHTML;
      const job = td[7].innerHTML;
      addBtn.click();
      registerBtn.disabled = true;
      updateBtn.disabled = false;
      idEl.value = id;
      nameEl.value = name;
      lastNameEl.value = lastname;
      emailEl.value = email;
      officeEl.value = office;
      jobEl.value = job;
      profile_Pic.src = profileImg;
      updateBtn.addEventListener("click", function (e) {
        allData[index] = {
          id: idEl.value,
          name: nameEl.value,
          lastname: lastNameEl.value,
          email: emailEl.value,
          office: officeEl.value,
          job: jobEl.value,
          profileImg: uploadPic.value == "" ? profile_Pic.src : imgUrl,
        };
        localStorage.setItem("allData", JSON.stringify(allData));
      });
    });
  }
};
getDataFromLocal();

uploadPic.onchange = function () {
  if (uploadPic.files[0].size < 1000000) {
    let fReader = new FileReader();
    fReader.onload = function (e) {
      imgUrl = e.target.result;
      profile_Pic.src = imgUrl;
    };
    fReader.readAsDataURL(uploadPic.files[0]);
  } else {
    alert("File size is to long");
  }
};

/////////////////////// for searching section/////////////////////

const search = document.querySelector("#empid");
search.oninput = function () {
  searchFunc();
};
function searchFunc() {
  const tr = tableData.querySelectorAll("TR");
  const filter = search.value.toLowerCase();
  let i;
  for (i = 0; i < tr.length; i++) {
    const id = tr[i].getElementsByTagName("TD")[2].innerHTML;
    const names = tr[i].getElementsByTagName("TD")[3].innerHTML;
    const lastnames = tr[i].getElementsByTagName("TD")[4].innerHTML;
    const emails = tr[i].getElementsByTagName("TD")[5].innerHTML;

    if (id.toLowerCase().indexOf(filter) > -1) {
      tr[i].style.display = "";
    } else if (names.toLowerCase().indexOf(filter) > -1) {
      tr[i].style.display = "";
    } else if (lastnames.toLowerCase().indexOf(filter) > -1) {
      tr[i].style.display = "";
    } else if (emails.toLowerCase().indexOf(filter) > -1) {
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none";
    }
  }
}

//// Erasing data from the table/////

const deleteAllData = document.querySelector(".delete-data");
const deleteAllBox = document.querySelector(".del-all-box");
deleteAllData.addEventListener("click", function () {
  if (deleteAllBox.checked == true) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("allData");
        window.location = location.href;
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  } else {
    Swal.fire("Check The Box!", "Please Check The Box Data!", "warning");
  }
});
