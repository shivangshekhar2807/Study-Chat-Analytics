import { createSlice } from "@reduxjs/toolkit";

const StudySlice = createSlice({
    name: 'study',
    initialState: { notes: 0, friendnotes: 0, bookmark: 0, chatrecieved: 0, chatsent: 0, eduhubcontent: 0, eduhubsent: 0 },
    reducers: {
        noteshandler(state, action) {
            state.notes = action.payload.val;
            
        },
        friendnoteshandler(state,action) {
             state.friendnotes = action.payload.val;
        },
        
        bookmarkhandler(state,action) {
             state.bookmark = action.payload.val;
        },
        chatrecievedhandler(state,action) {
             state.chatrecieved = action.payload.val;
        },
        chatsenthandler(state,action) {
             state.chatsent = action.payload.val;
        },
        eduhubcontenthandler(state,action) {
             state.eduhubcontent = action.payload.val;
        },
        eduhubsenthandler(state,action) {
             state.eduhubsent = action.payload.val;
        }

    }
})

export const StudyAction = StudySlice.actions;
export default StudySlice;