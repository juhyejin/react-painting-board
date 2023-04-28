import Button from './Button.jsx';

export default {
  title: 'Atom/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control:{ type: 'radio'},
      options:['icon','sm','md','lg'],
      description: '버튼 사이즈'},
    type: {
      control: {
        type:'select'},
      options:['button','submit']},

  },
};
export const Default = {
  args: {
    size: 'icon',
    type:'button'
  },
};
