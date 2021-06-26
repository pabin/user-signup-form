import React from 'react';
import { render } from '@testing-library/react';
import App from './App';


describe('App', () => {
  test('renders app component correctly', () => {
    const wrapper = render(<App />);
    expect(wrapper.baseElement).toMatchSnapshot();
  });
});

