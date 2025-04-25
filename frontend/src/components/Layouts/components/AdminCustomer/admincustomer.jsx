import React, { useEffect, useState } from 'react';
import { getListUsers } from '~/api/apiUser';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { useSelector } from 'react-redux';

function AdminCustomer() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);

  const currentUser = useSelector((state) => state.auth.login.currentUser);
  console.log(currentUser);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getListUsers();
        setUsers(res.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Không thể tải danh sách khách hàng');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleOpenConfirm = (user) => {
    setSelectedUser(user);
    setConfirmOpen(true);
  };

  const handleConfirmChangeRole = () => {
    // Kiểm tra mật khẩu thật sự là mật khẩu của current admin
    if (password === 'admin123') {
      setUsers((prev) => prev.map((u) => (u.id === selectedUser.id ? { ...u, isAdmin: !u.isAdmin } : u)));
      setConfirmOpen(false);
      setPassword('');
      alert('Cập nhật quyền thành công');
    } else {
      alert('Mật khẩu không đúng');
    }
  };

  if (loading) return <p>Đang tải danh sách khách hàng...</p>;
  if (error) return <p>Lỗi: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="mb-4 text-[x-large] font-bold text-[#664545]">Khách hàng thành viên</h1>

      <div className="overflow-x-auto text-sm">
        <table className="w-full table-auto border-collapse overflow-hidden rounded-lg border border-gray-200 shadow-sm">
          <thead className="bg-gray-50 text-sm font-semibold text-gray-700">
            <tr>
              <th className="border-y border-gray-200 px-4 py-3 text-center">STT</th>
              <th className="border-y border-gray-200 px-4 py-3 text-center">Tên khách hàng</th>
              <th className="border-y border-gray-200 px-4 py-3 text-center">Email</th>
              <th className="border-y border-gray-200 px-4 py-3 text-center">Số điện thoại</th>
              <th className="border-y border-gray-200 px-4 py-3 text-center">Phân quyền</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={user.id} className="text-gray-800 transition-all hover:bg-gray-100">
                <td className="border-y border-gray-200 py-3 text-center">{index + 1}</td>
                <td className="border-y border-gray-200 px-4 py-3 text-center">{user.name}</td>
                <td className="border-y border-gray-200 px-4 py-3 text-center">{user.email}</td>
                <td className="border-y border-gray-200 px-4 py-3 text-center">{user.phone}</td>
                <td className="border-y border-gray-200 px-4 py-3 text-center">
                  <button
                    className={`rounded px-3 py-1 text-white hover:opacity-90 ${
                      user.isAdmin ? 'border-red-600 bg-red-600' : 'border-blue-600 bg-blue-600'
                    }`}
                    onClick={() => handleOpenConfirm(user)}
                  >
                    {user.isAdmin ? 'Admin' : 'User'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Xác nhận thay đổi phân quyền</DialogTitle>
        <DialogContent>
          <TextField
            type="password"
            label="Nhập mật khẩu xác nhận"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Hủy</Button>
          <Button variant="contained" onClick={handleConfirmChangeRole}>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AdminCustomer;
