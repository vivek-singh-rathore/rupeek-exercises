import axios from 'axios';


export const upvote = (sessionId)=> {
    return axios.put(`https://workshops-server.herokuapp.com/sessions/${sessionId}/upvote`)
                .then(response => {
                    console.log( response.data );
                    return response.data;
                })
                .catch(error => {
                    console.log( error.message );
                });

}

export const downvote = (sessionId) => {
    return axios.put(`https://workshops-server.herokuapp.com/sessions/${sessionId}/downvote`)
                .then(response => {
                    console.log( response.data );
                    return response.data;
                })
                .catch(error => {
                    console.log( error.message );
                });

}