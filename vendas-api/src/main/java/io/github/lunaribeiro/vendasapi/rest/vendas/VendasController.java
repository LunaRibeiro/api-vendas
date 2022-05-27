package io.github.lunaribeiro.vendasapi.rest.vendas;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.lunaribeiro.vendasapi.model.Venda;
import io.github.lunaribeiro.vendasapi.model.repository.ItemVendaRepository;
import io.github.lunaribeiro.vendasapi.model.repository.VendaRepository;

@RestController
@RequestMapping("/api/vendas")
@CrossOrigin("*")
public class VendasController {
	
	@Autowired
	private VendaRepository repository;
	
	@Autowired
	private ItemVendaRepository itemVendaRepository;
	
	@PostMapping
	@Transactional
	public void realizarVenda(@RequestBody Venda venda) {	
		repository.save(venda);
		venda.getItens().stream().forEach( iv -> iv.setVenda(venda));
		itemVendaRepository.saveAll(venda.getItens());
	}

}
