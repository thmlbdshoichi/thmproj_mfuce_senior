export default function({$auth, redirect, store}) {
    let userDetails = $auth.user;
    if(userDetails && userDetails.role === "Admin"){
        
    } else {
        redirect('/Login')
    }
}