import { Button } from '@material-ui/core';
import { Link } from 'gatsby';
import React from 'react';
import { NavigationItem as NavigationItemType } from './items';

interface Props {
  item: NavigationItemType;
}

const NavigationItem: React.SFC<Props> = ({ item }) => {
  if ('link' in item) {
    const buttonComponent = React.forwardRef((props, ref) => (
      <Link to={item.link} innerRef={ref as any} {...props} />
    ));

    return (
      <Button size="small" color="inherit" component={buttonComponent as any}>
        {item.title}
      </Button>
    );
  } else if ('externalLink' in item) {
    return (
      <Button
        size="small"
        color="inherit"
        component="a"
        href={item.externalLink}
      >
        {item.title}
      </Button>
    );
  } else {
    return <span />;
  }
};

export default NavigationItem;
