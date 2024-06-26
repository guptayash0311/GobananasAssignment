import Appbar from "./components/Appbar";
import News from "./components/News";
import LoadingBar from 'react-top-loading-bar';
import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import SearchResults from "./components/SearchResults";
import WebFooter from "./components/Footer";


const App = () => {
  const pageSize = 12;
  const apiKey = process.env.REACT_APP_NEWS_API

  const [progress, setProgress] = useState(0)
  return (
    <>
      <Router>
        <Appbar />
        <LoadingBar
          color='rgb(13 110 253)'
          progress={progress} />
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country='in' category='general' />}></Route>
          <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country='in' category='general' />}></Route>
          <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country='in' category='business' />}></Route>
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country='in' category='entertainment' />}></Route>
          <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country='in' category='health' />}></Route>
          <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country='in' category='science' />}></Route>
          <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country='in' category='sports' />}></Route>
          <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country='in' category='technology' />}></Route>
          <Route exact path="/search" element={<SearchResults setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} />}></Route>
        </Routes>
        <WebFooter />
      </Router>
    </>
  );
}

export default App;
