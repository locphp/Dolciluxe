import React, { useEffect, useState } from 'react';
import { getAllAddress, createAddress, updateAddress, deleteAddress } from '~/api/apiUser';
import AddressSelector from './AddressSelector';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  CircularProgress,
  IconButton,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { toast } from 'react-toastify';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const initialForm = {
  fullName: '',
  phone: '',
  province: '',
  district: '',
  ward: '',
  detail: '',
  full_address: '',
  isDefault: false,
};

export default function Address() {
  const [addresses, setAddresses] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchAddresses = async () => {
    try {
      const res = await getAllAddress();
      setAddresses(res || []);
    } catch (err) {
      toast.error('Lỗi khi tải danh sách địa chỉ', { position: 'bottom-right', autoClose: 3000 });
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleOpen = (address = null) => {
    if (address) {
      setForm(address);
      setEditId(address._id);
    } else {
      setForm(initialForm);
      setEditId(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setForm(initialForm);
    setEditId(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSetDefault = async (id) => {
    try {
      await Promise.all(
        addresses.map((addr) =>
          addr._id !== id && addr.isDefault
            ? updateAddress(addr._id, { ...addr, isDefault: false })
            : Promise.resolve(),
        ),
      );
      await updateAddress(id, { isDefault: true });
      toast.success('Đã cập nhật địa chỉ mặc định', { position: 'bottom-right', autoClose: 3000 });
      fetchAddresses();
    } catch (err) {
      toast.error('Không thể cập nhật địa chỉ mặc định', { position: 'bottom-right', autoClose: 3000 });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (form.isDefault) {
        await Promise.all(
          addresses.map((addr) => addr.isDefault && updateAddress(addr._id, { ...addr, isDefault: false })),
        );
      }

      if (editId) {
        await updateAddress(editId, form);
        toast.success('Cập nhật địa chỉ thành công', { position: 'bottom-right', autoClose: 3000 });
      } else {
        await createAddress(form);
        toast.success('Thêm địa chỉ mới thành công', { position: 'bottom-right', autoClose: 3000 });
      }
      fetchAddresses();
      handleClose();
    } catch (err) {
      toast.error('Lỗi khi lưu địa chỉ', { position: 'bottom-right', autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteAddress(deleteId);
      toast.success('Đã xóa địa chỉ', { position: 'bottom-right', autoClose: 3000 });
      fetchAddresses();
    } catch (err) {
      toast.error('Địa chỉ mặc định, không thể xóa', { position: 'bottom-right', autoClose: 3000 });
    } finally {
      setConfirmOpen(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Địa chỉ giao hàng</h2>
        <button
          className="rounded-[6px] border-[none] bg-[#664545] p-[10px] text-[1rem] text-white hover:bg-[#7a4f4f] active:bg-[#523636]"
          onClick={() => handleOpen()}
        >
          Thêm địa chỉ
        </button>
      </div>

      {addresses.length === 0 ? (
        <p>Chưa có địa chỉ nào.</p>
      ) : (
        <div className="grid gap-4">
          {addresses.map((addr) => (
            <div key={addr._id} className="rounded-lg border p-4 shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">
                    {addr.fullName} - {addr.phone} {addr.isDefault && <span className="text-blue-500">(Mặc định)</span>}
                  </p>
                  <p className="mb-2">
                    {addr.full_address || `${addr.detail}, ${addr.ward}, ${addr.district}, ${addr.province}`}
                  </p>
                  {!addr.isDefault && (
                    <Button size="small" variant="outlined" onClick={() => handleSetDefault(addr._id)} className="mt-2">
                      Địa chỉ mặc định
                    </Button>
                  )}
                </div>
                <div className="space-x-2">
                  <IconButton onClick={() => handleOpen(addr)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setDeleteId(addr._id);
                      setConfirmOpen(true);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth key={editId || 'new'}>
        <DialogTitle>{editId ? 'Cập nhật địa chỉ' : 'Thêm địa chỉ mới'}</DialogTitle>
        <p></p>
        <DialogContent className="space-y-4">
          <TextField
            name="fullName"
            label="Họ và tên"
            fullWidth
            size="small"
            multiline
            value={form.fullName}
            onChange={handleChange}
          />
          <TextField
            name="phone"
            label="Số điện thoại"
            fullWidth
            multiline
            size="small"
            value={form.phone}
            onChange={handleChange}
          />
          <AddressSelector defaultAddress={form} onChange={(value) => setForm({ ...form, ...value })} />
          <FormControlLabel
            control={<Checkbox name="isDefault" checked={form.isDefault} onChange={handleChange} />}
            label="Đặt làm địa chỉ mặc định"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <button
            onClick={handleSubmit}
            className="w-[4rem] rounded-[6px] border-[none] bg-[#664545] p-[10px] text-[1rem] text-white hover:bg-[#7a4f4f] active:bg-[#523636]"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Lưu'}
          </button>
        </DialogActions>
      </Dialog>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>Bạn có chắc muốn xóa địa chỉ này không?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Hủy</Button>
          <Button onClick={confirmDelete} color="error">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
