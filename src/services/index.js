import axios from 'axios';
import Factory from './factory';

export const baseURL = 'http://localhost:3000';
export const instance = axios.create({ baseURL });

export const headers = _ => {
  const headers = { 'Content-Type': 'application/json' };
  return headers;
};

export const config = () => {
  return { headers: headers() };
};

export const ToolsService = Factory({
  instance,
  config,
  resourceName: 'tools'
});
