const state = {
  phone:'请选择'
};

// mutations
const mutations = {
  PHONE (state, data) {
    state.phone=data
  }
};

export default {
  state,
  mutations
}
