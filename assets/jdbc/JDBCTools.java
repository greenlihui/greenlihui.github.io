package com.greenlihui.jdbc;

import java.io.FileInputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Properties;

public class JDBCTools {

	/**
	 * use PreparedStatement to execute DML or DDL of SQL
	 * 
	 * @param sql
	 * @param args
	 */
	public static void update(String sql, Object... args) {
		Connection conn = null;
		PreparedStatement ps = null;
		try {
			conn = getConnection();
			ps = conn.prepareStatement(sql);

			for (int i = 0; i < args.length; i++) {
				ps.setObject(i + 1, args[i]);
			}

			ps.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			release(null, ps, conn);
		}
	}

	/**
	 * insert data into database and get its auto generated key.
	 * @param sql
	 * @param args
	 * @return
	 */
	public static Object insertAndGetPrimaryKey(String sql, Object... args) {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		Object key = -1;
		try {
			conn = getConnection();
			ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
			for (int i = 0; i < args.length; i++) {
				ps.setObject(i + 1, args[i]);
			}
			ps.executeUpdate();
			rs = ps.getGeneratedKeys();
			if (rs.next()) {
				key = rs.getObject(1);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			release(rs, ps, conn);
		}
		return key;
	}

	/**
	 * use Statement to execute DML(Data Manipulation Language) or DDL(Data
	 * Definition Language) of SQL. DML(insert, update, delete) or DDL(create,
	 * alter, drop, truncate).
	 * 
	 * @param sql
	 */
	public static void update(String sql) {
		Connection conn = null;
		Statement stmt = null;
		try {
			conn = getConnection();
			stmt = conn.createStatement();
			stmt.executeUpdate(sql);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			release(null, stmt, conn);
		}
	}

	public static Connection getConnection() throws Exception {
		FileInputStream fis = new FileInputStream("src/jdbc.properties");
		Properties properties = new Properties();
		properties.load(fis);

		String driver = properties.getProperty("driver");
		String jdbcUrl = properties.getProperty("jdbcUrl");
		String user = properties.getProperty("user");
		String password = properties.getProperty("password");

		fis.close();

		Class.forName(driver);
		return DriverManager.getConnection(jdbcUrl, user, password);
	}

	/**
	 * release database resources.
	 * 
	 * @param rs
	 * @param stmt
	 * @param conn
	 */
	public static void release(ResultSet rs, Statement stmt, Connection conn) {
		if (rs != null) {
			try {
				rs.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		if (stmt != null) {
			try {
				stmt.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		if (conn != null) {
			try {
				conn.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
}
