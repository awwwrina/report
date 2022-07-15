import { Button, Popup, TextBox } from 'devextreme-react';

import { useState } from 'react';
import { useDispatch } from 'react-redux/es/exports';

import { captionChanged } from '../../store/companiesSlice';
export const EditPopup = ({isPopupVisible, togglePopup, item}) => {

    const [caption, setCaption] = useState(null)

    const dispatch = useDispatch();
    const handleSubmit = () => {
        dispatch(captionChanged(caption));
        togglePopup();
    }

    const handleChanges = (e) => {
        setCaption(e);
    }
    
    return(
        <Popup id="popup"
        width={350}
        height={200}
        visible={isPopupVisible}
        hideOnOutsideClick={true}
        onHiding={togglePopup}
        title='Изменить колонку'>
            <TextBox defaultValue=" "
                showClearButton={true}
                placeholder="Введите название"
                valueChangeEvent="keyup"
                onValueChange={(e) => handleChanges(e)}/>
            <Button
                style={{"marginTop":"20px"}}
                text="Переименовать колонку и закрыть окно"
                onClick={handleSubmit}
                width="100%"
                marginTop="10"/>

        </Popup>
    )
}