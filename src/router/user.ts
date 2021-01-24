

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
        path: '/home',
        name: 'homes',
        text:'หน้าแรก',
        icon:'em em-lower_left_ballpoint_pen',
        enabled:true,
        component: getView('Home'),
        group : 'home'
    },
    {
        path: '/ita',
        name: 'ita',
        text:'ผลการประเมิน',
        icon:'em em-stadium',
        enabled:true,
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
        path: '/all',
        name: 'user-all',
        text:'ดูข้อมูลหน่วยงานอื่นๆ',
        icon:'em em-school',
        enabled:true,
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
        path: '/iit/year',
        name: 'iit-year',
        text:'ทำแบบประเมิน',
        icon:'em em-writing_hand',
        enabled:true,
        component: getView('IIT_YEAR'),
        group : 'iit'
    },
    {
        path: '/iit/all',
        name: 'iit-all',
        text:'ผลการประเมิน',
        icon:'em em-checkered_flag',
        enabled:true,
        component: getView('IIT_AGENCY'),
        group : 'iit'
    },
    {
        path: '/iit/detail',
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
        path: '/eit/year',
        name: '/eit-year',
        text:'ทำแบบประเมิน',
        icon:'em em-writing_hand',
        enabled:true,
        component: getView('EIT_YEAR'),
        group : 'eit'
    },
    {
        path: '/eit/all',
        name: 'eit-all',
        text:'ผลการประเมิน',
        icon:'em em-checkered_flag',
        enabled:true,
        component: getView('EIT_AGENCY'),
        group : 'eit'
    },
    {
        path: '/eit/detail',
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
    {
        path: '/alert',
        name: 'all-alert',
        component: getView('ALERT'),
       
    },
]

export  {
    userRouter
}