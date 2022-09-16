import React, { useState, useEffect } from "react";
import { db } from "../Firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  increment,
  doc,
} from "firebase/firestore";

const ClientSide = () => {
  const [counts, setCount] = useState([]);

  const countCollection = collection(db, "counter");

  useEffect(() => {
    const getCount = async () => {
      const data = await getDocs(countCollection);
      setCount(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getCount();
  }, []);

  const addCounter = async () => {
    try {
      const data = await addDoc(collection(db, "counter"), {
        number: 0,
      });

      setCount([...counts, { number: 0, id: data.id }]);
    } catch (err) {
      console.log(err);
    }
  };

  const incrementCount = async (id) => {
    const countDocRef = doc(db, "counter", id);
    try {
      const filtered = counts.filter((c) => c.id === id)[0];
      filtered.number += 1;
      const updateIncId = counts.map((c) => (c.id === id ? filtered : c));
      setCount(updateIncId);
      await updateDoc(countDocRef, {
        number: increment(1),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const decrementCount = async (id) => {
    const countDocRef = doc(db, "counter", id);
    try {
      const filtered = counts.filter((c) => c.id === id)[0];
      filtered.number -= 1;
      const updateDecId = counts.map((c) => (c.id === id ? filtered : c));
      setCount(updateDecId);
      await updateDoc(countDocRef, {
        number: increment(-1),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const resetCount = async (id) => {
    const countDocRef = doc(db, "counter", id);
    try {
      const filtered = counts.filter((c) => c.id === id)[0];
      filtered.number = 0;
      const updateResId = counts.map((c) => (c.id === id ? filtered : c));
      setCount(updateResId);
      await updateDoc(countDocRef, {
        number: 0,
      });
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
        {counts.map((c) => (
          <div key={c.id}>
            <p>{c.number}</p>{" "}
            <button onClick={() => incrementCount(c.id)}>Increment</button>
            <button onClick={() => decrementCount(c.id)}>Decrement</button>
            <button onClick={() => resetCount(c.id)}>Reset</button>
          </div>
        ))}
      </h1>
    </div>
  );
};

export default ClientSide;
