// src/theme/AntdProvider.jsx
import { ConfigProvider } from 'antd';

const AntdProvider = ({ children }) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#ff6b81',
                    colorLinkHover: '#e2556e',
                    // activeBorderColor: '#ff6b81',
                    // hoverBorderColor: '#ff6b81',
                    // hoverBgColor: '#fff0f2',
                    // colorPrimaryHover: '#ff6b81',
                    // colorPrimaryActive: '#ff6b81',
                    // activeBorderColor: '#ff6b81',

                },
                components: {
                    Button: {
                        colorPrimary: '#ff6b81',
                        colorPrimaryHover: '#ff4f67',
                    },
                    Table: {
                        rowHoverBg: '#fff0f2',
                        rowSelectedBg: '#fff0f2',
                        rowSelectedHoverBg: '#ffe6ea',
                    },
                    Input: {
                        // colorPrimary: '#ff6b81',
                        // colorPrimaryHover: '#ff6b81',
                        // colorPrimaryActive: '#ff6b81',
                        borderColor: '#ff6b81',
                        borderRadius: 4,
                    },
                },
            }}
        >
            {children}
        </ConfigProvider>
    );
};

export default AntdProvider;
