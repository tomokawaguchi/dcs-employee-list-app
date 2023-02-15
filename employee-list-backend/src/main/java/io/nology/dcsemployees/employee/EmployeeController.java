package io.nology.dcsemployees.employee;

import org.springframework.web.bind.annotation.RestController;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/employees")
@CrossOrigin(origins = "http://127.0.0.1:5173/")
public class EmployeeController {
	
	// Initializing logger to log details when methods are used:
    Logger logger = LoggerFactory.getLogger(EmployeeController.class);	
	
	@Autowired
	private EmployeeService service;

	@GetMapping
	public ResponseEntity<List<EmployeeDTO>> getAllEmployees() {
		List<EmployeeDTO> allEmployeesDTO = this.service.getAllEmployees();
		this.logger.info("Retrieved all employees successfully");
		return new ResponseEntity<>(allEmployeesDTO, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<EmployeeDTO> getEmployeeById(@PathVariable Long id) {
		EmployeeDTO employeeDTO = this.service.getEmployeeById(id);
		// No employee exist with given id
		if (employeeDTO == null) {
			logger.error("Employee not found with id: " + id);
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}	
		
		logger.info("Successfully retrieved an employee with id: " + id);
		return new ResponseEntity<>(employeeDTO, HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<EmployeeDTO> createEmployee(@RequestBody EmployeeDTO employeeDTO) {
		EmployeeDTO savedEmployeeDTO = this.service.createEmployee(employeeDTO);
		logger.info("Successfully created a new employee");
		return new ResponseEntity<>(savedEmployeeDTO, HttpStatus.CREATED);	
	}

	@PutMapping("/{id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody EmployeeDTO employeeDTO) {
		boolean result = this.service.updateEmployee(id, employeeDTO);

		if (result) {
			logger.error("Employee not found with id: " + id);
			return new ResponseEntity<>(null, HttpStatus.OK);
		}
		
		logger.info("Successfully updated an employee with id: " + id);
		return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
		this.service.deleteEmployee(id);
		
		logger.info("Successfully deleted an employee with id: " + id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
