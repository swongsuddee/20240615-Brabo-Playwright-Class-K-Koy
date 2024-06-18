import { expect, test } from "@playwright/test";
import { randomInt } from "crypto";
import path from "path";

/*
1. Open url
2. expected url correct
3. expected title correct
4. expected heading "todos" visible
*/
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

test("Test variables", async () => {
    const a: Number = 0
    let b = 0
    var c = 0

    if (a == 2) {
        b = 1
        c = 1
        let d = 1
        var e = 1
        // console.log(b, c, d, e)
    }
    else {
        b = 2
        c = 2
        let d = 2
        var e = 2
        // console.log(b, c, d, e)
    }

    console.log(b, c, e)
})

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

// https://swongsuddee.github.io/demo-web-qa/text/
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

test('Left click', async ({ page }) => {
    // Arrange
    const url = "https://swongsuddee.github.io/demo-web-qa/button/"
    await page.goto(url)
    await page.waitForLoadState('networkidle')

    const btnLocator = page
        .getByTestId('single-click-example')
        .getByTestId('single-click')
    // const btnLocator = page
    //     .locator("css=div[data-testid='single-click-example']")
    //     .locator("css=button[data-testid='single-click']")

    // page.locator("css=div[data-testid='single-click-example'] >> css=button[data-testid='single-click']")

    const clickCount = randomInt(10) + 1

    // Action
    await btnLocator.click({
        clickCount: clickCount
    })

    // Assertion
    const count = await page.getByTestId('click-count').innerText()
    expect(Number(count)).toEqual(clickCount)
})

test("Right click", async ({ page }) => {
    // Arrange
    const url = "https://swongsuddee.github.io/demo-web-qa/button/"
    await page.goto(url)
    await page.waitForLoadState('networkidle')

    const btnLocator = page
        .getByTestId('rightclick-count')

    const clickCount = randomInt(10) + 1

    // Action 
    await btnLocator.click({
        button: 'right',
        clickCount: clickCount
    })

    // Assetion
    const count = await btnLocator.innerText()
    expect(Number(count)).toEqual(clickCount)
})

test("Double click", async ({ page }) => {
    // Arrange
    const url = "https://swongsuddee.github.io/demo-web-qa/button/"
    await page.goto(url)
    await page.waitForLoadState('networkidle')

    const btnLocator = page.getByTestId('dbclick-count')

    // Action 
    await btnLocator.dblclick()

    // Assetion
    const count = await btnLocator.innerText()
    expect(Number(count)).toEqual(1)
})

test('Is button disabled', async ({ page }) => {
    // Arrange
    const url = "https://swongsuddee.github.io/demo-web-qa/button/"
    await page.goto(url)
    await page.waitForLoadState('networkidle')

    const btnLocator = page.locator("xpath=(//button)[4]")

    page.locator('button').nth(3)

    // Action
    const isDisabled = await btnLocator.isDisabled();

    // Assertion
    expect(isDisabled).toBeTruthy()
})

test("Toggle button", async ({ page }) => {
    // Arrange
    const url = "https://swongsuddee.github.io/demo-web-qa/button/"
    await page.goto(url)
    await page.waitForLoadState('networkidle')

    const btnLocator = page.getByTestId("like-button")

    // Action
    await btnLocator.click()

    // Assertion
    const btnClass = await btnLocator.getAttribute('class')
    expect(btnClass).toContain('bg-amber-500')

    await expect(btnLocator).toHaveClass('mx-1 px-2 bg-amber-500 rounded-md border-solid border border-amber-500')
})

test("Mouse hover", async ({ page }) => {
    // Arrange
    const url = "https://demo.playwright.dev/todomvc/#/"
    await page.goto(url)

    const inputLocator = page.getByRole('textbox')
    await inputLocator.fill('Hello World!')
    await inputLocator.press('Enter')

    const todoItemLocator = page
        .getByRole('list')
        .getByRole('listitem')
        .and(page.getByTestId('todo-item'))

    // Action
    await todoItemLocator.hover()

    // Assertion
    const deleteBtnLocator = todoItemLocator.getByRole('button')
    await deleteBtnLocator.click()
})

test('Get input value', async ({ page }) => {
    // Arrange
    const url = "https://demo.playwright.dev/todomvc/#/"
    await page.goto(url)

    const inputLocator = page.getByRole('textbox')
    await inputLocator.fill('Hello World!')

    // Action
    const inputValue = await inputLocator.inputValue();

    // Assertion
    expect(inputValue).toEqual('Hello World!')
})

test('Clear input value', async ({ page }) => {
    // Arrange
    const url = "https://demo.playwright.dev/todomvc/#/"
    await page.goto(url)

    const inputLocator = page.getByRole('textbox')
    await inputLocator.fill('Hello World!')

    // Action
    await inputLocator.clear()

    // Assertion
    const inputValue = await inputLocator.inputValue()
    expect(inputValue).toEqual('')
})

