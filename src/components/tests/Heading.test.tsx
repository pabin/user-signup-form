import React from 'react';
import { render } from '@testing-library/react'
import Heading from '../Heading';

describe('Heading', () => {
  test('renders Heading component correctly', async () => {
    const wrapper = render(<Heading />);
    expect(wrapper.baseElement).toMatchSnapshot();
  });
});