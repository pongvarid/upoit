

// @ts-ignore
const getView = function(page:any){
    return () => import(`@/views/admin/${page}.vue`)
}


const adminRouter:any = [
    {
        path: '',
        name: 'home',
        component: getView('Home')
    },
    {
        path: 'home',
        name: 'home-home',
        component: getView('Home')
    },
    {
        path: 'iit/all',
        name: 'iit-all',
        component: getView('IIT_AGENCY')
    },
    {
        path: 'iit/report',
        name: 'iit-report',
        component: getView('IIT_REPORT')
    },
    {
        path: 'iit/detail',
        name: 'iit-detail',
        component: getView('IIT_DETAIL')
        
    },{
        path: 'iit/map',
        name: 'iit-map',
        component: getView('IIT_MAP')
    },
    {
        path: 'list',
        name: 'list',
        component: getView('List')
    },
    {
        path: 'paper',
        name: 'paper',
        component: getView('Paper')
    },{
        path: 'eit/all',
        name: 'eit-all',
        component: getView('EIT_AGENCY')
    },
    {
        path: 'eit/report',
        name: 'eit-report',
        component: getView('EIT_REPORT')
    },
    {
        path: 'eit/detail',
        name: 'eit-detail',
        component: getView('EIT_DETAIL')
    },
    {
        path: 'eit/map',
        name: 'eit-map',
        component: getView('EIT_MAP')
    },
 
]

export   {
    adminRouter
}