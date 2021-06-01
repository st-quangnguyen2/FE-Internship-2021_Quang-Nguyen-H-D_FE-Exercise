import React, { FC } from 'react';
import Empty from '../components/common/Empty';
import Loading from '../components/common/Loading';

export const loadData = (Wrapper: FC) => {
  return (props: any) =>
    props.data ? props.data.length ? <Wrapper {...props} /> : <Empty /> : <Loading />;
};
