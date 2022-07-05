import React from 'react'
import {render} from '@testing-library/react'
import {HelmetProvider} from "react-helmet-async";
import {BrowserRouter} from "react-router-dom";

const AllTheProviders = ({children}) => {
    return (
        <BrowserRouter>
            <HelmetProvider>
                {children}
            </HelmetProvider>
        </BrowserRouter>
    )
}

const customRender = (ui, options) => {
    render(ui, {wrapper: AllTheProviders, ...options});
}

const customBeforeEach = () => {
    beforeEach(() => {
        Object.defineProperty(window, "sessionStorage", {
            value: {
                getItem: jest.fn(() => "value"),
                setItem: jest.fn(() => "value")
            },
            writable: true
        });
    });
}


// re-export everything
export * from '@testing-library/react';
export * from '@testing-library/jest-dom';
export * from '@testing-library/user-event';
export * from 'react-router-dom';
// override render method
export {customRender as render, customBeforeEach};