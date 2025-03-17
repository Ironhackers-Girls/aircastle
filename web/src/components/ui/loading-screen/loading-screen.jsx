import Lottie from 'react-lottie';
import animationData from '../../../assets/castle-animation.json';

function LoadingScreen() {

    const defaultOptions = {
        loop: true, 
        autoplay: true, 
        animationData: animationData, 
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
        },
      };
    
      return (
        <div>
          <Lottie options={defaultOptions} height={200} width={200} />
        </div>
      );
}  

export default LoadingScreen;


