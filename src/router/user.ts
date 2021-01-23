

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
        text:'การประเมิน',
        icon:'em em-lower_left_ballpoint_pen',
        enabled:true,
        component: getView('Home'),
        group : 'home'
    },
    {
        path: 'ita',
        name: 'ita',
        component: getView('ITA_REPORT'),
        group : 'home'
    },
    {
        path: 'paper',
        name: 'paper',
        component: getView('Paper'),
        group : 'oit'
    },
    {
        path: 'paperup',
        name: 'paperup',
        component: getView('PaperUp'),
        group : 'oit'
    },
    {
        path: 'report',
        name: 'report-user',
        component: getView('Report'),
        group : 'oit'
    },

    {
        path: 'list',
        name: 'list',
        component: getView('List'),
        group : 'oit'
    },
    {
        path: 'all',
        name: 'user-all',
        component: getView('AllAngency'),
        group : 'oit'
    },{
        path: 'all/result',
        name: 'all',
        component: getView('AllResult'),
        group : 'oit'
    },



    //IIT
    {
        path: 'iit/year',
        name: 'iit-year',
        component: getView('IIT_YEAR'),
        group : 'iit'
    },
    {
        path: 'iit/all',
        name: 'iit-all',
        component: getView('IIT_AGENCY'),
        group : 'iit'
    },
    {
        path: 'iit/detail',
        name: 'iit-detail',
        component: getView('IIT_DETAIL'),
        group : 'iit'
    },{
        path: 'iit/report',
        name: 'iit-report',
        component: getView('IIT_REPORT'),
        group : 'iit'
    },
    {
        path: 'iit/report/detail',
        name: 'iit-report-detail',
        component: getView('IIT_REPORT_DETAIL'),
        group : 'iit'
    },
    //EIT
    {
        path: 'eit/year',
        name: 'eit-year',
        component: getView('EIT_YEAR'),
        group : 'eit'
    },
    {
        path: 'eit/all',
        name: 'eit-all',
        component: getView('EIT_AGENCY'),
        group : 'eit'
    },
    {
        path: 'eit/detail',
        name: 'eit-detail',
        component: getView('EIT_DETAIL'),
        group : 'eit'
    },{
        path: 'eit/report',
        name: 'eit-report',
        component: getView('EIT_REPORT'),
        group : 'eit'
    },{
        path: 'eit/report/detail',
        name: 'eit-report-detail',
        component: getView('EIT_REPORT_DETAIL'),
        group : 'eit'
    },

]

export  {
    userRouter
}