import { Venda, ItemVenda } from 'app/models/vendas'
import { Layout } from 'components'
import { useFormik } from 'formik'
import { AutoComplete, AutoCompleteChangeParams, AutoCompleteCompleteMethodParams } from 'primereact/autocomplete'
import { useState } from 'react'
import { Page } from 'app/models/common/page'
import { Cliente } from 'app/models/clientes'
import { Produto } from 'app/models/produtos'
import { useClienteService, useProdutoService } from 'app/services'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Dialog } from 'primereact/dialog'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

interface VendasFormProps {
    onSubmit: (venda: Venda) => void;
}

const formScheme: Venda = {
    cliente: null,
    itens: [],
    total: 0,
    formaPagamento: ''
}

export const VendasForm: React.FC<VendasFormProps> = ({
    onSubmit
}) => {

    const clienteService = useClienteService();
    const produtoService = useProdutoService();
    const [mensagem, setMensagem] = useState<string>('');
    const [codigoProduto, setCodigoProduto] = useState<string>("");
    const [quantidadeProduto, setQuantidadeProduto] = useState<number>(0);
    const [produto, setProduto] = useState<Produto>(null);
    const [listaClientes, setListaClientes] = useState<Page<Cliente>>({
        content: [],
        first: 0,
        number: 0,
        size: 0,
        totalElements: 0
    })

    const formik = useFormik<Venda>({
        onSubmit,
        initialValues: formScheme
    })

    const handleClienteAutocomplete = (e: AutoCompleteCompleteMethodParams) => {
        const nome = e.query
        clienteService
            .find(nome, '', 0, 20)
            .then(clientes => setListaClientes(clientes))
    }

    const handleClienteChange = (e: AutoCompleteChangeParams) => {
        const clienteSelecionado: Cliente = e.value;
        formik.setFieldValue("cliente", clienteSelecionado)
    }

    const handleCodigoProdutoSelect = (event) => {
        if (codigoProduto) {
            produtoService.carregarProduto(codigoProduto)
                .then(produtoEncontrado => setProduto(produtoEncontrado))
                .catch(error => {
                    setMensagem("Produto não encontrado!")
                })
        }
    }

    const handleAddProduto = () => {
        const produtosJaAdicionados = formik.values.itens
        produtosJaAdicionados.push({
            produto: produto,
            quantidade: quantidadeProduto
        })
        setProduto(null)
        setCodigoProduto('')
        setQuantidadeProduto(0)
    }

    const handleFecharDialog = () => {
        setMensagem('')
        setCodigoProduto('')
        setProduto(null)
    }

    const dialogMensagemFooter = () => {
        return (
            <div>
                <Button label='BLZ' onClick={handleFecharDialog} />
            </div>
        )
    }

    const disableAddProdutoButton = () => {
        return !produto || !quantidadeProduto
    }

    return (
        <form onSubmit={formik.handleSubmit} >
            <div className='p-fluid'>
                <div className='p-field'>
                    <label htmlFor="cliente">Cliente:</label>
                    <AutoComplete
                        suggestions={listaClientes.content}
                        completeMethod={handleClienteAutocomplete}
                        value={formik.values.cliente}
                        field="nome"
                        id='cliente'
                        name='cliente'
                        onChange={handleClienteChange} />
                </div>
                <div className='p-grid'>
                    <div className='p-col-2'>
                        <span className='p-float-label'>
                            <InputText id="codigoProduto"
                                onBlur={handleCodigoProdutoSelect}
                                value={codigoProduto}
                                onChange={e => setCodigoProduto(e.target.value)} />
                            <label htmlFor="codigoProduto">Código</label>
                        </span>
                    </div>

                    <div className='p-col-6'>
                        <AutoComplete value={produto} field="nome" />
                    </div>

                    <div className='p-col-2'>
                        <span className='p-float-label'>
                            <InputText id="qtdProduto"
                                value={quantidadeProduto}
                                onChange={e => setQuantidadeProduto(parseInt(e.target.value))} />
                            <label htmlFor="qtdProduto">Quantidade</label>
                        </span>
                    </div>

                    <div className='p-col-2'>
                        <Button type="button"
                            label='Adicionar'
                            disabled={disableAddProdutoButton()}
                            onClick={handleAddProduto} />
                    </div>

                    <div>
                        <div className='p-col-12'>
                            <DataTable value={formik.values.itens}>
                                <Column field='produto.id' header="Código" />
                                <Column field='produto.sku' header="SKU" />
                                <Column field='produto.nome' header="Produto" />
                                <Column field='produto.preco' header="Unidade" />
                                <Column field='quantidade' header="Quantidade" />
                            </DataTable>
                        </div>
                    </div>

                </div>
                <Button type="submit" label="Finalizar" />
            </div>
            <Dialog header="Atenção" position='center'
                visible={!!mensagem}
                onHide={handleFecharDialog}
                footer={dialogMensagemFooter}>
                {mensagem}
            </Dialog>

        </form>
    )
}