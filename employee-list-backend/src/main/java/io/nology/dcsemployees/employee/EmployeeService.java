package io.nology.dcsemployees.employee;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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
		String upperCasedFirstName = capitaliseStr(employeeDTO.getFirstName());
		String upperCasedMiddleName = null;
		if (employeeDTO.getMiddleName() != null) {
			upperCasedMiddleName = capitaliseStr(employeeDTO.getMiddleName());
		}
		String upperCasedLastName = capitaliseStr(employeeDTO.getLastName());

		// Return null if starting dat is later than finishing date
		if (employeeDTO.getFinishDate() != null && convertLocalDateToInt(employeeDTO.getStartDate()) >= convertLocalDateToInt(employeeDTO.getFinishDate())) {
			return null;
		}

		// Converting DTO to Employee entity
		Employee newEmployee = convertToEntity(employeeDTO, upperCasedFirstName, upperCasedMiddleName,
				upperCasedLastName);

		// Saving a new employee
		Employee savedEmployee = this.repositry.save(newEmployee);

		// Convert a saved Employee to DTO and return it
		return convertToDto(savedEmployee);
	}

	public EmployeeDTO updateEmployee(Long id, EmployeeDTO employeeDTO) {
		Optional<Employee> employee = this.repositry.findById(id);

		// Create a new employee if an employee doesn't exist
		if (employee.isEmpty())
			this.createEmployee(employeeDTO);

		Employee existingEmployee = employee.get();

		modelMapper.map(employeeDTO, existingEmployee);
		existingEmployee = this.repositry.save(existingEmployee);

		return convertToDto(existingEmployee);
	}

	public boolean deleteEmployee(Long id) {
		Optional<Employee> employee = this.repositry.findById(id);
		if (employee.isEmpty())
			return false;

		this.repositry.deleteById(id);
		return true;
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

	// Helper function to Capitalise a passed string
	private String capitaliseStr(String inputStr) {
		return inputStr.substring(0, 1).toUpperCase() + inputStr.substring(1);
	}

	// Helper function to convert localdate to int value
	public int convertLocalDateToInt(LocalDate date) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
		String formattedString = date.format(formatter);
		System.out.println(Integer.parseInt(formattedString));
		return Integer.parseInt(formattedString);
	}
}
