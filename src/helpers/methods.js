import { IMAGE_ADDRESS } from './constants';

export const generateUserImageSource = (imageId) => {
  if (imageId) {
    return IMAGE_ADDRESS + '/' + imageId;
  }
  else {
    return '/nouser.png';
  }
}
