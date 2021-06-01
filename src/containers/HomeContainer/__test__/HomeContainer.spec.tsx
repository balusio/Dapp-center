import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import HomeContainer from '../HomeContainer';

configure({ adapter: new Adapter() });

describe('Home Container', () => {
  xit('should render a simple connect button', () => {
    // error with Invariant Violation: Minified React error #188;
    // seems to be related to functional components and react Classes definitions
    const wrapper = mount(<HomeContainer />);
    expect(wrapper.find('button')).toHaveLength(1);
    expect(wrapper.text()).toEqual('Connect');
  });
});
