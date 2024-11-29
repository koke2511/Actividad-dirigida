import  { Vuelo, VueloModel } from "./types.ts";

export const fromModelToVuelo = (vueloModel: VueloModel): Vuelo =>{
    return {
        id: vueloModel._id!.toString(),
        origen: vueloModel.origen,
        destino: vueloModel.destino,
        fehca_hora: vueloModel.fecha_hora,
    };
};
