

// @ts-ignore
const getView = function(page:any){
    return () => import(`@/views/root/${page}.vue`)
}


const rootRouter:any  = [
    {
        path: '',
        name: 'admin-home',
        component: getView('Home')
    },
 
    //     path: '/test/',
    //     name: 'test',
    //     component: getView('Test')
    // },{
    //     path: '/register/',
    //     name: 'register',
    //     component: getView('Register')
    // },
]


export  {
    rootRouter
}