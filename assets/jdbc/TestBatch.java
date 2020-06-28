package com.greenlihui.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;

import org.junit.Test;

public class TestBatch {

	@Test
	public void test1() {
		Connection conn = null;
		PreparedStatement ps = null;
		String sql = "INSERT INTO customers VALUES (?, ?, ?)";
		try {
			conn = JDBCTools.getConnection();
			ps = conn.prepareStatement(sql);
			long start = System.currentTimeMillis();
			for (int i = 3; i < 10000; i++) {
				ps.setInt(1, i);
				ps.setString(2, "test" + i);
				ps.setInt(3, 1000);

				ps.addBatch();
				if ((i + 1) % 30 == 0) {
					ps.executeBatch();
					ps.clearBatch();
				}
			}
			if (10000 % 30 != 0) {
				ps.execute();
				ps.clearBatch();
			}
			long end = System.currentTimeMillis();
			System.out.println(end - start);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			JDBCTools.release(null, ps, conn);
		}
	}//13566
	
	@Test
	public void test2() {
		Connection conn = null;
		PreparedStatement ps = null;
		String sql = "INSERT INTO customers VALUES (?, ?, ?)";
		try {
			conn = JDBCTools.getConnection();
			ps = conn.prepareStatement(sql);
			long start = System.currentTimeMillis();
			for (int i = 3; i < 10000; i++) {
				ps.setInt(1, i);
				ps.setString(2, "test" + i);
				ps.setInt(3, 1000);

				ps.executeUpdate();
			}
			long end = System.currentTimeMillis();
			System.out.println(end - start);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			JDBCTools.release(null, ps, conn);
		}
	}//13554
}
