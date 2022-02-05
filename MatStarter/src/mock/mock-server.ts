import {
    Server,
    Model,
    createServer,
    Registry,
} from "miragejs";
import { ModelDefinition } from "miragejs/-types";
import Schema from "miragejs/orm/schema";
// import * as users from './data/users.json'
import users from './data/users.json'
import movies from './data/movies.json'
import todos from './data/todos.json'



export class MockServer {

    setupMockServer() {
        this.setUpSimpleServer();
        // this.setUpWithCreateServer();
    }

    setUpSimpleServer() {
        new Server({
            routes() {
                this.passthrough();
                this.namespace = "api";

                this.get("/users", () => users.filter(x => x.id < 10));
                this.get("/todos", () => todos);
                this.get("/movies", () => movies);
                // this.get("/movies/:id", (schema, request) => {
                //     let id = request.params["id"];
                //     let s = movies.find(x => x.id == +id);
                //     return s || null;
                // })
            }
        });
    }

    setUpWithCreateServer() {
        type Movie = {
            name: string;
        }

        const MovieModel: ModelDefinition<Movie> = Model.extend({});
        type AppRegistry = Registry<
            {
                movie: typeof MovieModel;
            },
            {}
        >;
        type AppSchema = Schema<AppRegistry>;

        createServer({
            models: {
                movie: Model,
            },

            routes() {
                this.passthrough();
                this.namespace = "api";

                this.get("movies/:id", (schema: AppSchema | any, request) => {
                    let id = request.params["id"];
                    // return id;
                    return schema.all('movie')
                    // return schema.movies.all()
                    return schema?.movies.all();
                })
            },
        })
    }
}