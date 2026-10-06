import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  entry: "./src/index.jsx",
  output: {
    path: path.resolve("dist"),
    filename: "bundle.js",
    publicPath: "auto",
    uniqueName: "app1",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "esbuild-loader",
        options: {
          loader: "jsx",
          target: "es2015",
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new webpack.container.ModuleFederationPlugin({
      name: "app1", filename: "remoteEntry.js",
      exposes: { "./App": "./src/App.jsx" },
      shared: { react: { singleton: true, requiredVersion: "^18.2.0" }, "react-dom": { singleton: true, requiredVersion: "^18.2.0" } },
    }),
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
  ],
  devServer: {
    host: "0.0.0.0",
    port: 3000,
    hot: true,
    allowedHosts: "all",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    },
  },
};
