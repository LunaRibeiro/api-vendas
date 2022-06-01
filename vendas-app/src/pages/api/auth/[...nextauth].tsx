import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
    providers: [
        Providers.GitHub({
            clientId: 'Iv1.8ee60ad29405212f',
            clientSecret: '7647b6af5fa2d1ec2bd489b0ebe92963f0d3d277'
        }), 
    ]
})