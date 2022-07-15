import { Button, Popup, Form, TextBox } from 'devextreme-react';
import {
    SimpleItem,
    RequiredRule,
    PatternRule
} from 'devextreme-react/form';


import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';

import { captionChanged } from '../../store/companiesSlice';
export const EditPopup = ({isPopupVisible, togglePopup, item}) => {

    let value = useSelector(state => state.companies.currentCaption)
    const dispatch = useDispatch();
    
    return(
        <Popup id="popup"
        style={{'background':'blue'}}
        width={300}
        height={200}
        visible={isPopupVisible}
        hideOnOutsideClick={true}
        onHiding={togglePopup}
        title='Change caption'

        >

            <TextBox defaultValue=''
                showClearButton={true}
                placeholder="Enter new caption"
                valueChangeEvent="keyup"
                onValueChange={(e) => dispatch(captionChanged(e))} />
            <Button
                style={{"marginTop":"20px"}}
                text="Change caption and close modal"
                onClick={togglePopup}
                width="100%"
                marginTop="10"/>
        </Popup>
    )
}