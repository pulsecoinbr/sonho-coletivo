import React, { useState, useRef } from 'react';

interface ImageUploadProps {
  onImagesChange: (images: File[], mainImageIndex: number) => void;
  maxImages?: number;
  maxSizeMB?: number;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onImagesChange, 
  maxImages = 4, 
  maxSizeMB = 10 
}) => {
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [mainImageIndex, setMainImageIndex] = useState<number>(0);
  const [error, setError] = useState<string>('');
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

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Imagens da Campanha *
        </label>
        <p className="text-xs text-gray-500 mb-3">
          Envie até {maxImages} imagens (JPEG, PNG, GIF, WebP) - máximo {maxSizeMB}MB cada
        </p>
        
        <div 
          className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-brand-accent transition-colors"
          onClick={triggerFileInput}
        >
          <div className="space-y-1 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="flex text-sm text-gray-600">
              <span className="relative cursor-pointer bg-white rounded-md font-medium text-brand-primary hover:text-brand-secondary">
                <span>Clique para enviar imagens</span>
                <input 
                  ref={fileInputRef}
                  type="file" 
                  className="sr-only" 
                  accept="image/*" 
                  multiple 
                  onChange={handleFileChange}
                />
              </span>
            </div>
            <p className="text-xs text-gray-500">
              {images.length} de {maxImages} imagens selecionadas
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
          {error}
        </div>
      )}

      {imagePreviews.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Imagens Selecionadas:</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative group">
                <div className="relative aspect-square rounded-md overflow-hidden border-2 border-gray-200">
                  <img 
                    src={preview} 
                    alt={`Preview ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                  {index === mainImageIndex && (
                    <div className="absolute top-1 left-1 bg-brand-accent text-white text-xs px-2 py-1 rounded">
                      Principal
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setAsMainImage(index);
                        }}
                        className="bg-white text-gray-800 rounded-full p-1 shadow-md hover:bg-gray-100"
                        title="Definir como principal"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
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