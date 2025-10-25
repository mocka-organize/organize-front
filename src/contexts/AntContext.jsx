import { ConfigProvider, notification } from "antd";
import { createContext } from "react";

/* eslint-disable react/prop-types */

// eslint-disable-next-line react-refresh/only-export-components
export const AntContext = createContext();

const AntProvider = ({ children }) => {

    const [api, contextHolder] = notification.useNotification({
            placement: "bottomRight",
            showProgress: true,
        });

    return (
        <AntContext.Provider value={{ api }}>
            { contextHolder }
            <ConfigProvider theme={{
                    token: {
                        colorPrimary: '#615fff',
                        colorLink: '#615fff'
                    },
                    components: {
                        Table: {
                            headerColor: '#615fff',
                            headerBg: '#FFFFFF'
                        },
                    }
                }}>
                {children}
            </ConfigProvider>
        </AntContext.Provider>
    );
}

export default AntProvider;