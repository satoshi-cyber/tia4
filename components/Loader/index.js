import * as ReactDOM from 'react-dom';

const Loader = () => {
  return ReactDOM.createPortal(
    <div className="fixed top-0 right-0 left-0 bottom-0 w-screen h-full bottom-0 z-50">
      <div className="fixed progress-bar bottom-0">
        <div className="progress-bar-value" />
      </div>
    </div>,
    document.getElementById('popups')
  );
};

export default Loader;
