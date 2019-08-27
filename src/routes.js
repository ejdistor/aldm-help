import React from 'react';
import Loadable from 'react-loadable';
import Loading from './components/Loading';

export const HelpCore = Loadable({
    loader: () => import('./components/HelpCore'),
    loading: Loading,
});
export const Main = Loadable({
    loader: () => import('./components/Main'),
    loading: Loading,
});
export const Welcome = Loadable({
    loader: () => import('./components/Welcome'),
    loading: Loading,
});
export const StaticContainer = Loadable({
    loader: () => import('./components/StaticContainer'),
    loading: Loading,
});