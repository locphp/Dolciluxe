import React from 'react';
import { useNavigate } from 'react-router-dom';

const ThankYou = () => {
  const navigate = useNavigate();  // Hook để điều hướng người dùng

  const handleBackHome = () => {
    navigate('/');  // Điều hướng về trang chủ
  };

  const handleViewOrders = () => {
    navigate('/account/orders');  // Điều hướng đến trang đơn hàng
  };

  return (
    <div className="mt-16 px-8 py-4 text-center">
      <h1 className="text-4xl font-bold text-primary">THANK YOU!</h1>
      <p className="text-xl mt-4">Chúng tôi sẽ xử lý đơn hàng của bạn sớm nhất có thể.</p>

      <div className="mt-6 flex justify-between max-w-[400px] mx-auto">
        <button
          onClick={handleBackHome}
          className="bg-primary text-white font-semibold py-2 px-6 rounded-xl hover:scale-110 hover:bg-primary/90 transition-transform duration-300"
        >
          Quay lại trang chủ
        </button>

        <button
          onClick={handleViewOrders}
          className="bg-secondary text-white font-semibold py-2 px-6 rounded-xl hover:scale-110 hover:bg-secondary/90 transition-transform duration-300"
        >
          Xem đơn hàng của tôi
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
