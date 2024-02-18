import classNames from "classnames";
import './Icon.scss';

interface IProps extends React.SVGProps<SVGSVGElement> {
  spriteId: string;
}

const PREFIX = '#icon-';

export const Icon: React.FC<IProps> = ({ onClick, spriteId, className }) => (
  <svg tabIndex={0} onClick={onClick} className={classNames('icon-default-style', {[className!]: className})}>
    <use href={`${PREFIX}${spriteId}`} />
  </svg>
);
