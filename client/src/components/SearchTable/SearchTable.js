import MaterialTable from 'material-table'

const SearchTable = ({ tableData }) => {
    return (
    <>
        <div style={{ maxWidth:"100%", paddingTop: "200px" }}>
        <h1>SEARCH TABLE</h1>
            <MaterialTable
                columns={[
                    { title: 'Date', field: 'date' },
                    { title: 'Revenue', field: 'revenue', type: 'numeric' },
                    { title: 'Impressions', field: 'impressions', type: 'numeric' },
                    { title: 'Clicks', field: 'clicks' },
                    { title: 'Events', field: 'events', type: 'numeric' },
                    { title: 'Location', field: 'name' },
                    { title: 'Lat', field: 'lat', type: 'numeric' },
                    { title: 'Lon', field: 'lon', type: 'numeric' }
                ]}
            data={tableData ? tableData : [{msg: "loading"}]}
            title="Search All Data"
            />
        </div>
    </>
    )
};


export default SearchTable;