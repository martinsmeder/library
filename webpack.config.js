import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import Dotenv from 'dotenv-webpack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  entry: {
    main: './src/interface.js',
  },
  devtool: 'inline-source-map', // Enable multi-file debugging
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new Dotenv(), // Load environment variables from .env file
  ],
};
