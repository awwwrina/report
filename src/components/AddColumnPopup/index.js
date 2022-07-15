import { Button, Popup, TextBox } from 'devextreme-react';

import { useState } from 'react';
import { useDispatch } from 'react-redux/es/exports';

import { newColumnAdded } from '../../store/companiesSlice';
export const AddColumnPopup = ({isAddPopupVisible, togglePopupAdding}) => {

    const dispatch = useDispatch();
    
    const [caption, setCaption] = useState(null)

    const handleSubmit = () => {
        dispatch(newColumnAdded(caption));
        togglePopupAdding();
    }

    const handleChanges = (e) => {
        setCaption(e);
    }

    return(
        <Popup id="popup"
        width={400}
        height={200}
        visible={isAddPopupVisible}
        hideOnOutsideClick={true}
        onHiding={togglePopupAdding}
        title='Создать новую колонку'
        >
            <TextBox defaultValue=''
                showClearButton={true}
                placeholder="Введите название"
                valueChangeEvent="keyup"
                onValueChange={(e) =>  handleChanges(e)} />
            <Button
                style={{"marginTop":"20px"}}
                text="Создать колонку и закрыть окно"
                onClick={handleSubmit}
                width="100%"
                marginTop="10"/>
        </Popup>
    )
}