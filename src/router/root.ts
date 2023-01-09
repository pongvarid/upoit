

// @ts-ignore
const getView = function(page:any){
    return () => import(`@/views/root/${page}.vue`)
}

const getViewFolder = function(page:any,folder:any){
    return () => import(`@/views/${folder}/${page}.vue`)
}



const rootRouter:any  = [
    {
        path: '',
        name: 'admin-homes',
        component: getView('Home')
    },
    {
        path: 'xtest',
        name: 'admin-xtest',
        component: getView('Test')
    },
    {
        path: 'iit',
        name: 'iit-homes',
        component: getView('Iit')
    },
    {
        path: 'oit',
        name: 'oit-homes',
        component: getView('Oit')
    },
    {
        path: 'eit',
        name: 'eit-homes',
        component: getView('Eit')
    }, {
        path: 'mo',
        name: 'mo-homes',
        component: getView('MO')
    },
    {    path: '/report/',
        name: 'report',
        component: getView('Report')
    },
    {    path: '/export/up',
         name: 'export-up',
    component: getView('ExportUP')
},
{    path: '/export/agency',
    name: 'export-agency',
    component: getView('ExportAgency')
},


{    path: '/public/eit/year',
    name: 'publiceit-agenyearcy',
    component: getViewFolder('Year','eit')
},

{    path: '/public/eit/detail',
    name: 'publiceit-detail',
    component: getViewFolder('Detail','eit')
},


    // {    path: '/dev/change-agency-eit',
    //     name: 'dev-change-agency-eit',
    //     component: () =>import(`@/views/dev/ChangeAgencyEIT.vue`)
    // },
    //
   
]


export  {
    rootRouter
}