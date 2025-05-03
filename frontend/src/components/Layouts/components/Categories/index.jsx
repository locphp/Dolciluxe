import { useState, useEffect } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Pagination } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Card from '../Card';
import useCake from '~/hooks/useCake';
import usePagination from '~/hooks/usePagination';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#CDB0A9',
    },
  },
});

function Categories() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');
  const { cakes = [], categoryName } = useCake(mode || 'default');
  const [sortOption, setSortOption] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { list } = useSelector((state) => state.cart);

  // Lọc theo tên sản phẩm
  const filteredCakes = cakes.filter((cake) => cake.productName.toLowerCase().includes(searchTerm.toLowerCase()));

  // Sắp xếp theo giá
  const sortedCakes = [...filteredCakes].sort((a, b) => {
    if (sortOption === 'Giá từ thấp đến cao') {
      return a.price - b.price;
    } else if (sortOption === 'Giá từ cao đến thấp') {
      return b.price - a.price;
    }
    return 0;
  });

  // Phân trang
  const sortedCakesPerPage = usePagination(sortedCakes);

  // Đặt lại trang hiện tại về 1 khi searchTerm hoặc sortOption thay đổi
  useEffect(() => {
    sortedCakesPerPage.jump(1); // Reset to the first page
  }, [searchTerm, sortOption]);

  return (
    <div className="mt-16 w-full bg-white">
      <div className="mx-[5rem]">
        {/* Đường dẫn breadcrumb */}
        <div className="ml-[32px] flex h-11 items-center pt-[43px] text-primary">
          <div>
            <a href="/">Trang chủ </a>
            <span>&gt;&gt;</span>
            <a href="/category"> Menu Bánh </a>
            {categoryName !== 'Tất cả sản phẩm' && (
              <>
                <span>&gt;&gt;</span>
                <NavLink to="/" className="capitalize">
                  {' '}
                  {categoryName}{' '}
                </NavLink>
              </>
            )}
          </div>
        </div>

        {/* Tiêu đề */}
        <h1 className="text-center text-5xl font-bold capitalize leading-[72px]">{categoryName}</h1>
        <p className="py-5 text-center text-sm font-bold leading-4">
          Bánh truyền thống là một trong những loại bánh đã đưa tên tuổi chúng tôi có được ngày hôm nay, đây là một
          trong <br />
          số nhiều loại bán chạy nhất hiện nay
        </p>

        {/* Thanh tìm kiếm + bộ lọc */}
        <div className="mx-4 mb-4 flex items-center justify-end gap-4">
          <input
            type="text"
            placeholder="Tìm theo tên bánh..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[200px] rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="rounded-md border px-3 py-2 transition-colors duration-200 hover:bg-[#f5f5f5]"
          >
            <option value="">Chọn bộ lọc</option>
            <option value="Giá từ thấp đến cao">Giá từ thấp đến cao</option>
            <option value="Giá từ cao đến thấp">Giá từ cao đến thấp</option>
          </select>
        </div>

        {/* Danh sách bánh */}
        <div className="product lg:grid-custom-3 md:grid-custom-2 grid-custom-1 relative grid w-full justify-evenly">
          {sortedCakesPerPage.currentData().map((cake, index) => (
            <Card
              key={index}
              id={cake._id}
              image_link={cake.imageLink}
              description={cake.description}
              product_name={cake.productName}
              categoryName={categoryName}
              price={cake.price}
              cake={cake}
            />
          ))}
        </div>

        {/* Phân trang */}
        <div className="flex items-center justify-center py-4">
          <ThemeProvider theme={theme}>
            <Pagination
              count={sortedCakesPerPage.maxPage}
              size="large"
              page={sortedCakesPerPage.currentPage}
              color="secondary"
              onChange={(e, value) => sortedCakesPerPage.jump(value)}
            />
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}

export default Categories;
