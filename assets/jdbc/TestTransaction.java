package com.greenlihui.jdbc;

import java.sql.Connection;
import java.sql.Statement;

import org.junit.Test;

public class TestTransaction {
	@Test
	public void test() {
		Connection conn = null;
		Statement stmt = null;
		try {
			conn = JDBCTools.getConnection();
			conn.setAutoCommit(false);
			stmt = conn.createStatement();
			
			String sql1 = "UPDATE customers SET cbalance = (cbalance - 500) WHERE cid = 1";
			stmt.executeUpdate(sql1);
			
			// int i = 10 / 0;
			
			String sql2 = "UPDATE customers SET cbalance = (cbalance + 500) WHERE cid = 2";
			stmt.executeUpdate(sql2);
			
			conn.commit();
		} catch (Exception e) {
			e.printStackTrace();
			try {
		        conn.rollback();
		    } catch (Exception e2) {
		        e2.printStackTrace();
		    } 
		} finally {
			JDBCTools.release(null, stmt, conn);
		}
	}
}
