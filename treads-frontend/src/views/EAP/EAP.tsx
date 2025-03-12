import Section from '@components/Sections/Section';
import { useSearch } from '@context/SearchContext';
import React, { Suspense } from 'react';
import { BaseColumn, EAPData } from 'src/types';
import EAPJsonData from '@db/EAP/EAP';
import {
  Box,
  Typography,
  Paper,
  Container,
  Card,
  CardContent,
  CardHeader,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircularProgess from '@components/Spinner/CircularProgess';

const ColumnGrouping = React.lazy(() => import('@components/Tables/MUI/ColumnGrouping'));

const columns: BaseColumn[] = [
  {
    id: 'uniprotid',
    label: 'Uniprot ID',
    minWidth: 170,
    type: 'link',
    baseUrl: 'https://www.uniprot.org/uniprotkb/',
  },
  { id: 'genename', label: 'Gene Name', minWidth: 170, type: 'button' },
  { id: 'uniprotname', label: 'Protein Name', minWidth: 170 },
];

function createData(
  uniprotid: string,
  genename: string,
  uniprotname: string
): EAPData {
  return {
    uniprotid,
    genename,
    uniprotname,
  };
}

const createRows = (
  data: { uniprotid: string; genename: string; uniprotname: string }[]
) => {
  const rows: EAPData[] = data.map((row) => {
    return createData(row.uniprotid, row.genename, row.uniprotname);
  });
  return rows;
};

// Create groups with pathway names
// Assuming EAPJsonData has keys as pathway names
const pathwayGroups = Object.entries(EAPJsonData).map(([key, value]) => {
  return {
    pathwayName: key,
    data: createRows(
      value as { uniprotid: string; genename: string; uniprotname: string }[]
    ),
  };
});

const EAP: React.FC = () => {
  const { handleSearchByParameter } = useSearch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleAccordionChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const submit = (value: string) => {
    return handleSearchByParameter(value, 'GeneName');
  };

  return (
    <Container maxWidth="lg">
      <Box mb={4}>
        <Section topic="Epilepsy Associated Pathways" />
      </Box>

      <Paper
        elevation={0}
        sx={{ p: 2, mb: 4, bgcolor: 'background.paper', borderRadius: 2 }}
      >
        <Typography variant="body1" color="text.secondary">
          Below are protein pathways associated with epilepsy. Click on a gene
          name to search or Uniprot ID to view details.
        </Typography>
      </Paper>

      {isMobile ? (
        // Mobile view: Use accordions
        <Box sx={{ mb: 4 }}>
          {pathwayGroups &&
            pathwayGroups.map((group, index) => (
              <Accordion
                key={index}
                expanded={expanded === `panel${index}`}
                onChange={handleAccordionChange(`panel${index}`)}
                sx={{ mb: 2, borderRadius: 1, overflow: 'hidden' }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index}-content`}
                  id={`panel${index}-header`}
                  sx={{
                    bgcolor: 'primary.light',
                    color: 'primary.contrastText',
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="medium">
                    {group.pathwayName} ({group.data.length} proteins)
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0 }}>
                  <Suspense fallback={<CircularProgess />}>
                  <ColumnGrouping
                    field="uniprotid"
                    columns={columns}
                    rows={group.data}
                    handleOnClick={submit}
                  />
                  </Suspense>
                </AccordionDetails>
              </Accordion>
            ))}
        </Box>
      ) : (
        // Desktop view: Use cards
        <Box sx={{ mb: 4 }}>
          {pathwayGroups &&
            pathwayGroups.map((group, index) => (
              <Card
                key={index}
                sx={{ mb: 4, borderRadius: 2, overflow: 'hidden' }}
              >
                <CardHeader
                  title={group.pathwayName}
                  subheader={`${group.data.length} proteins in pathway`}
                  sx={{
                    bgcolor: 'primary.light',
                    color: 'primary.contrastText',
                    '& .MuiCardHeader-subheader': {
                      color: 'primary.contrastText',
                    },
                  }}
                />
                <CardContent sx={{ p: 0 }}>
                  <Suspense fallback={<CircularProgess />}>
                  <ColumnGrouping
                    field="uniprotid"
                    columns={columns}
                    rows={group.data}
                    handleOnClick={submit}
                  />
                  </Suspense>
                </CardContent>
              </Card>
            ))}
        </Box>
      )}
    </Container>
  );
};

export default EAP;
