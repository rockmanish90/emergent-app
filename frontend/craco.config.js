const path = require("path");
require("dotenv").config();

const isDevServer = process.env.NODE_ENV !== "production";

const config = {
  enableHealthCheck: process.env.ENABLE_HEALTH_CHECK === "true",
  enableVisualEdits: isDevServer,
};

let setupDevServer;
let babelMetadataPlugin;

if (config.enableVisualEdits) {
  setupDevServer = require("./plugins/visual-edits/dev-server-setup");
  babelMetadataPlugin = require("./plugins/visual-edits/babel-metadata-plugin");
}

let WebpackHealthPlugin, setupHealthEndpoints, healthPluginInstance;
if (config.enableHealthCheck) {
  WebpackHealthPlugin = require("./plugins/health-check/webpack-health-plugin");
  setupHealthEndpoints = require("./plugins/health-check/health-endpoints");
  healthPluginInstance = new WebpackHealthPlugin();
}

const webpackConfig = {
  // 1. Fix the "React must be in scope" Lint error
  eslint: {
    configure: {
      extends: ["plugin:react-hooks/recommended"],
      rules: {
        "react/react-in-jsx-scope": "off",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
      },
    },
  },
  
  // 2. Fix the "React is not defined" Runtime error
  babel: {
    presets: [
      [
        "@babel/preset-react",
        {
          runtime: "automatic",
        },
      ],
    ],
    plugins: [
      ...(config.enableVisualEdits && babelMetadataPlugin ? [babelMetadataPlugin] : []),
    ],
  },

  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure: (webpackConfig) => {
      // 3. Fix the "React Refresh" Production leak
      if (process.env.NODE_ENV === 'production') {
        webpackConfig.plugins = webpackConfig.plugins.filter(
          (plugin) => plugin.constructor && plugin.constructor.name !== 'ReactRefreshPlugin'
        );
      }

      webpackConfig.watchOptions = {
        ignored: ['**/node_modules/**', '**/.git/**', '**/build/**', '**/dist/**'],
      };

      if (config.enableHealthCheck && healthPluginInstance) {
        webpackConfig.plugins.push(healthPluginInstance);
      }
      return webpackConfig;
    },
  },
};

webpackConfig.devServer = (devServerConfig) => {
  if (config.enableVisualEdits && setupDevServer) {
    devServerConfig = setupDevServer(devServerConfig);
  }
  if (config.enableHealthCheck && setupHealthEndpoints && healthPluginInstance) {
    const originalSetupMiddlewares = devServerConfig.setupMiddlewares;
    devServerConfig.setupMiddlewares = (middlewares, devServer) => {
      if (originalSetupMiddlewares) middlewares = originalSetupMiddlewares(middlewares, devServer);
      setupHealthEndpoints(devServer, healthPluginInstance);
      return middlewares;
    };
  }
  return devServerConfig;
};

module.exports = webpackConfig;
