import { useState, useEffect } from 'react';
import MaterialTable from 'material-table'
import moment from "moment";

import tableIcons from './TableIcons';

const SearchTable = ({ tableData }) => {
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        if (tableData) {
            setIsLoading(false);
        }
    }, [tableData]);

    return (
    <main>
        <h1>Search All Data</h1>
        <div style={{maxWidth: "100%"}}>
            <MaterialTable
                icons={tableIcons}
                columns={[
                    { 
                        title: 'Date', 
                        field: 'date', 
                        render: rowData => moment(rowData.date).format('dddd, MMMM Do, YYYY'), //Customize how field data displayed
                        customFilterAndSearch: (value, rowData) => { // Format search input and data for search matches
                            let x = moment(rowData.date).format('dddd, MMMM, YYYY').toLowerCase();
                            return  x.indexOf(value.toLowerCase()) !== -1
                        }
                    },
                    { 
                        title: 'Revenue', 
                        field: 'revenue', 
                        type: 'numeric', 
                        render: rowData => <span>${parseFloat(rowData.revenue).toFixed(2)}</span>  
                    },
                    {  
                        title: 'Impressions', field: 'impressions', type: 'numeric' 
                    },
                    { 
                        title: 'Clicks', field: 'clicks' 
                    },
                    { 
                        title: 'Events', field: 'events', type: 'numeric' 
                    },
                    { 
                        title: 'Location',
                        field: 'name',
                        customFilterAndSearch: (value, rowData) => {
                            let x = rowData.name.toLowerCase();
                            return x.indexOf(value.toLowerCase()) !== -1
                        }
                    },
                    { 
                        title: 'Lat', field: 'lat', type: 'numeric' 
                    },
                    { 
                        title: 'Lon', field: 'lon', type: 'numeric' 
                    }
                ]}
                isLoading={isLoading}
                data={tableData ? tableData : []}
                title=""
                options={{
                    exportButton: true, exportAllData: true
                }}
            />
            </div>
    </main>
    )
};

export default SearchTable;