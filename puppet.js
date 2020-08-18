const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({
            // headless: false
        });
        const page = await browser.newPage();
        const timeout = 60000
        page.setDefaultNavigationTimeout(timeout)
        page.setDefaultTimeout(timeout)

        await page.goto('https://www.amazon.com', {
            // timeout: 120000
            waitUntil: 'networkidle2'
          });
        await page.type('#twotabsearchtextbox', 'iphone x 64gb');
        await page.click('input.nav-input');
        // console.log("after page.click")
        await page.waitForSelector('.s-image', {
            visible: true
        });

        const results = await page.evaluate(() => {
            const products = Array.from(document.querySelectorAll('.s-result-item'));
            return products.map(data => {
                if (data.querySelector(".a-price-whole")){
                    return{
                        name: data.querySelector(".a-size-medium.a-color-base.a-text-normal").textContent,
                        url: data.querySelector(".a-link-normal.a-text-normal").href,
                        image: data.querySelector(".s-image").src,
                        price: parseFloat(data.querySelector(".a-price-whole").textContent.replace(/[,.]/g, m => (m === ',' ? '.' : ''))),
                    }
                }
            })
            .slice(0, 5);
        })

        console.log('results: ' + results)
        results.map(item => console.log("name: " + item.name))

        // console.log(results.sort((a, b) => {
        //     return a.price - b.price;
        // }));

        await browser.close();
    }catch (error) {
        // display errors
        console.log(error)
    }
})();