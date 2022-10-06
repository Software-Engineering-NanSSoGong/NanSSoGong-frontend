import { ComponentMeta } from '@storybook/react';
import { Chip } from '../components';

export default {
  component: Chip,
} as ComponentMeta<typeof Chip>;

const Template: any = (args: any) => <Chip {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Primary',
  type: 'primary',
  variants: 'filled',
  label: 'Primary',
};

export const Danger = Template.bind({});
Danger.args = {
  children: 'Danger',
  type: 'danger',
  variants: 'filled',
  label: 'Danger',
};

export const Success = Template.bind({});
Success.args = {
  children: 'Success',
  type: 'success',
  variants: 'filled',
  label: 'Success',
};

export const Warning = Template.bind({});
Warning.args = {
  children: 'Warning',
  type: 'warning',
  variants: 'filled',
  label: 'Warning',
};
