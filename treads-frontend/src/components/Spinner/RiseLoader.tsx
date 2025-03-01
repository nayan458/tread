import { CSSProperties } from 'react';
import RiseLoader from 'react-spinners/RiseLoader';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};

function Load() {
  return (
    <div className="sweet-loading">
      <RiseLoader
        color={'#D49B17'}
        cssOverride={override}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Load;
