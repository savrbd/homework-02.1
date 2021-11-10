import httpService from "./http.service";

const proffesionEndpoint = "profession/";

const professionService = {
    get: async () => {
        const { data } = await httpService.get(proffesionEndpoint);
        return data;
    }
};
export default professionService;
