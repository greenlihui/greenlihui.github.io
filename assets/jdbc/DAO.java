package com.greenlihui.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.junit.Test;

public class DAO {
	@Test
	public void test() {
		String sql = "INSERT INTO students (name, password) VALUES (\"lmj\", \"lmj123456\")";
		System.out.println(String.valueOf(JDBCTools.insertAndGetPrimaryKey(sql)));
		sql = "SELECT avatar FROM students WHERE student_id = 1";
		System.out.println(getValue(sql).toString());
//		sql = "SELECT student_id id, name, password, birth FROM students WHERE student_id = ?";
//		System.out.println(getUpdate(Student.class, sql, 1));
	}

	/**
	 * the same way as get() to get an object list
	 * @param clazz
	 * @param sql
	 * @param args
	 * @return
	 */
	public <T> List<T> getList(Class<T> clazz, String sql, Object... args) {
		List<T> list = new ArrayList<>();
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			conn = JDBCTools.getConnection();
			ps = conn.prepareStatement(sql);
			for (int i  =0 ; i < args.length; i++) {
				ps.setObject(i + 1, args[i]);
			}
			rs = ps.executeQuery();
			ResultSetMetaData rsmd = rs.getMetaData();
			T entity = null;
			while(rs.next()) {
				entity = clazz.newInstance();
				for (int i = 0; i < rsmd.getColumnCount(); i++) {
					String columnLabel = rsmd.getColumnLabel(i + 1);
					Object value = rs.getObject(columnLabel);
					BeanUtils.setProperty(entity, columnLabel, value);
				}
				list.add(entity);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			JDBCTools.release(rs, ps, conn);
		}
		return list;
	}
	
	/**
	 * updated version of get(), making the whole method more unified
	 * @param clazz
	 * @param sql
	 * @param args
	 * @return
	 */
	public <T> T getUpdate(Class<T> clazz, String sql, Object...args) {
		List<T> list = getList(clazz, sql, args);
		if (list.size() > 0) {
			return list.get(0);
		}
		return null;
	}

	/**
	 * get an object from database according to its class
	 * 
	 * @param clazz
	 * @param sql
	 * @param args
	 * @return
	 */
	public <T> T get(Class<T> clazz, String sql, Object... args) {
		T entity = null;
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			conn = JDBCTools.getConnection();
			ps = conn.prepareStatement(sql);
			for (int i = 0; i < args.length; i++) {
				ps.setObject(i + 1, args[i]);
			}
			rs = ps.executeQuery();
			if (rs.next()) {
				ResultSetMetaData rsmd = rs.getMetaData();
				entity = clazz.newInstance();
				for (int i = 0; i < rsmd.getColumnCount(); i++) {
					String columnLabel = rsmd.getColumnLabel(i + 1);
					Object value = rs.getObject(columnLabel);

					BeanUtils.setProperty(entity, columnLabel, value);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			JDBCTools.release(rs, ps, conn);
		}
		return entity;
	}

	/**
	 * query a single value from a table, which means resultset only contains
	 * one row and one column.
	 * 
	 * @param sql
	 * @param args
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public <E> E getValue(String sql, Object... args) {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			conn = JDBCTools.getConnection();
			ps = conn.prepareStatement(sql);
			for (int i = 0; i < args.length; i++) {
				ps.setObject(i + 1, args[i]);
			}
			rs = ps.executeQuery();
			if (rs.next()) {
				return (E) rs.getObject(1);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			JDBCTools.release(rs, ps, conn);
		}
		return null;
	}
}
