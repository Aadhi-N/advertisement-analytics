import MaterialTable from 'material-table'

const SearchTable = ({ tableData }) => {
    return (
    <>
        <h1>SEARCH TABLE</h1>
        <div style={{ maxWidth:"100%", paddingTop: "200px" }}>
            <MaterialTable
                columns={[
                    { title: 'Adı', field: 'name' },
                    { title: 'Soyadı', field: 'surname' },
                    { title: 'Doğum Yılı', field: 'birthYear', type: 'numeric' },
                    { title: 'Doğum Yeri', field: 'birthCity', lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' } }
                ]}
            data={[{ name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 }, { name: 'SDF', surname: 'Baran', birthYear: 1987, birthCity: 63 }]}
            title="Demo Title"
            />
        </div>
    </>
    )
};

export default SearchTable;