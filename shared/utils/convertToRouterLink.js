import React from 'react';
import { Link } from 'react-router-dom';

function transformToRouterLink(node, index) {
  if (node.type === 'tag' && node.name === 'a' && node.attribs['data-link'] === 'local') {
    const { attribs, children } = node;
    const { href } = attribs;
    const { data } = children[0];

    return (
      <Link to={href} key={index}>
        {data}
      </Link>
    );
  }
}

export default transformToRouterLink;
