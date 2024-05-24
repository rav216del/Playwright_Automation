class DashboardPage {
    constructor(page) {

        this.product = page.locator("div.card-body")
        this.productTitle = page.locator("div.card-body b")
       
        this.cartButton = page.locator("button[routerlink='/dashboard/cart']")
    }
    async searchProductAndAddToCart(productName){
        await this.productTitle.first().waitFor()
        console.log(await this.productTitle.allTextContents())
        const count = await this.product.count()
        console.log(count)
        for (let i = 0; i < count; i++) {
            if (await this.product.nth(i).locator('b').textContent() === productName) {
                await this.product.nth(i).locator('text= Add To Cart').click()
                console.log("item add to cart")
                break;
        
            }
        }
        

    }
    async navigateToCart(){
        await this.cartButton.click()
    }

}
module.exports = {DashboardPage}