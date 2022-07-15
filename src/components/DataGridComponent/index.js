import DataGrid, { Column } from 'devextreme-react/data-grid';
import { useSelector} from 'react-redux/es/exports';

export const DataGridComponent = () => {
    const captions = useSelector(state => state.companies.captions);
    const data = useSelector(state => state.companies.companies);
    
    return(
        <DataGrid
            id="gridContainer"
            dataSource={data}
            keyExpr="ID"
            allowColumnReordering={true}
            allowColumnResizing={true}
            showBorders={true}> 
            {
            captions.map(item => {
                return <Column key={item} caption={item} dataField={item} />
            })
            }
        </DataGrid>
    )
}