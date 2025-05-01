import { useEffect } from 'react';
import { BE_BASE_URL } from '~/services/axios';

function PaymentReturn() {
  useEffect(() => {
    const queryString = window.location.search;

    // Gọi đúng BE_BASE_URL bạn đã config trong axios.js
    window.location.href = `${BE_BASE_URL}/api/payment/payment-return${queryString}`;
  }, []);

  return <p>Đang xử lý thanh toán...</p>;
}

export default PaymentReturn;
