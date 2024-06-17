// MdxRenderer.js
import React from "react";
import ReactMarkdown from "react-markdown";
import { LuLink } from "react-icons/lu";
import 'katex/dist/katex.min.css'; // Import KaTeX CSS
import RemarkMath from 'remark-math';
import RehypeKatex from 'rehype-katex';

const MDXRenderer = ({ content }) => {
  const components = {
    h1: (props) => <h1 className="text-4xl font-bold mb-4" {...props} />,
    h2: (props) => <h2 className="text-3xl font-semibold mb-3" {...props} />,
    h3: (props) => <h3 className="text-2xl font-medium mb-2" {...props} />,
    h4: (props) => <h4 className="text-xl font-medium mb-2" {...props} />,
    h5: (props) => <h5 className="text-lg font-medium mb-2" {...props} />,
    h6: (props) => <h6 className="text-base font-medium mb-2" {...props} />,
    p: (props) => <p className="text-base mb-4" {...props} />,
    a: (props) => (
      <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full inline-flex items-center  dark:bg-blue-900 dark:text-blue-300">
        <LuLink className="mr-2" /> {...props}
      </span>
    ),
    ul: (props) => <ul className="list-disc pl-5 mb-4" {...props} />,
    ol: (props) => <ol className="list-decimal pl-5 mb-4" {...props} />,
    li: (props) => <li className="mb-2" {...props} />,
    blockquote: (props) => (
      <blockquote
        className="border-l-4 border-gray-300 pl-4 italic mb-4"
        {...props}
      />
    ),
    img: (props) => <img className="max-w-full h-auto rounded" {...props} />,
    table: (props) => (
      <table className="min-w-full divide-y divide-gray-200" {...props} />
    ),
    thead: (props) => <thead className="bg-gray-50" {...props} />,
    tbody: (props) => (
      <tbody className="bg-white divide-y divide-gray-200" {...props} />
    ),
    tr: (props) => <tr className="bg-white dark:bg-slate-400" {...props} />,
    th: (props) => (
      <th
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        {...props}
      />
    ),
    td: (props) => <td className="px-6 py-4 whitespace-nowrap" {...props} />,
    pre: (props) => (
      <pre
        className="bg-gray-800 text-gray-200 p-4 rounded mb-4 overflow-auto"
        {...props}
      />
    ),
    code: (props) => (
      <code
        className="bg-gray-200 text-red-500 px-1 py-0.5 rounded"
        {...props}
      />
    ),
    b: (props) => <b className="font-bold" {...props} />,
    i: (props) => <i className="italic" {...props} />,
    strong: (props) => <strong className="font-bold" {...props} />,
    em: (props) => <em className="italic" {...props} />,
  };

  return (
    <ReactMarkdown
      components={components}
      remarkPlugins={[RemarkMath]}
      rehypePlugins={[RehypeKatex]}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MDXRenderer;

// "@mdx-js/mdx": "^3.0.0",
// "@mdx-js/react": "^3.0.0",
// "framer-motion": "^10.16.12",
// "katex": "^0.16.9",
// "react-apexcharts": "^1.4.1",
// "react-katex": "^3.0.1",
// "react-latex": "^2.0.0",
// "react-markdown": "^9.0.1",
// "react-slick": "^0.29.0",
// "rehype": "^13.0.1",
// "rehype-katex": "^7.0.0",
// "remark": "^15.0.1",
// "remark-math": "^6.0.0",

