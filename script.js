const addEmployeeBtn = document.querySelector(".add-employee-btn");
const formContainer = document.querySelector(".form-container");
const body = document.querySelector("body");
const submitBtn = document.querySelector(".submit-btn");
const employeesList = document.querySelector(".employees-list");

// function to dismiss form container when the website is clicked anywhere
body.addEventListener("click", (e) => {
  if (!formContainer.contains(e.target) && e.target !== addEmployeeBtn) {
    formContainer.style.display = "none";
  }
});

// function to show the form container
addEmployeeBtn.addEventListener("click", (e) => {
  formContainer.style.display = "block";
});

// using local storage to add employees in it
function addEmployeeToLocalStorage(name, address, empId, designation) {
  let employees = JSON.parse(localStorage.getItem("employees")) || [];

  const employee = {
    name: name,
    address: address,
    empId: empId,
    designation: designation,
  };

  employees.push(employee);

  localStorage.setItem("employees", JSON.stringify(employees));
}

// fetching all the elements from the localstorage and displaying
function displayEmployeesList() {
  employeesList.innerHTML = "";
  let employees = JSON.parse(localStorage.getItem("employees")) || [];

  // creating a div and then storing the content in it
  employees.forEach((employee, index) => {
    let element = document.createElement("div");
    let content = document.createElement("p");
    let editButton = document.createElement("button");
    editButton.innerText = "Edit";
    content.innerText = employee.name;
    element.append(content);
    element.append(editButton);
    element.classList.add("employee");
    editButton.addEventListener("click", (e) => {
      // this method is used to stop the propogation of the event to the parent
      e.stopPropagation();
      editEmployee(employee, index);
    });
    element.addEventListener("click", () => {
      showEmployeeDetailsPopup(employee);
    });
    employeesList.append(element);
  });
}

// when an employee is clicked then a popup with all the details of the selected employee is displayed
function showEmployeeDetailsPopup(employee) {
  let popup = document.createElement("div");
  popup.classList.add("popup");

  let closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  closeButton.classList.add("close-button");
  closeButton.addEventListener("click", () => {
    popup.remove();
  });

  let detailsDiv = document.createElement("div");
  detailsDiv.innerHTML = `
      <p><strong>Name:</strong> ${employee.name}</p>
      <p><strong>Address:</strong> ${employee.address}</p>
      <p><strong>Employee ID:</strong> ${employee.empId}</p>
      <p><strong>Designation:</strong> ${employee.designation}</p>
    `;

  popup.appendChild(closeButton);
  popup.appendChild(detailsDiv);

  document.body.appendChild(popup);
}

function editEmployee(employee, index) {
  document.getElementById("name").value = employee.name;
  document.getElementById("address").value = employee.address;
  document.getElementById("empId").value = employee.empId;
  document.getElementById("designation").value = employee.designation;

  // setting the mode and content value to reuse the add employee form for updating the details
  submitBtn.textContent = "Update";
  submitBtn.dataset.mode = "edit";
  submitBtn.dataset.index = index;

  formContainer.style.display = "block";
}

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let name = document.getElementById("name").value;
  let address = document.getElementById("address").value;
  let empId = document.getElementById("empId").value;
  let designation = document.getElementById("designation").value;

  if (submitBtn.dataset.mode === "edit") {
    // Update existing employee
    let index = parseInt(submitBtn.dataset.index);
    let employees = JSON.parse(localStorage.getItem("employees")) || [];
    employees[index] = { name, address, empId, designation };
    localStorage.setItem("employees", JSON.stringify(employees));
  } else {
    // Add new employee
    addEmployeeToLocalStorage(name, address, empId, designation);
  }

  formContainer.style.display = "none";
  displayEmployeesList();
});

document.addEventListener("DOMContentLoaded", displayEmployeesList);
