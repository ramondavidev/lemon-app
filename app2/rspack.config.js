const { defineConfig } = require("@rspack/cli");
const { rspack } = require("@rspack/core");
const RefreshPlugin = require("@rspack/plugin-react-refresh");
const { withZephyr } = require("zephyr-webpack-plugin");
const { ModuleFederationPlugin } = require("@rspack/core").container;

const isDev = process.env.NODE_ENV === "development";
const targets = ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 14"];

module.exports = withZephyr()({
  context: __dirname,
  entry: {
    main: "./src/main.tsx",
  },
  devServer: {
    port: 3001,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "remote",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App",
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
      },
    }),
    new rspack.HtmlRspackPlugin({
      template: "./index.html",
    }),
    isDev ? new RefreshPlugin() : null,
  ].filter(Boolean),
  resolve: {
    extensions: ["...", ".ts", ".tsx", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: "asset",
      },
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: "builtin:swc-loader",
            options: {
              jsc: {
                parser: {
                  syntax: "typescript",
                  tsx: true,
                },
                transform: {
                  react: {
                    runtime: "automatic",
                    development: isDev,
                    refresh: isDev,
                  },
                },
              },
              env: { targets },
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin(),
      new rspack.LightningCssMinimizerRspackPlugin({
        minimizerOptions: { targets },
      }),
    ],
  },
  experiments: {
    css: true,
  },
});
