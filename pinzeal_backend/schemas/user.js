export default {
    //name of document
    name: 'user',
    title : 'User',
    type:'document',
    //fields in the document
    fields : [
        {
            name : 'userName',
            title: 'UserName',
            type:'string'
        },
        {
            name : 'image',
            title: 'Image',
            type:'string'
        },
       
    ]
}

//this schema has image that a user posted