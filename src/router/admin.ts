

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
        path: 'list',
        name: 'list',
        component: getView('List')
    },
    {
        path: 'paper',
        name: 'paper',
        component: getView('Paper')
    },
 
]

export   {
    adminRouter
}