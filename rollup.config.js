import typescript from '@rollup/plugin-typescript'
import multi from '@rollup/plugin-multi-entry'

const OUTPUT_DIR = 'dist'

export default ['es', 'cjs'].map((format) => ({
  input: 'src/**/*.ts',
  output: {
    dir: `${OUTPUT_DIR}/${format}`,
    format,
    exports: 'named',
    sourcemap: true,
  },
  plugins: [
    multi({ entryFileName: 'index.js', exclude: ['**/*.test.ts'] }),
    typescript({
      declarationDir: `${OUTPUT_DIR}/${format}`,
    }),
  ],
}))
