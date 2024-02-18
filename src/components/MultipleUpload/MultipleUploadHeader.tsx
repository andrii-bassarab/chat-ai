import React, { useState, useRef, useEffect, FormEventHandler } from 'react';
import './MultipleUploadHeader.scss';
import { uploadDocument } from '@/api/document';
import { useNavigate } from 'react-router';
import { useDocuments } from '@/store/documents';
import { useUserStore } from '@/store/user';
import { useMatch } from 'react-router-dom';
import { RoutesPath } from '@/router/routes-path';
import { toast } from 'react-toastify';
import { toastStyles } from '@/services/toastify/defaultStyles';

type Props = {
  pathname: string;
};

const MultipleUploadHeader = ({ pathname }: Props) => {
  const navigate = useNavigate();
  const [files, setFiles] = useState<FileList | null>(null);
  const [status, setStatus] = useState<'initial' | 'uploading' | 'success' | 'fail'>('initial');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { userId } = useUserStore();
  const { refetchDocuments } = useDocuments();
  const pathIsDocView = useMatch(RoutesPath.docViewGeneric);

  const notifyErrorUpload = () => toast.error('Failed to upload document!', toastStyles);
  const notifySuccessUpload = () => toast.success('Successfully upload document!', toastStyles);

  useEffect(() => {
    if (status === 'success' || status === 'fail') {
      const timeoutId = setTimeout(() => {
        setFiles(null);
        setStatus('initial');
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [status]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setStatus('initial');
      setFiles(e.target.files);
      e.target.files = null;
    }
  };

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleSaveFile = () => {
    navigate(RoutesPath.home);
  };

  const handleUpload = async () => {
    if (files) {
      setStatus('uploading');

      try {
        const arrayOfRequestUpload = [...files].map((file) => {
          const formData = new FormData();

          formData.append('filename', file.name.split('.')[0]);
          formData.append('file', file);

          return uploadDocument(userId!, formData);
        });

        await Promise.all(arrayOfRequestUpload);
        notifySuccessUpload();
        await refetchDocuments(userId!);

        setStatus('success');
      } catch (error) {
        console.error(error);
        notifyErrorUpload();
        setStatus('fail');
      }
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type='file'
        accept='.pdf'
        multiple
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      {!files ? (
        <button
          onClick={pathname === RoutesPath.home ? handleChooseFile : handleSaveFile}
          className='header_button'
          onChange={handleFileChange as FormEventHandler<HTMLButtonElement>}
        >
          {pathIsDocView ? 'Save' : 'New File'}
        </button>
      ) : (
        <button onClick={handleUpload} className='header_button'>
          <p>{files.length} selected</p>
          <div className='header_upload'>
            Upload <Result status={status} />
          </div>
        </button>
      )}
    </>
  );
};

const Result = ({ status }: { status: string }) => {
  if (status === 'success') {
    return <p> ✅</p>;
  } else if (status === 'fail') {
    return <p> ❌</p>;
  } else if (status === 'uploading') {
    return <p> ⏳</p>;
  } else {
    return null;
  }
};

export default MultipleUploadHeader;
