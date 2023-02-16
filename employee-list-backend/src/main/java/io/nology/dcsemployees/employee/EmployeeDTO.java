package io.nology.dcsemployees.employee;

import java.time.LocalDate;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonFormat;

public class EmployeeDTO {

	private Long id;

	@NotBlank
	private String firstName;

	private String middleName; // optional

	@NotBlank
	private String lastName;

	@Email
	private String email;

	@NotEmpty
	@Size(min = 10, max = 10)
	private String mobile;

	@NotBlank
	private String residentialAddress;

	@NotBlank
	private String contractType;

	@JsonFormat(pattern = "dd-MM-yyyy")
	private LocalDate startDate;

	@JsonFormat(pattern = "dd-MM-yyyy")
	private LocalDate finishDate;

	@NotNull
	private boolean isOnGoing;

	@NotBlank
	private String workTimeType;

	@NotBlank
	private float hoursPerWeek;

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getMiddleName() {
		return middleName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getResidentialAddress() {
		return residentialAddress;
	}

	public void setResidentialAddress(String residentialAddress) {
		this.residentialAddress = residentialAddress;
	}

	public String getContractType() {
		return contractType;
	}

	public void setContractType(String contractType) {
		this.contractType = contractType;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public LocalDate getFinishDate() {
		return finishDate;
	}

	public void setFinishDate(LocalDate finishDate) {
		this.finishDate = finishDate;
	}

	public String getWorkTimeType() {
		return workTimeType;
	}

	public void setWorkTimeType(String workTimeType) {
		this.workTimeType = workTimeType;
	}

	public float getHoursPerWeek() {
		return hoursPerWeek;
	}

	public void setHoursPerWeek(float hoursPerWeek) {
		this.hoursPerWeek = hoursPerWeek;
	}

	public boolean isOnGoing() {
		return isOnGoing;
	}

	public void setOnGoing(boolean isOnGoing) {
		this.isOnGoing = isOnGoing;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

}
