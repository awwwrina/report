import { Button, Popup, TextBox } from 'devextreme-react';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';

import { newColumnAdded } from '../../store/companiesSlice';
export const AddColumnPopup = ({isAddPopupVisible, togglePopupAdding}) => {

    let value = useSelector(state => state.companies.currentCaption)
    const dispatch = useDispatch();
    console.log(isAddPopupVisible);
    

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
                onValueChange={(e) => dispatch(newColumnAdded(e))} />
            {/* <Button
                style={{"marginTop":"20px"}}
                text="Создать колонку и закрыть окно"
                onClick={togglePopupAdding}
                width="100%"
                marginTop="10"/> */}
        </Popup>
    )
}