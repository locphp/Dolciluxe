// src/theme/AntdProvider.jsx
import { ConfigProvider } from 'antd';

const AntdProvider = ({ children }) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#ff6b81',
                    colorLinkHover: '#e2556e',
                },
                components: {
                    Button: {
                        colorPrimary: '#ff6b81',
                    },
                    Table: {
                        rowHoverBg: '#fff0f2',
                        rowSelectedBg: '#fff0f2',
                        rowSelectedHoverBg: '#ffe6ea',
                    },
                },
            }}
        >
            {children}
        </ConfigProvider>
    );
};

export default AntdProvider;
