import { createContext, useReducer } from 'react';

const StepsContext = createContext();
const SET_STEPS = 'SET_STEPS';
const UPDATE_CURRENT_STEP = 'UPDATE_CURRENT_STEP';

const StepsReducer = (state, action) => {
  switch (action.type) {
    case SET_STEPS: {
      return {
        ...state,
        steps: action.payload,
      };
    }

    case UPDATE_CURRENT_STEP: {
      return {
        ...state,
        currentStepIndex: action.payload,
      };
    }

    default:
      return state;
  }
};

const StepsState = ({ children }) => {
  const initialState = {
    steps: [],
    currentStepIndex: 0,
  };
  const [state, dispatch] = useReducer(StepsReducer, initialState);
  const setSteps = steps => {
    dispatch({
      type: SET_STEPS,
      payload: steps,
    });
  };
  const setCurrentStep = index => {
    dispatch({
      type: UPDATE_CURRENT_STEP,
      payload: index,
    });
  };
  return (
    <StepsContext.Provider
      value={{
        steps: state.steps,
        currentStepIndex: state.currentStepIndex,
        setSteps,
        setCurrentStep,
      }}>
      {children}
    </StepsContext.Provider>
  );
};

export { StepsContext, StepsReducer, StepsState };
