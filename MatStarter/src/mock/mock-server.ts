import { Server } from "miragejs";
import * as users from './data/users.json'
import * as movies from './data/movies.json'


export class MockServer {

    setupMockServer() {
        new Server({
            routes() {
                this.passthrough();
                this.namespace = "api";

                this.get("users", () => users)
                this.get("/movies", () => movies)
            }
        });
    }
}