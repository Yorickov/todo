import { configure, shallow, mount } from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new EnzymeAdapter() });

global.shallow = shallow;
global.mount = mount;
