import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadIcon } from './icons/UploadIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';

interface UploadZoneProps {
  onPredict: (file: File) => void;
  status: 'idle' | 'processing' | 'analyzing';
}

const ProgressBar = () => (
    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div 
            className="bg-blue-600 h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-shimmer"
            style={{
                width: '100%',
                backgroundSize: '200% 100%',
            }}
        />
    </div>
);

export const UploadZone: React.FC<UploadZoneProps> = ({ onPredict, status }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onPredict(acceptedFiles[0]);
    }
  }, [onPredict]);

  const isDisabled = status !== 'idle';

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': [],
    },
    maxFiles: 1,
    multiple: false,
    disabled: isDisabled,
  });

  const renderContent = () => {
    switch (status) {
        case 'processing':
            return (
                <div className="w-full px-4">
                    <p className="text-gray-700 font-semibold mb-4">Processing image...</p>
                    <ProgressBar />
                </div>
            );
        case 'analyzing':
            return (
                <>
                    <SpinnerIcon className="w-10 h-10 animate-spin text-blue-600" />
                    <p className="text-gray-500 mt-2">Analyzing image...</p>
                </>
            );
        case 'idle':
        default:
            return (
                <>
                    <UploadIcon className="w-10 h-10 mb-3 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-900">
                        Upload Ultrasound Image
                    </h3>
                    <p className="text-gray-500 mt-1 text-sm">Drag & drop or browse your file</p>
                </>
            );
    }
  };

  return (
    <div
        {...getRootProps()}
        className={`w-full p-8 border-2 border-dashed rounded-lg transition-all duration-300 flex flex-col items-center justify-center text-center h-48
            ${isDisabled
                ? 'cursor-not-allowed bg-gray-100 border-gray-300'
                : `cursor-pointer bg-white ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`
            }
        `}
        aria-label="Ultrasound image upload zone"
    >
        <input {...getInputProps()} />
        {renderContent()}
    </div>
  );
};