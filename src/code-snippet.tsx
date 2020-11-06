import React from 'react';
import PropTypes from 'prop-types';
import Prism from 'prismjs';

const CodeSnippet = ({ language, children }) => (
  <pre
    className={`language-${language}`}
    style={{
      margin: 0
    }}
  >
    <code
      className={`language-${language}`}
      dangerouslySetInnerHTML={{
        __html: Prism.highlight(children, Prism.languages[language], language),
      }}
    />
  </pre>
);

CodeSnippet.propTypes = {
  children: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};

export default CodeSnippet;