function getEmployeeById(id) {
  return mockEmployees.find((emp) => emp.id === id);
}
function addEmployee(employee) {
  mockEmployees.push(employee);
}
function updateEmployee(id, updated) {
  const idx = mockEmployees.findIndex((emp) => emp.id === id);
  if (idx !== -1) mockEmployees[idx] = { ...mockEmployees[idx], ...updated };
}
function deleteEmployee(id) {
  const idx = mockEmployees.findIndex((emp) => emp.id === id);
  if (idx !== -1) mockEmployees.splice(idx, 1);
}
