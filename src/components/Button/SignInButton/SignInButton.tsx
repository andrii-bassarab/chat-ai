import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import './SignInButton.scss';
import classNames from 'classnames';

interface BaseProps {
  buttonStyle?: 'primary' | 'secondary';
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement>;

type SignInButtonProps =
  | ({
      as?: 'button';
    } & ButtonProps)
  | ({
      as?: 'a';
    } & AnchorProps);

export const SignInButton: React.FC<SignInButtonProps> = ({
  as = 'button',
  buttonStyle,
  className,
  ...restProps
}) => {
  if (as === 'button') {
    return (
      <button
        {...(restProps as ButtonProps)}
        className={classNames('sign-in-button', className, {
          ['sign-in-button--primary']: buttonStyle === 'primary',
          ['sign-in-button--secondary']: buttonStyle === 'secondary',
        })}
      ></button>
    );
  }

  return (
    <a
      {...(restProps as AnchorProps)}
      className={classNames('sign-in-button', className, {
        ['sign-in-button--primary']: buttonStyle === 'primary',
        ['sign-in-button--secondary']: buttonStyle === 'secondary',
      })}
    ></a>
  );
};
