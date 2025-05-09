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
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                backgroundColor: 'white',
                borderBottom: '2px solid #f0f0f0',
                padding: '16px',
            }}
            className="sm:flex-row sm:justify-between sm:items-center"
        >
            <Button
                type="text"
                onClick={hasSelected ? onRemoveSelected : null}
                size="middle"
                loading={loading}
                className="self-start sm:self-auto"
            >
                Xóa 
            </Button>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}
                className="sm:flex-row sm:items-center sm:justify-end sm:gap-8"
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: '8px',
                    }}
                    className="sm:flex-row sm:items-center sm:gap-4"
                >
                    <Text className="text-sm sm:text-base">
                        Tổng cộng ({selectedCount} sản phẩm):
                    </Text>
                    <Text
                        style={{
                            fontSize: 24,
                            fontWeight: 'bold',
                            color: '#664545',
                        }}
                        className="text-lg sm:text-xl"
                    >
                        {totalAmount}
                    </Text>
                </div>
                <Button
                    type="primary"
                    style={{
                        backgroundColor: hasSelected ? '#664545' : undefined,
                        borderColor: hasSelected ? '#664545' : undefined,
                        width: '200px',
                    }}
                    onClick={onCheckout}
                    size="large"
                    disabled={!hasSelected}
                    loading={loading}
                >
                    Mua hàng
                </Button>
            </div>
        </div>
    );
};

export default CartActions;