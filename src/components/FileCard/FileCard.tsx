import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropdown from '../Dropdown/Dropdown';
import './FileCard.scss';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Icon from '@assets/images/square-icon.png';

export const FileCard = () => {
  return (
    <section className='conversasions_nav'>
      <h2 className='conversasions_nav-title'>Your Conversations</h2>
      <div className='conversasions_nav-container'>
        <Dropdown />
        <FontAwesomeIcon icon={faBars} className='conversasions_nav-container-icon' />
        <img src={Icon} alt='Icon' width={20}/>
      </div>
    </section>
  );
};
