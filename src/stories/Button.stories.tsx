import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from '../components';
import { ButtonHierarchy } from '../components/common/Button';

type ButtonType = typeof Button;

export default {
  component: Button,
} as ComponentMeta<ButtonType>;

const Template: ComponentStory<ButtonType> = (args) => <Button {...args}>{args.children}</Button>;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Primary',
  hierarchy: ButtonHierarchy.Primary,
};

export const Danger = Template.bind({});
Danger.args = {
  children: 'Danger',
  hierarchy: ButtonHierarchy.Danger,
};

export const Success = Template.bind({});
Success.args = {
  children: 'Success',
  hierarchy: ButtonHierarchy.Success,
};

export const DarkGray = Template.bind({});
DarkGray.args = {
  children: 'DarkGray',
  hierarchy: ButtonHierarchy.DarkGray,
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'Disabled',
  hierarchy: ButtonHierarchy.Primary,
  disabled: true,
};

export const BorderSquare = Template.bind({});
BorderSquare.args = {
  children: 'BorderSquare',
  borderRadius: 0,
};
