import { Card, CardContent, Typography, Link, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React from 'react';

interface RelatedArticleProp {
  articles: JSON;
}

const LiteratureAssociated: React.FC<RelatedArticleProp> = ({ articles }) => {
  return (
    <>
      {articles && (
        <Grid size={{ xs: 12, md: 8 }} key="articles">
          <Card>
            <CardContent>
              <Typography variant="h4" component="h3" gutterBottom>
                Literature Associated
              </Typography>
              {Object.entries(articles).map(([key, value]) => (
                <Box
                  key={key}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={1}
                  borderColor="grey.300"
                  py={1}
                >
                  <Typography variant="body1">{key}</Typography>
                  <Link
                    href={`https://pubmed.ncbi.nlm.nih.gov/${value}`}
                    target="_blank"
                    variant="body1"
                    sx={{ textAlign: 'right' }}
                  >
                    {value}
                  </Link>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      )}
    </>
  );
};

export default LiteratureAssociated;
