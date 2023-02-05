import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';

import { getCroppedImg } from './ImgCropperUtils'

import Slider from '../Slider/Slider';

interface IProps {
  image: string;
  aspect: number;
  onCrop: (file: Blob) => void;
  onCancel?: () => void;
  cropShape: 'round' | 'rect';
  classPrefix: string;
  showSaveButton?: boolean;
  showCancelButton?: boolean;
}

const ImgCropper = (props: IProps) => {
  const {
    image, 
    onCrop,
    onCancel,
    aspect,
    cropShape,
    classPrefix,
    showCancelButton = true,
  } = props;

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    x: number,
    y: number,
    width: number,
    height: number, 
  }>({ x: 0, y: 0, width: 0, height: 0 });

  const onCropComplete = useCallback((_croppedArea, pixels) => {
    setCroppedAreaPixels(pixels)
  }, [])

  const onUpdate = (z: number) => setZoom(z + 1);

  const onCropHandler = async () => {
    try {
      const croppedImage: Blob = await getCroppedImg(image, croppedAreaPixels);

      onCrop(croppedImage);
    }
    catch (e) {
      console.error(e);
    }
  }

  const onCancelHandler = () => {
    if (onCancel && typeof onCancel === 'function') {
      onCancel();
    }
  }

  return (
    <div className={classPrefix}>
      <div className={classPrefix + '__container'}>
        <Cropper
          image={image || ''}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          cropShape={cropShape}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          zoomWithScroll={false}
          classes={{ 
            mediaClassName: classPrefix + '__crop-media', 
          }}
        />
      </div>

      <div className={classPrefix + '__slider'}>
        <Slider
          onUpdate={onUpdate}
          countOfSteps={2}
        />
      </div>

      <div className={classPrefix + '__controls'}>
        <button
          className={classPrefix + '__save-btn btn btn--primary'}
          type="button"
          onClick={onCropHandler}
        >
          Save
        </button>

        {showCancelButton &&
          <button
            className={classPrefix + '__cancel-btn btn btn--secondary'}
            type="button"
            onClick={onCancelHandler}
          >
            Cancel
          </button>}
      </div>
    </div>
  )
}

export default ImgCropper;
