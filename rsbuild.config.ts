import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginMdx } from '@rsbuild/plugin-mdx';
import rehypeShiki from '@leafac/rehype-shiki';
import escapeStringRegexp from 'escape-string-regexp';
import * as path from 'path';
import { recmaImportImages } from 'recma-import-images';
import remarkGfm from 'remark-gfm';
import { remarkRehypeWrap } from 'remark-rehype-wrap';
import remarkUnwrapImages from 'remark-unwrap-images';
import shiki from 'shiki';
import { unifiedConditional } from 'unified-conditional';

// Similar MDX layout function as in the Next.js config
function remarkMDXLayout(source, metaName) {
  return (tree) => {
    let imp = `import _Layout from '${source}'`;
    let exp = `export default function Layout(props) {
      return <_Layout {...props} ${metaName}={${metaName}} />
    }`;

    tree.children.push(
      {
        type: 'mdxjsEsm',
        value: imp,
      },
      {
        type: 'mdxjsEsm',
        value: exp,
      }
    );
  };
}

export default defineConfig(async () => {
  const highlighter = await shiki.getHighlighter({
    theme: 'css-variables',
  });

  return {
    plugins: [
      pluginReact(),
      pluginMdx({
        options: {
          recmaPlugins: [recmaImportImages],
          rehypePlugins: [
            [rehypeShiki, { highlighter }],
            [
              remarkRehypeWrap,
              {
                node: { type: 'mdxJsxFlowElement', name: 'Typography' },
                start: ':root > :not(mdxJsxFlowElement)',
                end: ':root > mdxJsxFlowElement',
              },
            ],
          ],
          remarkPlugins: [
            remarkGfm,
            remarkUnwrapImages,
            [
              unifiedConditional,
              [
                new RegExp(`^${escapeStringRegexp(path.resolve('src/app/blog'))}`),
                [[remarkMDXLayout, '@/app/blog/wrapper', 'article']],
              ],
              [
                new RegExp(`^${escapeStringRegexp(path.resolve('src/app/work'))}`),
                [[remarkMDXLayout, '@/app/work/wrapper', 'caseStudy']],
              ],
            ],
          ],
        },
      }),
    ],
    source: {
      entry: {
        index: './src/index.tsx',
      },
      alias: {
        '@': path.resolve(__dirname, './'),
      },
    },
    dev: {
      port: 3000,
    },
    html: {
      template: './src/index.html',
    },
    output: {
      distPath: {
        root: 'dist',
      },
    },
    tools: {
      postcss: {
        config: path.resolve(__dirname, './postcss.config.ts'),
      },
    },
  };
});
