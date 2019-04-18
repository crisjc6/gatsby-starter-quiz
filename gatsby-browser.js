import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { UrlContextProvider } from './src/contexts/UrlContext'

const components = {
  pre: props => {
    const className = props.children.props.className || ''
    const matches = className.match(/language-(?<lang>.*)/)
    return (
      <Highlight
        {...defaultProps}
        code={props.children.props.children.trim()}
        language={
          matches && matches.groups && matches.groups.lang
            ? matches.groups.lang
            : ''
        }
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <div style={{ overflow: 'auto'}}>
          <pre className={className} style={{ ...style, padding: '20px', borderRadius: '5px'}}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
          </div>
        )}
      </Highlight>
    )
  },
  wrapper: ({ children }) => <>{children}</>
}
export const wrapRootElement = ({ element }) => (
  <MDXProvider components={components}>
    <UrlContextProvider>
      {element}
    </UrlContextProvider>
  </MDXProvider>
)
