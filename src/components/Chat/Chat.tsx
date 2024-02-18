import { useState, useEffect, useRef, useMemo, ChangeEventHandler } from 'react';
import './Chat.scss';
import FigmaLogo from '@assets/images/figma/figma-logo.png';
import Prompt from '@assets/images/saved-prompt.svg';
import Refresh from '@assets/images/replay.svg';
import SendIcon from '@assets/images/send.svg';
import { ThreeDots } from 'react-loader-spinner';
import classNames from 'classnames';
import { Cursor } from '../Cursor';
import { generateTimestamp } from '@/utils/time';
import { copyToClipBoard } from './helper';
import { IMessage } from './types';
import { usedClassNames } from '@/utils/style/classNames';
import { useLazyFetch } from '@/hooks/useLazyFetch';
import { getAiMessageByDocument } from '@/api/chat';
import { IDocument } from '@/types/Document';
import FailedButton from '@/assets/images/x-button.png';
import { Icon } from '../Icon';

interface IProps {
  userId: string;
  document: IDocument;
}

const Chat: React.FC<IProps> = ({ userId, document: fileDocument }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const inputTypingTextRef = useRef<HTMLParagraphElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);
  const [messages, setMessages] = useState<IMessage[]>([
    {
      userId: 'server',
      text: 'Hello! I am a multilingual document assistant here to help you with any questions you may have regarding the uploaded document. The document in question is a purchase agreement template for used boats. It contains important information about the contractual parties, details of the boat, equipment list, sale price, handover, warranty, and the place of jurisdiction and applicable law. This template is available for download on a specific website.',
      timestamp: generateTimestamp(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoadingResponse, setIsLoandingResponse] = useState(false);
  const [dotsAnimation, setDotsAnimation] = useState(false);
  const [completedTyping, setCompletedTyping] = useState(false);
  const [displayResponse, setDisplayResponse] = useState('');
  const [trigger, { data, error }] = useLazyFetch<
    string,
    Parameters<typeof getAiMessageByDocument>
  >({ apiFunction: getAiMessageByDocument });

  const serverMessage: IMessage = useMemo(() => {
    if (error) {
      return {
        userId: 'server',
        text: 'Failed Request. Try again please',
        timestamp: generateTimestamp(),
        failedStatus: true,
      };
    }

    return {
      userId: 'server',
      text: data || '',
      timestamp: generateTimestamp(),
    };
  }, [data, error]);

  const [userScrolledToTop, setUserScrolledToTop] = useState(false);

  const setServerMessage = (serverMessage: IMessage) => {
    if (serverMessage.text) {
      setMessages((prevMessages) => [...prevMessages, serverMessage]);
    }
    setIsLoandingResponse(false);
    setCompletedTyping(false);
  };

  const handleSendMessage = async () => {
    if (inputRef.current) {
      inputRef.current.style.height = '55px';
    }

    setInputMessage('');

    if (inputMessage.trim() === '') return;

    setDisplayResponse('');
    setDotsAnimation(true);
    setIsLoandingResponse(true);

    const userMessage = {
      userId,
      text: inputMessage,
      timestamp: generateTimestamp(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    await trigger({ prompt: inputMessage.trim(), document_id: fileDocument.document_id });
  };

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (!completedTyping && e.deltaY < 0 && chatContainerRef.current?.scrollTop !== 0) {
        setUserScrolledToTop(true);
        return;
      }

      if (!chatContainerRef.current) return;

      setUserScrolledToTop(
        chatContainerRef.current?.scrollTop + chatContainerRef.current?.offsetHeight + 20 <=
          chatContainerRef.current?.scrollHeight,
      );
    };

    if (chatContainerRef.current) {
      chatContainerRef.current.addEventListener('wheel', handleScroll);
    }

    return () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.removeEventListener('wheel', handleScroll);
      }
    };
  }, [isLoadingResponse]);

  useEffect(() => {
    if (data) {
      setDotsAnimation(false);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setServerMessage(serverMessage);
    }
  }, [error]);

  useEffect(() => {
    if (completedTyping && isLoadingResponse) {
      setServerMessage(serverMessage);
    }
  }, [completedTyping, isLoadingResponse]);

  useEffect(() => {
    const handleFocus = () => {
      // setKeyboardIsOpen(true);
    };

    const handleBlur = () => {
      setKeyboardIsOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const inputElement = inputRef.current;

    if (inputElement) {
      inputElement.addEventListener('focus', handleFocus);
      inputElement.addEventListener('blur', handleBlur);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener('focus', handleFocus);
        inputElement.removeEventListener('blur', handleBlur);
      }
    };
  }, []);

  useEffect(() => {
    if (!isLoadingResponse || dotsAnimation || !data) return;

    setCompletedTyping(false);

    let i = 0;
    const intervalId = setInterval(() => {
      setDisplayResponse(serverMessage.text.slice(0, i));

      i++;

      if (i > serverMessage.text.length) {
        clearInterval(intervalId);
        setCompletedTyping(true);
      }
    }, 20);

    return () => {
      clearInterval(intervalId);
    };
  }, [dotsAnimation, isLoadingResponse, data]);

  useEffect(() => {
    setUserScrolledToTop(false);

    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const element = inputTypingTextRef.current;

    if (!element || !displayResponse || userScrolledToTop) return;

    if (element?.scrollHeight >= element?.clientHeight && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [displayResponse]);

  const resizeTextarea = () => {
    if (!inputRef.current) return;

    inputRef.current.style.height = '55px';
    inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
  };

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setInputMessage(event.target.value);
    resizeTextarea();
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      setInputMessage('');
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (inputMessage === '' && inputRef.current) {
      inputRef.current.style.height = '55px';
    }
  }, [inputMessage]);

  return (
    <div
      className={classNames('chat', {
        ['chat--active-keyboard']: keyboardIsOpen,
      })}
    >
      <div
        className={classNames('chat__container', {
          [usedClassNames.invisibleScroll]:
            !userScrolledToTop && !completedTyping && isLoadingResponse,
        })}
        ref={chatContainerRef}
      >
        {messages.map((message, index) => {
          const { userId, text, timestamp, failedStatus } = message;
          const isUserMessage = userId !== 'server';

          return (
            <div
              key={index}
              className={`chat__container__message ${
                isUserMessage ? 'user-message' : 'server-message'
              }`}
            >
              <div
                className={`chat__container__message__imageContainer ${
                  isUserMessage ? 'user-message' : 'server-message'
                }`}
              >
                <img
                  src={isUserMessage ? FigmaLogo : Prompt}
                  alt={isUserMessage ? FigmaLogo : Prompt}
                  className='chat__container__message__image'
                />
              </div>
              <div className={isUserMessage ? 'chat__container__message-container--user' : ''}>
                <div
                  className={`chat__container__message__textBox ${
                    isUserMessage ? 'user-textBox' : 'server-textBox'
                  } ${failedStatus ? 'chat__container__message__textBox--failed' : ''}`}
                >
                  {failedStatus && <img src={FailedButton} width={20} height={20} />}
                  <p className='chat__container__message__text'>{text}</p>
                  {isUserMessage ? null : (
                    <div className='chat__container__message__icon-container'>
                      <img
                        className='chat__container__message__refresh'
                        src={Refresh}
                        alt='Refresh'
                      />
                      <Icon
                        spriteId='content-copy'
                        onClick={() => copyToClipBoard(text)}
                        className='chat__container__message__copy'
                      />
                    </div>
                  )}
                </div>
                <p
                  className={`chat__container__timestamp ${
                    isUserMessage ? 'user-message' : 'server-message'
                  }`}
                >
                  {timestamp}
                </p>
              </div>
            </div>
          );
        })}
        {isLoadingResponse ? (
          <div className='chat__container__message__textBoxTyping'>
            {dotsAnimation ? (
              <ThreeDots
                // className={'three_dots'}
                height='30'
                width='30'
                radius='3'
                color='#000'
                ariaLabel='three-dots-loading'
                wrapperStyle={{}}
                wrapperClass=''
                visible={true}
              />
            ) : (
              <p className='chat__container__message__typing-text' ref={inputTypingTextRef}>
                {displayResponse}
                {!completedTyping && <Cursor />}
              </p>
            )}
          </div>
        ) : null}
      </div>
      <div className='chat__input'>
        <img src={Prompt} alt='' className='chat__input__prompt' />
        <textarea
          id='chatTextarea'
          ref={inputRef}
          required
          value={inputMessage}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          className='chat__input__field'
          placeholder='Ask a question...'
        />
        <button onClick={handleSendMessage} className='chat__input__button'>
          <img src={SendIcon} alt='SendIcon' />
        </button>
      </div>
    </div>
  );
};

export default Chat;
