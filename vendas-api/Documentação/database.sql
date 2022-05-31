CREATE TABLE TB_PRODUTO (

	ID BIGSERIAL NOT NULL PRIMARY KEY,
	NOME VARCHAR(100) NOT NULL,
	DESCRICAO VARCHAR(255),
	PRECO NUMERIC(16,2),
	SKU VARCHAR(20),
	DATA_CADASTRO DATE
);

SELECT * FROM TB_PRODUTO;

create table tb_cliente(

	id bigserial not null primary key, 
	nascimento date not null,
	nome varchar(100) not null,
	endereco varchar(255) not null,
	cpf varchar(14) not null,
	telefone varchar(14),
	email varchar(100),
	data_cadastro date
);

CREATE TABLE tb_venda (
	ID BIGSERIAL NOT NULL PRIMARY KEY,
	ID_CLIENTE BIGINT REFERENCES tb_cliente (ID) NOT NULL,
	FORMA_PAGAMENTO VARCHAR(8) CHECK ( FORMA_PAGAMENTO IN ('DINHEIRO', 'CARTAO', 'PIX')) NOT NULL,
	TOTAL NUMERIC(16,2) NOT NULL,
	data_venda timestamp default now()
);

CREATE TABLE tb_ITEM_VENDA (
	ID BIGSERIAL NOT NULL PRIMARY KEY,
	ID_VENDA BIGINT REFERENCES tb_venda (ID) NOT NULL,
	ID_PRODUTO BIGINT REFERENCES tb_produto (ID) NOT NULL,
	QUANTIDADE INTEGER NOT NULL	
);

