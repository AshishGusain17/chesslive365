import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const HOST = process.env.REACT_APP_BACKEND_HOST;

    let notesInitial = {1:""};
    const [allNotes, updateNotes] = useState(notesInitial);


    const getAllNotes = async () => {
        const response = await fetch(`${HOST}/api/notes/getAllNotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'jwt-token': localStorage.getItem('jwt-token')
            },
        });

        // console.log(response)
        const res_json = await response.json();
        console.log(res_json);

        updateNotes(res_json);
    };



    

    const editNote = async (noteForm) => {
        const id = noteForm.id;
        const title = noteForm.etitle;
        const desc = noteForm.edesc;
        const tag = noteForm.etag;

        const response = await fetch(`${HOST}/api/notes/updateNote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'jwt-token': localStorage.getItem('jwt-token')
            },
            body: JSON.stringify({ "title": title, "desc": desc, "tag": tag })
        });
        // console.log(response)
        const res_json = await response.json();
        console.log(res_json);

        let newNotes = [...allNotes];
        for (let index = 0; index < newNotes.length; index++) {
            const ele = newNotes[index];
            if (ele._id === id) {
                ele.title = title;
                ele.desc = desc;
                ele.tag = tag;
                break;
            }
        }
        updateNotes(newNotes);
    }


    return (
        <NoteContext.Provider value={{ allNotes, getAllNotes,   editNote }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
