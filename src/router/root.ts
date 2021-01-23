

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
 
    {    path: '/report/',
        name: 'report',
        component: getView('Report')
    },
    
    //{
    //     path: '/register/',
    //     name: 'register',
    //     component: getView('Register')
    // },
]


export  {
    rootRouter
}