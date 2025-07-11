

let employees = []; 
let allEmployees = [...mockEmployees]; 
let currentPage = 1;
let itemsPerPage = 10;
let currentFilters = { department: "", role: "" };
let currentSort = "";
let currentSearch = "";


function generateUniqueId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

function applyFiltersAndSort() {
  let filteredAndSorted = [...allEmployees]; 

  
  if (currentSearch) {
    const searchTerm = currentSearch.toLowerCase();
    filteredAndSorted = filteredAndSorted.filter(
      (emp) =>
        emp.firstName.toLowerCase().includes(searchTerm) ||
        emp.lastName.toLowerCase().includes(searchTerm) ||
        emp.email.toLowerCase().includes(searchTerm)
    );
  }

  if (currentFilters.department) {
    filteredAndSorted = filteredAndSorted.filter((emp) =>
      emp.department
        .toLowerCase()
        .includes(currentFilters.department.toLowerCase())
    );
  }
  if (currentFilters.role) {
    filteredAndSorted = filteredAndSorted.filter((emp) =>
      emp.role.toLowerCase().includes(currentFilters.role.toLowerCase())
    );
  }


  if (currentSort === "firstName") {
    filteredAndSorted.sort((a, b) => a.firstName.localeCompare(b.firstName));
  } else if (currentSort === "department") {
    filteredAndSorted.sort((a, b) => a.department.localeCompare(b.department));
  }

  employees = filteredAndSorted; 
  currentPage = 1; 
  renderCurrentPage();
}

function renderCurrentPage() {
  const totalPages = Math.ceil(employees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const employeesToDisplay = employees.slice(startIndex, endIndex);

  UI.renderEmployeeList(employeesToDisplay, handleDelete, handleEdit);
  UI.updatePaginationControls(currentPage, totalPages);
}



function handleDelete(id) {
  if (confirm("Are you sure you want to delete this employee?")) {
    allEmployees = allEmployees.filter((emp) => emp.id !== id); 
    applyFiltersAndSort(); 
    alert("Employee deleted successfully!");
  }
}

function handleEdit(id) {
  const employeeToEdit = allEmployees.find((emp) => emp.id === id);
  if (employeeToEdit) {
    UI.fillEmployeeForm(employeeToEdit);
    UI.showEmployeeForm(true); 
  } else {
    alert("Employee not found!");
  }
}

function handleSaveEmployee(event) {
  event.preventDefault(); 

  if (!Validation.validateForm("employee-details-form")) {
    return; 
  }

  const formData = UI.getFormData();

  if (formData.id) {
 
    const index = allEmployees.findIndex((emp) => emp.id === formData.id);
    if (index !== -1) {
      allEmployees[index] = { ...allEmployees[index], ...formData }; 
      alert("Employee updated successfully!");
    }
  } else {
    
    const newEmployee = { ...formData, id: generateUniqueId() };
    allEmployees.push(newEmployee);
    alert("Employee added successfully!");
  }

  UI.clearEmployeeForm();
  UI.showDashboard();
  applyFiltersAndSort(); 
}

function handleCancelForm() {
  UI.clearEmployeeForm();
  UI.showDashboard();
}

function handleSearchInput() {
  currentSearch = this.value;
  applyFiltersAndSort();
}

function handleSortChange() {
  currentSort = this.value;
  applyFiltersAndSort();
}

function handleFilterToggle() {
  const filterPanel = document.getElementById("filter-panel");
  UI.toggleFilterPanel(filterPanel.classList.contains("hidden"));
}

function handleApplyFilter() {
  currentFilters.department =
    document.getElementById("filter-department").value;
  currentFilters.role = document.getElementById("filter-role").value;
  applyFiltersAndSort();
  UI.toggleFilterPanel(false); 
}

function handleClearFilter() {
  document.getElementById("filter-department").value = "";
  document.getElementById("filter-role").value = "";
  currentFilters.department = "";
  currentFilters.role = "";
  applyFiltersAndSort();
  UI.toggleFilterPanel(false); 
}

function handlePrevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderCurrentPage();
  }
}

function handleNextPage() {
  const totalPages = Math.ceil(employees.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderCurrentPage();
  }
}

function handleItemsPerPageChange() {
  itemsPerPage = parseInt(this.value);
  currentPage = 1; 
  renderCurrentPage();
}


document.addEventListener("DOMContentLoaded", () => {
  
  applyFiltersAndSort(); 


  document.getElementById("add-employee-btn").addEventListener("click", () => {
    UI.clearEmployeeForm(); 
    UI.showEmployeeForm(false);
  });
  document
    .getElementById("search-input")
    .addEventListener("input", handleSearchInput);
  document
    .getElementById("sort-by")
    .addEventListener("change", handleSortChange);
  document
    .getElementById("filter-btn")
    .addEventListener("click", handleFilterToggle);
  document
    .getElementById("apply-filter-btn")
    .addEventListener("click", handleApplyFilter);
  document
    .getElementById("clear-filter-btn")
    .addEventListener("click", handleClearFilter);

  
  document
    .getElementById("employee-details-form")
    .addEventListener("submit", handleSaveEmployee);
  document
    .getElementById("cancel-form-btn")
    .addEventListener("click", handleCancelForm);

  document
    .getElementById("prev-page-btn")
    .addEventListener("click", handlePrevPage);
  document
    .getElementById("next-page-btn")
    .addEventListener("click", handleNextPage);
  document
    .getElementById("items-per-page")
    .addEventListener("change", handleItemsPerPageChange);

});