test("Check box : Is enabled check box", async ({ page }) => {
    // Arrange
    const url = "https://www.w3schools.com/bootstrap5/bootstrap_form_check_radio.php";
    await page.goto(url);
    const option1 = page.locator('xpath=//label[contains(., "Option 1") and input[@type="checkbox"]]');
    const option2 = page.locator('xpath=//label[contains(., "Option 2") and input[@type="checkbox"]]');
    const option3 = page.locator('xpath=//label[contains(., "Disabled Option") and input[@type="checkbox"]]');
    // Action
    const isOption1Enabled = await option1.isEnabled();
    const isOption3Enabled = await option3.isEnabled();
    // Assertion
    expect(isOption1Enabled).toBeTruthy();
    expect(isOption3Enabled).toBeFalsy();
});

test("Check box : Check the box", async ({ page }) => {
    // Arrange
    const url = "https://www.w3schools.com/bootstrap5/bootstrap_form_check_radio.php";
    await page.goto(url)
    const option1 = page.locator('xpath=//label[contains(., "Option 1") and input[@type="checkbox"]]');
    const option2 = page.locator('xpath=//label[contains(., "Option 2") and input[@type="checkbox"]]');
    const option3 = page.locator('xpath=//label[contains(., "Disabled Option") and input[@type="checkbox"]]');
    // Action
    await option1.check()
    await option2.check()
    // Assert
    const isOption1Checked = await option1.isChecked();
    const isOption2Checked = await option2.isChecked();
    const isOption3Checked = await option3.isChecked();
    expect({ isOption1Checked, isOption2Checked, isOption3Checked })
        .toEqual({
            isOption1Checked: true, isOption2Checked: true, isOption3Checked: false
        });
});

test("Check box : Unchecked to the box", async ({ page }) => {
    // Arrange
    const url = "https://www.w3schools.com/bootstrap5/bootstrap_form_check_radio.php";
    await page.goto(url);
    const option1 = page.locator('xpath=//label[contains(., "Option 1") and input[@type="checkbox"]]');
    const option2 = page.locator('xpath=//label[contains(., "Option 2") and input[@type="checkbox"]]');
    const option3 = page.locator('xpath=//label[contains(., "Disabled Option") and input[@type="checkbox"]]');
    // Action
    await option1.uncheck()
    await option2.uncheck()
    // Assert
    const isOption1Checked = await option1.isChecked();
    const isOption2Checked = await option2.isChecked();
    const isOption3Checked = await option3.isChecked();
    expect({ isOption1Checked, isOption2Checked, isOption3Checked })
        .toEqual({
            isOption1Checked: false, isOption2Checked: false, isOption3Checked: false
        });
});

test("Check box : Set checked to the box", async ({ page }) => {
    // Arrange
    const url = "https://www.w3schools.com/bootstrap5/bootstrap_form_check_radio.php";
    await page.goto(url);
    const option1 = page.locator('xpath=//label[contains(., "Option 1") and input[@type="checkbox"]]');
    const option2 = page.locator('xpath=//label[contains(., "Option 2") and input[@type="checkbox"]]');
    const option3 = page.locator('xpath=//label[contains(., "Disabled Option") and input[@type="checkbox"]]');
    await option1.setChecked(false);
    await option2.setChecked(true);
});

test('Radio button : Is enabled button', async ({ page }) => {
    // Arrange
    const url = 'https://www.w3schools.com/bootstrap5/bootstrap_form_check_radio.php';
    await page.goto(url);
    const option1 = page.locator('input#radio1');
    const option2 = page.locator('input#radio2');
    const option3 = page.locator('input[type="radio"][disabled]');
    // Action
    const isOption1Enabled = await option1.isEnabled();
    const isOption3Enabled = await option3.isEnabled();
    // Assertion
    expect(isOption1Enabled).toBeTruthy();
    expect(isOption3Enabled).toBeFalsy();
});

test('Radio button :Check button', async ({ page }) => {
    // Arrange
    const url = 'https://www.w3schools.com/bootstrap5/bootstrap_form_check_radio.php';
    await page.goto(url);
    const option1 = page.locator('input#radio1');
    const option2 = page.locator('input#radio2');
    const option3 = page.locator('input[type="radio"][disabled]');
    // Action
    await option2.check();
    // Assertion
    const isOption1Checked = await option1.isChecked();
    const isOption2Checked = await option2.isChecked();
    expect(isOption1Checked).toBeFalsy();
    expect(isOption2Checked).toBeTruthy();
});

test("Radio button : Set checked to button", async ({ page }) => {
    // Arrange
    const url = 'https://www.w3schools.com/bootstrap5/bootstrap_form_check_radio.php';
    await page.goto(url);
    const option1 = page.locator('input#radio1');
    const option2 = page.locator('input#radio2');
    const option3 = page.locator('input[type="radio"][disabled]');
    // Arrange
    await option2.setChecked(true);
    // Assertion
    const isOption1Checked = await option1.isChecked();
    const isOption2Checked = await option2.isChecked();
    expect(isOption1Checked).toBeFalsy(); // To be false
    expect(isOption2Checked).toBeTruthy(); // To be truth
});

