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
