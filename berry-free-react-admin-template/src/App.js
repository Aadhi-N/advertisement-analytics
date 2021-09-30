import React from 'react';
import { Provider, useSelector } from 'react-redux';
import store from "./store";

import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, StyledEngineProvider } from '@material-ui/core';

// routing
import Routes from './routes';

// defaultTheme
import themes from './themes';

// project imports
import NavigationScroll from './layout/NavigationScroll';


// ===========================|| APP ||=========================== //

const App = () => {
    const customization = useSelector((state) => state.customization);

    return (
        <Provider store={store}>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={themes(customization)}>
                    <CssBaseline />
                    <NavigationScroll>
                        <Routes />
                    </NavigationScroll>
                </ThemeProvider>
            </StyledEngineProvider>
        </Provider>
    );
};

export default App;
