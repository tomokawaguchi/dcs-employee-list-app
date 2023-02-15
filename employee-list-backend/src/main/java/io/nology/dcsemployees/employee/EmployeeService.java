package io.nology.dcsemployees.employee;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class EmployeeService {

	@Autowired
	private EmployeeRepository repositry;

	@Autowired
	private ModelMapper modelMapper;

	public List<EmployeeDTO> getAllEmployees() {
		List<Employee> employeeList = this.repositry.findAll();
		// Map through a list to convert employee to employee dto
		List<EmployeeDTO> employeeDTOList = employeeList.stream().map(this::convertToDto).collect(Collectors.toList());
		return employeeDTOList;
	}

	public EmployeeDTO getEmployeeById(Long id) {
		Employee employee = this.repositry.findById(id).orElse(null); // employee or null

		return convertToDto(employee);
	}

	public EmployeeDTO createEmployee(EmployeeDTO employeeDTO) {
		// Make all the name related fields to be upper cased
		String upperCasedFirstName = employeeDTO.getFirstName().substring(0, 1).toUpperCase()
				+ employeeDTO.getFirstName().substring(1);
		String upperCasedMiddleName = null;
		if (employeeDTO.getMiddleName() != null) {
			upperCasedMiddleName = employeeDTO.getMiddleName().substring(0, 1).toUpperCase()
					+ employeeDTO.getMiddleName().substring(1);
		}
		String upperCasedLastName = employeeDTO.getLastName().substring(0, 1).toUpperCase()
				+ employeeDTO.getLastName().substring(1);

		// Converting DTO to Employee entity
		Employee newEmployee = convertToEntity(employeeDTO, upperCasedFirstName, upperCasedMiddleName,
				upperCasedLastName);

		// Saving a new employee
		Employee savedEmployee = this.repositry.save(newEmployee);

		// Convert a saved Employee to DTO and return it
		return convertToDto(savedEmployee);
	}

	public boolean updateEmployee(Long id, EmployeeDTO employeeDTO) {
		Optional<Employee> employee = this.repositry.findById(id);

		if (employee.isEmpty())
			return false;

		Employee existingEmployee = employee.get();

		modelMapper.map(employeeDTO, existingEmployee);
		existingEmployee = this.repositry.save(existingEmployee);

		return true;
	}

	public void deleteEmployee(Long id) {
		this.repositry.deleteById(id);
	}

	// Helper function to convert entity to DTO
	private EmployeeDTO convertToDto(Employee employee) {
		if (employee == null)
			return null;

		EmployeeDTO employeeDto = this.modelMapper.map(employee, EmployeeDTO.class);
		return employeeDto;
	}

	// Helper function to convert DTO to entity
	private Employee convertToEntity(EmployeeDTO employeeDTO, String upperCasedFirstName, String upperMiddleFirstName,
			String upperCasedLastName) {
		Employee employee = this.modelMapper.map(employeeDTO, Employee.class);

		employee.setFirstName(upperCasedFirstName);
		employee.setMiddleName(upperMiddleFirstName);
		employee.setLastName(upperCasedLastName);

		return employee;
	}
}
