import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

const reduxStore = configureStore({
  reducer: {
    counter: counterReducer
  }
});

export default reduxStore;

// import { useSelector, useDispatch } from "react-redux";
// import { increment, decrement } from "./counterSlice";

// const CounterComponent = () => {
//   const count = useSelector((state) => state.counter.count);
//   const dispatch = useDispatch();

//   return (
//     <div>
//       <h1>Counter: {count}</h1>
//       <button onClick={() => dispatch(increment())}>+</button>
//       <button onClick={() => dispatch(decrement())}>-</button>
//     </div>
//   );
// };

// export default CounterComponent;
