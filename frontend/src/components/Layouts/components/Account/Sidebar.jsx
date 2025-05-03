'use client';
import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import SidebarContent from './SidebarContent';

const Sidebar = ({ currentKey, handleUpdateContent, currentUser, instance }) => {
  const [current, setCurrent] = useState(currentKey);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setCurrent(currentKey);
  }, [currentKey]);

  useEffect(() => {
    localStorage.setItem('currentKey', current);
  }, [current]);

  useEffect(() => {
    const path = location.pathname;
    if (path === '/account') {
      setCurrent('profile');
    } else {
      const selectedItem = items.find((item) => item.label.props.to === path);
      if (selectedItem && selectedItem.key !== current) {
        setCurrent(selectedItem.key);
      }
    }
  }, [location.pathname]);

  const onClick = (e) => {
    setCurrent(e.key);
    const selectedItem = items.find((item) => item.key === e.key);
    handleUpdateContent(e.key);
    navigate(selectedItem.label.props.to);
  };
  const loginType = localStorage.getItem('login_type');

  const items = [
    {
      label: <NavLink to={'/account/profile'}>Hồ sơ</NavLink>,
      key: 'profile',
    },
    {
      label: <NavLink to={'/account/address'}>Địa chỉ giao hàng</NavLink>,
      key: 'address',
    },
    // {
    //   label: <NavLink to={'/account/change-password'}>Đổi mật khẩu</NavLink>,
    //   key: 'change-password',
    // },
    {
      label: <NavLink to={'/account/orders'}>Đơn hàng</NavLink>,
      key: 'orders',
    },
  ];
  if (loginType !== 'google') {
    items.splice(1, 0, {
      label: <NavLink to={'/account/change-password'}>Đổi mật khẩu</NavLink>,
      key: 'change-password',
    });
  }
  return (
    <div className="mb-16 mt-16 flex flex-col gap-[20px] md:flex-row md:items-start">
      <div className="[flex-basis:25%]">
        <Menu style={{ width: '100%' }} onClick={onClick} selectedKeys={[current]} mode="vertical" items={items} />
      </div>
      <div className="[flex-basis:75%]">
        <SidebarContent
          currentKey={current}
          handleUpdateContent={handleUpdateContent}
          currentUser={currentUser}
          instance={instance}
        />
      </div>
    </div>
  );
};

export default Sidebar;
