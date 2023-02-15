package io.nology.dcsemployees.employee;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class Employee {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column
	private String firstName;

	@Column
	private String middleName; // optional

	@Column
	private String lastName;

	@Column
	private String email;

	@Column
	private String mobile;

	@Column
	private String residentialAddress;

	@Column
	private String contractType;

	@Column
	@JsonFormat(pattern = "dd-MM-yyyy")
	private LocalDate startDate;

	@Column
	@JsonFormat(pattern = "dd-MM-yyyy")
	private LocalDate finishDate;

	@Column
	private boolean isOnGoing;

	@Column
	private String workTimeType;

	@Column
	private float hoursPerWeek; // 38h for a full-time

	// Default constructor for spring
	public Employee() {
	}

	// Custom constructor
	public Employee(String firstName, String middleName, String lastName, String email, String mobile,
			String residentialAddress, String contractType, LocalDate startDate, LocalDate finishDate,
			boolean isOnGoing, String workTimeType, float hoursPerWeek) {
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
		this.email = email;
		this.mobile = mobile;
		this.residentialAddress = residentialAddress;
		this.contractType = contractType;
		this.startDate = startDate;
		this.finishDate = finishDate;
		this.isOnGoing = isOnGoing;
		this.workTimeType = workTimeType;
		this.hoursPerWeek = hoursPerWeek;
	}

	// Custom constructor without middle name and finish date
	public Employee(String firstName, String lastName, String email, String mobile, String residentialAddress,
			String contractType, LocalDate startDate, boolean isOnGoing, String workTimeType,
			float hoursPerWeek) {
		this(firstName, null, lastName, email, mobile, residentialAddress, contractType, startDate, null,
				isOnGoing, workTimeType, hoursPerWeek);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

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
	
}
