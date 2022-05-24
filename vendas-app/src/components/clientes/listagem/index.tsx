import { Cliente } from 'app/models/clientes'
import { Layout } from 'components'
import { Input, InputCPF } from 'components'
import { useFormik } from 'formik'
import { useState } from 'react'
import { DataTable, DataTablePageParams } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Page } from 'app/models/common/page'
import { useClienteService } from 'app/services'
import { Button } from 'primereact/button'
import { resizeImage } from 'next/dist/server/image-optimizer'
import  Router  from 'next/router'
import { confirmPopup } from 'primereact/confirmpopup'

interface ConsultaClientesForm {
    nome?: string;
    cpf?: string;
}

export const ListagemClientes: React.FC = () => {

    const service = useClienteService();
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ clientes, setClientes]  = useState<Page<Cliente>>({
        content: [],
        first: 0,
        number: 0,
        size: 10,
        totalElements: 0
    });

    const handleSubmit = (filtro: ConsultaClientesForm) => {
       handlePage(null)
    }

    const { 
        handleSubmit: formikSubmit, 
        values: filtro,
        handleChange 
    } = useFormik<ConsultaClientesForm>({
        onSubmit: handleSubmit,
        initialValues: { nome: '', cpf: '' }
    })

    const handlePage = (event: DataTablePageParams) => {
        setLoading(true)
        service.find(filtro.nome, filtro.cpf, event?.page, event?.rows)
                .then(result => {
                    setClientes({... result, first: event?.first})
                }).finally(() => setLoading(false))
    }

    const actionTemplate = (registro: Cliente) => {
        const url = `/cadastros/clientes?id=${registro.id}`
        return(

            <div>
                <Button label='Editar' 
                        className='p-button-rounded p-button-info' 
                        onClick={e => Router.push(url) }
                        />
                
                <Button label='Excluir'
                        
                        onClick={e => {
                            confirmPopup({
                                message: "Confirma a exclusão deste registro?",
                                acceptLabel: "Sim",
                                rejectLabel: "Não"
                            })
                        }} 
                            className='p-button-rounded p-button-danger'                   
                        />
            </div>
        )
    }

    return (
        <Layout titulo="Clientes">
            <form onSubmit={formikSubmit}>
                <div className="columns">
                    <Input label="Nome" id="nome" 
                           columnClasses="is-half"
                           autoComplete="off"
                           onChange={handleChange}
                           name="nome"
                           value={filtro.nome} />

                    <InputCPF label="CPF" id="cpf" 
                           columnClasses="is-half"
                           onChange={handleChange}
                           name="cpf" value={filtro.cpf} />
                           
                </div>

                <div className="field is-grouped">
                    <div className="control is-link">
                        <button type="submit" className="button is-success">
                            Consultar                     
                        </button>
                    </div>
                </div>  

            </form>

            <br />

            <div className="columns">
                <div className="is-full">
                    <DataTable value={clientes.content} 
                                totalRecords={clientes.totalElements}
                                lazy paginator
                                first={clientes.first}
                                rows={clientes.size}
                                onPage={handlePage}
                                loading={loading}
                                emptyMessage="Nenhum registro encontrado."
                                >

                        <Column field="id" header="Código"  />
                        <Column field="nome" header="Nome"  />
                        <Column field="cpf" header="CPF"  />
                        <Column field="email" header="Email" />
                        <Column body={actionTemplate} />
                    </DataTable>
                </div>
            </div>
        </Layout>
    )
}