// This case will be failed
test("Try to uncheck radio button", async ({ page }) => {
    // Arrange
    const url = 'https://www.w3schools.com/bootstrap5/bootstrap_form_check_radio.php';
    await page.goto(url);
    const option1 = page.locator('input#radio1');
    const option2 = page.locator('input#radio2');
    const option3 = page.locator('input[type="radio"][disabled]');
    // Arrange
    await option1.uncheck()
})

test("Try to setChecked to disabeld radio button", async ({ page }) => {
    // Arrange
    const url = 'https://www.w3schools.com/bootstrap5/bootstrap_form_check_radio.php';
    await page.goto(url);
    const option1 = page.locator('input#radio1');
    const option2 = page.locator('input#radio2');
    const option3 = page.locator('input[type="radio"][disabled]');
    // Arrange
    await option3.setChecked(true)
})

test("Select option by value", async ({ page }) => {
    // Arrange
    const url = "https://swongsuddee.github.io/demo-web-qa/dropdown/"
    await page.goto(url)

    const ddLocator = page.getByTestId('dropdown-selection')

    // Action 
    await ddLocator.selectOption('value-Bird')

    // Assertion
    const value = await ddLocator.inputValue()
    expect(value).toEqual('value-Bird')
})

test("Select option by label", async ({ page }) => {
    // Arrange
    const url = "https://swongsuddee.github.io/demo-web-qa/dropdown/"
    await page.goto(url)

    const ddLocator = page.getByTestId('dropdown-selection')

    // Action 
    await ddLocator.selectOption({
        label: 'Cat'
    })

    // Assertion
    const value = await ddLocator.inputValue()
    expect(value).toEqual('value-Cat')
})

test("Select option from listbox", async ({ page }) => {
    // Arrange
    const url = "https://swongsuddee.github.io/demo-web-qa/dropdown/"
    await page.goto(url)

    const ddLocator = page.getByTestId('listbox')

    // Action 
    await ddLocator.selectOption({
        label: 'Banana'
    })

    // Assertion
    const value = await ddLocator.inputValue()
    expect(value).toEqual('value-Banana')
})

test("Select option from listbox by index", async ({ page }) => {
    // Arrange
    const url = "https://swongsuddee.github.io/demo-web-qa/dropdown/"
    await page.goto(url)

    const ddLocator = page.getByTestId('listbox')

    // Action 
    await ddLocator.selectOption({
        index: 3
    })

    // Assertion
    const value = await ddLocator.inputValue()
    expect(value).toEqual('value-Durian')
})

test("Select option from listbox by click", async ({ page }) => {
    // Arrange
    const url = "https://swongsuddee.github.io/demo-web-qa/dropdown/"
    await page.goto(url)

    const ddLocator = page.getByTestId('listbox')

    // Action 
    await ddLocator.locator('text="Cherry"').click()

    // Assertion
    const value = await ddLocator.inputValue()
    expect(value).toEqual('value-Cherry')

    console.log(value)
})

test("Download image", async ({ page }) => {
    // Arrange
    const url = "https://github.com/swongsuddee/demo-web-qa/blob/main/public/image.webp"
    await page.goto(url)

    const btnLocator = page.getByTestId("download-raw-button")

    // Action
    const downloadPromise = page.waitForEvent('download')
    await btnLocator.click()
    const download = await downloadPromise

    // Assertion
    console.log(download.suggestedFilename())
})

test("Upload image", async ({ page }) => {
    // // Arrange
    const url = "https://swongsuddee.github.io/demo-web-qa/upload/"
    await page.goto(url)

    const inputLocator = page.getByTestId('upload-images')

    // __dirname  : /Users/jojoe/Repositories/4-Bravo/20230615-Brove-Playwright-class/tests
    // image path : /Users/jojoe/Repositories/4-Bravo/20230615-Brove-Playwright-class/assets/img1.jpg
    const imagePath = path.join(__dirname, "./../", './assets/img1.jpg')
    console.log(imagePath)

    // Action
    await inputLocator.setInputFiles(imagePath)

    // Assertion
    const value = await inputLocator.inputValue()
    expect(value).toContain('img1.jpg')
})

test("Bulk upload images", async ({ page }) => {
    // // Arrange
    const url = "https://swongsuddee.github.io/demo-web-qa/upload/"
    await page.goto(url)

    const inputLocator = page.getByTestId('upload-images')
    const image1Path = path.join(__dirname, './../assets/img1.jpg')
    const image2Path = path.join(__dirname, './../assets/img2.jpg')
    const imageList = [
        image1Path,
        image2Path
    ]

    // Action 
    await inputLocator.setInputFiles(imageList)
    await page.waitForTimeout(2_000)

    // Assertion
    const value = await inputLocator.inputValue()
    expect(value).toContain('img1.jpg')

    // const imageLocator = page.getByTestId(/^Image-Preview/)
    const imageLocator = page.locator("xpath=//img[contains(@data-testid, 'Image-Preview')]")
    const countImages = await imageLocator.count()
    expect(countImages).toEqual(imageList.length)
})