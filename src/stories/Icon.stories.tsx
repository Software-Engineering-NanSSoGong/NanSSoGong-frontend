import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Icon } from '../components';

export default {
  component: Icon,
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const SizeUp = Template.bind({});
SizeUp.args = {
  type: 'lock',
  width: 100,
  height: 100,
};

export const Lock = Template.bind({});
Lock.args = {
  type: 'lock',
};

export const Mic = Template.bind({});
Mic.args = {
  type: 'mic',
};

export const User = Template.bind({});
User.args = {
  type: 'user',
};
