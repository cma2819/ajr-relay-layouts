import { clone } from 'lodash';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { BundleNodecgInstance } from '../nodecg/nodecg';

type Replicants = {
  // rep: type
}

const defaultValues: Replicants = {
  // rep: value
};

export const ReplicantContext = createContext<Replicants>(defaultValues);

type Props = {
  children: ReactNode;
}

export const ReplicantProvider = ({ children }: Props) => {
  nodecg as BundleNodecgInstance;

  // const [rep, setRep] = useState<Type>(defaultValues.rep);

  useEffect(() => {
    // (nodecg as BundleNodecgInstance).Replicant('rep').on('change', (newVal) => {
    //   setRep(clone(newVal));
    // });
  }, [])

  return (
    <ReplicantContext.Provider value={{
      // rep
    }}>
      { children }
    </ReplicantContext.Provider>
  );
}