import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Flex, message, Empty } from 'antd';
import { useCart } from './hooks';
import CartTable from './CartTable';
import CartActions from './CartActions';
import CartModal from './CartModal';

const { Text } = Typography;

const Cart = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('');

  const user = useSelector((state) => state.auth.login.currentUser);
  const { cartItems, removeItem, removeMultipleItems, updateItemQuantity } = useCart(user);

  const renderEmptyCart = () => (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={
        <span style={{ fontSize: '16px' }}>Bạn chưa có sản phẩm nào trong giỏ hàng</span>
      }
    >
      <Button
        type="primary"
        onClick={() => navigate('/products')} // Điều hướng đến trang sản phẩm
        style={{ marginTop: '20px' }}
      >
        Xem sản phẩm
      </Button>
    </Empty>
  );

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const showModal = () => {
    setOpen(true);
    setModalText(`Bạn có muốn bỏ ${selectedRowKeys.length} sản phẩm khỏi giỏ hàng?`);
  };

  const handleOk = async () => {
    setModalText('Đang xử lý...');
    setConfirmLoading(true);
    try {
      await removeMultipleItems(selectedRowKeys);
      setSelectedRowKeys([]);
      message.success('Xóa thành công');
    } catch (err) {
      console.error(err);
      message.error('Xóa thất bại');
    } finally {
      setConfirmLoading(false);
      setOpen(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleQuantityChange = async (productId, quantity) => {
    try {
      await updateItemQuantity(productId, quantity);
    } catch (error) {
      message.error('Cập nhật thất bại');
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await removeItem(productId);
      message.success('Đã xóa sản phẩm khỏi giỏ hàng');
    } catch (err) {
      message.error('Xóa thất bại');
    }
  };

  const handleCheckout = () => {
    message.info('Tính năng thanh toán đang được phát triển');
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  };

  const dataSource = cartItems.map((item) => ({
    key: item.product._id,
    product: {
      name: item.product.productName,
      image: item.product.imageLink,
    },
    price: formatCurrency(item.product.price),
    quantity: item.quantity,
    total: formatCurrency(item.product.price * item.quantity),
  }));

  const totalAmount = formatCurrency(
    selectedRowKeys.reduce((sum, key) => {
      const item = cartItems.find((cartItem) => cartItem.product._id === key);
      return sum + (item ? item.product.price * item.quantity : 0);
    }, 0)
  );

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div style={{
      marginTop: '64px',
      width: '100%',
      backgroundColor: 'white',
      paddingBottom: '64px'
    }}>
      <div style={{ margin: '0 5rem' }}>
        <h1 style={{
          textAlign: 'center',
          fontSize: '48px',
          fontWeight: 'bold',
          lineHeight: '72px',
          marginTop: '40px'
        }}>
          Giỏ hàng
        </h1>
        <Text style={{
          display: 'block',
          padding: '20px 0',
          textAlign: 'center',
          fontSize: '14px',
          fontWeight: 'normal',
          lineHeight: '16px'
        }}>
          Nơi cập nhật những trạng thái tốt nhất
        </Text>
        <Flex gap="middle" vertical>
          <CartTable
            dataSource={dataSource}
            rowSelection={rowSelection}
            onQuantityChange={handleQuantityChange}
            onRemoveItem={handleRemoveItem}
          />
          <div style={{
            position: 'sticky',
            bottom: 0,
            zIndex: 10,
            backgroundColor: 'white',
            padding: '16px',
          }}>
            <CartActions
              hasSelected={hasSelected}
              onRemoveSelected={showModal}
              onCheckout={handleCheckout}
              selectedCount={selectedRowKeys.length}
              totalAmount={totalAmount}
            />
            <CartModal
              open={open}
              onOk={handleOk}
              onCancel={handleCancel}
              confirmLoading={confirmLoading}
              modalText={modalText}
            />
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default Cart;