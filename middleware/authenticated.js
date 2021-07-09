export default function ({ store, redirect, route, router }) {
    // If the user is not authenticated
    if (!store.getters['auth/isAuthenticated']) {
        if(route.path!='/login') return redirect('/login')
    } else {
        if(route.path=='/'||route.path=='/login') return redirect('/admin')  
        else {
            let views = store.getters['auth/views'].map(view => view.path);
            views.push('/');
            views.push('/login');
            views.push('/admin');
            console.log(views);
            if(!views.includes(route.path)) {
                return redirect('/login')
            }
        }
    }
}