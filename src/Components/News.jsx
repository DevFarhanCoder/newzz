import React from "react";
import NewsItem from "./NewsItem";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import propTypes from "prop-types";

export default function News(props) {
  const [headlines, setHeadlines] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const fetchHeadlinesData = () => {
    props.changeProgress(20);
    setLoading(true);
    fetch(
      `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}&page=${page}&pagesize=${props.pageSize}`)}`,
      {
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
      }
    }
  )
      .then((response) => {
        props.changeProgress(30);
        setLoading(false);
        return response.json();
      })
      .then((data) => {
        setTotalResults(data.totalResults);
        setHeadlines(data.articles);
        props.changeProgress(100);
      })
      .catch((error) => {
        console.error("Error fetching headlines:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchHeadlinesData();
  }, [page, props.category, props.country]);

  const handlePrevClick = () => {
    setPage(page - 1);
  };

  const handleNextClick = () => {
    setPage(page + 1);
  };

  return (
    <>
      <div className="container" style={{ marginTop: "90px" }}>
        <h1>Headlines - {props.category}</h1>
        {loading && <Spinner></Spinner>}
        {!loading && Array.isArray(headlines) && headlines.length > 0 && (
          <div className="row">
            {headlines.map((headline) => (
              <div
                className="col-sm-12 col-md-6 col-lg-4 my-4"
                key={headline.url}
              >
                <NewsItem
                  title={headline.title}
                  description={headline.description}
                  imageUrl={headline.urlToImage}
                  url={headline.url}
                  mode={props.mode}
                  author={headline.author}
                  date={new Date(headline.publishedAt)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="container my-4 d-flex justify-content-between">
        <button
          disabled={page <= 1 ? true : false}
          className={`btn btn-${props.mode}`}
          onClick={handlePrevClick}
        >
          &larr; Prev
        </button>
        <button
          disabled={
            Math.ceil(totalResults / props.pageSize) === page ? true : false
          }
          className={`btn btn-${props.mode}`}
          onClick={handleNextClick}
        >
          Next &rarr;
        </button>
      </div>
    </>
  );
}

News.propTypes = {
  country: propTypes.string,
  pageSize: propTypes.number,
  category: propTypes.string,
};

News.defaultProps = {
  country: "us",
  pageSize: 15,
  category: "business",
};

