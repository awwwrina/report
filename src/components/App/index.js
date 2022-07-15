import bin from '../../icons/bin.png';
import edit from '../../icons/edit.png';
import { useSelector, useDispatch} from 'react-redux/es/exports';
import { captionDeleted, captionChoosen } from '../../store/companiesSlice';
import { Button } from 'devextreme-react/button';
import { DataGridComponent } from '../DataGridComponent';
import { EditPopup } from '../EditPopup';
import Form, {
    SimpleItem
} from 'devextreme-react/form'; 

import { useState } from 'react';
import { AddColumnPopup } from '../AddColumnPopup';
const App = () =>  {
  const captions = useSelector(state => state.companies.captions);
  const dispatch = useDispatch();
  const [isPopupVisible, setPopupVisibility] = useState(false);
 
  const togglePopup = () => {
      setPopupVisibility(!isPopupVisible);
  };

  const [isAddPopupVisible, setAddPopupVisibility] = useState(false);

  const togglePopupAdding = () => {
    setAddPopupVisibility(!isAddPopupVisible);
};

  const handleEdit = (item) => {
    dispatch(captionChoosen(item))
    togglePopup();
    // 
  }
  return (
    <>
      <div className="grid">
        <h1 className="header">Окно предварительного просмотра отчёта</h1>
        {captions.length === 0 && <div className='no-data'> No data. You deleted all columns.</div>}
        {captions.length !== 0 && <DataGridComponent/>}
      </div>
      <aside className='aside'>
        <h2 className='header'>Список колонок </h2>
        <ul className="items">
          {captions.map(item => {
            return( 
              <li key={item} className="item">
                {item}
                <Button
                  id="icon"
                  onClick={() => dispatch(captionDeleted(item))}
                  width={25}
                  height={22}
                  icon={bin}
                  stylingMode="text"/>
                <Button
                  id="icon"
                  onClick={() => handleEdit(item)}
                  width={25}
                  height={22}
                  icon={edit}
                  stylingMode="text"/>
              </li>
              
            )
            
          })}

        </ul>
        <Button
          id="icon"
          stylingMode="text"
          text="Добавить колонку"
          width="100%"
          onClick={() => togglePopupAdding()}/>

        <AddColumnPopup isAddPopupVisible={isAddPopupVisible} togglePopupAdding={togglePopupAdding}/>


        <EditPopup isPopupVisible={isPopupVisible} togglePopup={togglePopup}/>
      </aside>
    </>
  );
}

export default App;
