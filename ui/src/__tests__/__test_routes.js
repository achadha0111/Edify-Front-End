import {render as rtlRender, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    Link,
    Route,
    BrowserRouter as Router,
    Switch,
    useLocation,
} from 'react-router-dom';
import App from '../App';

const render = (ui, {route = '/'} = {}) => {
    window.history.pushState({}, 'Home page', route);

    return rtlRender(ui, {wrapper: Router});
}

// test('full app rendering/navigating', () => {
//     render(<App />);
//     expect(screen.getByText(/My Notes/i)).toBeInTheDocument();
//
//     userEvent.click(screen.getByText(/New Note/i));
//
//     expect(screen.getByText(/Untitled/i)).toBeInTheDocument();
// })

// test('landing on a bad page', () => {
//     render(<App />, {route: '/something-that-does-not-match'});
//
//     expect(screen.getByText(/no match/i)).toBeInTheDocument();
// })
//
// test('rendering a component that uses useLocation', () => {
//     const route = '/some-route';
//     render(<LocationDisplay />, {route});
//
//     // avoid using test IDs when you can
//     expect(screen.getByTestId('location-display')).toHaveTextContent(route);
// })