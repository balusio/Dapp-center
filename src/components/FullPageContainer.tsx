import React, { ReactChild, ReactChildren } from 'react';
import {Navbar} from 'decentraland-ui';

import './FullPageContainer.scss';

interface FullPageContainerProps {
  children: ReactChild | ReactChild[] | ReactChildren | ReactChildren[];
}
const FullPageContainer = ({ children } : FullPageContainerProps): JSX.Element => {
  const element = 'hello';

  return(
    <>

    </>
  )
};

export default FullPageContainer;
