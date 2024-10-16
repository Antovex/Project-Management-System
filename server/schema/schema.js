// const { projects, clients } = require("../sampleData.js");

const graphql = require("graphql");

const { 
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType,
} = graphql;

//Mongoose Models
const Project = require('../models/Project');
const Client = require('../models/Client.js');


//client type
const ClientType = new GraphQLObjectType({
    name: "Client",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    }),
});

//Project type
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: {
            type: ClientType,
            resolve(parent, args) {
                return Client.findById(parent.clientId);
            }
        }
    }),
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args){
                return Project.find();
            }
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Project.findById(args.id);
            },
        },
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args){
                return Client.find();
            }
        },
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Client.findById(args.id);
            },
        },
    },
});

//Mutations
//Adding, Changing or Deleting data from database are called mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // Adding Clients to database
        addClient: {
            type: ClientType,
            args: {
                // Adding "GraphQLNonNull" so that nobody can input data without data
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                phone: { type: GraphQLNonNull(GraphQLString) },
                // We didn't specify "id" coz its GraphQLID type and would automatically take the Objects's ID as the id
            },
            // Resolver function
            resolve(parent, args) {
                // Save the data to database following the "Client" schema
                const client = new Client ({
                    // Passing in the values from GraphQL query
                    name: args.name,
                    email: args.email,
                    phone: args.phone
                });
                // Finally saving the values to the database
                return client.save();
            }
        },
        // Example of how to add client from GraphQL to MongoDB
        // mutation {
        //     addClient(name: "Tony Stark", email: "ironman@gmail.com", phone: "955-365-3376") {
        //       id
        //       name
        //       email
        //       phone
        //     }
        //   }

        //Deleting a Client from database
        deleteClient: {
            type: ClientType,
            //taking input from graphql which is not null
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            // Using graphql's own method to delete from database which is "findByIdAndDelete"
            resolve(parent, args) {
                Project.deleteMany({ clientId: args.id }).then(() => {
                    return Client.findByIdAndDelete(args.id);
                });
            },
            // resolve(parent, args) {
            //     Project.find({ clientId: args.id }).then((projects) => {
            //         projects.forEach(project => {
            //             project.deleteOne();
            //         });
            //     });

            //     return Client.findByIdAndDelete(args.id);
            // },
        },
        // Example of how to add client from GraphQL to MongoDB
        // mutation {
        //     deleteClient(id: "66f8825f59fad9611347f9a8"){
        //         name
        //     }
        // }

        //Adding a Project
        addProject: {
            type: ProjectType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                // Adding the status from particular Enum
                status: { 
                    type: new GraphQLEnumType({
                        name: 'ProjectStatus',
                        values: {
                            'new': { value: 'Not Started' },
                            'progress': { value: 'In Progress' },
                            'completed': { value: 'Completed' },
                        }
                    }),
                    defaultValue: 'Not Started',
                },
                clientId: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                // console.log("Client ID:", args.clientId);
                const project = new Project({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId,
                });

                return project.save();
            },
        },

        //Delete a Project
        deleteProject: {
            type: ProjectType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args){
                return Project.findByIdAndDelete(args.id);
            }
        },

        //Updating a Project
        updateProject: {
            type: ProjectType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                status: { 
                    type: new GraphQLEnumType({
                        name: 'ProjectStatusUpdate',
                        values: {
                            'new': { value: 'Not Started' },
                            'progress': { value: 'In Progress' },
                            'completed': { value: 'Completed' },
                        }
                    }),
                },
            },
            resolve(parent, args){
                return Project.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                            description: args.description,
                            status: args.status,
                        },
                    },
                    { new: true }
                );
            }
        }
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    // we don't have to specify like "mutation: MyMutationName" coz mutation is the variable name
    mutation
});
