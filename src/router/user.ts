

// @ts-ignore

const getView = function(page:any){
    return () => import(`@/views/user/${page}.vue`)
}
const getViewReport = function(page:any){
    return () => import(`@/views/report/${page}.vue`)
}

const userRouter:any  = [
    {
        path: '',
        name: 'home',
        component: getView('Home')
    },
    {
        path: '/profile',
        name: 'profile',
        component: getView('Profile')
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
        path: 'oit-home',
        name: 'oit-home',
        component: getView('OIT_MAIN'),
        group : 'oit'
    },
    {
        path: 'mo-home',
        name: 'mo-home',
        component: getView('MO_MAIN'),
        group : 'oit'
    },
    {
        path: 'mo-exercise',
        name: 'mo-exercise',
        component: getView('MO_EXERCISE'),
        group : 'oit'
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
    // {
    //     path: '/iit/all',
    //     name: 'iit-all',
    //     text:'ผลการประเมิน',
    //     icon:'em em-checkered_flag',
    //     enabled:true,
    //     component: getView('IIT_AGENCY'),
    //     group : 'iit'
    // },
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
    // {
    //     path: '/eit/all',
    //     name: 'eit-all',
    //     text:'ผลการประเมิน',
    //     icon:'em em-checkered_flag',
    //     enabled:true,
    //     component: getView('EIT_AGENCY'),
    //     group : 'eit'
    // },
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
        path: '/report/home',
        name: 'report-home',
        component: getViewReport('List'),
       
    },

    {
        path: '/alert',
        name: 'all-alert',
        component: getView('ALERT'),
       
    },
    {
        path: '/list-user',
        name: 'list-user',
        component: getView('LIST_USER'),

    },
    {
        path: '/xtesterx/',
        name: 'all-alert',
        component: getView('Tester'),

    },
    {    path: '/dev/',
        name: 'dev',
        component: () =>import(`@/views/dev/Home.vue`)
    },
    {    path: '/res-iit',
        name: 'resiit',
        component: () =>import(`@/views/dev/TestIIT.vue`)
    },
    {    path: '/res-eit',
        name: 'reseit',
        component: () =>import(`@/views/dev/TestEIT.vue`)
    },
    {    path: '/gen-port',
        name: 'genport',
        component: () =>import(`@/views/dev/GenPort.vue`)
    },
    {    path: '/gen-port2',
        name: 'genport2',
        component: () =>import(`@/views/dev/GenPort2.vue`)
    },
    {    path: '/up-report',
        name: 'up-report',
        component: () =>import(`@/views/dev/GenPort3.vue`)
    },
    {    path: '/gen-port4',
        name: 'genport4',
        component: () =>import(`@/views/dev/GenPort4.vue`)
    },
    {    path: '/super',
        name: 'super',
        component: () =>import(`@/views/dev/Super.vue`)
    },
    {    path: '/data-analysis-before-show-end-user',
        name: 'analysis',
        component: () =>import(`@/views/dev/Analysis.vue`)
    },
    {    path: '/creator',
    name: 'creator',
    component: () =>import(`@/views/admin/CREATOR.vue`)
    },
]

export  {
    userRouter
}