import classNames from 'classnames';
import './Loader.scss';

interface IProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    size?: 'large' | 'medium' | 'small'
  }

export const Loader: React.FC<IProps> = ({ className, size, ...restProps }) => {
  return (
    <div
      className={classNames(`lds-ring`, {
        [className!]: !!className,
        'lds-ring--large': size === 'large',
        'lds-ring--medium': size === 'medium',
        'lds-ring--small': size === 'small'
      })}
      {...restProps}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
