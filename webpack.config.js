import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  entry: {
    main: ['./src/appLogic.js', './src/interface.js'], // Combine multiple entry points
  },
  devtool: 'inline-source-map', // Enable multi-file debugging
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
