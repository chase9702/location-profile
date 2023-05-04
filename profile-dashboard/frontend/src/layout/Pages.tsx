import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import RouteMenu, {MenuInfo} from '@src/routes/RouteMenu';
import Home from "@src/pages/Home";



const Pages = (): React.ReactElement => {
    const submenus: MenuInfo[] = [].concat(...RouteMenu.map((menu) => menu.submenu));
    return (
            <Routes>
                <Route path={"/"}
                       element={Home}
                />
                {submenus.map((sub) => (
                    <Route
                        path={sub.to}
                        element={sub.component}
                    />
                ))}

            </Routes>
    )
}
export default Pages;
