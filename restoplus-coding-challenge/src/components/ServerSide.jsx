import React, { useState, useEffect } from "react";
import axios from "axios";

const ServerSide = () => {
  const [counts, setCounts] = useState([]);

  useEffect(() => {
    axios
      .get("https://coding-challenge-wine.vercel.app/api/counter/")
      .then((res) => {
        setCounts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addCounter = async () => {
    try {
      const addCount = await axios.post(
        "https://coding-challenge-wine.vercel.app/api/counter/create"
      );

      if (addCount) {
        setCounts([...counts, addCount.data]);
      }
    } catch (err) {
      console.log("err");
    }
  };

  const incrementCount = async (id) => {
    try {
      const filtered = counts.filter((c) => c._id === id)[0];
      filtered.number += 1;
      const updateIncId = counts.map((c) => (c._id === id ? filtered : c));
      setCounts(updateIncId);
      const increment = await axios.post(
        `https://coding-challenge-wine.vercel.app/api/counter/increment/${id}`
      );
    } catch (err) {
      console.log(err);
    }
  };

  const decrementCount = async (id) => {
    try {
      const filtered = counts.filter((c) => c._id === id)[0];
      filtered.number -= 1;
      const updateDecId = counts.map((c) => (c._id === id ? filtered : c));
      setCounts(updateDecId);
      const decrement = await axios.post(
        `https://coding-challenge-wine.vercel.app/api/counter/decrement/${id}`
      );
    } catch (err) {
      console.log(err);
    }
  };

  const resetCount = async (id) => {
    try {
      const filtered = counts.filter((c) => c._id === id)[0];
      filtered.number = 0;
      const updateResId = counts.map((c) => (c._id === id ? filtered : c));
      setCounts(updateResId);
      const reset = await axios.post(
        `https://coding-challenge-wine.vercel.app/api/counter/reset/${id}`
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Add Counter</h2>
      <button onClick={() => addCounter()}>Add Counter</button>
      <hr></hr>

      <h1>
        {counts.length > 0 ? (
          counts.map((c) => (
            <div key={c._id}>
              <p>{c.number}</p>
              <button onClick={() => incrementCount(c._id)}>Increment</button>
              <button onClick={() => decrementCount(c._id)}>Decrement</button>
              <button onClick={() => resetCount(c._id)}>Reset</button>
            </div>
          ))
        ) : (
          <p>Nothing to see here</p>
        )}
      </h1>
    </div>
  );
};

export default ServerSide;
