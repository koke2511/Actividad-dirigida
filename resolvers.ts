import { Collection, ObjectId } from "mongodb";
import { Vuelo, VueloModel } from "./types.ts";
import { fromModelToVuelo } from "./utils.ts";

export const resolvers = {
    Query: {
        vuelos: async (
            _: unknown,
            __: unknown,
            context: { VuelosCollection: Collection<VueloModel> }
        ): Promise<Vuelo[]> => {
            const vuelosModel = await context.VuelosCollection.find().toArray();
            return vuelosModel.map((vueloModel) => fromModelToVuelo(vueloModel));
        },

        vuelo: async (
            _: unknown,
            { id }: { id: string },
            context: { VuelosCollection: Collection<VueloModel> }
        ): Promise<Vuelo | null> => {
            const vueloModel = await context.VuelosCollection.findOne({
                _id: new ObjectId(id),
            });
            if (!vueloModel) {
                return null;
            }
            return fromModelToVuelo(vueloModel);
        },

        getVuelo: async (
            _: unknown,
            args: { origen?: string; destino?: string },
            context: { VuelosCollection: Collection<VueloModel> }
        ): Promise<Vuelo[]> => {
            const query: Partial<VueloModel> = {};
            if (args.origen) query.origen = args.origen;
            if (args.destino) query.destino = args.destino;

            const vuelosModel = await context.VuelosCollection.find(query).toArray();
            return vuelosModel.map((vueloModel) => fromModelToVuelo(vueloModel));
        },
    },

    Mutation: {
        addVuelo: async (
            _: unknown,
            { origen, destino, fehca_hora }: { origen: string; destino: string; fehca_hora: string },
            context: { VuelosCollection: Collection<VueloModel> }
        ): Promise<Vuelo> => {
            const nuevoVuelo: VueloModel = {
                origen,
                destino,
                fecha_hora: fehca_hora,
            };
            const { insertedId } = await context.VuelosCollection.insertOne(nuevoVuelo);
            const vueloModel = { ...nuevoVuelo, _id: insertedId };
            return fromModelToVuelo(vueloModel);
        },
    },
};
