

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
    
   
]


export  {
    rootRouter
}