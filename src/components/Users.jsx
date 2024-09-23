import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";



const Users = () => {
    const loadedUsers = useLoaderData();
    const [users, setusers]=useState(loadedUsers);

    const handleDelete = _id =>{
        console.log( 'delete', _id);
        fetch(`http://localhost:5000/users/${_id}`, {
            method: 'DELETE'
        })
        .then(res=> res.json())
        .then(data => {
            console.log(data);
            if(data.deletedCount > 0)
            {
                alert('delete successfull');
                const remaining = users.filter(users =>users._id !== _id);
                setusers(remaining);
            }
           
        })
    }

    return (
        <div>
            <h2>{users.length}</h2>
            <div>
                {
                    users.map(user => <p
                        key={user._id}
                    > {user.name} : {user.email} {user._id}
                    <Link to={`/update/${user._id}`}>
                    <button>update</button>
                    </Link>
                     <button onClick={() => handleDelete(user._id)}>delete</button> </p>)
                }
            </div>
        </div>
    );
};

export default Users;