import { useEffect, useState } from 'react';
import { MenuItem, Select, TextField } from '@mui/material';
import addressData from './address.json';

const AddressSelector = ({ defaultAddress = {}, onChange }) => {
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [wardPathWithType, setWardPathWithType] = useState('');
  const [homeCode, setHomeCode] = useState('');

  useEffect(() => {
    if (defaultAddress && Object.keys(defaultAddress).length > 0) {
      const provinceEntry = Object.entries(addressData).find(([, val]) => val.name === defaultAddress.province);
      if (provinceEntry) {
        const [pCode, pData] = provinceEntry;
        const districtEntry = Object.entries(pData['quan-huyen']).find(([, d]) => d.name === defaultAddress.district);
        if (districtEntry) {
          const [dCode, dData] = districtEntry;
          const wardEntry = Object.entries(dData['xa-phuong']).find(([, w]) => w.name === defaultAddress.ward);
          if (wardEntry) {
            const [wCode, wData] = wardEntry;
            setSelectedProvince(pCode);
            setSelectedDistrict(dCode);
            setSelectedWard(wCode);
            setHomeCode(defaultAddress.detail || '');
            setWardPathWithType(wData.path_with_type);
          } else {
            setSelectedProvince(pCode);
            setSelectedDistrict(dCode);
          }
        } else {
          setSelectedProvince(pCode);
        }
      }
    }
  }, [defaultAddress]);

  useEffect(() => {
    const fullAddress =
      selectedProvince &&
      selectedDistrict &&
      selectedWard &&
      homeCode &&
      `${homeCode}, ${wardPathWithType}, ${addressData[selectedProvince]['quan-huyen'][selectedDistrict].name}, ${addressData[selectedProvince].name}`;

    onChange?.({
      province: addressData[selectedProvince]?.name || '',
      district: addressData[selectedProvince]?.['quan-huyen'][selectedDistrict]?.name || '',
      ward: addressData[selectedProvince]?.['quan-huyen'][selectedDistrict]?.['xa-phuong'][selectedWard]?.name || '',
      detail: homeCode,
      full_address: fullAddress || '',
    });
  }, [selectedProvince, selectedDistrict, selectedWard, homeCode]);

  const provinces = Object.entries(addressData).map(([code, data]) => ({
    value: code,
    label: data.name,
  }));

  const getDistricts = () => {
    if (!selectedProvince) return [];
    return Object.entries(addressData[selectedProvince]['quan-huyen']).map(([code, data]) => ({
      value: code,
      label: data.name,
    }));
  };

  const getWards = () => {
    if (!selectedProvince || !selectedDistrict) return [];
    return Object.entries(addressData[selectedProvince]['quan-huyen'][selectedDistrict]['xa-phuong']).map(
      ([code, data]) => ({
        value: code,
        label: data.name,
      }),
    );
  };

  return (
    <div className="space-y-4">
      <Select
        value={selectedProvince}
        onChange={(e) => {
          setSelectedProvince(e.target.value);
          setSelectedDistrict('');
          setSelectedWard('');
          setWardPathWithType('');
        }}
        displayEmpty
        fullWidth
        size="small"
      >
        <MenuItem value="" disabled>
          Chọn Tỉnh/Thành phố
        </MenuItem>
        {provinces.map((p) => (
          <MenuItem key={p.value} value={p.value}>
            {p.label}
          </MenuItem>
        ))}
      </Select>

      <Select
        value={selectedDistrict}
        onChange={(e) => {
          setSelectedDistrict(e.target.value);
          setSelectedWard('');
          setWardPathWithType('');
        }}
        displayEmpty
        disabled={!selectedProvince}
        fullWidth
        size="small"
      >
        <MenuItem value="" disabled>
          Chọn Quận/Huyện
        </MenuItem>
        {getDistricts().map((d) => (
          <MenuItem key={d.value} value={d.value}>
            {d.label}
          </MenuItem>
        ))}
      </Select>

      <Select
        value={selectedWard}
        onChange={(e) => {
          setSelectedWard(e.target.value);
          const ward = addressData[selectedProvince]['quan-huyen'][selectedDistrict]['xa-phuong'][e.target.value];
          setWardPathWithType(ward.path_with_type);
        }}
        displayEmpty
        disabled={!selectedDistrict}
        fullWidth
        size="small"
      >
        <MenuItem value="" disabled>
          Chọn Phường/Xã
        </MenuItem>
        {getWards().map((w) => (
          <MenuItem key={w.value} value={w.value}>
            {w.label}
          </MenuItem>
        ))}
      </Select>

      {wardPathWithType && <div className="text-sm text-gray-500">{wardPathWithType}</div>}

      <TextField
        fullWidth
        multiline
        rows={2}
        label="Tên đường, Tòa nhà, Số nhà"
        value={homeCode}
        onChange={(e) => setHomeCode(e.target.value)}
      />
    </div>
  );
};

export default AddressSelector;
