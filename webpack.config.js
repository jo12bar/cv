const path = require("path");
const autoprefixer = require("autoprefixer");

const mode =
  process.env.NODE_ENV == "production" ? "production" : "development";

module.exports = [
  {
    mode,
    entry: ["./webpack/webpack-styles.scss", "./webpack/app.js"],
    output: {
      path: path.resolve(__dirname, "assets/generated/"),
      filename: "bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "bundle.css",
              },
            },
            { loader: "extract-loader" },
            { loader: "css-loader" },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: () => [autoprefixer()],
                },
              },
            },
            {
              loader: "sass-loader",
              options: {
                sassOptions: {
                  includePaths: ["./node_modules"],
                },
              },
            },
          ],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
  },
];
