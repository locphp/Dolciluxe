import { response } from '~/services/axios';

export const getPaymentReturn = async (queryString) => {
  try {
    const res = await response.get(`/api/payment/payment-return${queryString}`);
    return res;
  } catch (err) {
    console.error('Lỗi getPaymentReturn:', err.response?.data || err.message);
    throw err;
  }
};
