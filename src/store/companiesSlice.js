import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import {companies} from '../data.js';

const initialState = {
    companies: companies,
    captions: ["Company Name","City","State","Phone","Fax"],
    currentCaption: null
}

export const fetchCards = createAsyncThunk(
    'cards/fetchCards',
    async (offset = 0, {rejectWithValue}) => {
        try {
            const response = await fetch(`${URL}/api/cards/cards?limit=${offset+9}&offset=${offset}`);

            if(!response.ok) {
                throw new Error(await response.text())
            }
            const data = await response.json();

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
        
    }
)

const companiesSlice = createSlice({
    name: 'companies',
    initialState,
    reducers:{
        captionDeleted(state, action) {
            const item = action.payload;
            const index = state.captions.findIndex(caption => caption === item);
            if (index === -1) {
                return;
            }
            state.captions.splice(index, 1);
            
            state.companies.map(company => delete company[`${item}`])
            if (state.captions.length === 0) {
                state.companies = []
            }
        },
        captionChoosen(state,action) {
            state.currentCaption =  action.payload;
        },
        captionChanged(state, action) {
            const newCaption = action.payload;
            console.log(newCaption);
            const prevCaption = state.currentCaption;
            console.log(prevCaption)
            const index = state.captions.findIndex(caption => caption === prevCaption)
            state.currentCaption = newCaption;
            state.captions[index] = newCaption;
            const prevCompanies = state.companies;

            // const a = state.companies.map(company => {
            //     const {prevCaption : newCaption} = {...company}
            // })
            // console.log(a);
            // // const newObj = Object.assign(
            // //     {},
            // //     ...companies
            // // )
            // // return newObj;
            // // console.log(a);
        },
        newColumnAdded(state, action) {
            state.captions.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCards.fulfilled, (state, action) => {
                state.cards = [...state.cards, ...action.payload];
                if (action.payload.length < 9) {
                    state.showBtn = false;
                }
                state.offset += 9;
            })
            .addDefaultCase(() => {})
    }
});

export const filteredCardsSelector = createSelector(
    state => state.filters.activeFilter,
    state => state.cards.cards,
    (filter, cards) => {
        if (filter === 'Show All') {
            return cards;
        } else {
            return cards.filter(item => item.label === filter);
        }
    }

)

const {actions, reducer} = companiesSlice;

export default reducer;

export const {
    captionDeleted, 
    captionChoosen,
    captionChanged,
    newColumnAdded
} = actions;
