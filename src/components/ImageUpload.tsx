import React, { useState, useRef } from 'react';

interface ImageUploadProps {
  onImagesChange: (images: File[], mainImageIndex: number) => void;
  onMainImageUrlChange: (url: string) => void;
  maxImages?: number;
  maxSizeMB?: number;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onImagesChange, 
  onMainImageUrlChange,
  maxImages = 5, 
  maxSizeMB = 10 
}) => {
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [mainImageIndex, setMainImageIndex] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [mainImageUrl, setMainImageUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const validateFile = (file: File): boolean => {
    // Check file type
    if (!file.type.match(/^image\/(jpeg|jpg|png|gif|webp)$/)) {
      setError(`Formato inválido: ${file.name}. Use JPEG, PNG, GIF ou WebP.`);
      return false;
    }

    // Check file size
    if (file.size > maxSizeBytes) {
      setError(`Arquivo muito grande: ${file.name}. Máximo ${maxSizeMB}MB.`);
      return false;
    }

    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files);
    const validFiles: File[] = [];
    const invalidFiles: string[] = [];

    // Validate files
    newFiles.forEach(file => {
      if (validateFile(file)) {
        validFiles.push(file);
      } else {
        invalidFiles.push(file.name);
      }
    });

    if (invalidFiles.length > 0) {
      setError(`Alguns arquivos não foram adicionados: ${invalidFiles.join(', ')}`);
    }

    // Check if we exceed max images
    const totalImages = images.length + validFiles.length;
    if (totalImages > maxImages) {
      setError(`Você pode enviar no máximo ${maxImages} imagens.`);
      validFiles.splice(maxImages - images.length);
    }

    // Process valid files
    if (validFiles.length > 0) {
      const newImages = [...images, ...validFiles];
      const newPreviews = [...imagePreviews];
      
      validFiles.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result as string);
          if (newPreviews.length === newImages.length) {
            setImages(newImages);
            setImagePreviews(newPreviews);
            onImagesChange(newImages, mainImageIndex);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    const newPreviews = [...imagePreviews];
    
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setImages(newImages);
    setImagePreviews(newPreviews);
    
    // Adjust main image index if needed
    let newMainIndex = mainImageIndex;
    if (index < mainImageIndex || (index === mainImageIndex && newImages.length > 0)) {
      newMainIndex = Math.max(0, mainImageIndex - 1);
    } else if (newImages.length === 0) {
      newMainIndex = 0;
    }
    
    setMainImageIndex(newMainIndex);
    onImagesChange(newImages, newMainIndex);
  };

  const setAsMainImage = (index: number) => {
    setMainImageIndex(index);
    onImagesChange(images, index);
  };

  const handleMainImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setMainImageUrl(url);
    onMainImageUrlChange(url);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Imagem Principal *
        </label>
        <div className="space-y-3">
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={triggerFileInput}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Upload de Imagem
            </button>
            <button
              type="button"
              onClick={() => document.getElementById('main-image-url')?.focus()}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Inserir URL
            </button>
          </div>
          
          <input
            id="main-image-url"
            type="url"
            value={mainImageUrl}
            onChange={handleMainImageUrlChange}
            placeholder="https://example.com/imagem.jpg"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-brand-accent focus:border-brand-accent"
          />
          
          <input
            ref={fileInputRef}
            type="file" 
            accept="image/*" 
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
          {error}
        </div>
      )}

      {mainImageUrl && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">URL da Imagem Principal:</p>
          <div className="flex items-center space-x-3">
            <img 
              src={mainImageUrl} 
              alt="Preview da URL" 
              className="h-20 w-20 object-cover rounded-md border"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/80';
              }}
            />
            <div className="flex-1">
              <p className="text-sm text-gray-600 truncate">{mainImageUrl}</p>
              <button
                type="button"
                onClick={() => {
                  setMainImageUrl('');
                  onMainImageUrlChange('');
                }}
                className="mt-1 text-sm text-red-600 hover:text-red-800"
              >
                Remover URL
              </button>
            </div>
          </div>
        </div>
      )}

      {imagePreviews.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Imagens Adicionais (até {maxImages - 1}):</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative group">
                <div className="relative aspect-square rounded-md overflow-hidden border-2 border-gray-200">
                  <img 
                    src={preview} 
                    alt={`Preview ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(index);
                        }}
                        className="bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                        title="Remover imagem"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1 truncate">
                  Imagem {index + 1}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;