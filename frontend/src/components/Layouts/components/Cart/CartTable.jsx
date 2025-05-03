import React from 'react';
import { Table, Image, Typography, InputNumber, Popconfirm, Button, Empty } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const CartTable = ({ dataSource, rowSelection, onQuantityChange, onRemoveItem }) => {
    const navigate = useNavigate();
    const renderEmptyCart = () => (
        <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
                <span style={{ fontSize: '16px' }}>Bạn chưa có sản phẩm nào trong giỏ hàng</span>
            }
        >
            <Button
                type="primary"
                onClick={() => navigate('/category?page=1')} // Điều hướng đến trang sản phẩm
                style={{ marginTop: '20px' }}
            >
                Xem sản phẩm
            </Button>
        </Empty>
    );
    const columns = [
        {
            title: 'Sản phẩm',
            dataIndex: 'product',
            render: (text, record) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Image src={text.image} width={50} height={50} alt={text.name} />
                    <Text
                        style={{ cursor: 'pointer' }}
                        onClick={() => navigate(`/detailed/${record.key}`)}
                    >
                        {text.name}
                    </Text>
                </div>
            ),
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            render: (quantity, record) => (
                <InputNumber
                    min={1}
                    max={10}
                    value={quantity}
                    onChange={(value) => onQuantityChange(record.key, value)}
                />
            ),
        },
        {
            title: 'Số tiền',
            dataIndex: 'total',
            render: (text) => (
                <Text style={{ color: '#ff6b81', fontWeight: 'bold', fontSize: 16 }}>
                    {text}
                </Text>
            ),
        },
        {
            title: 'Thao tác',
            dataIndex: 'action',
            render: (_, record) => (
                <Popconfirm
                    title="Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?"
                    onConfirm={() => onRemoveItem(record.key)}
                    okText="Xác nhận"
                    cancelText="Hủy"
                >
                    <Button type="text">Xóa</Button>
                </Popconfirm>
            ),
        },
    ];

    return (
        <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            locale={{
                emptyText: renderEmptyCart() // Sử dụng custom empty component
            }}
        />
    );
};

export default CartTable;