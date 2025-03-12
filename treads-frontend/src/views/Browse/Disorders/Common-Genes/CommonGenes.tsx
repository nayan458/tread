import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BaseColumn, CommonGenesData, CommonGenesDataRaw } from 'src/types';
import Section from '@components/Sections/Section';
import { useSearch } from '@context/SearchContext';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Paper,
  Typography,
  FormControlLabel,
  Checkbox,
  Chip,
  Stack,
  Divider,
  Button,
  CircularProgress,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import axiosInstance from '@api/AxiosInsctance';
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';
import CircularProgess from '@components/Spinner/CircularProgess';

const ColumnGrouping = lazy(
  () => import('@components/Tables/MUI/ColumnGrouping')
);

const columns: BaseColumn[] = [
  {
    id: 'uniprotid',
    label: 'Uniprot\u00a0ID',
    minWidth: 170,
    type: 'link',
    baseUrl: 'https://www.uniprot.org/uniprotkb/',
  },
  { id: 'genename', label: 'Gene', minWidth: 170, type: 'button' },
  { id: 'proteinname', label: 'Protein\u00a0Name', minWidth: 170 },
  {
    id: 'references',
    label: 'Reference',
    minWidth: 170,
    type: 'link',
    baseUrl: 'https://pubmed.ncbi.nlm.nih.gov/',
  },
];

function createData(
  uniprotid: string,
  genename: string,
  proteinname: string,
  references: string
): CommonGenesData {
  return {
    uniprotid,
    genename,
    proteinname,
    references,
    // disorders,
  };
}

const FAVORITE_DISORDERS = [
  'MTLE',
  'MTLE-HS',
  'FCD',
  'HS',
  'DS',
  'CAE',
  'JAE',
  'JME',
  'EGTCS',
];

