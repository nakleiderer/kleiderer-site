/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Typography from '@material-ui/core/Typography';
import React from 'react';
import RehypeReact from 'rehype-react';

interface Props {
  ast: any;
}

const roundedCorners: React.CSSProperties = {
  borderRadius: 16,
};

const borderLeft: React.CSSProperties = {
  borderLeft: '6px solid #ccc',
  paddingLeft: '1rem',
};

const renderAst = new RehypeReact({
  createElement: React.createElement,
  components: {
    p: (props: any) => (
      <Typography variant="body1" paragraph={true} {...props}>
        {props.children}
      </Typography>
    ),
    h1: (props: any) => (
      <Typography variant="h1" gutterBottom={true} {...props}>
        {props.children}
      </Typography>
    ),
    h2: (props: any) => (
      <Typography variant="h2" gutterBottom={true} {...props}>
        {props.children}
      </Typography>
    ),
    h3: (props: any) => (
      <Typography variant="h3" gutterBottom={true} {...props}>
        {props.children}
      </Typography>
    ),
    h4: (props: any) => (
      <Typography variant="h4" gutterBottom={true} {...props}>
        {props.children}
      </Typography>
    ),
    h5: (props: any) => (
      <Typography variant="h5" gutterBottom={true} {...props}>
        {props.children}
      </Typography>
    ),
    h6: (props: any) => (
      <Typography variant="h6" gutterBottom={true} {...props}>
        {props.children}
      </Typography>
    ),
    ol: (props: any) => (
      <Typography variant="body1" component="ol" gutterBottom={true} {...props}>
        {props.children}
      </Typography>
    ),
    ul: (props: any) => (
      <Typography variant="body1" component="ul" gutterBottom={true} {...props}>
        {props.children}
      </Typography>
    ),
    div: (props: any) => (
      <div {...props} style={{ ...roundedCorners, ...props.style }}>
        {props.children}
      </div>
    ),
    span: (props: any) => (
      <span {...props} style={{ ...roundedCorners, ...props.style }}>
        {props.children}
      </span>
    ),
    img: (props: any) => (
      <img {...props} style={{ ...roundedCorners, ...props.style }} />
    ),
    blockquote: (props: any) => (
      <blockquote {...props} style={{ ...borderLeft, ...props.style }}>
        {props.children}
      </blockquote>
    ),
  },
}).Compiler;

const Markdown: React.SFC<Props> = props => {
  return <>{renderAst(props.ast)}</>;
};

export default Markdown;
