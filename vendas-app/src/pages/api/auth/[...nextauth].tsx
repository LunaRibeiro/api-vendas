import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
    providers: [
        Providers.GitHub({
            clientId: 'Iv1.8ee60ad29405212f',
            clientSecret: '7647b6af5fa2d1ec2bd489b0ebe92963f0d3d277'
        }), 

        Providers.Auth0({
            clientId: 'RDnXMxlxlwi8cFZh1xJx3L3BvUT5OJo2',
            clientSecret: 'Ymu_V_s1kUDUBM1wlR1EiZ79-GPj9UWDVYZBQZ1LfZEpGr6ZV3l0ZoYJgb8TtB5E',
            domain: 'dev-rhajd-n3.us.auth0.com'
        }),
    ]
})