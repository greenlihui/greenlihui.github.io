package com.greenlihui.jdbc;

import java.io.FileInputStream;
import java.sql.Connection;
import java.util.Properties;

import javax.sql.DataSource;

import org.apache.commons.dbcp2.BasicDataSource;
import org.apache.commons.dbcp2.BasicDataSourceFactory;
import org.junit.Test;

public class TestDBCP {
	@Test
	public void test2() {
		Properties pp = new Properties();
		FileInputStream fis = null;
		try {
			fis = new FileInputStream("src/dbcp.properties");
			pp.load(fis);
			DataSource source = BasicDataSourceFactory.createDataSource(pp);
			System.out.println(source.getConnection());
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				fis.close();
			} catch (Exception e2) {
				e2.printStackTrace();
			}
		}
	}
	
	@Test
	public void test1() {
		//导入DBCP和Pool包
		
		// 创建 DBCP 数据库实例
		@SuppressWarnings("resource")
		BasicDataSource dataSource = new BasicDataSource();

		// 为数据库源实例制定必须的属性
		dataSource.setUsername("root");
		dataSource.setPassword("*****");//这里密码我就不写出来了
		dataSource.setUrl("jdbc:mysql://localhost:3306/school");
		dataSource.setDriverClassName("com.mysql.jdbc.Driver");

		// 指定数据源一些可选的属性
		// 指定数据源初始化连接数的个数
		dataSource.setInitialSize(10);
		// 指定同一时刻最大的活动连接数
		dataSource.setMaxIdle(50);
		// 指定最小连接数：在数据库连接池中能够保存下来的最小连接的数量
		dataSource.setMinIdle(5);
		// 等待数据库连接池分配连接的最大等待时间（毫秒），超出则异常
		dataSource.setMaxWaitMillis(5000);

		// 从数据源中获取数据库连接
		Connection conn = null;
		try {
			conn = dataSource.getConnection();
			System.out.println(conn);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			JDBCTools.release(null, null, conn);
		}
	}
}
