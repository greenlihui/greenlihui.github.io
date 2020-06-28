package com.greenlihui.jdbc;

import java.beans.PropertyVetoException;
import java.sql.Connection;
import java.sql.SQLException;

import javax.sql.DataSource;

import org.junit.Test;

import com.mchange.v2.c3p0.ComboPooledDataSource;

public class TestC3P0 {
	@Test
	public void test2() throws SQLException {
		DataSource source = new ComboPooledDataSource("helloc3p0");
		ComboPooledDataSource cpds = (ComboPooledDataSource) source;
		System.out.println(cpds.getConnection());
	}
	
	@Test
	public void test() {
		ComboPooledDataSource cpds = new ComboPooledDataSource();
		try {
			cpds.setDriverClass("com.mysql.jdbc.Driver");
		} catch (PropertyVetoException e) {
			e.printStackTrace();
		}
		cpds.setJdbcUrl("jdbc:mysql://localhost:3306/school");
		cpds.setUser("root");
		cpds.setPassword("*****");
		
		try {
			Connection conn = cpds.getConnection();
			System.out.println(conn);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
