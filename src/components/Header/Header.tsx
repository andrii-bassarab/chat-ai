import FigmaLogo from '@assets/images/figma/figma-logo.png';
import MoreIcon from '@assets/images/more_horiz.svg';
import Search from '@assets/images/search.svg';
import Trash from '@assets/images/delete.svg';
import './Header.scss';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleRight,
  faArrowLeftLong,
  faChevronDown,
  faChevronUp,
  faCircle,
} from '@fortawesome/free-solid-svg-icons';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import MultipleUploadHeader from '@/components/MultipleUpload/MultipleUploadHeader';
import { Link } from 'react-router-dom';
import { BreakPoints } from '@/utils/style/breakpoints';
import { useRef, useState } from 'react';
import { useCurrentDocument } from '@/store/currentDocument';
import { DeleteModal } from '../Modal/DeleteModal';
import { MoreOptionsDocument } from '../MoreOptionsDocument/MoreOptionsDocument';
import { useClickOutside } from '@/hooks/useClickOutside';
import { RoutesPath } from '@/router/routes-path';
import { SearchBar } from '../SearchBar';

const moreOptionsBtns = ['Updated document', 'Updated document'];

export const Header: React.FC = () => {
  const { pages, currentPageFocusNumber, goFocusOnNextPage, goFocusOnPrevPage, document } =
    useCurrentDocument();
  const matches = useMediaQuery(BreakPoints.xs);
  const [openSearchInput, setOpenSearchInput] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [openMoreOption, setOpenMoreOptions] = useState(false);

  const moreTabRef = useRef<HTMLDivElement>(null);

  useClickOutside(moreTabRef, () => setOpenMoreOptions(false), openMoreOption);
  const pathIsDocView = useMatch(RoutesPath.docViewGeneric);

  return (
    <header style={{ position: 'relative' }}>
      {matches ? (
        <nav className='header'>
          <div className='header_wrapp'>
            <div className='header_left'>
              {pathIsDocView && (
                <div className='header_docView'>
                  <FontAwesomeIcon
                    className='header_docView-icon'
                    icon={faArrowLeftLong}
                    onClick={() => navigate('/')}
                  />
                </div>
              )}
              <img className='header_figma-logo-image' src={FigmaLogo} alt='FigmaLogo' />
              {pathIsDocView && <div className='header_docView__title'>{document?.filename}</div>}
            </div>
            <div className='header_right'>
              <div className='header_icon header_nav-element--show-mobile' ref={moreTabRef}>
                <img
                  src={MoreIcon}
                  alt='More Action'
                  className='header_icon_img'
                  onClick={() => setOpenMoreOptions((prev) => !prev)}
                />
                {pathIsDocView && (
                  <MoreOptionsDocument
                    isOpen={openMoreOption}
                    setOpenWindow={setOpenMoreOptions}
                    buttonsList={moreOptionsBtns}
                  />
                )}
              </div>
              <div
                className='header_icon header_nav-element--show-mobile'
                onClick={() => setOpenSearchInput((prev) => !prev)}
              >
                <img src={Search} alt='FigmaLogo' className='header_icon_img' />
              </div>
              {pathIsDocView && (
                <div
                  className='header_icon header_nav-element--show-mobile'
                  onClick={() => setShowDeleteModal(true)}
                >
                  <img src={Trash} alt='FigmaLogo' className='header_icon_img' />
                </div>
              )}
              <button className='header_button'>{pathIsDocView ? 'Save' : 'New File'}</button>
            </div>
          </div>
        </nav>
      ) : (
        <nav className='header'>
          <div className='header_wrapp'>
            <div className='header_left'>
              <div className='header_figma-logo'>
                <img className='header_figma-logo-image' src={FigmaLogo} alt='FigmaLogo' />
              </div>
              {pathIsDocView && (
                <div className='header_docView'>
                  <button className='header_docView-icon-container' onClick={() => navigate('/')}>
                    <FontAwesomeIcon
                      className='header_docView-icon header_nav-element--show-mobile'
                      icon={faArrowLeftLong}
                    />
                  </button>
                  <button className='header_docView-icon-container' onClick={goFocusOnNextPage}>
                    <FontAwesomeIcon className='header_docView-icon' icon={faChevronDown} />
                  </button>
                  <button className='header_docView-icon-container' onClick={goFocusOnPrevPage}>
                    <FontAwesomeIcon className='header_docView-icon' icon={faChevronUp} />
                  </button>
                  <div className='header_docView_navItems'>
                    {<span>{`${currentPageFocusNumber} of ${pages.length} Pages`}</span>}
                    <FontAwesomeIcon
                      className='header_docView-dotIcon'
                      width={3}
                      icon={faCircle}
                      style={{ marginRight: 15, marginLeft: 15 }}
                    />
                  </div>
                  <div className='header_docView-txt'>
                    <Link to='/' className='header_docView-txt__documents'>
                      Documents
                    </Link>
                    <FontAwesomeIcon
                      className='header_docView-dotIcon'
                      width={8}
                      icon={faAngleRight}
                    />
                    <div style={{ alignSelf: 'center' }}>{document?.filename}</div>
                  </div>
                </div>
              )}
            </div>

            <div className='header_wrapper'>
              <div className='header_icon header_nav-element--show-mobile' ref={moreTabRef}>
                <img
                  src={MoreIcon}
                  alt='More button'
                  onClick={() => setOpenMoreOptions((prev) => !prev)}
                />
                {pathIsDocView && (
                  <MoreOptionsDocument
                    isOpen={openMoreOption}
                    setOpenWindow={setOpenMoreOptions}
                    buttonsList={moreOptionsBtns}
                  />
                )}
              </div>
              <button
                onClick={() => setOpenSearchInput((prev) => !prev)}
                className='header_icon header_nav-element--show-mobile'
              >
                <img src={Search} alt='FigmaLogo' />
              </button>
              {pathIsDocView && (
                <button
                  className='header_icon header_nav-element--show-mobile'
                  onClick={() => setShowDeleteModal(true)}
                >
                  <img src={Trash} alt='FigmaLogo' />
                </button>
              )}
              <MultipleUploadHeader pathname={pathname} />
            </div>
          </div>
        </nav>
      )}
      <DeleteModal isOpen={showDeleteModal} handleClose={() => setShowDeleteModal(false)} />
      <SearchBar openSearchInput={openSearchInput} setOpenSearchInput={setOpenSearchInput} />
    </header>
  );
};
