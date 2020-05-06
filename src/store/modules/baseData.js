/**
 *Created by FuDi 2020-04-28 22:36
 */

const state = {
    volunteerData: JSON.parse(sessionStorage.getItem("volunteerData")),
    teamData: JSON.parse(sessionStorage.getItem("teamData")),
    instituData: JSON.parse(sessionStorage.getItem("instituData")),
    ArticleData: JSON.parse(sessionStorage.getItem("ArticleData")),
    ReferalData: JSON.parse(sessionStorage.getItem("ReferalData")),
    EventData: JSON.parse(sessionStorage.getItem("EventData")),
    ProjectData: JSON.parse(sessionStorage.getItem("ProjectData")),
    PhysicalData: JSON.parse(sessionStorage.getItem("PhysicalData")),
    CashData: JSON.parse(sessionStorage.getItem("CashData")),
    OrderData: JSON.parse(sessionStorage.getItem("OrderData")),
    eventupdate: JSON.parse(sessionStorage.getItem("eventupdate")),
}

const mutations = {
    VOLUNTEER(state, data) {
        state.volunteerData = data;
    }, TEAM(state, data) {
        state.teamData = data;
    }, INSTITU(state, data) {
        state.instituData = data;
    }, ARTICLE(state, data) {
        state.ArticleData = data;
    }, REFERL(state, data) {
        state.ReferalData = data;
    },EVENT(state, data) {
        state.EventData = data;
    },Project(state, data) {
        state.ProjectData = data;
    },Physial(state, data) {
        state.PhysicalData = data;
    },Cash(state, data) {
        state.CashData = data;
    },Order(state, data) {
        state.OrderData = data;
    },eventupdate(state, data) {
        state.eventupdate = data;
    },
}

const actions = {
    setVolunteer({commit}, data) {
        commit('VOLUNTEER', data)
    },
    setTeam({commit}, data) {
        commit('TEAM', data)
    },
    setInstitu({commit}, data) {
        commit('INSTITU', data)
    }, setArticle({commit}, data) {
        commit('ARTICLE', data)
    }, setRefrl({commit}, data) {
        commit('REFERL', data)
    },setEvent({commit}, data) {
        commit('EVENT', data)
    },setProject({commit}, data) {
        commit('Project', data)
    },setPhysial({commit}, data) {
        commit('Physial', data)
    },setCash({commit}, data) {
        commit('Cash', data)
    },setOrder({commit}, data) {
        commit('Order', data)
    },seteventupdate({commit}, data) {
        commit('eventupdate', data)
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
