import { dbService } from "fbase";
import React, { useState } from "react";

const Nweet = ({nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.nweet);
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        if (ok) {
            await dbService.doc(`nweets/${nweetObj.id}`).delete(); 
        }
    };
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = (event) => {
        event.preventDefault();
    }
    const onChange = (event) => {
        const {target:{ value },} = event;
        setNewNweet(value);
    }
    return(
        <div>
            {editing ? (
                <>
                <form onSubmit={onSubmit}>
                    <input type="text" placeholder="Edit your nweet"
                    value={newNweet} onChange={onChange} required />
                </form> 
                <button onClick={toggleEditing}>Cancel</button>
                </>
                ) : (
                    <>
                        <h4>{nweetObj.nweet}</h4>
                        {isOwner && (
                            <>
                                <button onClick={onDeleteClick}>Delete Nweet</button>
                                <button onClick={toggleEditing}>Edit Nweet</button>
                            </>
                        )}
                    </>
                )}
        </div>
    );
}

export default Nweet;