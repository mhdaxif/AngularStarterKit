import {
    createServer,
    Model,
    hasMany,
    belongsTo,
    RestSerializer,
    Factory,
    Server,
} from "miragejs";

import { ModelDefinition } from "miragejs/-types";
import Schema from "miragejs/orm/schema";
// import * as users from './data/users.json'
import users from './data/users.json'
import movies from './data/movies.json'
import todos from './data/todos.json'
import { MovieHandler } from "./routes-handlers/movies-handler";


export class MockServer {
    setupMockServer() {
        // this.setUpSimpleServer();
        this.setUpWithCreateServer();
    }
  
    public static get models() {
        return {
            movie: Model,
            list: Model.extend({
                reminders: hasMany(),
            }),
            reminder: Model.extend({
                list: belongsTo(),
            }),
        }
    }

    public static get serializers() {
        return {
            reminder: RestSerializer.extend({
                include: ["list"],
                embed: true,
            })
        }
    }

    public static seed(server: any) {
        server.db.loadData({ movies: movies })
    }

    setUpSimpleServer() {
        new Server({
            routes() {
                this.passthrough();
                this.namespace = "api";

                this.get("/users", () => users.filter(x => x.id < 10));
                this.get("/todos", () => todos);
                this.get("/movies", () => movies);
            }
        });
    }

    setUpWithCreateServer() {
        let _movieHandler = new MovieHandler();
        createServer({
            models: MockServer.models,
            serializers: MockServer.serializers,
            seeds(server) {
                MockServer.seed(server);
            },
            routes() {
                //  Movie Handlers 
                this.get("/api/movies", _movieHandler.movies)
                this.get("/api/movies/:id", _movieHandler.movie)
                //  Movie Handlers Ends 


                this.post("/api/reminders", (schema: any, request) => {
                    let attrs = JSON.parse(request.requestBody)
                    console.log(attrs)
                    return schema.reminders.create(attrs)
                })

                this.delete("/api/reminders/:id", (schema: any, request: any) => {
                    let id = request.params.id

                    return schema.reminders.find(id).destroy()
                })

                // list
                this.get("/api/lists", (schema: any, request) => {
                    return schema.lists.all()
                })

                this.get("/api/lists/:id/reminders", (schema: any, request: any) => {
                    let listId = request.params.id
                    let list = schema.lists.find(listId)

                    return list.reminders
                })
            },
        })
    }
}