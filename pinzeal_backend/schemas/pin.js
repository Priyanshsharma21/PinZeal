// this schema have all the details a image have like pin save share like user
export default {
    name:'pin',
    title:'Pin',
    type:'document',
    fields:[
        {
            name : 'title',
            title:'Title',
            type:'string',
        },
        {
            name : 'about',
            title:'About',
            type:'string',
        },
        {
            name : 'destination',
            title:'Destination',
            type:'url',
        },
        {
            name : 'category',
            title:'Category',
            type:'string',
        },
        {
            name : 'image',
            title:'Image',
            type:'image',
            option:{
                hotspot : true //to change crop the image
            }
        },
        {
            name : 'userId',
            title:'UserID',
            type:'string',
        },
        {
            name : 'postedBy',
            title:'PostedBy',
            type:'postedBy',
        },
        {
            name : 'save',
            title:'Save',
            type: 'array',
            of: [{type : 'save'}], // so we can save unlimited saves
        },
        {
            name : 'comments',
            title:'Comments',
            type: 'array',
            of: [{type : 'comment'}], // so we can save unlimited comments
        },
        
    ]
}