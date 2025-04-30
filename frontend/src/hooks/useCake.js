import { useEffect, useState } from 'react';
import { getCake } from '~/api/apiCakes';

const useCake = (params) => {
  const [cakes, setCakes] = useState([]);
  const categories = [
    { typeId: '', name: 'Tất cả sản phẩm', title: '' },
    { typeId: '67de79685a1a07a80a724780', name: 'Bánh sinh nhật', title: '' },
    { typeId: '67de79685a1a07a80a724782', name: 'Bánh truyền thống', title: '' },
    { typeId: '67de79685a1a07a80a724783', name: 'Cookies and Mini Cakes', title: '' },
    { typeId: '67de79685a1a07a80a724781', name: 'Bánh mì và bánh mặn', title: '' },
  ];

  const getTypeOfCakes = (param) => {
    switch (param) {
      case 'birthday':
        return 1;
      case 'tradition':
        return 2;
      case 'cookie':
        return 3;
      case 'bread':
        return 4;
      default:
        return 0;
    }
  };

  const fetchCakes = async (typeId) => {
    if (!typeId) return; // Không gọi nếu typeId rỗng
    try {
      const result = await getCake(typeId);
      setCakes(result?.data || []);
    } catch (error) {
      console.error('Failed to fetch cakes:', error);
      setCakes([]);
    }
  };

  useEffect(() => {
    const index = getTypeOfCakes(params);
    fetchCakes(categories[index].typeId);
  }, [params]);

  const index = getTypeOfCakes(params);
  return { cakes, categoryName: categories[index]?.name };
};

export default useCake;
