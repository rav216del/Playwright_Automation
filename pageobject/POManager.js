const {LoginPage}= require('./LoginPage')
const {DashboardPage} =require('./DashboardPage')
class POManager{
    constructor(page){
        this.page=page
        this.LoginPage=new LoginPage(this.page);
        this.DashboardPage=new DashboardPage(this.page)

    }
     getLoginPage(){
        return this.LoginPage
    }
     getDashboardPage(){
        return this.DashboardPage
    }
}
module.exports= {POManager}