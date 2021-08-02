

// @ts-ignore
const getView = function(page:any){
    return () => import(`@/views/root/${page}.vue`)
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
    },{
        path: 'eit',
        name: 'eit-homes',
        component: getView('Eit')
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



    // {    path: '/dev/change-agency-eit',
    //     name: 'dev-change-agency-eit',
    //     component: () =>import(`@/views/dev/ChangeAgencyEIT.vue`)
    // },
    //
   
]


export  {
    rootRouter
}