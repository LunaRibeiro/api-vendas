import Head from 'next/head'
import { Layout, Dashboard } from 'components'

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Vendas App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

<<<<<<< HEAD
      <Layout titulo='Dashboard'>
        <Dashboard clientes={150} produtos={1000} vendas={50} />
      </Layout>
=======
        <Layout />
>>>>>>> parent of f81339a (API do dashboard)
    </div>
  )
}

export default Home;
