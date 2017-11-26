export default {
    cartAdd({ commit }, el) {
        commit('CART_ADD', el)
    },
    resetBall({ commit }, el) {
        commit('RESET_BALL', el)
    },
}