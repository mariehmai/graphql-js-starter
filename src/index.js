const { GraphQLServer } = require('graphql-yoga')

let events = [
  {
    id: 'event-1',
    name: 'Semi-finals Volleyball World Cup',
    location: 'Troyes, FR'
  },
  {
    id: 'event-2',
    name: 'Finals Volleyball World Cup',
    description: 'Finals France - Croatia',
    location: 'Bruxelles, BE'
  }
]

let idCount = events.length

const resolvers = {
  Query: {
    info: () => `GraphQL JS Starter`,
    event: () => events
  },
  Mutation: {
    post: (root, args) => {
      const event = {
        id: `event-${idCount++}`,
        name: args.name,
        description: args.description,
        location: args.location
      }
      events.push(event)
      return event
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
