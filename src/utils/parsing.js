import{ domToReact } from 'html-react-parser';

const parseOptions = {
    replace: ({ name, children }) => {
      if (name && name === 'html') {
        return <>{domToReact(children, parseOptions)}</>;
      }
      if (name && name === 'body') {
        return <>{domToReact(children, parseOptions)}</>;
      }
      if (name && name === 'head') {
        return <></>;
      }
    },
    trim: true
  };

export {parseOptions};