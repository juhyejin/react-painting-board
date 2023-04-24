import Btn from './Btn.jsx';
import PropTypes from "prop-types";
import {Button} from "../../stories/Button.jsx";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
export default {
  title: 'component/Button',
  component: Btn,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Primary = {
  args: {
    primary: true,
    label: 'Button',
  },
};

export const Secondary = {
  args: {
    label: 'Button',
  },
};

export const Large = {
  args: {
    size: 'lg',
    label: 'Button',
  },
};

export const Small = {
  args: {
    size: 'sm',
    label: 'Button',
  },
};