const CommonGenes: React.FC = () => {
  const { handleSearchByParameter } = useSearch();
  const [selectedDisorders, setSelectedDisorders] = useState<string[]>([]);
  const [filteredRows, setFilteredRows] = useState<CommonGenesData[]>([]);
  const [showFilters, setShowFilters] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch common genes via API
  const fetchCommonGenes = async () => {
    if (selectedDisorders.length === 0) {
      setFilteredRows([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post('/common_genes', {
        favorite: selectedDisorders,
      });

      const data = response.data;

      // Transform API response to match table structure
      const formattedRows = data.map((row: CommonGenesDataRaw) => {
        const references = row.references
          .map((ref: string) => `PMID: ${ref}`)
          .join('; ');

        return createData(
          row.uniprotid,
          row.genename,
          row.proteinname,
          references
        );
      });

      setFilteredRows(formattedRows);
    } catch (error) {
      console.error('Error fetching common genes:', error);
      setError('Failed to fetch common genes. Please try again.');
      setFilteredRows([]);
    } finally {
      setLoading(false);
    }
  };

  // Call fetchCommonGenes whenever selectedDisorders changes
  useEffect(() => {
    fetchCommonGenes();
  }, [selectedDisorders]);

  const handleToggleDisorder = (disorder: string) => {
    setSelectedDisorders((prev) => {
      if (prev.includes(disorder)) {
        return prev.filter((d) => d !== disorder);
      } else {
        return [...prev, disorder];
      }
    });
  };

  const handleSelectAll = () => {
    setSelectedDisorders([...FAVORITE_DISORDERS]);
  };

  const handleClearAll = () => {
    setSelectedDisorders([]);
  };

  const handleRefresh = () => {
    fetchCommonGenes();
  };

  const submit = (value: string) => {
    return handleSearchByParameter(value, 'GeneName');
  };

  return (
    <>
      <Container maxWidth="lg">
        <Box mb={4}>
          <Section topic="Common Genes" />
        </Box>

        <Paper
          elevation={0}
          sx={{ p: 2, mb: 4, bgcolor: 'background.paper', borderRadius: 2 }}
        >
          <Typography variant="body1" color="text.secondary">
            Below are common genes across different disorders. Use the filter to
            find out the common genes across different disorders. Click on a
            gene name to search or Uniprot ID to view details.
          </Typography>
        </Paper>

        <Box mb={4}>
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={() => setShowFilters(!showFilters)}
            sx={{ mb: 2 }}
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>

          {showFilters && (
            <Card sx={{ mb: 3, borderRadius: 2 }}>
              <CardHeader
                title="Filter by Disorders"
                sx={{
                  bgcolor: 'primary.light',
                  color: 'primary.contrastText',
                }}
                action={
                  <Box sx={{ mr: 1 }}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={handleSelectAll}
                      sx={{
                        mr: 1,
                        color: 'white',
                        borderColor: 'white',
                        '&:hover': {
                          borderColor: 'white',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                      }}
                    >
                      Select All
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={handleClearAll}
                      startIcon={<RestartAltIcon />}
                      sx={{
                        color: 'white',
                        borderColor: 'white',
                        '&:hover': {
                          borderColor: 'white',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                      }}
                    >
                      Clear
                    </Button>
                  </Box>
                }
              />
              <CardContent>
                <Grid container spacing={2}>
                  {FAVORITE_DISORDERS.map((disorder) => (
                    <Grid size={{ xs: 6, sm: 4, md: 3 }} key={disorder}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedDisorders.includes(disorder)}
                            onChange={() => handleToggleDisorder(disorder)}
                            color="primary"
                          />
                        }
                        label={
                          <span
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '5px',
                            }}
                          >
                            {disorder}
                            <Link
                              to={`/${disorder}`}
                              style={{ display: 'flex', alignItems: 'center' }}
                            >
                              <InsertLinkIcon color="primary" />
                            </Link>
                          </span>
                        }
                      />
                    </Grid>
                  ))}
                </Grid>

                {selectedDisorders.length > 0 && (
                  <>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Selected Disorders:
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={1}
                      flexWrap="wrap"
                      useFlexGap
                    >
                      {selectedDisorders.map((disorder) => (
                        <Chip
                          key={disorder}
                          label={disorder}
                          onDelete={() => handleToggleDisorder(disorder)}
                          color="primary"
                          sx={{ mb: 1 }}
                        />
                      ))}
                    </Stack>
                  </>
                )}
              </CardContent>
            </Card>
          )}
        </Box>

        <Card sx={{ mb: 4, borderRadius: 2, overflow: 'hidden' }}>
          <CardHeader
            title="Common Genes"
            subheader={
              selectedDisorders.length === 0
                ? 'Select disorders to see common genes'
                : selectedDisorders.length === 1
                  ? `${filteredRows.length} genes in ${selectedDisorders[0]}`
                  : `${filteredRows.length} genes common across ${selectedDisorders.length} disorders`
            }
            sx={{
              bgcolor: 'primary.light',
              color: 'primary.contrastText',
              '& .MuiCardHeader-subheader': {
                color: 'primary.contrastText',
              },
            }}
            action={
              loading ? (
                <CircularProgess />
              ) : (
                <Button
                  size="small"
                  variant="outlined"
                  onClick={handleRefresh}
                  sx={{
                    mr: 2,
                    color: 'white',
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Refresh
                </Button>
              )
            }
          />
          <CardContent sx={{ p: 0 }}>
            {error ? (
              <Box p={4} textAlign="center">
                <Typography variant="body1" color="error">
                  {error}
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleRefresh}
                  sx={{ mt: 2 }}
                >
                  Try Again
                </Button>
              </Box>
            ) : loading ? (
              <Box p={4} textAlign="center">
                <CircularProgress />
                <Typography variant="body1" sx={{ mt: 2 }}>
                  Loading common genes...
                </Typography>
              </Box>
            ) : filteredRows.length > 0 ? (
              <Suspense fallback={<CircularProgress />}>
                <ColumnGrouping
                  field="uniprotid"
                  columns={columns}
                  rows={filteredRows}
                  handleOnClick={submit}
                />
              </Suspense>
            ) : (
              <Box p={4} textAlign="center">
                <Typography variant="body1" color="text.secondary">
                  {selectedDisorders.length === 0
                    ? 'Please select at least one disorder to view genes.'
                    : 'No common genes found across the selected disorders.'}
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default CommonGenes;
