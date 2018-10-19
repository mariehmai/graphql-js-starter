const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

const resolvers = {
  Query: {
    info: () => `GraphQL JS Starter`,
    event: (root, args, context, info) => context.db.query.events({}, info)
  },
  Mutation: {
    post: (root, args, context, info) => {
      return context.db.mutation.createLink(
        {
          data: {
            name: args.name,
            description: args.description,
            location: args.location
          }
        },
        info
      )
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'https://eu1.prisma.sh/marie-helene-mai-655e43/database/dev',
      secret: 'mysecret123',
      debug: true
    })
  })
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
