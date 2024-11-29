export const schema = `#graphql
type Vuelo{
    id: ID!
    origen: String!
    destino: String!
    fehca_hora: String!
}

type Query {
    vuelos: [Vuelo!]!
    vuelo(id:ID!): Vuelo
    getVuelo (origen: string, destino: string): [Vuelo!]!
}

type Mutation {
    addVuelo(origen: String!, destino: String!, fehca_hora: String!) : Vuelo!
}
`