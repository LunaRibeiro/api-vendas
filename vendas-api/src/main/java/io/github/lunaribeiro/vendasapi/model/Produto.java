package io.github.lunaribeiro.vendasapi.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Table;

@Entity
@Table(name = "tb_produto")
public class Produto {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String descricao;
	private String nome;
	private BigDecimal preco;
	private String sku;
	private LocalDate dataCadastro;
	
	//constructor
	public Produto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Produto(String descricao, String nome, BigDecimal preco, String sku) {
		super();
		this.descricao = descricao;
		this.nome = nome;
		this.preco = preco;
		this.sku = sku;
	}

	public Produto(Long id, String descricao, String nome, BigDecimal preco, String sku) {
		super();
		this.id = id;
		this.descricao = descricao;
		this.nome = nome;
		this.preco = preco;
		this.sku = sku;
	}
	
	@PrePersist
	public void prePersist() {
		setDataCadastro(LocalDate.now());
	}

	//Get and Set
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public LocalDate getDataCadastro() {
		return dataCadastro;
	}

	public void setDataCadastro(LocalDate dataCadastro) {
		this.dataCadastro = dataCadastro;
	}

	
	public String getDescricao() {
		return descricao;
	}
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public BigDecimal getPreco() {
		return preco;
	}
	public void setPreco(BigDecimal preco) {
		this.preco = preco;
	}
	public String getSku() {
		return sku;
	}
	public void setSku(String sku) {
		this.sku = sku;
	}	
}
