package io.nology.dcsemployees;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.verify;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;

import io.nology.dcsemployees.employee.Employee;
import io.nology.dcsemployees.employee.EmployeeDTO;
import io.nology.dcsemployees.employee.EmployeeRepository;
import io.nology.dcsemployees.employee.EmployeeService;

@ExtendWith(MockitoExtension.class)
public class EmployeeServiceTest {

	@Mock
	private EmployeeRepository employeeRepository;
	
	@Mock
	private EmployeeService employeeService;
	
	@Captor ArgumentCaptor<Employee> employeeArgumentCaptor;

	@BeforeEach
	void setUp() {
		EmployeeService employeeService = new EmployeeService();
	}

	@Test()
	@Disabled
	void getAllEmployeesTest() throws Exception {
		List<Employee> employeeList = new ArrayList<Employee>();
		Mockito.when(employeeRepository.findAll()).thenReturn(employeeList); // mocked

		List<EmployeeDTO> result = employeeService.getAllEmployees(); // actual method

		if (result.isEmpty()) {
		}

		verify(employeeRepository).findAll();
	}

	@Test()
	void canAddEmployee() {
		Employee employee1 = new Employee( "Sally",  "Lisa",  "Jones",  "sally@email.com",  "0123456789",
				 "123 Happy St, NSW",  "contract",  LocalDate.of(2018, 03, 12),  LocalDate.of(2024, 01, 29),
				 false,  "part-time",  40.0f);
		
		EmployeeDTO employeeDTO = employeeService.convertToDto(employee1);
		
		
		
//		ArgumentCaptor<Employee> employeeArgumentCaptor = new ArgumentCaptor.forClass(Employee.class);
		employeeService.createEmployee(employeeDTO);
		verify(employeeRepository).save(employeeArgumentCaptor.capture()); // captureing the passed parameter value
		
		Employee captured = employeeArgumentCaptor.getValue();
		assertThat(captured).isEqualTo(employee1);
		
	}
	
//	@Test()
//	void will() {
//		Employee employee1 = new Employee( "Sally",  "Lisa",  "Jones",  "sally@email.com",  "0123456789",
//				 "123 Happy St, NSW",  "contract",  LocalDate.of(2018, 03, 12),  LocalDate.of(2024, 01, 29),
//				 false,  "part-time",  40.0f);
//		
////		ArgumentCaptor<Employee> employeeArgumentCaptor = new ArgumentCaptor.forClass(Employee.class);
//		
//		verify(employeeRepository).delete(employeeArgumentCaptor.capture()); // captureing the passed parameter value
//		
//		int capturedId = employeeArgumentCaptor.getValue();
//		assertThat(captured).isEqualTo(employee1);
//		
//	}

}
