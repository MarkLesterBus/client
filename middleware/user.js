export default ({ app, redirect, route }) => {
  if (app.$auth.loggedIn) {
    switch (app.$auth.user.role) {
      case 'Administrator':
        return route
      case 'User':
        return route
      default:
        redirect('/')
        break
    }
  } else {
    redirect('/login')
  }
}
