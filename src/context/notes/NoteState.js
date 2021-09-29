import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const HOST = process.env.REACT_APP_BACKEND_HOST;

    let initPosition = {
        1: "br", 2: "bg", 3: "bb", 4: "bq", 5: "bk", 6: "bb", 7: "bg", 8: "br",
        9: "bp", 10: "bp", 11: "bp", 12: "bp", 13: "bp", 14: "bp", 15: "bp", 16: "bp",
        17: "", 18: "", 19: "", 20: "", 21: "", 22: "", 23: "", 24: "",
        25: "", 26: "", 27: "", 28: "", 29: "", 30: "", 31: "", 32: "",
        33: "", 34: "", 35: "", 36: "", 37: "", 38: "", 39: "", 40: "",
        41: "", 42: "", 43: "", 44: "", 45: "", 46: "", 47: "", 48: "",
        49: "wp", 50: "wp", 51: "wp", 52: "wp", 53: "wp", 54: "wp", 55: "wp", 56: "wp",
        57: "wr", 58: "wg", 59: "wb", 60: "wq", 61: "wk", 62: "wb", 63: "wg", 64: "wr"
    };
    const [allPositions, updateNotes] = useState(initPosition);


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

        let newNotes = [...allPositions];
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
        <NoteContext.Provider value={{ allPositions, getAllNotes, editNote }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
