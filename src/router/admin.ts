

// @ts-ignore
const getView = function(page:any){
    return () => import(`@/views/admin/${page}.vue`)
}


const adminRouter:any = [
    {
        path: '',
        name: 'admin-home',
        component: getView('Xhome')
    },
    {
        path: 'home',
        name: 'admin-homex',
        component: getView('Xhome')
    },
    {
        path: 'oit/all',
        name: 'admin-oit-all',
        component: getView('Home')
    },
    {
        path: 'iit/all',
        name: 'admin-iit-all',
        component: getView('IIT_AGENCY')
    },
    {
        path: 'iit/report',
        name: 'admin-iit-report',
        component: getView('IIT_REPORT')
    },
    {
        path: 'iit/detail',
        name: 'admin-iit-detail',
        component: getView('IIT_DETAIL')
        
    },{
        path: 'iit/map',
        name: 'admin-iit-map',
        component: getView('IIT_MAP')
    },
    {
        path: 'list',
        name: 'admin-list',
        component: getView('List')
    },
    {
        path: 'paper',
        name: 'admin-paper',
        component: getView('Paper')
    },{
        path: 'eit/all',
        name: 'admin-eit-all',
        component: getView('EIT_AGENCY')
    },
    {
        path: 'eit/report',
        name: 'admin-eit-report',
        component: getView('EIT_REPORT')
    },
    {
        path: 'eit/detail',
        name: 'admin-eit-detail',
        component: getView('EIT_DETAIL')
    },
    {
        path: 'eit/map',
        name: 'admin-eit-map',
        component: getView('EIT_MAP')
    },
 
]

export   {
    adminRouter
}