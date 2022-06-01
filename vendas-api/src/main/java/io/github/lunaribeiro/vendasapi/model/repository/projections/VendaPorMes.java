package io.github.lunaribeiro.vendasapi.model.repository.projections;

import java.math.BigDecimal;

public interface VendaPorMes {
	Integer getMes();
	BigDecimal getValor();
}
