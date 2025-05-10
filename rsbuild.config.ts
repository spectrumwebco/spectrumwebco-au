import * as path from 'path';

import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
// import { pluginMdx } from '@rsbuild/plugin-mdx'; // Commented out for now
// import rehypeShiki from '@leafac/rehype-shiki'; // Commented out for now
// import escapeStringRegexp from 'escape-string-regexp'; // Commented out for now
// import { recmaImportImages } from 'recma-import-images'; // Commented out for now
// import remarkGfm from 'remark-gfm'; // Commented out for now
// import { remarkRehypeWrap } from 'remark-rehype-wrap'; // Commented out for now
// import remarkUnwrapImages from 'remark-unwrap-images'; // Commented out for now
// import shiki from 'shiki'; // Commented out for now
// import { unifiedConditional } from 'unified-conditional'; // Commented out for now

// Next.js specific MDX layout function - will need to be re-imagined for Remix or removed
// function remarkMDXLayout(source, metaName) {
//   return (tree) => {
//     let imp = `import _Layout from '${source}'`;
//     let exp = `export default function Layout(props) {
//       return <_Layout {...props} ${metaName}={${metaName}} />
//     }`;

//     tree.children.push(
//       {
//         type: 'mdxjsEsm',
//         value: imp,
//       },
//       {
//         type: 'mdxjsEsm',
//         value: exp,
//       }
//     );
//   };
// }

export default defineConfig(async () => {
  // const highlighter = await shiki.getHighlighter({ // Commented out for now
  //   theme: 'css-variables',
  // });

  return {
    plugins: [
      pluginReact(),
      // pluginMdx({ // Commented out MDX plugin configuration
      //   options: {
      //     recmaPlugins: [recmaImportImages],
      //     rehypePlugins: [
      //       [rehypeShiki, { highlighter }],
      //       [
      //         remarkRehypeWrap,
      //         {
      //           node: { type: 'mdxJsxFlowElement', name: 'Typography' },
      //           start: ':root > :not(mdxJsxFlowElement)',
      //           end: ':root > mdxJsxFlowElement',
      //         },
      //       ],
      //     ],
      //     remarkPlugins: [
      //       remarkGfm,
      //       remarkUnwrapImages,
            // Next.js path-specific MDX layouts - REMOVED
            // [
            //   unifiedConditional,
            //   [
            //     new RegExp(`^${escapeStringRegexp(path.resolve('src/app/blog'))}`),
            //     [[remarkMDXLayout, '@/app/blog/wrapper', 'article']],
            //   ],
            //   [
            //     new RegExp(`^${escapeStringRegexp(path.resolve('src/app/work'))}`),
            //     [[remarkMDXLayout, '@/app/work/wrapper', 'caseStudy']],
            //   ],
            // ],
      //     ],
      //   },
      // }),
    ],
    source: {
      // entry: { // Rsbuild's traditional entry point - likely not for the main Remix app bundle
      //   index: './src/index.tsx',
      // },
      alias: {
        '@': path.resolve(__dirname, './'),
        '~': path.resolve(__dirname, './app/'), // Added alias for app directory, common in Remix
      },
    },
    dev: {
      // port: 3000, // This might conflict with the Express server port (3001). 
                  // Remix dev server usually runs on a different port like 5173 (Vite) or handled by Express.
                  // We're using Express on 3001, so Rsbuild's dev server port needs careful consideration if used.
    },
    // html: { // Remix generates its own HTML via root.tsx
    //   template: './src/index.html',
    // },
    output: {
      distPath: {
        root: 'dist', // Rsbuild's general output. Remix outputs to `public/build` and `build`.
                      // We need to align where Rsbuild outputs client assets if it's managing them.
      },
    },
    tools: {
      postcss: {
        // This config should be picked up by Rsbuild. 
        // Remix also processes PostCSS/Tailwind via `remix.config.js`.
        // Ensure no conflicts in processing order or output.
        config: path.resolve(__dirname, './postcss.config.ts'),
      },
    },
  };
});
