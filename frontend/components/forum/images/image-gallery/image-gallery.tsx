interface ImageGallery {
  isShow: boolean;
  setIsShow: () => void;
  images: String[];
}

export default function ImageGallery(props: ImageGallery) {}
