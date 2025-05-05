import { Card as AntdCard, Rate, Button, message } from 'antd';
import { ShoppingCartOutlined, EyeOutlined, StarFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AddToCartContext } from '~/components/Layouts/DefaultLayout';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCartItem, fetchCart } from '~/redux/cartSlice';

const { Meta } = AntdCard;

function Card({ image_link, product_name, description, price, index, id, categoryName, cake }) {
  const { triggerSuccessPopup } = useContext(AddToCartContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login.currentUser);

  const handleAddToCart = async (cake) => {
    if (!user) {
      navigate('/auth?mode=signin');
      return;
    }

    try {
      await dispatch(
        addCartItem({
          productId: cake._id,
          quantity: 1
        })
      ).unwrap();
      await dispatch(fetchCart()).unwrap();
      triggerSuccessPopup();
      message.success('Đã thêm vào giỏ hàng');
    } catch (error) {
      console.error('Lỗi khi thêm vào giỏ hàng:', error);
      message.error('Có lỗi xảy ra khi thêm vào giỏ hàng');
    }
  };

  return (
    <AntdCard
      key={index}
      hoverable
      style={{ width: 300, margin: 16 }}
      cover={
        <Link to={`/detailed/${id}`} state={{ categoryName }}>
          <img
            alt={product_name}
            src={image_link}
            style={{ height: 300, objectFit: 'cover', borderTopLeftRadius: 8, borderTopRightRadius: 8 ,width: '100%'}}
          />
        </Link>
      }
      actions={[
        <Link to={`/detailed/${id}`} state={{ categoryName }}>
          <Button type="text" icon={<EyeOutlined />}>Xem chi tiết</Button>
        </Link>,
        <Button
          type="primary"
          // style={{ color: '#664545' }}
          icon={<ShoppingCartOutlined />}
          onClick={() => handleAddToCart(cake)}
        >
          Thêm vào giỏ
        </Button>,
      ]}
    >
      <Meta
        title={
          <span style={{ fontSize: 18 }}>
            {product_name}
          </span>

        }
        description={
          <>
            <Rate
              disabled
              defaultValue={5}
              character={<StarFilled />}
              style={{ fontSize: 14, marginBottom: 8 }}
            />
            <p style={{ height: 40, marginBottom: 8 }} className="line-clamp-2">
              {description}
            </p>
            <span style={{ color: '#664545', fontWeight: 'bold', fontSize: 16 }}>
              Giá: {Number(price).toLocaleString('vi-VN')}₫
            </span>
          </>
        }
      />
    </AntdCard>
  );
}

export default Card;