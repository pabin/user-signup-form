import React from 'react';
import { render, fireEvent, cleanup, screen } from '@testing-library/react'
import Button from '../Button';

describe('Button', () => {
  const title = 'Next';
  const mockedOnClick = jest.fn();
  afterEach(cleanup)

  test('renders correctly when button is disabled', async () => {
    const wrapper = render(<Button title={title} onClick={mockedOnClick} disabled/>);

    expect(wrapper.baseElement).toMatchSnapshot();
    expect(wrapper.getByText(title)).toBeInTheDocument()
  });

  test('renders correctly when button is enabled', () => {
    const wrapper = render(<Button title={title} onClick={mockedOnClick} disabled={false}/>);

    expect(wrapper.baseElement).toMatchSnapshot();
    expect(wrapper.getByText(title)).toBeInTheDocument()
  });

  test('call onClick when pressed and is enabled', async () => {
    render(<Button title={title} onClick={mockedOnClick} disabled={false}/>);

    const button = screen.getByRole('button', { name: title});
    fireEvent.click(button);

    expect(mockedOnClick).toHaveBeenCalled();
  });

  test('should not call onClick when pressed and is disabled', async () => {
    render(<Button title={title} onClick={mockedOnClick} disabled />);

    const button = screen.getByRole('button', { name: title });
    fireEvent.click(button);

    expect(mockedOnClick).not.toHaveBeenCalled();
  });
});