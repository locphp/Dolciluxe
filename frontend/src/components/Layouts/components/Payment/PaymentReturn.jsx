import { message, Spin } from 'antd';
import { useEffect } from 'react';
import { getPaymentReturn } from '~/api/apiPayment';

const PaymentReturn = () => {
  useEffect(() => {
    handlePaymentReturn();
  }, []);

  const generateTempToken = () => {
    // Tạo token ngẫu nhiên + timestamp hết hạn
    return {
      token: Math.random().toString(36).substring(2, 15),
      expires: Date.now() + 300000 // 5 phút
    };
  };

  const handlePaymentReturn = async () => {
    try {
      const queryString = window.location.search;
      const response = await getPaymentReturn(queryString);

      if (response.success) {
        const authToken = generateTempToken();

        // Lưu vào localStorage
        localStorage.setItem('paymentAuth', JSON.stringify(authToken));

        // Chuyển hướng kèm token
        window.location.href = `${response.meta.returnUrl}?token=${authToken.token}`;
      } else {
        window.location.href = response.meta.returnUrl;
        message.error('Thanh toán không thành công');
      }
    } catch (error) {
      console.error('Lỗi xử lý thanh toán:', error);
      window.location.href = '/payment-fail';
    }
  };

  return (
    <div className="my-16 ml-12 flex flex-col items-center justify-center text-center">
      <Spin
        size="large"
        tip="Đang xử lý thanh toán..."
        className="mt-4"
      />
    </div>
  );
};

export default PaymentReturn;