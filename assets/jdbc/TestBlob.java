package com.greenlihui.jdbc;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.Blob;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.junit.Test;

public class TestBlob {
	@Test
	public void updateBlob() {
		InputStream is = null;
		String sql = "UPDATE students SET avatar = ? WHERE student_id = 1";
		try {
			is = new FileInputStream(new File("src/pic.png"));
			JDBCTools.update(sql, is);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Test
	public void downloadBlob() {
		String sql = "SELECT avatar FROM students WHERE student_id = 1";
		Blob blob = null;
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		InputStream in = null;
		OutputStream out = null;
		try {
			conn = JDBCTools.getConnection();
			ps = conn.prepareStatement(sql);
			rs = ps.executeQuery();
			if (rs.next()) {
				blob = rs.getBlob(1);
			}
			in = blob.getBinaryStream();
			out = new FileOutputStream("src/ppp.png");
			byte[] buffer = new byte[1024];
			int len = 0;
			while ((len = in.read(buffer)) != -1) {
				out.write(buffer, 0, len);
			}

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (out != null) {
					out.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
			try {
				if (in != null) {
					in.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
}
