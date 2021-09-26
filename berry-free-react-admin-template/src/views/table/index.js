import { useState, useEffect, Component } from 'react';
import { connect, useSelector } from "react-redux";

import { fetchArticleDetails } from 'actions/fetchArticleDetails';
import { fetchTableData } from "actions/fetchTableData";



class Table extends Component  {

    componentDidMount() {
           
            this.props.fetchTableData();
            // this.props.fetchArticleDetails();
    }

    componentDidUpdate(prevProps) {
        // if (this.props.params !== prevProps.params) {
        //     this.props.fetchTableData()
        // }
        this.props.fetchTableData()
        // this.props.fetchArticleDetails();

        // console.log('props', this.props)
    }
        
        
    render() {
    console.log('props', this.props)
    return (<h2>hey</h2>)
    }


}
const mapStateToProps = ({ data = {}, isLoadingData = false }) => ({
    data,
    isLoadingData
});
  

export default connect(
    mapStateToProps,
    {
      fetchTableData
    }
)(Table);


// const Table = () => {
    
//     // const articleDetails = useSelector((state) => state)
//     // console.log('article', articleDetails)
//     const [dataLoading, setDataLoading] = useState(false);
//     const [data, setData] = useState("");


//     useEffect(() => {
//         if (!dataLoading) {
//             // setData(articleDetails);
//             var x = fetchTableData();
        
//         }
//         console.log('x', x)
//     })

//     return (
//         <>
//         <p>hey</p>
//         </>
//     )

   
// };

// export default Table;


  

