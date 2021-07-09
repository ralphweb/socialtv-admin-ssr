export default function ({ store, redirect, route }) {
    // If the user is not authenticated
    console.log("store.getters['auth/isAuthenticated']");
    console.log(store.getters['auth/isAuthenticated']);
    if (!store.getters['auth/isAuthenticated']) {
        console.log("is false");
        if(route.path!='/login') return redirect('/login')
    } else {
        console.log("is true");
        if(route.path=='/'||route.path=='/login') return redirect('/sh')  
    }
}