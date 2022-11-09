import React, { createContext, useContext } from 'react';

export function createGenericContext<T>() {
  return createContext<T>({} as T);
}

export function createGenericUseFunction<T>(context: React.Context<T>): () => NonNullable<T> {
  return (): NonNullable<T> => {
    const value: T = useContext<T>(context as React.Context<T>);

    return value as NonNullable<T>;
  };
}
