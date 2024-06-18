import { expect, test } from '@playwright/test'

test.describe("Test about page navigation", async () => {

    test("Open browser", async ({ page }) => {
        // Action
        await page.goto("https://demo.playwright.dev/todomvc/#/")

        // Assert
        await expect(page)
            .toHaveURL("https://demo.playwright.dev/todomvc/#/")

        // expect(currentUrl).toEqual('Hello') // Should be failed
        const currentUrl = page.url()
        expect(currentUrl).toEqual("https://demo.playwright.dev/todomvc/#/")

        await expect(page).toHaveTitle("React • TodoMVC")

        const title = await page.locator('title').innerText()
        expect(title).toContain('Todo')

        const heading = await page.locator('h1').innerText()
        expect(heading).toEqual('todos')

        // await expect(page.locator('xpath=//h1[text()="todos"]'))
        //     .toBeHidden()
    });

    test("Go back", async ({ page }) => {
        // Arrange
        const url1 = "https://demo.playwright.dev/todomvc/#/"
        const url2 = "https://google.com"

        await page.goto(url1)
        await page.goto(url2)

        // Action
        await page.goBack()

        // Assertion
        await expect(page).toHaveURL(url1)
    });

    test("Go forward", async ({ page }) => {
        // Arrange
        const url1 = "https://demo.playwright.dev/todomvc/#/"
        const url2 = "https://www.google.com/"

        await page.goto(url1)
        await page.goto(url2)
        await page.goBack()

        // Action
        await page.goForward()

        // Assertion
        await expect(page).toHaveURL(url2)
    });

});

test.describe("Test about scrapping text", async () => {

    test("get hidden text", async ({ page }) => {
        // Arrange
        const url = "https://swongsuddee.github.io/demo-web-qa/text/"
        await page.goto(url)

        const hiddenTextLocator = page.getByTestId('text-hidden')

        // Action
        const innerText = await hiddenTextLocator.innerText()
        const textContent = await hiddenTextLocator.textContent()

        // Assertion
        // console.log(innerText, textContent)
        expect({
            innerText,
            textContent
        }).toEqual({
            innerText: "This text is contains with display hidden.",
            textContent: "This text is contains word with display hidden."
        })
    })

    test("Get all text", async ({ page }) => {
        // Arrange
        const url = "https://www.sanook.com/"
        await page.goto(url)

        const navNewsLocator = page.locator("xpath=//nav/ul/li")

        // Action
        const allInnerText = await navNewsLocator.allInnerTexts()
        const allTextContent = await navNewsLocator.allTextContents()

        // log
        // console.log(allInnerText)
        // console.log(allTextContent)

        // Assertion
        expect(allInnerText).toContain('ข่าว')
        expect(allTextContent).toContain('ข่าว')

        // How toContain works
        allInnerText.forEach((item) => {
            if (item === 'ข่าว') {
                console.log(item)
                return true
            }
        })
    })

})

test.describe("Example template", async () => {

    const data = [
        {
            text: "Hello"
        },
        {
            text: "world"
        },
        {
            text: "Game Cooking"
        }
    ]
    for (const dataItem of data) {
        test(`Search Google with text "${dataItem.text}"`, async ({ page }) => {
            // Arrange
            const url = "https://google.com"
            await page.goto(url)

            const searchInputLocator = page
                .locator("css=textarea[aria-label='Search']")
                .or(page.locator('css=textarea[aria-label="ค้นหา"]'))

            // Action
            await searchInputLocator.fill(dataItem.text)
            await searchInputLocator.press('Enter')

            // Assertion
            const currentUrl = page.url()
            expect(currentUrl).toContain(
                dataItem.text.replace(' ', '+')
            )
        })
    }

})