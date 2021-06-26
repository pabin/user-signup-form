import React from 'react';
import { render, fireEvent } from '@testing-library/react'
import FormSelect from '../FormSelect';
import { SELECT_OPTION1, SELECT_OPTION3 } from '../../constants/form';

describe('FormSelect', () => {
  const mockedSetValue = jest.fn();

  test('renders FormSelect component correctly', async () => {
    const wrapper = render(<FormSelect setValue={mockedSetValue} />);
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  test('set Developer when first option is selected', async () => {
    const wrapper = render(<FormSelect setValue={mockedSetValue} />);

    const selectInput = wrapper.getByTestId('form-select');

    fireEvent.change(selectInput, {
      target: { value: SELECT_OPTION1},
    })

    expect(mockedSetValue).toHaveBeenCalledWith(SELECT_OPTION1);
  });

  test('set System Admin when last option is selected', async () => {
    const wrapper = render(<FormSelect setValue={mockedSetValue} />);

    const selectInput = wrapper.getByTestId('form-select');

    fireEvent.change(selectInput, {
      target: { value: SELECT_OPTION3},
    })
    expect(mockedSetValue).toHaveBeenCalledWith(SELECT_OPTION3);
  });
});