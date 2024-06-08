
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Grid } from '@mui/material';

const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        let passedData = await data.json()
        setArticles(passedData.articles)
        setTotalResults(passedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `NewsApp - ${capitalizeFirstLetter(props.category)}`;
        updateNews();
    }, [])

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page + 1)
        let data = await fetch(url);
        let passedData = await data.json()
        setArticles(articles.concat(passedData.articles))
        setTotalResults(passedData.totalResults)

    }
    return (
        <div className='container my-3'>
            <h1 className='fw-bold headingMarginManual'>NewsApp - Top Headlines</h1>
            {loading && <Spinner />}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}>

                <div className="container">
                    <Grid container spacing={2}>
                        {articles.map((element) => (
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
                        ))}
                    </Grid>
                </div>
            </InfiniteScroll>
        </div>
    )

}

export default News


News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}