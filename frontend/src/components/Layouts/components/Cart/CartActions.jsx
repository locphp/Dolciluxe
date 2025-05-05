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
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'white',
            borderBottom: '2px solid #f0f0f0',
            padding: '16px',
        }}>
            <Button
                type="text"
                onClick={hasSelected ? onRemoveSelected : null}
                size="middle"
                loading={loading}
            >
                Xóa
            </Button>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Text>Tổng cộng ({selectedCount} sản phẩm):</Text>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#664545' }}>
                            {totalAmount}
                        </Text>
                    </div>
                    <Button
                        type="primary"
                        style={
                            !hasSelected
                                ? { width: '200px' }
                                : {
                                    backgroundColor: '#664545',
                                    borderColor: '#664545',
                                    width: '200px',
                                }
                        }
                        onClick={onCheckout}
                        size="large"
                        disabled={!hasSelected}
                        loading={loading}
                    >
                        Mua hàng
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CartActions;