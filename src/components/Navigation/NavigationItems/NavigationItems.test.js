import React from 'react';
import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});
	let wrapper
	beforeEach(()=>{
		wrapper = shallow(<NavigationItems/>);
	});
describe('<NavigationItems />',()=>{
	it('should render three <NavigationItem/> not authenticate',()=>{

		
		expect(wrapper.find(NavigationItem)).toHaveLength(2);
	});
	it('should render three <NavigationItem/> is authenticate',()=>{
		// shallow(<NavigationItems isAuthenticate/>);
		wrapper.setProps({isAuthenticate:true})
		expect(wrapper.find(NavigationItem)).toHaveLength(3);
	})
	it('should render exat logout button',()=>{
		wrapper.setProps({isAuthenticate:true})
		expect(wrapper.contains(<NavigationItem link ="/logout">Logout</NavigationItem>)).toEqual(true)
	})
});