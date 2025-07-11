const UI = {
  employeeListContainer: document.getElementById("employee-list-container"),
  employeeForm: document.getElementById("employee-form"),
  dashboardSection: document.getElementById("dashboard"),
  formTitle: document.getElementById("form-title"),
  employeeIdInput: document.getElementById("employee-id"),
  firstNameInput: document.getElementById("firstName"),
  lastNameInput: document.getElementById("lastName"),
  emailInput: document.getElementById("email"),
  departmentInput: document.getElementById("department"),
  roleInput: document.getElementById("role"),
  paginationInfo: document.getElementById("page-info"),
  prevPageBtn: document.getElementById("prev-page-btn"),
  nextPageBtn: document.getElementById("next-page-btn"),

  renderEmployeeList: function (employees, onDelete, onEdit) {
    this.employeeListContainer.innerHTML = "";
    if (employees.length === 0) {
      this.employeeListContainer.innerHTML = "<p>No employees found.</p>";
      return;
    }

    employees.forEach((employee) => {
      const card = document.createElement("div");
      card.className = "employee-card";
      card.innerHTML = `
                <h3>${employee.firstName} ${employee.lastName}</h3>
                <p><strong>ID:</strong> ${employee.id}</p>
                <p><strong>Email:</strong> ${employee.email}</p>
                <p><strong>Department:</strong> ${employee.department}</p>
                <p><strong>Role:</strong> ${employee.role}</p>
                <div class="actions">
                    <button class="edit-btn" data-id="${employee.id}">Edit</button>
                    <button class="delete-btn" data-id="${employee.id}">Delete</button>
                </div>
            `;
      this.employeeListContainer.appendChild(card);
    });

    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", (e) =>
        onDelete(parseInt(e.target.dataset.id))
      );
    });
    document.querySelectorAll(".edit-btn").forEach((button) => {
      button.addEventListener("click", (e) =>
        onEdit(parseInt(e.target.dataset.id))
      );
    });
  },

  showDashboard: function () {
    this.dashboardSection.classList.remove("hidden");
    this.employeeForm.classList.add("hidden");
  },

  showEmployeeForm: function (isEdit = false) {
    this.dashboardSection.classList.add("hidden");
    this.employeeForm.classList.remove("hidden");
    this.formTitle.textContent = isEdit ? "Edit Employee" : "Add New Employee";
    Validation.clearValidationErrors("employee-details-form");
  },

  fillEmployeeForm: function (employee) {
    this.employeeIdInput.value = employee.id || "";
    this.firstNameInput.value = employee.firstName || "";
    this.lastNameInput.value = employee.lastName || "";
    this.emailInput.value = employee.email || "";
    this.departmentInput.value = employee.department || "";
    this.roleInput.value = employee.role || "";
  },

  clearEmployeeForm: function () {
    this.employeeIdInput.value = "";
    this.firstNameInput.value = "";
    this.lastNameInput.value = "";
    this.emailInput.value = "";
    this.departmentInput.value = "";
    this.roleInput.value = "";
    Validation.clearValidationErrors("employee-details-form");
  },

  getFormData: function () {
    return {
      id: this.employeeIdInput.value
        ? parseInt(this.employeeIdInput.value)
        : null,
      firstName: this.firstNameInput.value.trim(),
      lastName: this.lastNameInput.value.trim(),
      email: this.emailInput.value.trim(),
      department: this.departmentInput.value.trim(),
      role: this.roleInput.value.trim(),
    };
  },

  updatePaginationControls: function (currentPage, totalPages) {
    this.paginationInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    this.prevPageBtn.disabled = currentPage === 1;
    this.nextPageBtn.disabled = currentPage === totalPages;
  },

  toggleFilterPanel: function (show) {
    const filterPanel = document.getElementById("filter-panel");
    if (show) {
      filterPanel.classList.remove("hidden");
    } else {
      filterPanel.classList.add("hidden");
    }
  },
};
