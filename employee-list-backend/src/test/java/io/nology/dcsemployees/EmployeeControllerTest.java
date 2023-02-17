package io.nology.dcsemployees;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import io.nology.dcsemployees.employee.EmployeeController;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class EmployeeControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private EmployeeController controller;
	

	// Ensures that the controller has been initialised
	@Test
	public void controllerInitializedCorrectly() {
		assertThat(controller).isNotNull();
	}

	@Test
	public void testGetAllEmployees() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/employees")).andExpect(status().isOk());
	}

	@Test
	public void testDeleteEmployeError() throws Exception {
		MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.delete("/employees/5")).andReturn(); // non
																											// existing
																											// id
		int status = mvcResult.getResponse().getStatus();
		assertEquals(404, status);
	}

	@Test
	public void testDeleteEmployeeSuccess() throws Exception {
		MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.delete("/employees/8")).andReturn(); // existing id
		int status = mvcResult.getResponse().getStatus();
		assertEquals(204, status);
	}

}






//@Before
//public void setUp() {
//	JacksonTester.initFields(this, objectMapper);
//			
//	EmployeeDTO employeeDTO1 = new EmployeeDTO();
//	employeeDTO1.setFirstName("Sally");
//	employeeDTO1.setMiddleName(null);
//	employeeDTO1.setLastName("Jones");
//	employeeDTO1.setEmail("sally@email.com");
//    employeeDTO1.setMobile("0123456789");
//    employeeDTO1.setResidentialAddress("123 Happy St, NSW");
//    employeeDTO1.setContractType("contract");
//    employeeDTO1.setStartDate(LocalDate.of(03, 05, 2018));
//    employeeDTO1.setFinishDate(LocalDate.of(22, 11, 2025));
//    employeeDTO1.setWorkTimeType("part-time");
//    employeeDTO1.setHoursPerWeek(38);
//	employeeDTO1.setOnGoing(false);
//	
//	EmployeeDTO employeeDTO2 = new EmployeeDTO();
//	employeeDTO2.setFirstName("Henry");
//	employeeDTO2.setMiddleName(null);
//	employeeDTO2.setLastName("Knite");
//	employeeDTO2.setEmail("henry@email.com");
//    employeeDTO2.setMobile("0123456789");
//    employeeDTO2.setResidentialAddress("999 Awesome St, NSW");
//    employeeDTO2.setContractType("contract");
//    employeeDTO2.setStartDate(LocalDate.of(15, 12, 2020));
//    employeeDTO2.setFinishDate(null);
//    employeeDTO2.setWorkTimeType("full-time");
//    employeeDTO2.setHoursPerWeek(38);
//	employeeDTO2.setOnGoing(true);
//}
//
//
//@Test
//public void getEmployeeByIdReturnsCorrectJson() throws Exception {
//    final String personDTOJson = personDTOJsonTester.write(employeeDTO).getJson();
//    final String personDTORequestParameter = "personDTO=" + personDTOJson;
//    final String outputJson = personDTOJson;
//    mockMvc
//        .perform(get("/getPersonDTO?" + personDTORequestParameter))
//        .andExpect(status().isOk())
//        .andExpect(content().json(outputJson));
//}


//@Test
//public void testGetEmployeeById() {
////	employeeController.getEmployeeById(1L).thenReturn(null)
//  EmployeeDTO employeeDTO = new EmployeeDTO();
//  Employee employee = new Employee();
////  Optional<Employee> optionalEmployee = Optional.ofNullable(new Employee());
//  Mockito.when(employeeRepository.findById(0l)).thenReturn(Optional.of(employee));
//  employeeController.getEmployeeById(0l).equals(null);
//  verify(employeeRepository).findById(0l);
//  Assertions.assertNull();

//	Employee employee = employeeRepository.findById(1L).get();
//
//	MatcherAssert.assertThat(1L, employee.getId());

//  .thenReturn(null).thenThrow(new HttpClientErrorException(HttpStatus.NOT_FOUND))
//}


//
//{
//"id": 8,
//"firstName": "Amy",
//"middleName": "Ash",
//"lastName": "Chen",
//"email": "amy@gmail.com",
//"mobile": "0123456789",
//"residentialAddress": "NSW",
//"contractType": "contract",
//"startDate": "23-05-2018",
//"finishDate": null,
//"workTimeType": "part-time",
//"hoursPerWeek": 39.0,
//"onGoing": true
//}

//  Optional<Employee> optionalEmployee = Optional.ofNullable(new Employee());
//  ResponseEntity<EmployeeDTO> employeeDto = employeeController.getEmployeeById(1L);
//
//  
//  EmployeeDTO foundEmployee = employeeService.convertToDto(new Employee());
//
//  verify(employeeRepositry).findById(1l);
//
//  assertEquals(1l, employeeDTO.getId().longValue());



//@Test
//public void testCreateEmployee() throws Exception {
//	EmployeeDTO employeeDTO = new EmployeeDTO();
//  mockMvc.perform(MockMvcRequestBuilders.post("/employees").contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(employeeDTO))).andExpect(status().isCreated());
//}

//@Test
//public void testDeleteEmployee() throws Exception {
//  mockMvc.perform(MockMvcRequestBuilders.delete("/employees/5")).andExpect(status().isNoContent());
//}




//@Before
// public void setUp() {
//		EmployeeDTO employeeDTO1 = new EmployeeDTO();
//		employeeDTO1.setFirstName("Sally");
//		employeeDTO1.setMiddleName(null);
//		employeeDTO1.setLastName("Jones");
//		employeeDTO1.setEmail("sally@email.com");
//     employeeDTO1.setMobile("0123456789");
//     employeeDTO1.setResidentialAddress("123 Happy St, NSW");
//     employeeDTO1.setContractType("contract");
//     employeeDTO1.setStartDate(LocalDate.of(03, 05, 2018));
//     employeeDTO1.setFinishDate(LocalDate.of(22, 11, 2025));
//     employeeDTO1.setWorkTimeType("part-time");
//     employeeDTO1.setHoursPerWeek(38);
//		employeeDTO1.setOnGoing(false);
	
//		EmployeeDTO employeeDTO2 = new EmployeeDTO();
//		employeeDTO2.setFirstName("Henry");
//		employeeDTO2.setMiddleName(null);
//		employeeDTO2.setLastName("Knite");
//		employeeDTO2.setEmail("henry@email.com");
//     employeeDTO2.setMobile("0123456789");
//     employeeDTO2.setResidentialAddress("999 Awesome St, NSW");
//     employeeDTO2.setContractType("contract");
//     employeeDTO2.setStartDate(LocalDate.of(15, 12, 2020));
//     employeeDTO2.setFinishDate(null);
//     employeeDTO2.setWorkTimeType("full-time");
//     employeeDTO2.setHoursPerWeek(38);
//		employeeDTO2.setOnGoing(true);
//	}
