package io.github.lunaribeiro.vendasapi.service;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.JasperRunManager;

@Service
public class RelatorioVendasService {

	@Value("classpath:reports/relatorio-vendas.jrxml")
	private Resource relatorioVendasSource;
	
	@Value("classpath:reports/relatorio-vendas.jasper")
	private Resource relatorioVendasCompilado;

	@Autowired
	private DataSource dataSource;
	
	public byte[] gerarRelatorio() {

		//melhor solução e mais simples
		
			
		// try with resources
		try (Connection connection = dataSource.getConnection();) {

			Map<String, Object> parametros = new HashMap<>();

			// exporta da rede byte
			return JasperRunManager.runReportToPdf(relatorioVendasCompilado.getInputStream(), parametros, connection);

		} catch (SQLException e) {
			e.printStackTrace();
		} catch (JRException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	public byte[] gerarRelatorioCompilando() {

		//melhor do que a outra solução
		
			
		// try with resources
		try (Connection connection = dataSource.getConnection();) {

			Map<String, Object> parametros = new HashMap<>();
			// preenche o relatorio
			JasperPrint print = JasperFillManager.fillReport(relatorioVendasCompilado.getInputStream(), parametros, connection);

			// exporta da rede byte
			return JasperExportManager.exportReportToPdf(print);

		} catch (SQLException e) {
			e.printStackTrace();
		} catch (JRException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	public byte[] gerarRelatorioCompilado() {

		//demora mais, mais "dificil"
		
		
		// try with resources
		try (Connection connection = dataSource.getConnection();) {

			// retorna o JasperReport
			JasperReport compiledReport = JasperCompileManager.compileReport(relatorioVendasSource.getInputStream());

			Map<String, Object> parametros = new HashMap<>();
			// preenche o relatorio
			JasperPrint print = JasperFillManager.fillReport(compiledReport, parametros, connection);

			// exporta da rede byte
			return JasperExportManager.exportReportToPdf(print);

		} catch (SQLException e) {
			e.printStackTrace();
		} catch (JRException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
}
