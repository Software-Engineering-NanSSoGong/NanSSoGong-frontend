import { ComponentMeta } from '@storybook/react';
import { Typography } from '../components';
import { theme } from '../styles';

export default {
  component: Typography,
} as ComponentMeta<typeof Typography>;

const Template: any = (args: any) => <Typography {...args}>{args.children}</Typography>;

export const h1 = Template.bind({});
h1.args = {
  children: 'h1',
  type: 'h1',
};

export const h2 = Template.bind({});
h2.args = {
  children: 'h2',
  type: 'h2',
};

export const h3 = Template.bind({});
h3.args = {
  children: 'h3',
  type: 'h3',
};

export const h4 = Template.bind({});
h4.args = {
  children: 'h4',
  type: 'h4',
};

export const h5 = Template.bind({});
h5.args = {
  children: 'h5',
  type: 'h5',
};

export const h6 = Template.bind({});
h6.args = {
  children: 'h6',
  type: 'h6',
};

export const body1 = Template.bind({});
body1.args = {
  children: 'body1',
  type: 'body1',
};
export const body2 = Template.bind({});
body2.args = {
  children: 'body2',
  type: 'body2',
};
export const body3 = Template.bind({});
body3.args = {
  children: 'body3',
  type: 'body3',
};

export const body4 = Template.bind({});
body4.args = {
  children: 'body4',
  type: 'body4',
};

export const body5 = Template.bind({});
body5.args = {
  children: 'body5',
  type: 'body5',
};

export const Center = Template.bind({});
Center.args = {
  children: 'center',
  type: 'h1',
  textAlign: 'center',
};

export const End = Template.bind({});
End.args = {
  children: 'End',
  type: 'h1',
  textAlign: 'end',
};

export const Color = Template.bind({});
Color.args = {
  children: 'Color',
  type: 'h1',
  color: theme.colors.primary.red,
};
