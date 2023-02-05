import {
  useReducer,
  Reducer,
  Dispatch,
  useCallback,
  useEffect,
  useRef,
  ReducerState,
  ReducerAction
} from 'react'

import { IAction } from '../interfaces/interfaces';

export type AsyncAction<A> = (dispatch: Dispatch<A>) => void;
export type ThunkDispatch<A> = (action: A | AsyncAction<A>) => Promise<void>;
export type ActionOrThunk<A extends Reducer<any, IAction>> = ReducerAction<A> | ThunkDispatch<A>;

// TODO: handle array of actions;
const useThunkReducer = <R extends Reducer<any, IAction>>(
  reducer: R,
  initialState: ReducerState<R>,
  reducerName?: string
): [
    ReducerState<R>,
    ThunkDispatch<IAction>
  ] => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const prevState = useRef<ReducerState<R>>(state);

  useEffect(() => {
    const { action, state: previousState } = prevState.current;

    if (action && reducerName) {
      console.group(`${action.type}`);
      console.log(`%c Previous "${reducerName}" State`, "font-weight: 700; color: #9E9E9E", previousState);
      console.log("%c Action", "font-weight: 700; color: #6592fc", action)
      console.log(`%c Next "${reducerName}" State`, "font-weight: 700; color: #47B04B", state);
      console.groupEnd();
    }

    prevState.current = { ...prevState.current, state }
  }, [state])

  const thunkDispatch = useCallback<any>(
    (action: ActionOrThunk<R>) => {
      if (typeof action === 'function') {
        return action(thunkDispatch);
      } else {
        prevState.current = { ...prevState.current, action };
        return dispatch(action);
      }
    }, []);

  return [state, thunkDispatch];
}

export default useThunkReducer;