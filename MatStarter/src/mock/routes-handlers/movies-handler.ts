import { mapAttributes, mapSingleAttribute } from "../mock-helpers";

export class MovieHandler { 
    movies(schema: any) {
        let result = schema.movies.all();
        return mapAttributes(result);
    }

    movie(schema: any, request: any) {
        let id = request.params.id
        let result = schema.movies.find(id);
        return mapSingleAttribute(result);
    }
}