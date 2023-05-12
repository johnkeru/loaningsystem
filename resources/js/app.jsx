import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "./components/utils/NotFound";
import Home from "./pages/Home";

import { Provider } from "react-redux";
import store from "./store/store";
import { ThemeProvider } from "@emotion/react";
import theme from "./global/styles/mui";

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <div>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </Provider>
        </ThemeProvider>
    );
};

export default App;
