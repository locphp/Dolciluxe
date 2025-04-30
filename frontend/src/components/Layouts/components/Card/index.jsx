import { Star } from '~/assets/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AddToCartContext } from '~/components/Layouts/DefaultLayout';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCartItem, fetchCart } from '~/redux/cartSlice'; // Sử dụng action từ cartSlice

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
    } catch (error) {
      console.error('Lỗi khi thêm vào giỏ hàng:', error);
      // Có thể thêm thông báo lỗi ở đây nếu cần
    }
  };
  return (
    <div key={index} className="img-scale m-5 h-[480px] w-[280px]">
      <Link to={`/detailed/${id}`} state={{ categoryName }}>
        <img src={image_link} alt={product_name} className="h-[280px] w-[280px] object-cover" />
      </Link>
      <div className="h-[200px] rounded-b-xl bg-secondary pb-4 pt-2">
        <div className="mx-3">
          <Link to={`/detailed/${id}`} state={{ categoryName }}>
            <h3 className="h-[56px] text-xl font-semibold hover:text-slate-200">{product_name}</h3>
          </Link>
          <div className="w-full">
            <div className="flex justify-between">
              <div className="mt-2 flex gap-1">
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <Star key={i} />
                  ))}
              </div>
            </div>
            <p className="line-clamp-2 h-10 text-sm font-light">{description}</p>
          </div>
          <span className="text-base font-bold text-[#486645]">
            Giá: {Number(price).toLocaleString('vi-VN')} VND
          </span>
          <div className="mt-2 flex justify-between gap-2 text-xs font-semibold">
            <Link
              to={`/detailed/${id}`}
              state={{ categoryName }}
              className="basis-2/5 rounded bg-primary px-4 py-[6px] text-center text-slate-100"
            >
              Xem chi tiết
            </Link>
            <button
              onClick={() => handleAddToCart(cake)}
              className="basis-3/5 rounded bg-white px-4 py-[6px] text-center text-slate-500"
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;