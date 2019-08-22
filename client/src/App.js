import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./components/SavedList";
import MovieList from "./components/MovieList";
import Movie from "./components/Movie";
import MovieForm from "./components/MovieForm";

const App = () => {
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/update-movie/:id"
        render={props => {
          return <MovieForm {...props} subFun={console.log} />
        }} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
    </>
  );
};

export default App;
