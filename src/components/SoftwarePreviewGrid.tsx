import { Grid } from '@material-ui/core';
import { graphql } from 'gatsby';
import React from 'react';
import SoftwarePreview from './SoftwarePreview';

type Software = any;

interface Props {
  softwares: Array<Software>;
}

const SoftwarePreviewGrid: React.SFC<Props> = ({ softwares }) => {
  return (
    <Grid container direction="row" justify="flex-start" spacing={3}>
      {softwares.map(s => (
        <Grid item key={s.id} xs={12} sm={6} md={4}>
          <SoftwarePreview software={s} key={s.id} />
        </Grid>
      ))}
    </Grid>
  );
};

export default SoftwarePreviewGrid;

export const softwarePreviewGridComponentFragment = graphql`
  fragment SoftwarePreviewGridComponent on MarkdownRemarkConnection {
    edges {
      node {
        ...SoftwarePreviewComponent
      }
    }
  }
`;
