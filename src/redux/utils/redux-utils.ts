import { useMemo } from 'react';

import { ActionCreatorsMapObject, bindActionCreators } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { AppDispatchType, RootStateType } from './types';

export const useAppDispatch = (): any => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;

export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T): any {
  const dispatch = useAppDispatch();

  const boundActions = useMemo(() => {
    return bindActionCreators(actions, dispatch);
  }, [actions, dispatch]);

  return boundActions;
}
