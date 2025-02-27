import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { AedData, AedTargetData, BaseColumn, EAPData, LinkColumn, MirnasData, MtleData } from 'src/types';
import SearchBar from '@components/Search/SearchBar';
import Dropdown from './Dropdown';
import { Button, Link } from '@mui/material';

interface ColumnGroupingTableProps {
  columns: BaseColumn[] | LinkColumn[];
  rows: AedData[] | AedTargetData[] | MirnasData[] | MtleData[] | EAPData[];
  // rows: EAPData;
  field?: string; // Field passed from the parent component
  handleOnClick: (value: string) => Promise<void>;
}

const ColumnGrouping: React.FC<ColumnGroupingTableProps> = ({ columns, rows, field = '', handleOnClick}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [suggestions, setSuggestions] = React.useState<string[]>([]); // State for suggestions

  // Handle page change
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Filter rows based on the search query and field
  const filteredRows = rows.filter((row) => {
    if (!field || !searchQuery) return true; // No search field or query, return all rows
    const value = row[field as keyof typeof row]; // Get value based on the search field
    return value && value.toString().toLowerCase().includes(searchQuery.toLowerCase());
  });

  const extractPMIDData=(str: string)=> {
    const pmidRegex = /PMID: (\d+);?/g;
    let match;
    const data = [];
    
    while ((match = pmidRegex.exec(str)) !== null) {
        const value = parseInt(match[1], 10);
        data.push({ value, PMID: value });
    }
    
    return data;
  }

  // Generate top 5 suggestions based on the search query and field
  React.useEffect(() => {
    if (field && searchQuery) {
      // Extract values for the specified field and get the top 5 matches
      const suggestionsList = rows
        .map((row) => row[field as keyof typeof row]?.toString())
        .filter((value) => value?.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 5); // Get top 5 matches

      setSuggestions(suggestionsList);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery, field, rows]);

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={2}>
                {/* Use the SearchBar component */}
                <SearchBar
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  field={field}
                  suggestions={suggestions}
                />
              </TableCell>
              <TableCell align="center" colSpan={3}>
                <Dropdown />
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth, fontWeight: 600 }}
                >
                  <div
                    onClick={() => field && setSearchQuery('')} // Clear search if a new field is selected
                    style={{ cursor: 'pointer' }}
                  >
                    {column.label}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.type === 'link')
                        if(column.label === 'Reference'){
                          const data = extractPMIDData(value.toString());
                          return (
                            <TableCell key={column.id} align={column.align} style={{ color: 'blue' }}>
                                {
                                  data.map((item,index)=>{
                                    return (<>
                                        <Link
                                          key={index}
                                          href={`${column.baseUrl}${item.value}`}
                                          target="_blank"
                                        >
                                          PMID: {item.PMID}
                                        </Link> <br/>
                                    </>)
                                  })
                                }
                            </TableCell>
                          )
                        }
                        else
                          return (
                            <TableCell key={column.id} align={column.align} style={{ color: 'blue' }}>
                              <a
                                href={`${column.baseUrl}${value}`}
                                target="_blank"
                                className="hover:underline hover:underline-offset-2 transition"
                              >
                                {column.format && typeof value === 'number' ? column.format(value) : value}
                              </a>
                            </TableCell>
                          )
                      else if (column.type === 'button')
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <Button variant='contained' onClick={() => handleOnClick(typeof value === 'number' ? value.toString() : value)}>
                              {column.format && typeof value === 'number' ? column.format(value) : value}
                            </Button>
                          </TableCell>
                        ) 
                      else 
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>
                        )
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ColumnGrouping;