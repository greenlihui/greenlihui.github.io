package com.greenlihui.jdbc;

import java.sql.Date;

public class Student {
	private int id;
	private String name;
	private String password;
	private Date birth;
	
	public Student(int id, String name, String password, Date birth) {
		this.id = id;
		this.name = name;
		this.password = password;
		this.birth = birth;
	}
	public Student() {
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Date getBirth() {
		return birth;
	}
	public void setBirth(Date birth) {
		this.birth = birth;
	}
	
	@Override
	public String toString() {
		
		return String.format("%s : [ %d, %s, %s ]", name, id, password, birth);
	}
	
}
