import React from 'react';
import { render, fireEvent, cleanup, screen } from '@testing-library/react'
import Form from '../Form';
import { EMAIL_ADDRESS, EMAIL_VALIDATION_MESSAGE, PASSWORD_HELP_TEXT, PASSWORD_LABEL, SELECT_OPTION1 } from '../../constants/form';

describe('Form', () => {
  const testEmail = 'myemail@gmail.com';
  const invalidEmail = 'not_a_valid_email';

  const validPassword = 'thisisvalidpassword';
  const invalidPassword = 'invalid';

  const buttonTitle = 'Next';

  afterEach(cleanup)

  test('renders Form component correctly', async () => {
    const wrapper = render(<Form />);
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  describe('when email input field is changed', () => {
    test(`with valid email, should call set email without validation error`, async () => {
      render(<Form />);

      const input = screen.getByTestId(EMAIL_ADDRESS);
      fireEvent.change(input, { target: { value: testEmail}})

      const legend = screen.getByTestId(`legend-${EMAIL_ADDRESS}`);
      expect(legend).toHaveTextContent(EMAIL_ADDRESS);
    });

    test(`with invalid email, should set validation error`, async () => {
      render(<Form />);

      const input = screen.getByTestId(EMAIL_ADDRESS);
      fireEvent.change(input, { target: { value: invalidEmail}})

      const validation = screen.getByTestId('emailError');
      expect(validation).toHaveTextContent(EMAIL_VALIDATION_MESSAGE);
    });

    test(`with email is added and removed, should remove validation error`, async () => {
      render(<Form />);

      fireEvent.focus(screen.getByTestId(EMAIL_ADDRESS));
      fireEvent.change(screen.getByTestId(EMAIL_ADDRESS), {
        target: { value: 'typing_email_now'},
      })

      fireEvent.change(screen.getByTestId(EMAIL_ADDRESS), {
        target: { value: ''},
      })

      const legend = screen.getByTestId(`legend-${EMAIL_ADDRESS}`);

      expect(legend).toHaveTextContent(EMAIL_ADDRESS);
    });
  });

  describe('when password input field is changed', () => {
    test(`with valid password, should call set password without validation error`, async () => {
      render(<Form />);
      const input = screen.getByTestId(PASSWORD_LABEL);

      fireEvent.change(input, { target: { value: validPassword}})
      const legend = screen.getByTestId(`legend-${PASSWORD_LABEL}`);
      expect(legend).toHaveTextContent(PASSWORD_LABEL);
    });

    test(`with invalid password, should set validation error`, async () => {
      render(<Form />);

      const input = screen.getByTestId(PASSWORD_LABEL);
      fireEvent.change(input, { target: { value: invalidPassword}})

      const validation = screen.getByTestId('passwordHelpText');
      expect(validation).toHaveTextContent(PASSWORD_HELP_TEXT);
    });

    test(`with password is added and removed, should remove validation error`, async () => {
      render(<Form />);

      fireEvent.focus(screen.getByTestId(PASSWORD_LABEL));
      fireEvent.change(screen.getByTestId(PASSWORD_LABEL), {
        target: { value: 'typing_password_now'},
      })

      fireEvent.change(screen.getByTestId(PASSWORD_LABEL), {
        target: { value: ''},
      })

      const legend = screen.getByTestId(`legend-${PASSWORD_LABEL}`);

      expect(legend).toHaveTextContent(PASSWORD_LABEL);
    });
  });

  describe('when submit button is clicked', () => {
    test(`with valid input values, should set current step to 2`, async () => {
      render(<Form />);

      fireEvent.change(screen.getByTestId(PASSWORD_LABEL), {
        target: { value: validPassword},
      })

      fireEvent.change(screen.getByTestId(EMAIL_ADDRESS), { target: { value: testEmail}})

      fireEvent.change(screen.getByTestId('Your Name'), {
        target: { value: 'Test Name'},
      })

      fireEvent.change(screen.getByTestId('form-select'), {
        target: { value: SELECT_OPTION1},
      })

      const button = screen.getByRole('button', { name: buttonTitle});
      fireEvent.click(button);

      const currentStep = screen.getByTestId('currentStep');
      expect(currentStep).toHaveTextContent('Step 2 of 3 . . .');
    });

    test(`without valid input values`, async () => {
      render(<Form />);

      fireEvent.change(screen.getByTestId(PASSWORD_LABEL), {
        target: { value: invalidPassword},
      })

      fireEvent.change(screen.getByTestId(EMAIL_ADDRESS), { target: { value: invalidEmail}})

      fireEvent.change(screen.getByTestId('Your Name'), {
        target: { value: 'Test Name'},
      })

      const button = screen.getByRole('button', { name: buttonTitle});
      fireEvent.click(button);

      const currentStep = screen.getByTestId('currentStep');
      expect(currentStep).toHaveTextContent('Step 1 of 3 . . .');
    });
  });
});