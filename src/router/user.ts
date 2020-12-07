

// @ts-ignore

const getView = function(page:any){
    return () => import(`@/views/user/${page}.vue`)
}


const userRouter:any  = [
    {
        path: '',
        name: 'home',
        component: getView('Home')
    },
    {
        path: 'home',
        name: 'homes',
        component: getView('Home')
    },
    {
        path: 'paper',
        name: 'paper',
        component: getView('Paper')
    },
    {
        path: 'ita',
        name: 'ita',
        component: getView('ITA_REPORT')
    },
    {
        path: 'list',
        name: 'list',
        component: getView('List')
    },
    {
        path: 'all',
        name: 'all',
        component: getView('AllAngency')
    },{
        path: 'all/result',
        name: 'all',
        component: getView('AllResult')
    },
    //IIT
    {
        path: 'iit/year',
        name: 'iit-year',
        component: getView('IIT_YEAR')
    },
    {
        path: 'iit/all',
        name: 'iit-all',
        component: getView('IIT_AGENCY')
    },
    {
        path: 'iit/detail',
        name: 'iit-detail',
        component: getView('IIT_DETAIL')
    },{
        path: 'iit/report',
        name: 'iit-report',
        component: getView('IIT_REPORT')
    },
    {
        path: 'iit/report/detail',
        name: 'iit-report-detail',
        component: getView('IIT_REPORT_DETAIL')
    },
    //EIT
    {
        path: 'eit/year',
        name: 'eit-year',
        component: getView('EIT_YEAR')
    },
    {
        path: 'eit/all',
        name: 'eit-all',
        component: getView('EIT_AGENCY')
    },
    {
        path: 'eit/detail',
        name: 'eit-detail',
        component: getView('EIT_DETAIL')
    },{
        path: 'eit/report',
        name: 'eit-report',
        component: getView('EIT_REPORT')
    },{
        path: 'eit/report/detail',
        name: 'eit-report-detail',
        component: getView('EIT_REPORT_DETAIL')
    },

]

export  {
    userRouter
}