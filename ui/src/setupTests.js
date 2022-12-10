import React from 'react'
import {render} from '@testing-library/react'
import {HelmetProvider} from "react-helmet-async";
import {BrowserRouter} from "react-router-dom";
import {setupServer} from "msw/node";
import {rest} from "msw";
import {authContext} from "./auth/AuthContext";

const mockAuthContextValue = {
    user: {"name": "Mockito"},
    signIn: jest.fn(),
    signOut: jest.fn(),
    checkLogin: jest.fn(),
    fetchIdToken: jest.fn(),
}

const AllTheProviders = ({children}) => {
    return (
        <authContext.Provider value={mockAuthContextValue}>
            <BrowserRouter>
                <HelmetProvider>
                    {children}
                </HelmetProvider>
            </BrowserRouter>
        </authContext.Provider>
    )
}

const customRender = (ui, options) => {
    window.history.pushState({}, 'Home page', "/");
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

const setupMockZeppelinServer = () => {
    const zepResponse = {"noteID": "someId", "paragraphId": "someotherid"}
    const server = setupServer(
        rest.get("http://localhost:8888/api/notebook", (req, res, ctx) => {
            return res(ctx.status(200), ctx.json(zepResponse))
        }),

        rest.post("http://localhost:8888/api/notebook", (req, res, ctx) => {
            return res(ctx.status(200), ctx.json(zepResponse))
        }),

        rest.delete("http://localhost:8888/api/notebook/undefined", (req, res, ctx) => {
            return res(ctx.status(200), ctx.json(zepResponse));
        }),

        rest.options("http://localhost:8888/api/notebook/undefined", (req, res, ctx) => {
            return res(ctx.status(200), ctx.json(zepResponse))
        })
    );

    beforeAll(() => server.listen());
    afterAll(() => server.close())
}


// re-export everything
export * from '@testing-library/react';
export * from '@testing-library/jest-dom';
export * from '@testing-library/user-event';
export * from 'react-router-dom';
// override render method
export {customRender as render, customBeforeEach, setupMockZeppelinServer};