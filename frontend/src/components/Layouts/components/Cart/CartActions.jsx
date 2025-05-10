import React from 'react';
import { Button, Typography } from 'antd';

const { Text } = Typography;

const CartActions = ({
    hasSelected,
    onRemoveSelected,
    onCheckout,
    selectedCount,
    totalAmount,
    loading,
}) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white border-b-2 border-gray-100 p-4">
            {/* Nút Xoá */}
            <div
                className="flex justify-center sm:justify-start"
                style={{
                    padding: '8px',
                    borderRadius: '4px',
                }}
            >
                <Button
                    type="text"
                    onClick={hasSelected ? onRemoveSelected : null}
                    size="middle"
                    loading={loading}
                    disabled={!hasSelected}
                >
                    Xóa
                </Button>
            </div>

            {/* Phần hiển thị Tổng cộng + Button */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6 w-full sm:w-auto">
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 text-center sm:text-left">
                    <Text className="text-sm sm:text-base">
                        Tổng cộng ({selectedCount} sản phẩm):
                    </Text>
                    <Text
                        className="text-lg sm:text-xl font-bold"
                        style={{ color: '#ff6b81' }}
                    >
                        {totalAmount}
                    </Text>
                </div>
                <Button
                    type="primary"
                    style={{
                        backgroundColor: hasSelected ? '#ff6b81' : undefined,
                        borderColor: hasSelected ? '#ff6b81' : undefined,
                    }}
                    onClick={onCheckout}
                    size="large"
                    disabled={!hasSelected}
                    loading={loading}
                    className="w-full sm:w-auto"
                >
                    Mua hàng
                </Button>
            </div>
        </div>
    );
};

export default CartActions;