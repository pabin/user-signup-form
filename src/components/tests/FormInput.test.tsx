import React from 'react';
import { render, fireEvent, cleanup, screen } from '@testing-library/react'
import { PASSWORD_LABEL } from '../../constants/form';
import FormInput from '../FormInput';

describe('FormInput', () => {
  afterEach(cleanup);

  describe('when input type is password', () => {
    const props = {
      type: 'password',
      name: 'Password',
      value: 'randompassword',
      validationError: false,
      setValue: jest.fn(),
    }

    test('renders correctly', async () => {
      const wrapper = render(<FormInput {...props} />);
      expect(wrapper.baseElement).toMatchSnapshot();
    });

    test('renders correctly when there is validationError', async () => {
      const wrapper = render(<FormInput {...props} validationError={true} />);
      expect(wrapper.baseElement).toMatchSnapshot();
    });

    test(`should call setValue with ${props.value}`, async () => {
      render(<FormInput {...props} />);

      const input = screen.getByTestId(props.name);

      fireEvent.change(input, {target: { value: props.value}});
      expect(props.setValue).toHaveBeenCalledWith(props.value);
    });

    test(`when focused, should show label inside legend`, async () => {
      render(<FormInput {...props} />);

      fireEvent.focus(screen.getByTestId(props.name));
      const legend = screen.getByTestId(`legend-${PASSWORD_LABEL}`);

      expect(legend).toHaveTextContent(props.name);
    });

    test(`when out of focus and have value, show label inside legend`, async () => {
      render(<FormInput {...props} />);

      const input = screen.getByTestId(props.name);
      fireEvent.blur(input);

      const legend = screen.getByTestId(`legend-${PASSWORD_LABEL}`);
      expect(legend).toHaveTextContent(props.name);

    });

    test(`when out of focus without value, should not show label inside legend`, async () => {
      render(<FormInput {...props} value={''} />);

      const input = screen.getByTestId(props.name);
      fireEvent.blur(input);

      const legend = screen.getByTestId(`legend-${PASSWORD_LABEL}`);
      expect(legend).not.toHaveTextContent(props.name);

    });

    test('when clicked on eye icon, password input should have text type', async () => {
      render(<FormInput {...props} />);

      const eye = screen.getByTestId('eye');
      fireEvent.click(eye);

      const input = screen.getByTestId(props.name);

      expect(input.getAttribute('type')).toBe('text');
    });
  })

  describe('when input type is email', () => {
    const props = {
      type: 'email',
      name: 'email',
      value: 'randomemail@example.com',
      validationError: false,
      setValue: jest.fn(),
    }

    test('renders correctly', async () => {
      const wrapper = render(<FormInput {...props} />);
      expect(wrapper.baseElement).toMatchSnapshot();
    });

    test('renders correctly when there is validationError', async () => {
      const wrapper = render(<FormInput {...props} validationError={true} />);
      expect(wrapper.baseElement).toMatchSnapshot();
    });
  })

  describe('when input type is text', () => {
    const props = {
      type: 'text',
      name: 'Your Name',
      value: 'John Doe',
      validationError: false,
      setValue: jest.fn(),
    }

    test('renders correctly', async () => {
      const wrapper = render(<FormInput {...props} />);
      expect(wrapper.baseElement).toMatchSnapshot();
    });
  })

});