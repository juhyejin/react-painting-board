/** @type { import('@storybook/react-vite').StorybookConfig } */
import {loadConfigFromFile, mergeConfig} from "vite";
import * as path from "path";

const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs:'tag',
  },
  core:{
    builder: '@storybook/builder-vite'
  },
  features:{
    storyStoreV7: true
  },
  viteFinal: async (config,) => {
    const {config: userConfig} = await loadConfigFromFile(
      path.resolve(__dirname, "../vite.config.js")
    );
    return mergeConfig(config,{
      ...userConfig,
      plugins:[]
    });
  },
};
export default config;
