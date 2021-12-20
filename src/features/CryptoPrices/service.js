import api from '../../service/api'

export const getCoinsList = async (params) => api.get('/coins/markets?', { params })

export const getCategories = async () => api.get('/coins/categories/list')