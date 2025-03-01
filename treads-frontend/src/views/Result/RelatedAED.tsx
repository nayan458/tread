import { Card, CardContent, Typography, Box, Link } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React from 'react';

interface RelatedAEDProp {
  aed_dict: JSON;
}

const RelatedAED: React.FC<RelatedAEDProp> = ({ aed_dict }) => {
  return (
    <Grid size={{ xs: 12, md: 4 }} key="literature">
      <Card>
        <CardContent>
          <Typography variant="h4" component="h3" gutterBottom>
            Related AED
          </Typography>
          {Object.entries(aed_dict).map(([key, value]) => (
            <Box key={key} mb={2}>
              <Typography variant="h6" color="primary">
                {key}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <Link
                  href={`https://go.drugbank.com/drugs/${value}`}
                  target="_blank"
                  variant="body2"
                  sx={{ textAlign: 'right' }}
                >
                  {value}
                </Link>
              </Typography>
            </Box>
          ))}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default RelatedAED;
