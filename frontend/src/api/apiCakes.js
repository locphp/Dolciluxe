
import {response} from '~/services/axios'

export const getCake = (typeId) => {
    return response.get(`/api/public/products/by-type/${typeId}`)
}

export const getCakeById = (id) => {
    return response.get(`/api/public/product/${id}`)
}

export const getAllCakes = async () => {
    try {
        const res = await response.get(`/api/products/`);
        return res;
      } catch (err) {
        console.error('Lỗi getOrder:', err.response?.data || err.message);
        throw err;
      }};

export const createCake = (product_name, image_link, description, product_type_id) => {
    const data = {
        product_name,
        image_link,
        description,
        product_type_id,
    };
    return response.post('/api/public/product', data)
}

export const deleteCake = (id) => {
    return response.delete(`/api/public/product/${id}`)
}

export const updateCake = (_id, product_name, image_link, description, product_type_id) => {
    const data = {
        _id,
        product_name,
        image_link,
        description,
        product_type_id,
    };
    return response.put(`/api/public/product/${_id}`, data)
}

export const fetchBestSeller = () => {
    return response.get('/api/public/products/')
}