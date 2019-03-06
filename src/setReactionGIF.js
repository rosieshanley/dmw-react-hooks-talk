import one from './assets/1.gif';
import two from './assets/2.gif';
import three from './assets/3.gif';
import four from './assets/4.gif';
import five from './assets/5.gif';

const setReactionGIF = rating => {
  switch (rating) {
    case 1:
      return one;
    case 2:
      return two;
    case 3:
      return three;
    case 4:
      return four;
    case 5:
      return five;
    default:
      return five;
  }
};

export default setReactionGIF;
