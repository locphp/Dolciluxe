import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getOrderDetail } from '~/api/apiOrder';
import { Button, Result } from 'antd';

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await getOrderDetail(orderId);
        console.log('res:', res.data);
        setOrder(res.data);
      } catch (err) {
        console.error('Lỗi khi lấy thông tin đơn hàng:', err);
      }
    };

    if (orderId) fetchOrder();
  }, [orderId]);

  return (
    <div className="my-16 ml-12 flex flex-col items-center justify-center text-center">
      <Result
        status="success"
        title="Thanh toán thành công!"
        subTitle={
          order ? (
            <>
              <p>
                <b>Mã đơn hàng:</b> {order._id}
              </p>
              <p>
                <b>Ngày đặt:</b> {new Date(order.createdAt).toLocaleString()}
              </p>
              <p>
                <b>Mã giao dịch:</b> {order.paymentResult?.vnp_TransactionNo || 'Không có'}
              </p>
              <p>
                <b>Tổng thanh toán:</b> {order.totalPrice.toLocaleString()} VNĐ
              </p>
            </>
          ) : (
            'Đang tải chi tiết đơn hàng...'
          )
        }
        extra={[
          <Button key="home" type="primary" onClick={() => navigate('/')}>
            Quay lại trang chủ{' '}
          </Button>,
          <Button key="orders" onClick={() => navigate('/account/orders')}>
            Xem đơn hàng của tôi
          </Button>,
        ]}
      />
    </div>
  );
}

export default PaymentSuccess;
