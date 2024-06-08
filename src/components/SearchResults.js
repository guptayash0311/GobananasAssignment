import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid } from '@mui/material';
import NewsItem from './NewsItem'; 

const SearchResults = ({ setProgress, apiKey, pageSize }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const fetchSearchResults = async () => {
            setProgress(10);
            const query = new URLSearchParams(location.search).get('query');
            if (query) {
                setProgress(30);
                const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}&pageSize=${pageSize}`;
                const response = await fetch(url);
                const data = await response.json();
                setProgress(70);
                setArticles(data.articles);
                setLoading(false);
                setProgress(100);
            }
        };

        fetchSearchResults();
    }, [location.search, apiKey, pageSize, setProgress]);

    return (
        <div>
            <h2>Search Results</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <Grid container spacing={2}>
                        {articles.length === 0 ? (
                            <p>No articles found for the search query.</p>
                        ) : (
                            articles.map((element) => (
                                <Grid item xs={12} sm={6} md={3} key={element.url}>
                                    <NewsItem
                                        title={element.title ? element.title : ""}
                                        description={element.description ? element.description : ""}
                                        imageUrl={element.urlToImage ? element.urlToImage : "newsaltimg.png"}
                                        newsUrl={element.url}
                                        author={element.author ? element.author : "Anonymous Author"}
                                        date={element.publishedAt}
                                    />
                                </Grid>
                            ))
                        )}
                    </Grid>
                </div>
            )}
        </div>
    );
};

export default SearchResults;
