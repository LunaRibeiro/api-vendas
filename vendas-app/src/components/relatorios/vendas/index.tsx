import { Layout } from "components/layout";
import { useFormik } from 'formik'
import { AutoComplete, AutoCompleteChangeParams, AutoCompleteCompleteMethodParams } from 'primereact/autocomplete'
import { Page } from 'app/models/common/page'
import { Cliente } from 'app/models/clientes'
import { useState } from "react";
import { ListagemClientes } from "components/clientes";
import { useClienteService } from 'app/services'
import { Button } from 'primereact/button'


interface RelatorioVendasForm {
    cliente: Cliente;
    dataInicio: string;
    dataFim: string;
}

export const RelatorioVendas: React.FC = () => {

    const clienteService = useClienteService()
    const [listaClientes, setListaClientes] = useState<Page<Cliente>>({
        content: [], first: 0, number: 0, size: 20, totalElements: 0
    })

    const handleSubmit = (formData: RelatorioVendasForm) => {
        console.log(formData)
    }

    const formik = useFormik<RelatorioVendasForm>({
        onSubmit: handleSubmit,
        initialValues: { cliente: null, dataFim: '', dataInicio: '' }
    })

    const handleClienteAutocomplete = (e: AutoCompleteCompleteMethodParams) => {
        const nome = e.query
        clienteService
            .find(nome, '', 0, 20)
            .then(clientes => setListaClientes(clientes))
    }

    return (
        <Layout titulo="Relatório de Vendas">
            <form onSubmit={formik.handleSubmit}>
                <div className="p-grid">
                    <div className="p-col-12">
                        <AutoComplete suggestions={listaClientes.content}
                            completeMethod={handleClienteAutocomplete}
                            value={formik.values.cliente}
                            field="nome"
                            id="cliente"
                            name="cliente"
                            onChange={(e: AutoCompleteChangeParams) => { 
                                formik.setFieldValue("cliente", e.value)
                            }}
                        />
                    </div>

                    <div className="p-col-6">

                    </div>

                    <div className="p-col-6">
                            
                    </div>

                    <div className="p-col">
                         <Button label="Gerar Relatório" type="submit" />
                    </div>
                </div>
            </form>
        </Layout>
    )
}