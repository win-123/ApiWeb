const isLogin = "isLogin";
const setUser = "setUser";
const setRouterName = "setRouterName";

export default {


    [isLogin](state, value) {
        state.token = value;

    },

    [setUser](state, value) {
        state.username = value;
    },
    [setRouterName](state, value) {
        state.routerName = value
    }
}
