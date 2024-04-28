import React, { useState } from 'react';
import { TextField, Button, CircularProgress } from '@mui/material';
import axios from 'axios';

const App = () => {
    const [url, setUrl] = useState('');
    const [filter, setFilter] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://localhost:3001/scrape', { url, filter });
            console.log(response)
            if (response.data.success) {
                // Provide a link/button to download the file
                window.open('http://localhost:3001/output.txt');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred during scraping.');
        }
        setLoading(false);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Enter URL"
                    variant="outlined"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Enter Filter"
                    variant="outlined"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    fullWidth
                />
                <Button type="submit" variant="contained" disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : 'Scrape and Download'}
                </Button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default App;
