"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLazyUseTracker = void 0;
const constants_1 = require("../../constants");
const services_1 = require("../../infra/services");
const business_1 = require("../../business");
const infra_1 = require("../../infra");
let useTracker;
function createLazyUseTracker(context) {
    if (useTracker) {
        return useTracker;
    }
    const projectInformer = new infra_1.CodeProjectInformer();
    const tokenReader = new infra_1.CodeTokenReader(context);
    const apiFetcher = new services_1.ApiFetcher(constants_1.API_URL);
    const synchronizer = new infra_1.AxiosSessionSynchronizer(apiFetcher);
    useTracker = new business_1.UseTracker(projectInformer, tokenReader, synchronizer);
    return useTracker;
}
exports.createLazyUseTracker = createLazyUseTracker;
//# sourceMappingURL=tracker-factory.js.map