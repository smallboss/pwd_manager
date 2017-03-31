import React from 'react';
import MainSnackbar from './MainSnackbar';

const App = ({ children }) => {
    return (
        <div className='App'>
            <main>
                { children }
            </main>

            <footer>
                <MainSnackbar/>
            </footer>
        </div>
    )
}

export default App;