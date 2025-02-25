import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
} from "@mui/material";
// import Graphs from "../Charts/Graphs";
import { AedData, LinkColumn } from "src/types";
import AedJsonData from '@db/Browse/AED.json';
import { AxiosResponse } from "axios";
import djangoWebInstance from "@api/AxiosInsctance";
import ColumnGroupingTable from "@components/Tables/MUI/ColumnGroupingTableProps";

// Register required Chart.js components


const GraphsLayout: React.FC = () => {

    
    const [response, setResponse] = useState<AxiosResponse | null>(null)
    
    const getData = async()=>{
      const result = await djangoWebInstance.post('/result', {
        data: {
          gene: 'UGT1A9',
          search_id: 'GeneName'
        }
      });

      setResponse(result);
      console.log(response);

    }

    getData();

    const columns: LinkColumn[] = [
        { 
            id: 'drugBankID',
            label: 'Drug\u00a0Bank\u00a0ID',
            type: 'link',
            minWidth: 170 
        },
        { 
            id: 'AEDName',
             label: 'AED\u00a0Name',
             minWidth: 100 
        },
        { 
            id: 'targetGene',
            label: 'Target\u00a0Gene',
            minWidth: 170,
    
        },
        { 
            id: 'status',
            label: 'Status',
            minWidth: 170,
    
        },
      ];
    
      function createData(
        drugBankID: string,
        AEDName: string,
        targetGene: string,
        status: string,
        link: string
      ): AedData  {
        return { drugBankID,AEDName,targetGene,status, link};
      }
      const rows: AedData[] = AedJsonData.AED.map((row: AedData) => {
        return createData(row.drugBankID,row.AEDName,row.targetGene,row.status,row.link);
      });



  return (
    <Grid container spacing={3} padding={3}>
      {/* Table Section */}
      <Grid item xs={12}>
        <Card>
          <CardHeader title={<Typography variant="h6">Key Metrics</Typography>} />
          <CardContent>
            <ColumnGroupingTable columns = {columns} rows={rows} field='drugBankID'/>
          </CardContent>
        </Card>
      </Grid>

      {/* Graphs Grid */}
      <Grid container spacing={3}>
        {[1, 2, 3, 4].map((index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card>
              <CardHeader title={<Typography variant="h6">Graph {index}</Typography>} />
              <CardContent>
                {/* <Graphs /> */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default GraphsLayout;
