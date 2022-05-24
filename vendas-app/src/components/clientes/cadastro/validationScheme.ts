import * as Yup from 'yup'

const campoObrigatorio = "Campo obrigatório"
const campoObrigatorioValidation = Yup.string().trim().required(campoObrigatorio)

export const validationScheme = Yup.object().shape({
    cpf: Yup.string().trim().required(campoObrigatorio).length(14, "CPF inválido"),
    dataNascimento: Yup.string().trim().required(campoObrigatorio).length(10, "Data inválida"), 
    email: Yup.string().trim().required(campoObrigatorio).email("Email inválido"),
    endereco: campoObrigatorioValidation,
    nome: campoObrigatorioValidation,
    telefone: campoObrigatorioValidation
})